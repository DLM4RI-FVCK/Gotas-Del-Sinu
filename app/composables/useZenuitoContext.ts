export interface ScreenTelemetry {
  seccion: string
  nivelActual?: number
  fase5E?: string
  descripcionVisual?: string
  metricasEnPantalla?: Record<string, any>
}

export function useZenuitoContext() {
  const telemetry = useState<ScreenTelemetry>('zenuito_screen_telemetry', () => ({
    seccion: 'Dashboard',
    nivelActual: 1,
    fase5E: 'Engage (Enganchar)',
    descripcionVisual: 'Explorando las misiones de Gotas del Sinú.'
  }))

  const setContext = (newContext: Partial<ScreenTelemetry>) => {
    telemetry.value = {
      ...telemetry.value,
      ...newContext
    }
  }

  return {
    telemetry,
    setContext
  }
}

