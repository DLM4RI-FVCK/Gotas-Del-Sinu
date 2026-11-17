<template>
  <div class="graph-studio d-flex flex-column justify-space-between pa-3 pa-sm-4 rounded-xl">
    <!-- Barra superior del Lienzo con controles de Ampliar/Desampliar Panel, Zoom y Entrenamiento -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-2">
      <div class="d-flex flex-wrap align-center gap-2">
        <!-- Botón para Ocultar / Mostrar el panel izquierdo y darle más espacio al lienzo -->
        <v-btn
          size="small"
          color="primary"
          :variant="isCreatorCollapsed ? 'flat' : 'tonal'"
          rounded="lg"
          class="text-none font-weight-bold"
          :prepend-icon="isCreatorCollapsed ? 'mdi-dock-left' : 'mdi-arrow-collapse-left'"
          @click="$emit('toggle-creator')"
        >
          {{ isCreatorCollapsed ? 'Mostrar Creador y Datos' : 'Ampliar Lienzo' }}
        </v-btn>

        <!-- Controles de Zoom del Lienzo (para adaptarse a cualquier pantalla de PC) -->
        <div class="zoom-pill d-flex align-center gap-1 px-2 py-1 rounded-lg">
          <v-btn
            icon="mdi-minus"
            size="x-small"
            variant="text"
            color="primary"
            title="Alejar lienzo (Ver más espacio)"
            :disabled="canvasZoom <= 0.65"
            @click="changeZoom(-0.1)"
          />
          <span class="zoom-text font-weight-bold" @click="canvasZoom = 1">
            {{ Math.round(canvasZoom * 100) }}%
          </span>
          <v-btn
            icon="mdi-plus"
            size="x-small"
            variant="text"
            color="primary"
            title="Acercar lienzo"
            :disabled="canvasZoom >= 1.25"
            @click="changeZoom(0.1)"
          />
        </div>

        <v-chip
          v-if="pendingConnection"
          color="warning"
          variant="flat"
          size="small"
          class="font-weight-bold"
        >
          🔌 Haz clic en "● Entrada" del nodo destino ({{ pendingConnection.branch.toUpperCase() }})
          <v-icon icon="mdi-close-circle" end size="16" @click.stop="pendingConnection = null" />
        </v-chip>
      </div>

      <div class="d-flex flex-wrap align-center gap-2">
        <v-btn
          size="x-small"
          color="info"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-auto-fix"
          @click="$emit('load-starter')"
        >
          Nodos ejemplo
        </v-btn>

        <v-btn
          size="x-small"
          color="error"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-delete-sweep-outline"
          :disabled="nodes.length === 0 || isTrainingLive"
          @click="$emit('clear-all')"
        >
          Vaciar
        </v-btn>

        <v-btn
          size="small"
          color="success"
          variant="flat"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-play-network-outline"
          :loading="isTrainingLive"
          :disabled="nodes.length === 0"
          @click="$emit('train-and-test')"
        >
          ⚡ Entrenar Árbol en Vivo
        </v-btn>
      </div>
    </div>

    <!-- Banner de Narración en Vivo durante el entrenamiento dinámico -->
    <v-expand-transition>
      <div v-if="liveTraceBanner" class="live-training-banner pa-2 px-3 mb-2 rounded-lg d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-2">
          <v-progress-circular v-if="isTrainingLive" indeterminate size="18" width="2" color="primary" />
          <v-icon v-else icon="mdi-check-decagram" color="success" size="20" />
          <span class="text-caption font-weight-bold" style="color: #001e31;">
            {{ liveTraceBanner }}
          </span>
        </div>
        <v-btn
          v-if="!isTrainingLive"
          size="x-small"
          color="primary"
          variant="flat"
          rounded="lg"
          class="text-none font-weight-bold"
          @click="$emit('open-report')"
        >
          Ver explicación completa
        </v-btn>
      </div>
    </v-expand-transition>

    <!-- LIENZO INTERACTIVO LIBRE CON SOPORTE DE ZOOM ESCALABLE -->
    <div
      ref="canvasRef"
      class="free-canvas position-relative flex-1-1 rounded-xl"
      @pointermove="onCanvasPointerMove"
      @pointerup="onCanvasPointerUp"
      @pointerleave="onCanvasPointerUp"
    >
      <div
        v-if="nodes.length === 0"
        class="empty-canvas-guide d-flex flex-column align-center justify-center text-center pa-6"
      >
        <div class="text-h3 mb-2">🌳🛠️</div>
        <h3 class="text-h6 font-weight-bold mb-1" style="color: #001e31;">
          Construye tu Árbol de Decisión con libertad total
        </h3>
        <p class="text-body-2 mb-3" style="color: #4b6375; max-width: 480px;">
          Crea tus nodos a la izquierda, <strong>arrástralos por el tablero</strong>, conecta sus ramas <strong>NO / SÍ</strong> y pulsa <strong>⚡ Entrenar Árbol en Vivo</strong> para ver cómo viajan los datos de Córdoba. Si tu pantalla es pequeña, usa <strong>Ampliar Lienzo</strong> o el zoom <strong>(-)</strong>.
        </p>
      </div>

      <!-- Contenedor interno escalable según el Zoom -->
      <div
        class="zoom-layer"
        :style="{
          transform: `scale(${canvasZoom})`,
          width: `${100 / canvasZoom}%`,
          height: `${100 / canvasZoom}%`
        }"
      >
        <!-- CAPA SVG DE CABLES / RAMAS -->
        <svg class="edges-svg">
          <g v-for="edge in renderedEdges" :key="edge.id">
            <path
              :d="edge.path"
              :stroke="highlightedEdgeIds.includes(edge.id) ? '#ffc21c' : (edge.branch === 'no' ? '#76b82a' : '#006496')"
              :stroke-width="highlightedEdgeIds.includes(edge.id) ? 7 : 4"
              fill="none"
              stroke-linecap="round"
            />

            <g
              class="edge-badge cursor-pointer"
              :transform="`translate(${edge.midX}, ${edge.midY})`"
              title="Haz clic para desconectar esta rama"
              @click.stop="$emit('remove-edge', edge.id)"
            >
              <rect
                x="-28"
                y="-11"
                width="56"
                height="22"
                rx="11"
                :fill="edge.branch === 'no' ? '#3d6a00' : '#006496'"
              />
              <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">
                {{ edge.branch === 'no' ? 'NO ✕' : 'SÍ ✕' }}
              </text>
            </g>
          </g>
        </svg>

        <!-- NODOS ARRASTRABLES -->
        <div
          v-for="node in nodes"
          :key="node.id"
          class="graph-node"
          :class="[
            `kind-${node.kind}`,
            {
              'is-dragging': draggingNodeId === node.id,
              'is-active-trace': highlightedNodeIds.includes(node.id)
            }
          ]"
          :style="{ left: `${node.x}px`, top: `${node.y}px` }"
          @pointerdown="startDragNode($event, node)"
        >
          <!-- PUERTO SUPERIOR DE ENTRADA -->
          <button
            v-if="node.kind !== 'root'"
            type="button"
            class="port-in"
            :class="{ 'port-highlight': !!pendingConnection && pendingConnection.fromNodeId !== node.id }"
            @pointerdown.stop
            @click.stop="completeConnection(node.id)"
          >
            ● Entrada
          </button>

          <div class="d-flex align-center justify-space-between gap-2 mb-1">
            <span class="node-kind-badge">
              {{
                node.kind === 'root'
                  ? '👑 Nodo Raíz'
                  : node.kind === 'decision'
                    ? '🔍 Nodo Decisión'
                    : '🍃 Nodo Hoja'
              }}
            </span>
            <button
              type="button"
              class="node-del-btn"
              title="Eliminar nodo"
              @pointerdown.stop
              @click.stop="$emit('remove-node', node.id)"
            >
              ✕
            </button>
          </div>

          <div v-if="node.kind === 'root' || node.kind === 'decision'" class="node-title font-weight-bold">
            ¿{{ featureLabel(node.feature) }} > {{ node.threshold }}{{ featureUnit(node.feature) }}?
          </div>
          <div v-else class="node-title font-weight-bold">
            {{ leafEmoji(node.predictedClass) }} {{ node.predictedClass }}
          </div>

          <!-- Datos de Córdoba que pasaron por este nodo -->
          <div v-if="nodeSamplesMap[node.id]?.length" class="node-samples d-flex flex-wrap gap-1 mt-1">
            <span
              v-for="row in nodeSamplesMap[node.id]"
              :key="row.id"
              class="sample-chip"
              :title="`${row.municipio}: Lluvia ${row.lluvia_mm}mm, Río ${row.nivel_rio_m}m`"
            >
              {{ row.emoji }}{{ row.id }}
            </span>
          </div>

          <!-- PUERTOS INFERIORES DE SALIDA -->
          <div
            v-if="node.kind === 'root' || node.kind === 'decision'"
            class="ports-out-row d-flex justify-space-between mt-2 pt-1"
          >
            <button
              type="button"
              class="port-out port-no"
              :class="{
                active: pendingConnection?.fromNodeId === node.id && pendingConnection?.branch === 'no'
              }"
              @pointerdown.stop
              @click.stop="startConnection(node.id, 'no')"
            >
              Rama NO (≤) ●
            </button>

            <button
              type="button"
              class="port-out port-yes"
              :class="{
                active: pendingConnection?.fromNodeId === node.id && pendingConnection?.branch === 'yes'
              }"
              @pointerdown.stop
              @click.stop="startConnection(node.id, 'yes')"
            >
              Rama SÍ (>) ●
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pie -->
    <div class="canvas-footer d-flex align-center justify-space-between pa-2 px-3 rounded-lg mt-2" style="margin-right: 155px;">
      <span class="text-caption font-weight-bold" style="color: #006496;">
        💡 Usa <strong>Ampliar Lienzo</strong> o el Zoom <strong>(- / +)</strong> si necesitas más espacio para acomodar tus nodos.
      </span>
      <span class="text-caption font-weight-bold" style="color: #3d6a00;">
        Nodos: {{ nodes.length }} · Ramas: {{ edges.length }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  featureMeta,
  type CordobaDataRow,
  type FeatureKey,
  type SimEdge,
  type SimNode,
  type TargetClass
} from '~/utils/nivel4Builder'

