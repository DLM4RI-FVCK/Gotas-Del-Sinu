import { buildZenuitoSystemPrompt, type StudentProfile, type ScreenContext } from '../utils/zenuitoPrompt'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || ''

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY no está configurada en el servidor (.env).'
    })
  }

  const body = await readBody(event)
  const { messages, profile, screenContext } = body || {}

  if (!messages || !Array.isArray(messages)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El formato de mensajes no es válido.'
    })
  }

  // Construir el System Prompt oficial unificando los 5 Modelos Pedagógicos
  const studentProfile: StudentProfile = {
    nombre: profile?.nombre || 'Estudiante',
    edad: profile?.edad,
    nivelEducativo: profile?.nivelEducativo || 'Secundaria',
    gradoOSemestre: profile?.gradoOSemestre,
    verbosidad: profile?.verbosidad || 'medio',
    socratidad: profile?.socratidad || 'alta'
  }
  const currentScreen: ScreenContext | undefined = screenContext
  const systemInstruction = buildZenuitoSystemPrompt(studentProfile, currentScreen)

  try {
    // Lista de modelos ordenados por estabilidad y cuota disponible
    // gemini-3.5-flash-lite responde de inmediato y cuenta con cuota activa gratuita
    const modelsToTry = [
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
      'gemini-flash-latest'
    ]
    let response: any = null
    let lastError: any = null

    // Formatear historial asegurando que los roles alternen y no haya mensajes vacíos
    const filteredMessages = messages.filter((m: any) => m && m.content && String(m.content).trim().length > 0)
    
    // Gemini requiere que el historial comience siempre con un mensaje del rol 'user'
    let contents = filteredMessages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content).trim() }]
    }))

    // Si el primer mensaje es del modelo (el saludo inicial), lo omitimos de contents ya que la instrucción de sistema guía al modelo
    if (contents.length > 0 && contents[0]?.role === 'model') {
      contents = contents.slice(1)
    }

    // Si después de filtrar no queda mensaje del usuario, forzamos uno por defecto
    if (contents.length === 0) {
      contents = [{ role: 'user', parts: [{ text: 'Hola Zenuito' }] }]
    }

    const payload: Record<string, any> = {
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.65,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    }

    for (const modelName of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
        response = await $fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: payload
        })
        if (response?.candidates?.[0]) {
          break
        }
      } catch (e: any) {
        lastError = e
        // Si el modelo específico no está disponible para esta cuenta, intenta con el siguiente
        continue
      }
    }

    if (!response && lastError) {
      throw lastError
    }

    const candidate = response?.candidates?.[0]
    const replyText = candidate?.content?.parts?.[0]?.text || 'No pude generar una respuesta en este momento.'

    return {
      success: true,
      reply: replyText
    }
  } catch (err: any) {
    console.error('Error al llamar a Gemini API:', err?.data || err?.message || err)
    const errorDetails = err?.data?.error?.message || err?.message || 'Error de comunicación con Google AI Studio'
    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: `${errorDetails}`
    })
  }
})
