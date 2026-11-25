export interface MistakeRecord {
  level: number
  section: string
  topic: string
  questionTitle: string
  selectedText: string
  detail: string
  conceptHint: string
  timestamp: string
}

export interface StrengthRecord {
  level: number
  section: string
  topic: string
  detail: string
}

const LEVEL_SECTION_NAMES: Record<number, string> = {
  1: 'Misión 1 · Introducción (Lorica)',
  2: 'Misión 2 · Anatomía del Árbol',
  3: 'Misión 3 · Pureza y Datos',
  4: 'Misión 4 · Simulador Libre',
  5: 'Misión 5 · Evaluación Final'
}

export interface CachedRendimientoItem {
  seccion: string
  texto: string
}

export interface CachedRendimientoAnalysis {
  saludo: string
  resumenGeneral: string
  loQueHizoBien: Array<CachedRendimientoItem | string>
  loQueDebeMejorar: Array<CachedRendimientoItem | string>
  consejoFinal: string
}

export interface PerformanceData {
  mistakes: MistakeRecord[]
  strengths: StrengthRecord[]
  completedLevels: number[]
  simulatorIssues: string[]
  cachedAnalysis: CachedRendimientoAnalysis | null
}

const PERF_STORAGE_KEY = 'gotas_del_sinu_performance_v1'

const defaultPerformance = (): PerformanceData => ({
  mistakes: [],
  strengths: [],
  completedLevels: [],
  simulatorIssues: [],
  cachedAnalysis: null
})

export const usePerformanceTracker = () => {
  const performance = useState<PerformanceData>('gotas_performance_data', () => defaultPerformance())
  const hydrated = useState<boolean>('gotas_performance_hydrated', () => false)

  const loadFromStorage = () => {
    if (!import.meta.client || hydrated.value) return
    hydrated.value = true
    try {
      const raw = localStorage.getItem(PERF_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PerformanceData>
        performance.value = {
          mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
          simulatorIssues: Array.isArray(parsed.simulatorIssues) ? parsed.simulatorIssues : [],
          cachedAnalysis: parsed.cachedAnalysis || null
        }
      }
    } catch {
      // Ignorar errores de almacenamiento local
    }
  }

  loadFromStorage()

  const persist = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(performance.value))
      } catch {
        // Ignorar errores de cuota
      }
    }
  }

  const recordQuizAttempt = (params: {
    level: number
    topic: string
    questionTitle: string
    selectedText: string
    isCorrect: boolean
    conceptHint: string
  }) => {
    loadFromStorage()
    const cleanSelected = params.selectedText.replace(/\s+/g, ' ').trim()
    const section = LEVEL_SECTION_NAMES[params.level] || `Misión ${params.level}`

    if (!params.isCorrect) {
      const alreadyLogged = performance.value.mistakes.some(
        m => m.level === params.level && m.topic === params.topic && m.detail.includes(cleanSelected)
      )
      if (!alreadyLogged) {
        performance.value.mistakes.push({
          level: params.level,
          section,
          topic: params.topic,
          questionTitle: params.questionTitle,
          selectedText: cleanSelected,
          detail: `En "${params.questionTitle}" eligió "${cleanSelected}".`,
          conceptHint: params.conceptHint,
          timestamp: new Date().toISOString()
        })
        performance.value.cachedAnalysis = null
      }
    } else {
      const alreadyStrong = performance.value.strengths.some(
        s => s.level === params.level && s.topic === params.topic && s.detail.includes(params.questionTitle)
      )
      if (!alreadyStrong) {
        performance.value.strengths.push({
          level: params.level,
          section,
          topic: params.topic,
          detail: `En "${params.questionTitle}" eligió correctamente "${cleanSelected}".`
        })
        performance.value.cachedAnalysis = null
      }
    }
    persist()
  }

  const recordSimulatorAttempt = (params: {
    validStructure: boolean
    errorMsg?: string
    passed: boolean
  }) => {
    loadFromStorage()
    const section = LEVEL_SECTION_NAMES[4] || 'Misión 4 · Simulador Libre'
    if (!params.validStructure && params.errorMsg) {
      if (!performance.value.simulatorIssues.includes(params.errorMsg)) {
        performance.value.simulatorIssues.push(params.errorMsg)
      }
    } else if (!params.passed) {
      const msg = 'Al entrenar el árbol en el Simulador Libre, algunas ramas clasificaron de forma incorrecta a los municipios del Sinú.'
      if (!performance.value.simulatorIssues.includes(msg)) {
        performance.value.simulatorIssues.push(msg)
      }
    } else {
      const alreadyStrong = performance.value.strengths.some(
        s => s.level === 4 && s.topic === 'Constructor de Árboles'
      )
      if (!alreadyStrong) {
        performance.value.strengths.push({
          level: 4,
          section,
          topic: 'Constructor de Árboles',
          detail: 'Conectó un árbol válido en el simulador libre y logró clasificar correctamente los casos del Río Sinú.'
        })
      }
    }
    persist()
  }

  const markLevelCompleted = (level: number) => {
    loadFromStorage()
    if (!performance.value.completedLevels.includes(level)) {
      performance.value.completedLevels.push(level)
      persist()
    }
  }

  const saveCachedAnalysis = (analysis: CachedRendimientoAnalysis) => {
    loadFromStorage()
    performance.value.cachedAnalysis = analysis
    persist()
  }

  const resetPerformance = () => {
    performance.value = defaultPerformance()
    persist()
  }

  return {
    performance,
    recordQuizAttempt,
    recordSimulatorAttempt,
    markLevelCompleted,
    saveCachedAnalysis,
    resetPerformance
  }
}