const { setContext } = useZenuitoContext()

const props = defineProps<{
  nodes: SimNode[]
  edges: SimEdge[]
  nodeSamplesMap: Record<string, CordobaDataRow[]>
  isCreatorCollapsed: boolean
  isTrainingLive: boolean
  liveTraceBanner: string
  highlightedNodeIds: string[]
  highlightedEdgeIds: string[]
}>()

// Sincronizar telemetría detallada del lienzo del Nivel 4 con Zenuito
watch(() => [props.nodes.length, props.edges.length, props.isTrainingLive, props.liveTraceBanner], () => {
  const rootCount = props.nodes.filter(n => n.kind === 'root').length
  const decisionCount = props.nodes.filter(n => n.kind === 'decision').length
  const leafCount = props.nodes.filter(n => n.kind === 'leaf').length
  
  setContext({
    seccion: 'Misión 4: Constructor Libre',
    nivelActual: 4,
    fase5E: props.isTrainingLive ? 'Elaborar (Simulación de Entrenamiento)' : 'Elaborar (Construcción del Árbol)',
    descripcionVisual: `El alumno tiene en el lienzo ${props.nodes.length} nodos (${rootCount} Raíz, ${decisionCount} Decisión, ${leafCount} Hojas) y ${props.edges.length} ramas conectadas.${props.liveTraceBanner ? ' Estado en pantalla: ' + props.liveTraceBanner : ''}`,
    metricasEnPantalla: {
      totalNodos: props.nodes.length,
      totalRamas: props.edges.length,
      entrenando: props.isTrainingLive,
      mensajeRastreo: props.liveTraceBanner || 'En diseño'
    }
  })
}, { immediate: true })

