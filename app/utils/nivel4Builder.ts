export type FeatureKey = 'lluvia_mm' | 'nivel_rio_m' | 'viento_kmh'
export type TargetClass = 'Calma' | 'Vigilancia' | 'Inundación'

export interface CordobaDataRow {
  id: string
  municipio: string
  lluvia_mm: number
  nivel_rio_m: number
  viento_kmh: number
  realClass: TargetClass
  emoji: string
}

export const defaultCordobaDataset: CordobaDataRow[] = [
  { id: 'D1', municipio: 'Montería', lluvia_mm: 10, nivel_rio_m: 2.2, viento_kmh: 18, realClass: 'Calma', emoji: '🟢' },
  { id: 'D2', municipio: 'Cereté', lluvia_mm: 20, nivel_rio_m: 2.5, viento_kmh: 25, realClass: 'Calma', emoji: '🟢' },
  { id: 'D3', municipio: 'San Pelayo', lluvia_mm: 55, nivel_rio_m: 3.1, viento_kmh: 12, realClass: 'Vigilancia', emoji: '🟡' },
  { id: 'D4', municipio: 'Cotorra', lluvia_mm: 65, nivel_rio_m: 3.4, viento_kmh: 22, realClass: 'Vigilancia', emoji: '🟡' },
  { id: 'D5', municipio: 'Lorica', lluvia_mm: 80, nivel_rio_m: 4.6, viento_kmh: 15, realClass: 'Inundación', emoji: '🔴' },
  { id: 'D6', municipio: 'Tierralta', lluvia_mm: 95, nivel_rio_m: 5.1, viento_kmh: 20, realClass: 'Inundación', emoji: '🔴' }
]

export const cordobaDataset = defaultCordobaDataset

export const featureMeta: Record<FeatureKey, { label: string; unit: string; min: number; max: number; step: number; defaultVal: number }> = {
  lluvia_mm: { label: 'Lluvia caída', unit: 'mm', min: 10, max: 90, step: 5, defaultVal: 40 },
  nivel_rio_m: { label: 'Nivel del Río Sinú', unit: 'm', min: 2.0, max: 5.0, step: 0.2, defaultVal: 4.0 },
  viento_kmh: { label: 'Brisa / Viento', unit: 'km/h', min: 10, max: 30, step: 2, defaultVal: 20 }
}

export interface SimNode {
  id: string
  kind: 'root' | 'decision' | 'leaf'
  x: number
  y: number
  feature?: FeatureKey
  threshold?: number
  predictedClass?: TargetClass
}

export interface SimEdge {
  id: string
  fromNodeId: string
  branch: 'no' | 'yes'
  toNodeId: string
}

export interface RowTraceResult {
  row: CordobaDataRow
  predicted: TargetClass | 'Sin conexión'
  correct: boolean
  visitedNodeIds: string[]
  visitedEdgeIds: string[]
  stepByStepWhy: string
}

export interface NodeDiagnostic {
  nodeId: string
  title: string
  kind: 'root' | 'decision' | 'leaf'
  samplesCount: number
  purityPercent: number
  whyExplanation: string
  isGoodNode: boolean
}

export interface TreeExecutionReport {
  validStructure: boolean
  errorMsg?: string
  accuracy: number
  correctCount: number
  totalCount: number
  passed: boolean
  rowResults: RowTraceResult[]
  nodeDiagnostics: NodeDiagnostic[]
  nodeSamplesMap: Record<string, CordobaDataRow[]>
}

// Calcula el índice Gini real de Machine Learning: Gini = 1 - sum(p_i^2)
// Devuelve pureza de 0% a 100% (100% cuando todos los casos en el nodo son de la misma clase)
export const computeGiniPurity = (rows: CordobaDataRow[]): number => {
  if (rows.length === 0) return 100
  const counts: Record<TargetClass, number> = { Calma: 0, Vigilancia: 0, Inundación: 0 }
  for (const r of rows) {
    counts[r.realClass]++
  }
  let sumSq = 0
  for (const key of Object.keys(counts) as TargetClass[]) {
    const p = counts[key] / rows.length
    sumSq += p * p
  }
  const gini = 1 - sumSq // 0 es perfectamente puro, 0.666 es máxima mezcla de 3 clases
  return Math.round((1 - gini / 0.6667) * 100)
}

