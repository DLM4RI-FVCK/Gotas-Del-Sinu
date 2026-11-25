<template>
  <div class="nivel-wrap position-relative d-flex flex-column justify-space-between pa-3 pa-sm-5">
    <!-- Barra superior del Nivel 4: Simulador (Solo botón de Guía del Simulador porque la tabla ya está debajo) -->
    <div class="level-top-bar d-flex flex-wrap align-center justify-space-between gap-2 mb-2 flex-shrink-0">
      <div class="d-flex align-center gap-3 min-w-0 flex-1-1">
        <v-btn
          variant="tonal"
          color="primary"
          size="small"
          rounded="lg"
          class="text-none font-weight-bold flex-shrink-0"
          prepend-icon="mdi-arrow-left"
          @click="$emit('back-to-map')"
        >
          Niveles
        </v-btn>

        <div class="min-w-0 flex-1-1">
          <span class="level-tag">🚨 Nivel 4 · Fase 4: Elaborar</span>
          <h2 class="top-level-title font-weight-bold">
            Simulador: Crea, Conecta y Entrena tu Árbol de Decisión
          </h2>
        </div>
      </div>

      <div class="top-sim-actions d-flex align-center">
        <v-btn
          color="info"
          variant="tonal"
          size="small"
          rounded="lg"
          class="text-none font-weight-bold w-100"
          prepend-icon="mdi-help-circle-outline"
          @click="modalMode = 'guide'"
        >
          Guía del Simulador
        </v-btn>
      </div>
    </div>

    <!-- Estudio Simulador (En PC: 2 columnas lado a lado; En Celular Vertical: Tabla arriba y Simulador con Configuración + Diagrama centrado abajo) -->
    <div class="simulator-grid flex-1-1 min-h-0" :class="{ 'creator-collapsed': isCreatorCollapsed }">
      <JugarNivel4DatasetAndCreatorPanel
        v-show="!isCreatorCollapsed"
        class="inline-creator-panel"
        :only-dataset-mode="isMobileViewport"
        @create-node="handleCreateNode"
        @open-modal="modalMode = $event"
      />

      <JugarNivel4FreeGraphCanvas
        :nodes="nodes"
        :edges="edges"
        :node-samples-map="nodeSamplesMap"
        :is-creator-collapsed="isCreatorCollapsed"
        :is-training-live="isTrainingLive"
        :live-trace-banner="liveTraceBanner"
        :highlighted-node-ids="highlightedNodeIds"
        :highlighted-edge-ids="highlightedEdgeIds"
        @toggle-creator="isCreatorCollapsed = !isCreatorCollapsed"
        @update-node-pos="handleUpdatePos"
        @remove-node="handleRemoveNode"
        @connect-nodes="handleConnectNodes"
        @remove-edge="handleRemoveEdge"
        @clear-all="handleClearAll"
        @load-starter="handleLoadStarter"
        @train-and-test="handleTrainAndTest"
        @open-report="modalMode = 'report'"
      >
        <template #top-creator>
          <JugarNivel4DatasetAndCreatorPanel
            :compact-window-mode="true"
            :show-mobile-actions-in-creator="true"
            :nodes-count="nodes.length"
            :edges-count="edges.length"
            :is-training-live="isTrainingLive"
            @create-node="handleCreateNode"
            @open-modal="modalMode = $event"
            @load-starter="handleLoadStarter"
            @clear-all="handleClearAll"
            @train-and-test="handleTrainAndTest"
          />
        </template>
      </JugarNivel4FreeGraphCanvas>
    </div>

    <!-- Modales a Pantalla Completa: Tabla de Datos, Guía y Reporte Pedagógico de Pureza y Aciertos -->
    <JugarNivel4DialogSimulador
      :mode="modalMode"
      :report="executionReport"
      @close="modalMode = null"
      @finish-level="$emit('back-to-map')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  executeCustomTree,
  type CordobaDataRow,
  type SimEdge,
  type SimNode,
  type TreeExecutionReport
} from '~/utils/nivel4Builder'

defineEmits<{
  (e: 'back-to-map'): void
}>()

const { completeLevel } = useUserSession()
const { recordSimulatorAttempt, markLevelCompleted } = usePerformanceTracker()

const nodes = ref<SimNode[]>([])
const edges = ref<SimEdge[]>([])
const nodeSamplesMap = ref<Record<string, CordobaDataRow[]>>({})
const executionReport = ref<TreeExecutionReport | null>(null)
const modalMode = ref<'dataset' | 'guide' | 'report' | null>(null)

const isCreatorCollapsed = ref(false)
const isMobileViewport = ref(false)
const isTrainingLive = ref(false)
const liveTraceBanner = ref('')
const highlightedNodeIds = ref<string[]>([])
const highlightedEdgeIds = ref<string[]>([])

let idCounter = 1
let animTimer: ReturnType<typeof setTimeout> | null = null

const checkMobileViewport = () => {
  if (!import.meta.client) return
  isMobileViewport.value = window.innerWidth <= 900
}

// Bloquea el scroll exterior cuando está abierto un modal
const syncScrollLock = () => {
  if (!import.meta.client) return
  const shouldLock = !!modalMode.value
  document.documentElement.classList.toggle('ova-modal-locked', shouldLock)
  document.body.classList.toggle('ova-modal-locked', shouldLock)
}