const emit = defineEmits<{
  (e: 'toggle-creator'): void
  (e: 'update-node-pos', payload: { id: string; x: number; y: number }): void
  (e: 'remove-node', id: string): void
  (e: 'connect-nodes', payload: { fromNodeId: string; branch: 'no' | 'yes'; toNodeId: string }): void
  (e: 'remove-edge', id: string): void
  (e: 'clear-all'): void
  (e: 'load-starter'): void
  (e: 'train-and-test'): void
  (e: 'open-report'): void
}>()

const canvasRef = ref<HTMLElement | null>(null)
const canvasZoom = ref(0.88) // Inicia ligeramente alejado para que en cualquier PC quepan cómodamente todos los nodos
const draggingNodeId = ref<string | null>(null)
const dragOffset = reactive({ x: 0, y: 0 })

const pendingConnection = ref<{ fromNodeId: string; branch: 'no' | 'yes' } | null>(null)

const NODE_WIDTH = 205
const NODE_HEIGHT = 96

const changeZoom = (delta: number) => {
  const next = Math.round((canvasZoom.value + delta) * 100) / 100
  canvasZoom.value = Math.min(1.25, Math.max(0.65, next))
}

const featureLabel = (f?: FeatureKey) => featureMeta[f || 'lluvia_mm'].label
const featureUnit = (f?: FeatureKey) => featureMeta[f || 'lluvia_mm'].unit

