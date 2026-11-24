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
    fase5E: 'Navegación General',
    descripcionVisual: 'Explorando las 6 tarjetas principales del panel.'
  }))

  const setContext = (newContext: ScreenTelemetry) => {
    telemetry.value = newContext
  }

  return {
    telemetry,
    setContext
  }
}