watch(modalMode, syncScrollLock)

onMounted(() => {
  checkMobileViewport()
  if (import.meta.client) {
    window.addEventListener('resize', checkMobileViewport)
  }
  syncScrollLock()
})

onBeforeUnmount(() => {
  if (animTimer) clearTimeout(animTimer)
  if (import.meta.client) {
    window.removeEventListener('resize', checkMobileViewport)
    document.documentElement.classList.remove('ova-modal-locked')
    document.body.classList.remove('ova-modal-locked')
  }
})

const handleCreateNode = (payload: Omit<SimNode, 'id' | 'x' | 'y'>) => {
  const idx = nodes.value.length
  const defaultX = payload.kind === 'root' ? 210 : 35 + (idx % 3) * 205
  const defaultY = payload.kind === 'root' ? 14 : payload.kind === 'decision' ? 132 : 248

  nodes.value.push({
    ...payload,
    id: `node_${idCounter++}`,
    x: defaultX,
    y: defaultY
  })
}

const handleUpdatePos = ({ id, x, y }: { id: string; x: number; y: number }) => {
  const target = nodes.value.find(n => n.id === id)
  if (target) {
    target.x = x
    target.y = y
  }
}

const handleRemoveNode = (id: string) => {
  nodes.value = nodes.value.filter(n => n.id !== id)
  edges.value = edges.value.filter(e => e.fromNodeId !== id && e.toNodeId !== id)
}

const handleConnectNodes = ({
  fromNodeId,
  branch,
  toNodeId
}: {
  fromNodeId: string
  branch: 'no' | 'yes'
  toNodeId: string
}) => {
  edges.value = edges.value.filter(e => !(e.fromNodeId === fromNodeId && e.branch === branch))
  edges.value.push({
    id: `edge_${fromNodeId}_${branch}_${toNodeId}`,
    fromNodeId,
    branch,
    toNodeId
  })
}

const handleRemoveEdge = (edgeId: string) => {
  edges.value = edges.value.filter(e => e.id !== edgeId)
}

const handleClearAll = () => {
  nodes.value = []
  edges.value = []
  nodeSamplesMap.value = {}
  liveTraceBanner.value = ''
  highlightedNodeIds.value = []
  highlightedEdgeIds.value = []
}

const handleLoadStarter = () => {
  nodes.value = [
    { id: 'n_root', kind: 'root', feature: 'lluvia_mm', threshold: 40, x: 210, y: 12 },
    { id: 'n_dec', kind: 'decision', feature: 'nivel_rio_m', threshold: 4.0, x: 350, y: 132 },
    { id: 'n_leaf1', kind: 'leaf', predictedClass: 'Calma', x: 30, y: 145 },
    { id: 'n_leaf2', kind: 'leaf', predictedClass: 'Vigilancia', x: 195, y: 255 },
    { id: 'n_leaf3', kind: 'leaf', predictedClass: 'Inundación', x: 430, y: 255 }
  ]
  edges.value = []
  nodeSamplesMap.value = {}
  liveTraceBanner.value = ''
}

// Entrenamiento Dinámico Paso a Paso: hace viajar cada municipio por el árbol iluminando nodos y ramas
const handleTrainAndTest = () => {
  const report = executeCustomTree(nodes.value, edges.value)
  executionReport.value = report

  if (!report.validStructure) {
    recordSimulatorAttempt({
      validStructure: false,
      errorMsg: report.errorMsg,
      passed: false
    })
    modalMode.value = 'report'
    return
  }

  isTrainingLive.value = true
  nodeSamplesMap.value = {}
  let idx = 0

  const stepNextRow = () => {
    if (idx < report.rowResults.length) {
      const trace = report.rowResults[idx]!
      highlightedNodeIds.value = trace.visitedNodeIds
      highlightedEdgeIds.value = trace.visitedEdgeIds
      liveTraceBanner.value = `Entrenando ${trace.row.id} (${trace.row.municipio}): ${trace.stepByStepWhy}`

      // Agrega progresivamente la ficha del municipio a los nodos visitados
      for (const nId of trace.visitedNodeIds) {
        if (!nodeSamplesMap.value[nId]) nodeSamplesMap.value[nId] = []
        nodeSamplesMap.value[nId]!.push(trace.row)
      }

      idx++
      animTimer = setTimeout(stepNextRow, 750)
    } else {
      isTrainingLive.value = false
      highlightedNodeIds.value = []
      highlightedEdgeIds.value = []
      liveTraceBanner.value = `Entrenamiento finalizado: Precisión del ${report.accuracy}% (${report.correctCount}/${report.totalCount} municipios acertados).`
      recordSimulatorAttempt({
        validStructure: true,
        passed: report.passed
      })
      if (report.passed) {
        completeLevel(4)
        markLevelCompleted(4)
      }
      modalMode.value = 'report'
    }
  }

  stepNextRow()
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.simulator-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 14px;
  height: 100%;
  transition: grid-template-columns 0.3s ease;
}

.simulator-grid.creator-collapsed {
  grid-template-columns: 1fr;
}

@media (max-width: 900px) {
  .top-sim-actions {
    width: 100%;
  }

  .simulator-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    height: auto !important;
    overflow: visible !important;
  }
}
</style>