const leafEmoji = (c?: TargetClass) => {
  if (c === 'Calma') return '🟢'
  if (c === 'Vigilancia') return '🟡'
  return '🔴'
}

const startDragNode = (event: PointerEvent, node: SimNode) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  draggingNodeId.value = node.id
  const pointerXInZoom = (event.clientX - rect.left) / canvasZoom.value
  const pointerYInZoom = (event.clientY - rect.top) / canvasZoom.value
  dragOffset.x = pointerXInZoom - node.x
  dragOffset.y = pointerYInZoom - node.y
}

const onCanvasPointerMove = (event: PointerEvent) => {
  if (!draggingNodeId.value || !canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const virtualWidth = rect.width / canvasZoom.value
  const virtualHeight = rect.height / canvasZoom.value
  const pointerXInZoom = (event.clientX - rect.left) / canvasZoom.value
  const pointerYInZoom = (event.clientY - rect.top) / canvasZoom.value

  const maxX = Math.max(20, virtualWidth - NODE_WIDTH - 10)
  const maxY = Math.max(20, virtualHeight - NODE_HEIGHT - 10)
  const newX = Math.min(maxX, Math.max(8, pointerXInZoom - dragOffset.x))
  const newY = Math.min(maxY, Math.max(8, pointerYInZoom - dragOffset.y))
  emit('update-node-pos', { id: draggingNodeId.value, x: newX, y: newY })
}

const onCanvasPointerUp = () => {
  draggingNodeId.value = null
}

const startConnection = (fromNodeId: string, branch: 'no' | 'yes') => {
  if (
    pendingConnection.value?.fromNodeId === fromNodeId &&
    pendingConnection.value?.branch === branch
  ) {
    pendingConnection.value = null
  } else {
    pendingConnection.value = { fromNodeId, branch }
  }
}

const completeConnection = (toNodeId: string) => {
  if (!pendingConnection.value) return
  if (pendingConnection.value.fromNodeId === toNodeId) return
  emit('connect-nodes', {
    fromNodeId: pendingConnection.value.fromNodeId,
    branch: pendingConnection.value.branch,
    toNodeId
  })
  pendingConnection.value = null
}

const renderedEdges = computed(() => {
  return props.edges
    .map(e => {
      const from = props.nodes.find(n => n.id === e.fromNodeId)
      const to = props.nodes.find(n => n.id === e.toNodeId)
      if (!from || !to) return null

      const startX = e.branch === 'no' ? from.x + 48 : from.x + NODE_WIDTH - 48
      const startY = from.y + NODE_HEIGHT
      const endX = to.x + NODE_WIDTH / 2
      const endY = to.y

      const ctrlY = (startY + endY) / 2
      const path = `M ${startX} ${startY} C ${startX} ${ctrlY}, ${endX} ${ctrlY}, ${endX} ${endY}`

      return {
        id: e.id,
        branch: e.branch,
        path,
        midX: (startX + endX) / 2,
        midY: (startY + endY) / 2
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
})
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.graph-studio {
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  height: 100%;
  overflow: hidden;
}

.zoom-pill {
  background-color: #f0f7ff;
  border: 1px solid #cbdceb;
}

.zoom-text {
  font-size: 0.76rem;
  color: #006496;
  min-width: 40px;
  text-align: center;
  cursor: pointer;
}

.live-training-banner {
  background: linear-gradient(90deg, #fff8e1 0%, #e8f4ff 100%);
  border: 2px solid #ffc21c;
}

.free-canvas {
  background:
    radial-gradient(#cbdceb 1.3px, transparent 1.3px),
    linear-gradient(180deg, #f9fcff 0%, #eff6ff 100%);
  background-size: 20px 20px, 100% 100%;
  border: 2px solid #c2d8ec;
  overflow: hidden;
  user-select: none;
  touch-action: none;
}

.zoom-layer {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
}

.empty-canvas-guide {
  position: relative;
  z-index: 3;
  height: 100%;
  width: 100%;
}

.edges-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.edge-badge {
  pointer-events: auto;
}

.graph-node {
  position: absolute;
  width: 205px;
  min-height: 92px;
  padding: 10px 12px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 2.5px solid #006496;
  box-shadow: 0 8px 22px rgba(0, 50, 79, 0.12);
  cursor: grab;
  z-index: 5;
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.graph-node.is-dragging {
  cursor: grabbing;
  z-index: 15;
  box-shadow: 0 16px 34px rgba(0, 50, 79, 0.24);
}

.graph-node.is-active-trace {
  border-color: #ffc21c !important;
  box-shadow: 0 0 0 5px rgba(255, 194, 28, 0.45), 0 12px 26px rgba(0, 100, 150, 0.25) !important;
  transform: scale(1.04);
}

.graph-node.kind-root {
  border-color: #006496;
  background: linear-gradient(145deg, #ffffff 0%, #e8f4ff 100%);
}

.graph-node.kind-decision {
  border-color: #129fea;
  background: linear-gradient(145deg, #ffffff 0%, #f2faff 100%);
}

.graph-node.kind-leaf {
  border-color: #76b82a;
  background: linear-gradient(145deg, #ffffff 0%, #f4fce8 100%);
}

.node-kind-badge {
  font-size: 0.68rem;
  font-weight: 800;
  color: #006496;
  text-transform: uppercase;
}

.node-del-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgba(186, 26, 26, 0.12);
  color: #ba1a1a;
  font-size: 0.68rem;
  font-weight: 800;
  cursor: pointer;
}

.node-title {
  font-size: 0.82rem;
  color: #001e31;
  line-height: 1.25;
}

.sample-chip {
  font-size: 0.66rem;
  font-weight: 800;
  padding: 1px 5px;
  border-radius: 6px;
  background-color: #ffffff;
  border: 1px solid #cbdceb;
}

.port-in {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 10px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 2px solid #006496;
  color: #006496;
  font-size: 0.66rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.18s ease;
}

.port-in.port-highlight {
  background-color: #ffc21c;
  border-color: #001e31;
  color: #001e31;
  transform: translateX(-50%) scale(1.14);
  box-shadow: 0 0 0 4px rgba(255, 194, 28, 0.35);
}

.ports-out-row {
  border-top: 1px dashed #cbdceb;
}

.port-out {
  padding: 3px 8px;
  border-radius: 8px;
  font-size: 0.68rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
}

.port-no {
  background-color: #eef9e3;
  color: #3d6a00;
  border: 1.5px solid #76b82a;
}

.port-yes {
  background-color: #e2efff;
  color: #006496;
  border: 1.5px solid #006496;
}

.port-out.active {
  background-color: #ffc21c;
  color: #001e31;
  border-color: #001e31;
  transform: scale(1.08);
}

.canvas-footer {
  background-color: #f0f7ff;
  border: 1px solid #d7e3ee;
}

.gap-1 {
  gap: 4px;
}
</style>