export const executeCustomTree = (
  nodes: SimNode[],
  edges: SimEdge[],
  dataset: CordobaDataRow[] = defaultCordobaDataset
): TreeExecutionReport => {
  const nodeSamplesMap: Record<string, CordobaDataRow[]> = {}
  for (const n of nodes) {
    nodeSamplesMap[n.id] = []
  }

  const rootNodes = nodes.filter(n => n.kind === 'root')
  if (rootNodes.length === 0) {
    return {
      validStructure: false,
      errorMsg: 'Tu lienzo no tiene un 👑 Nodo Raíz. Crea un Nodo Raíz para que los datos sepan por dónde empezar.',
      accuracy: 0,
      correctCount: 0,
      totalCount: dataset.length,
      passed: false,
      rowResults: [],
      nodeDiagnostics: [],
      nodeSamplesMap
    }
  }

  if (rootNodes.length > 1) {
    return {
      validStructure: false,
      errorMsg: 'Solo debe haber un (1) 👑 Nodo Raíz en el árbol. Elimina el nodo raíz extra y usa 🔍 Nodos de Decisión para las demás preguntas.',
      accuracy: 0,
      correctCount: 0,
      totalCount: dataset.length,
      passed: false,
      rowResults: [],
      nodeDiagnostics: [],
      nodeSamplesMap
    }
  }

  const root = rootNodes[0]!
  const rowResults: RowTraceResult[] = []

  for (const row of dataset) {
    let current: SimNode | undefined = root
    const visitedNodes: string[] = []
    const visitedEdges: string[] = []
    const explanationSteps: string[] = []
    let steps = 0
    let predicted: TargetClass | 'Sin conexión' = 'Sin conexión'

    while (current && steps < 10) {
      steps++
      visitedNodes.push(current.id)
      nodeSamplesMap[current.id]?.push(row)

      if (current.kind === 'leaf') {
        predicted = current.predictedClass || 'Sin conexión'
        explanationSteps.push(`Llegó a la Hoja "${predicted}"`)
        break
      }

      const feat = current.feature || 'lluvia_mm'
      const thres = current.threshold ?? 40
      const meta = featureMeta[feat]
      const val = row[feat]
      const isGreater = val > thres
      const branchToFollow: 'no' | 'yes' = isGreater ? 'yes' : 'no'

      explanationSteps.push(
        `En "¿${meta.label} > ${thres}${meta.unit}?": el dato de ${row.municipio} es ${val}${meta.unit} (${isGreater ? `SÍ es mayor → Rama SÍ` : `NO es mayor → Rama NO`})`
      )

      const nextEdge = edges.find(e => e.fromNodeId === current!.id && e.branch === branchToFollow)
      if (!nextEdge) {
        predicted = 'Sin conexión'
        explanationSteps.push(`Faltó conectar la salida ${branchToFollow.toUpperCase()}`)
        break
      }

      visitedEdges.push(nextEdge.id)
      current = nodes.find(n => n.id === nextEdge.toNodeId)
    }

    const isCorrect = predicted === row.realClass
    const finalVerdict =
      predicted === 'Sin conexión'
        ? '⚠️ Camino incompleto.'
        : isCorrect
          ? `✅ ¡Acertó! El estado real en ${row.municipio} fue ${row.realClass}.`
          : `❌ Se equivocó: Tu árbol predijo "${predicted}", pero en ${row.municipio} ocurrió "${row.realClass}".`

    rowResults.push({
      row,
      predicted,
      correct: isCorrect,
      visitedNodeIds: visitedNodes,
      visitedEdgeIds: visitedEdges,
      stepByStepWhy: `${explanationSteps.join(' ➔ ')}. ${finalVerdict}`
    })
  }

  // Generar diagnóstico pedagógico nodo por nodo explicando EL PORQUÉ
  const nodeDiagnostics: NodeDiagnostic[] = nodes.map(n => {
    const samples = nodeSamplesMap[n.id] || []
    const purity = computeGiniPurity(samples)

    if (n.kind === 'leaf') {
      const matching = samples.filter(s => s.realClass === n.predictedClass).length
      const allMatch = samples.length > 0 && matching === samples.length
      return {
        nodeId: n.id,
        title: `🍃 Hoja: ${n.predictedClass}`,
        kind: 'leaf',
        samplesCount: samples.length,
        purityPercent: purity,
        isGoodNode: allMatch,
        whyExplanation:
          samples.length === 0
            ? 'Ningún municipio llegó a esta hoja. Revisa las condiciones de los nodos superiores.'
            : allMatch
              ? `¡Hoja 100% Pura! Los ${samples.length} municipios que llegaron aquí realmente tuvieron "${n.predictedClass}".`
              : `Esta hoja recibió ${samples.length} municipios mezclados: solo ${matching} eran realmente "${n.predictedClass}". Ajusta la pregunta anterior para separarlos mejor.`
      }
    }

    const feat = n.feature || 'lluvia_mm'
    const thres = n.threshold ?? 40
    const meta = featureMeta[feat]
    const leftGroup = samples.filter(s => s[feat] <= thres)
    const rightGroup = samples.filter(s => s[feat] > thres)

    if (feat === 'viento_kmh') {
      return {
        nodeId: n.id,
        title: `${n.kind === 'root' ? '👑 Raíz' : '🔍 Decisión'}: ¿${meta.label} > ${thres}${meta.unit}?`,
        kind: n.kind,
        samplesCount: samples.length,
        purityPercent: purity,
        isGoodNode: false,
        whyExplanation: `Preguntaste por la brisa/viento. En Córdoba las inundaciones dependen de la lluvia y del nivel del Río Sinú, no de la brisa. Por eso los casos quedaron mezclados (${leftGroup.length} a la izquierda y ${rightGroup.length} a la derecha sin separar el peligro).`
      }
    }

    const leftPurity = computeGiniPurity(leftGroup)
    const rightPurity = computeGiniPurity(rightGroup)
    const avgChildPurity = Math.round((leftPurity + rightPurity) / 2)

    return {
      nodeId: n.id,
      title: `${n.kind === 'root' ? '👑 Raíz' : '🔍 Decisión'}: ¿${meta.label} > ${thres}${meta.unit}?`,
      kind: n.kind,
      samplesCount: samples.length,
      purityPercent: avgChildPurity,
      isGoodNode: leftGroup.length > 0 && rightGroup.length > 0 && avgChildPurity >= 75,
      whyExplanation:
        leftGroup.length === 0 || rightGroup.length === 0
          ? `Con el umbral de ${thres}${meta.unit}, todos los ${samples.length} casos se fueron por un solo lado. Cambia el número del umbral para que la pregunta divida los datos en dos grupos.`
          : `Recibió ${samples.length} municipios y los dividió en ${leftGroup.length} hacia NO (≤ ${thres}${meta.unit}) y ${rightGroup.length} hacia SÍ (> ${thres}${meta.unit}), logrando una pureza de separación del ${avgChildPurity}%.`
    }
  })

  const unconnectedRow = rowResults.find(r => r.predicted === 'Sin conexión')
  if (unconnectedRow) {
    return {
      validStructure: false,
      errorMsg: `El registro ${unconnectedRow.row.id} (${unconnectedRow.row.municipio}) llegó a una rama sin conectar. Conecta todas las salidas NO y SÍ hacia un nodo o una hoja.`,
      accuracy: 0,
      correctCount: 0,
      totalCount: dataset.length,
      passed: false,
      rowResults,
      nodeDiagnostics,
      nodeSamplesMap
    }
  }

  const correctCount = rowResults.filter(r => r.correct).length
  const accuracy = Math.round((correctCount / dataset.length) * 100)

  return {
    validStructure: true,
    accuracy,
    correctCount,
    totalCount: dataset.length,
    passed: correctCount >= 5,
    rowResults,
    nodeDiagnostics,
    nodeSamplesMap
  }
}
