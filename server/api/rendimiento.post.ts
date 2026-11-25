import type { StudentProfile } from '../utils/zenuitoPrompt'

interface RendimientoItem {
  seccion: string
  texto: string
}

interface RendimientoPayload {
  profile?: StudentProfile
  performance?: {
    mistakes?: Array<{
      level: number
      section?: string
      topic: string
      questionTitle?: string
      selectedText?: string
      detail: string
      conceptHint: string
    }>
    strengths?: Array<{
      level: number
      section?: string
      topic: string
      detail: string
    }>
    completedLevels?: number[]
    simulatorIssues?: string[]
  }
}

interface RendimientoResponse {
  saludo: string
  resumenGeneral: string
  loQueHizoBien: RendimientoItem[]
  loQueDebeMejorar: RendimientoItem[]
  consejoFinal: string
}

const SECTION_LABELS: Record<number, string> = {
  1: 'Misión 1 · Introducción (Lorica)',
  2: 'Misión 2 · Anatomía del Árbol',
  3: 'Misión 3 · Pureza y Datos',
  4: 'Misión 4 · Simulador Libre',
  5: 'Misión 5 · Evaluación Final'
}

function buildFallbackAnalysis(nombre: string, payload: RendimientoPayload): RendimientoResponse {
  const mistakes = payload.performance?.mistakes || []
  const strengths = payload.performance?.strengths || []
  const simIssues = payload.performance?.simulatorIssues || []

  const loQueHizoBien: RendimientoItem[] = []
  if (strengths.length > 0) {
    for (const s of strengths) {
      loQueHizoBien.push({
        seccion: s.section || SECTION_LABELS[s.level] || `Misión ${s.level}`,
        texto: s.detail
      })
    }
  } else {
    loQueHizoBien.push({
      seccion: 'Recorrido General',
      texto: 'Completaste las actividades explorando cómo un árbol de decisión toma decisiones en el Río Sinú.'
    })
  }

  const loQueDebeMejorar: RendimientoItem[] = []
  for (const m of mistakes) {
    const seccion = m.section || SECTION_LABELS[m.level] || `Misión ${m.level}`
    const queHizo = m.questionTitle && m.selectedText
      ? `En "${m.questionTitle}" seleccionaste "${m.selectedText}".`
      : m.detail
    loQueDebeMejorar.push({
      seccion,
      texto: `${queHizo} Qué debes mejorar: ${m.conceptHint}`
    })
  }

  for (const issue of simIssues) {
    loQueDebeMejorar.push({
      seccion: SECTION_LABELS[4]!,
      texto: `En el simulador ocurrió esto: ${issue} Revisa que la raíz, las ramas SÍ/NO y las hojas queden bien conectadas antes de entrenar.`
    })
  }

  if (loQueDebeMejorar.length === 0) {
    loQueDebeMejorar.push({
      seccion: 'Sin errores registrados',
      texto: 'No cometiste errores en los retos evaluados; para seguir mejorando, prueba construir árboles con distintos umbrales en el Simulador Libre.'
    })
  }

  return {
    saludo: `¡Hola, ${nombre}! Soy Zenuito. Aquí tienes el detalle exacto de lo que hiciste en cada sección.`,
    resumenGeneral: 'Este análisis revisa de forma puntual las decisiones que tomaste en cada misión del Río Sinú.',
    loQueHizoBien,
    loQueDebeMejorar,
    consejoFinal: 'Revisa siempre la condición de la pregunta y el camino de cada rama antes de elegir una hoja final.'
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || ''
  const body = (await readBody(event)) as RendimientoPayload

  const nombre = body?.profile?.nombre || 'Estudiante'
  const edad = body?.profile?.edad || 15
  const nivelEducativo = body?.profile?.nivelEducativo || 'Secundaria'
  const grado = body?.profile?.gradoOSemestre || ''

  if (!apiKey) {
    return {
      success: true,
      analysis: buildFallbackAnalysis(nombre, body),
      source: 'local'
    }
  }

  const mistakes = body?.performance?.mistakes || []
  const strengths = body?.performance?.strengths || []
  const simulatorIssues = body?.performance?.simulatorIssues || []
  const completedLevels = body?.performance?.completedLevels || []

  const prompt = `Eres Zenuito, el tutor de "Gotas del Sinú".
Debes darle a ${nombre} (${edad} años, ${nivelEducativo}${grado ? ', ' + grado : ''}) un análisis PUNTUAL, DIRECTO Y ESPECÍFICO de su desempeño.

DATOS EXACTOS RECOPILADOS:
- Misiones completadas: ${completedLevels.length > 0 ? completedLevels.map(l => SECTION_LABELS[l] || `Misión ${l}`).join(', ') : 'Recorrido general'}
- Aciertos registrados por sección:
${strengths.length > 0 ? strengths.map(s => `  * [${s.section || SECTION_LABELS[s.level] || `Misión ${s.level}`} - ${s.topic}]: ${s.detail}`).join('\n') : '  * Completó la actividad.'}
- Errores exactos cometidos por sección (QUÉ HIZO):
${mistakes.length > 0 ? mistakes.map(m => `  * [${m.section || SECTION_LABELS[m.level] || `Misión ${m.level}`} - ${m.topic}]: ${m.detail} | Qué debía aplicar: ${m.conceptHint}`).join('\n') : '  * Ningún error registrado en cuestionarios.'}
- Errores exactos en el Simulador Libre (Misión 4):
${simulatorIssues.length > 0 ? simulatorIssues.map(i => `  * [Misión 4 · Simulador Libre]: ${i}`).join('\n') : '  * Ningún error registrado en el simulador.'}

INSTRUCCIONES ESTRICTAS (CUMPLE TODAS):
1. SÉ PUNTUAL Y ESPECÍFICO: Nada de frases genéricas ni relleno ("demostraste buena comprensión", "sigue adelante"). Di EXACTAMENTE en qué sección/misión se equivocó, QUÉ opción eligió o qué error cometió en el simulador, y QUÉ debe mejorar concretamente ahí.
2. En "loQueHizoBien", menciona la sección exacta y qué acción o respuesta correcta dio.
3. En "loQueDebeMejorar", por cada error registrado indica la sección exacta, lo que hizo mal (ej: "Elegiste '...' cuando se preguntaba por...") y cómo corregirlo. Si no hubo errores, indícalo directamente y da una recomendación concreta para el Simulador Libre.
4. PROHIBIDO CUANTIFICAR: Nunca escribas números de errores, cantidades de aciertos, porcentajes, puntajes ni fracciones ("tuviste 2 errores", "4 de 4", "100%"). Solo habla de los hechos cualitativos.
5. Adapta el tono a ${nivelEducativo} (${edad} años).
6. Responde ÚNICAMENTE con JSON válido con esta estructura exacta:
{
  "saludo": "Saludo breve y directo de Zenuito",
  "resumenGeneral": "Una oración puntual resumiendo su paso por las misiones",
  "loQueHizoBien": [
    { "seccion": "Nombre exacto de la misión o sección", "texto": "Qué hizo bien exactamente en esa sección" }
  ],
  "loQueDebeMejorar": [
    { "seccion": "Nombre exacto de la misión o sección", "texto": "Qué hizo exactamente al equivocarse y qué debe mejorar ahí" }
  ],
  "consejoFinal": "Consejo práctico y puntual de cierre"
}`

  // Modelos de texto con cuota gratuita independiente (ordenados de mayor RPD/RPM a menor)
  const modelsToTry = [
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3-flash-preview',
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-4-hydrogen'
  ]

  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
      const response: any = await $fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            topP: 0.9,
            maxOutputTokens: 1400,
            responseMimeType: 'application/json'
          }
        }
      })

      const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text
      if (!rawText) continue

      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim()
      const parsed = JSON.parse(cleaned) as Partial<RendimientoResponse>

      const normalizeItems = (items: any[]): RendimientoItem[] =>
        items.map((item) => {
          if (typeof item === 'string') {
            return { seccion: 'Detalle', texto: item }
          }
          return {
            seccion: String(item?.seccion || 'Misión'),
            texto: String(item?.texto || '')
          }
        }).filter(i => i.texto.length > 0)

      if (parsed.saludo && Array.isArray(parsed.loQueHizoBien) && Array.isArray(parsed.loQueDebeMejorar)) {
        return {
          success: true,
          analysis: {
            saludo: parsed.saludo,
            resumenGeneral: parsed.resumenGeneral || '',
            loQueHizoBien: normalizeItems(parsed.loQueHizoBien),
            loQueDebeMejorar: normalizeItems(parsed.loQueDebeMejorar),
            consejoFinal: parsed.consejoFinal || ''
          },
          source: 'gemini'
        }
      }
    } catch {
      continue
    }
  }

  return {
    success: true,
    analysis: buildFallbackAnalysis(nombre, body),
    source: 'local'
  }
})
