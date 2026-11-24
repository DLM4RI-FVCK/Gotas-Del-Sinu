<template>
  <div class="graph-studio d-flex flex-column justify-space-between pa-3 pa-sm-4 rounded-xl">
    <!-- BARRA DE HERRAMIENTAS DE PC (> 900px) -->
    <div class="studio-toolbar desktop-only-toolbar d-flex flex-wrap align-center justify-space-between gap-2 mb-2 flex-shrink-0">
      <div class="toolbar-left d-flex flex-wrap align-center gap-2">
        <v-btn
          size="small"
          color="primary"
          :variant="isCreatorCollapsed ? 'flat' : 'tonal'"
          rounded="lg"
          class="text-none font-weight-bold"
          :prepend-icon="isCreatorCollapsed ? 'mdi-dock-left' : 'mdi-arrow-collapse-left'"
          @click="$emit('toggle-creator')"
        >
          {{ isCreatorCollapsed ? 'Mostrar Creador' : 'Ampliar Lienzo' }}
        </v-btn>

        <div class="zoom-pill d-flex align-center gap-1 px-2 py-1 rounded-lg">
          <v-btn
            icon="mdi-minus"
            size="x-small"
            variant="text"
            color="primary"
            title="Alejar lienzo"
            :disabled="canvasZoom <= 0.45"
            @click="changeZoom(-0.08)"
          />
          <span class="zoom-text font-weight-bold" title="Restaurar zoom" @click="fitCanvasToViewport">
            {{ Math.round(canvasZoom * 100) }}%
          </span>
          <v-btn
            icon="mdi-plus"
            size="x-small"
            variant="text"
            color="primary"
            title="Acercar lienzo"
            :disabled="canvasZoom >= 1.25"
            @click="changeZoom(0.08)"
          />
          <button
            type="button"
            class="fit-zoom-btn"
            @click="fitCanvasToViewport"
          >
            Enfocar
          </button>
        </div>
      </div>

      <div class="toolbar-right d-flex flex-wrap align-center gap-2">
        <v-btn
          size="small"
          color="info"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-auto-fix"
          @click="handleLoadStarterClick"
        >
          Ejemplo
        </v-btn>

        <v-btn
          size="small"
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
          prepend-icon="mdi-play-circle"
          :loading="isTrainingLive"
          :disabled="nodes.length === 0"
          @click="$emit('train-and-test')"
        >
          ⚡ Entrenar Árbol
        </v-btn>
      </div>
    </div>

    <!-- PARTE 1 (ARRIBA EN CELULAR): Configuración de Nodos, Acciones y Botón de Entrenar Árbol al final de la configuración -->
    <div class="mobile-top-creator-drawer mb-3 flex-shrink-0">
      <slot name="top-creator" :fit-canvas="fitCanvasToViewport" />
    </div>

    <!-- PESTAÑA DEL DIAGRAMA DEL ÁRBOL EN CELULAR CENTRADA CON CONTROLES DE TAMAÑO DE ENFOQUE -->
    <div class="mobile-tree-tab-header mb-2 flex-shrink-0">
      <div class="tree-tab-title-box">
        <span class="tree-tab-badge">🌳 Diagrama del Árbol</span>
        <span class="tree-tab-counters">({{ nodes.length }} nodos · {{ edges.length }} ramas)</span>
      </div>

      <!-- Controles de Tamaño de Enfoque centrados junto a la pestaña del diagrama -->
      <div class="zoom-pill mobile-focus-controls d-flex align-center justify-center gap-1 px-3 py-1 rounded-pill">
        <v-btn
          icon="mdi-minus"
          size="x-small"
          variant="text"
          color="primary"
          title="Alejar enfoque"
          :disabled="canvasZoom <= 0.45"
          @click="changeZoom(-0.08)"
        />
        <span class="zoom-text font-weight-bold" @click="fitCanvasToViewport">
          {{ Math.round(canvasZoom * 100) }}%
        </span>
        <v-btn
          icon="mdi-plus"
          size="x-small"
          variant="text"
          color="primary"
          title="Acercar enfoque"
          :disabled="canvasZoom >= 1.25"
          @click="changeZoom(0.08)"
        />
        <button
          type="button"
          class="fit-zoom-btn"
          title="Centrar y enfocar árbol"
          @click="fitCanvasToViewport"
        >
          Enfocar Diagrama
        </button>
      </div>
    </div>

    <!-- Aviso flotante cuando el usuario está conectando una rama NO / SÍ -->
    <v-expand-transition>
      <div
        v-if="pendingConnection"
        class="connection-active-banner pa-2 px-3 mb-2 rounded-lg d-flex align-center justify-space-between flex-shrink-0"
      >
        <span class="text-caption font-weight-bold" style="color: #795900;">
          🔌 Conectando <strong>Rama {{ pendingConnection.branch.toUpperCase() }}</strong>: ahora toca <strong>"● Entrada"</strong> en el nodo destino.
        </span>
        <v-btn
          size="x-small"
          color="warning"
          variant="flat"
          rounded="pill"
          class="text-none font-weight-bold"
          @click="pendingConnection = null"
        >
          Cancelar
        </v-btn>
      </div>
    </v-expand-transition>

    <!-- Banner de Narración en Vivo durante el entrenamiento dinámico -->
    <v-expand-transition>
      <div v-if="liveTraceBanner" class="live-training-banner pa-2 px-3 mb-2 rounded-lg d-flex flex-wrap align-center justify-space-between gap-2 flex-shrink-0">
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
          Ver explicación
        </v-btn>
      </div>
    </v-expand-transition>

    <!-- PARTE 2 (ABAJO EN CELULAR): PREVISUALIZACIÓN / DIAGRAMA INTERACTIVO DEL ÁRBOL -->
    <div
      ref="canvasRef"
      class="free-canvas position-relative flex-1-1 rounded-xl"
      @pointermove="onCanvasPointerMove"
      @pointerup="onCanvasPointerUp"
      @pointercancel="onCanvasPointerUp"
      @pointerleave="onCanvasPointerUp"
    >
      <div
        v-if="nodes.length === 0"
        class="empty-canvas-guide d-flex flex-column align-center justify-center text-center pa-4 pa-sm-6"
      >
        <div class="text-h3 mb-2">🌳🛠️</div>
        <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold mb-1" style="color: #001e31;">
          Diagrama de tu Árbol de Decisión
        </h3>
        <p class="text-caption text-sm-body-2 mb-3" style="color: #4b6375; max-width: 440px;">
          Agrega tus nodos o pulsa <strong>"Ejemplo"</strong>, conecta sus ramas <strong>NO / SÍ</strong> y pulsa <strong>⚡ Entrenar Árbol</strong>.
        </p>
        <v-btn
          size="small"
          color="info"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-auto-fix"
          @click="handleLoadStarterClick"
        >
          Cargar Ejemplo
        </v-btn>
      </div>

      <!-- Contenedor interno escalable según el Zoom -->
      <div
        class="zoom-layer"
        :style="{
          transform: `scale(${canvasZoom})`,
          width: `${Math.max(660, 100 / canvasZoom)}px`,
          minWidth: `${100 / canvasZoom}%`,
          height: `${Math.max(390, 100 / canvasZoom)}px`,
          minHeight: `${100 / canvasZoom}%`
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
            node.kind === 'leaf' ? leafStatusClass(node.predictedClass) : '',
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
              aria-label="Conectar rama No"
              title="Conectar rama No"
              :class="{
                active: pendingConnection?.fromNodeId === node.id && pendingConnection?.branch === 'no'
              }"
              @pointerdown.stop
              @click.stop="startConnection(node.id, 'no')"
            >
              <span class="port-label-long">Rama NO (≤) ●</span>
              <span class="port-label-short">NO ≤</span>
            </button>

            <button
              type="button"
              class="port-out port-yes"
              aria-label="Conectar rama Sí"
              title="Conectar rama Sí"
              :class="{
                active: pendingConnection?.fromNodeId === node.id && pendingConnection?.branch === 'yes'
              }"
              @pointerdown.stop
              @click.stop="startConnection(node.id, 'yes')"
            >
              <span class="port-label-long">Rama SÍ (&gt;) ●</span>
              <span class="port-label-short">SÍ &gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pie -->
    <div class="canvas-footer d-flex flex-wrap align-center justify-space-between gap-2 pa-2 px-3 rounded-lg mt-2 flex-shrink-0">
      <span class="text-caption font-weight-bold" style="color: #006496;">
        💡 Toca <strong>Rama NO / SÍ</strong> y luego <strong>● Entrada</strong> para unir nodos.
      </span>
      <span class="text-caption font-weight-bold desktop-counter-text" style="color: #3d6a00;">
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
const canvasZoom = ref(0.88)
const draggingNodeId = ref<string | null>(null)
const dragOffset = reactive({ x: 0, y: 0 })

const pendingConnection = ref<{ fromNodeId: string; branch: 'no' | 'yes' } | null>(null)

const NODE_WIDTH = 205
const NODE_HEIGHT = 96
const VIRTUAL_BOARD_WIDTH = 660
const VIRTUAL_BOARD_HEIGHT = 390

const changeZoom = (delta: number) => {
  const next = Math.round((canvasZoom.value + delta) * 100) / 100
  canvasZoom.value = Math.min(1.25, Math.max(0.45, next))
}

const fitCanvasToViewport = () => {
  if (!import.meta.client) return
  if (window.innerWidth > 900) {
    canvasZoom.value = 0.88
    return
  }
  const el = canvasRef.value
  const availW = el ? el.clientWidth : (window.innerWidth - 36)
  const fitted = Math.round((availW / VIRTUAL_BOARD_WIDTH) * 100) / 100
  canvasZoom.value = Math.min(0.88, Math.max(0.48, fitted))
}

const handleLoadStarterClick = async () => {
  emit('load-starter')
  await nextTick()
  if (import.meta.client && window.innerWidth <= 900) {
    fitCanvasToViewport()
  }
}

watch(() => props.nodes.length, async () => {
  await nextTick()
  if (import.meta.client && window.innerWidth <= 900) {
    fitCanvasToViewport()
  }
})

onMounted(() => {
  if (import.meta.client && window.innerWidth <= 900) {
    fitCanvasToViewport()
  }
})

const featureLabel = (f?: FeatureKey) => featureMeta[f || 'lluvia_mm'].label
const featureUnit = (f?: FeatureKey) => featureMeta[f || 'lluvia_mm'].unit

const leafEmoji = (c?: TargetClass) => {
  if (c === 'Calma') return '🟢'
  if (c === 'Vigilancia') return '🟡'
  return '🔴'
}

const leafStatusClass = (c?: TargetClass) => {
  if (c === 'Calma') return 'leaf-calm'
  if (c === 'Vigilancia') return 'leaf-watch'
  return 'leaf-flood'
}

const startDragNode = (event: PointerEvent, node: SimNode) => {
  if (!canvasRef.value) return
  const targetEl = event.currentTarget as HTMLElement | null
  if (targetEl?.setPointerCapture) {
    try {
      targetEl.setPointerCapture(event.pointerId)
    } catch {
      // ignore pointer capture error
    }
  }
  const rect = canvasRef.value.getBoundingClientRect()
  const scrollLeft = canvasRef.value.scrollLeft || 0
  const scrollTop = canvasRef.value.scrollTop || 0
  draggingNodeId.value = node.id
  const pointerXInZoom = (event.clientX - rect.left + scrollLeft) / canvasZoom.value
  const pointerYInZoom = (event.clientY - rect.top + scrollTop) / canvasZoom.value
  dragOffset.x = pointerXInZoom - node.x
  dragOffset.y = pointerYInZoom - node.y
}

const onCanvasPointerMove = (event: PointerEvent) => {
  if (!draggingNodeId.value || !canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const scrollLeft = canvasRef.value.scrollLeft || 0
  const scrollTop = canvasRef.value.scrollTop || 0
  const virtualWidth = Math.max(VIRTUAL_BOARD_WIDTH, rect.width / canvasZoom.value)
  const virtualHeight = Math.max(VIRTUAL_BOARD_HEIGHT, rect.height / canvasZoom.value)
  const pointerXInZoom = (event.clientX - rect.left + scrollLeft) / canvasZoom.value
  const pointerYInZoom = (event.clientY - rect.top + scrollTop) / canvasZoom.value

  const maxX = Math.max(20, virtualWidth - NODE_WIDTH - 8)
  const maxY = Math.max(20, virtualHeight - NODE_HEIGHT - 8)
  const newX = Math.min(maxX, Math.max(6, pointerXInZoom - dragOffset.x))
  const newY = Math.min(maxY, Math.max(6, pointerYInZoom - dragOffset.y))
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

.mobile-top-creator-drawer,
.mobile-tree-tab-header {
  display: none !important;
}

.cell-nowrap {
  white-space: nowrap !important;
}

.zoom-pill {
  background-color: #f0f7ff;
  border: 1px solid #cbdceb;
}

.zoom-text {
  font-size: 0.76rem;
  color: #006496;
  min-width: 38px;
  text-align: center;
  cursor: pointer;
}

.fit-zoom-btn {
  background-color: #006496;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}

.connection-active-banner {
  background-color: #fff8e1;
  border: 2px solid #ffc21c;
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
  min-height: 280px;
}

@media (min-width: 901px) {
  .canvas-footer {
    margin-right: 155px;
  }
}

@media (max-width: 900px) {
  .desktop-only-toolbar,
  .desktop-counter-text {
    display: none !important;
  }

  .mobile-top-creator-drawer {
    display: block !important;
    width: 100%;
  }

  /* Pestaña del Diagrama del Árbol y controles de enfoque 100% centrados en vertical */
  .mobile-tree-tab-header {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 6px !important;
    background-color: #f0f7ff;
    border: 1.5px solid #cbdceb;
    border-radius: 16px;
    padding: 10px 12px;
  }

  .tree-tab-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .tree-tab-badge {
    font-size: 0.82rem;
    font-weight: 800;
    color: #001e31;
    white-space: nowrap;
  }

  .tree-tab-counters {
    font-size: 0.74rem;
    font-weight: 800;
    color: #3d6a00;
    white-space: nowrap;
  }

  .mobile-focus-controls {
    background-color: #ffffff !important;
    border: 1.5px solid #91cdff !important;
    margin: 0 auto !important;
  }

  .graph-studio {
    min-height: 460px;
    height: auto;
    padding: 12px !important;
  }

  .free-canvas {
    min-height: 300px;
    height: 330px;
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x pan-y;
  }

  .canvas-footer {
    margin-right: 0 !important;
  }
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
  touch-action: none;
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
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgba(186, 26, 26, 0.12);
  color: #ba1a1a;
  font-size: 0.72rem;
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
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 12px;
  border-radius: 999px;
  background-color: #ffffff;
  border: 2px solid #006496;
  color: #006496;
  font-size: 0.68rem;
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
  padding: 4px 9px;
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

.port-label-short {
  display: none;
}

.canvas-footer {
  background-color: #f0f7ff;
  border: 1px solid #d7e3ee;
}

.gap-1 {
  gap: 4px;
}

@media (max-width: 600px) {
  .node-kind-badge {
    font-size: 0.62rem;
  }

  .node-title {
    font-size: 0.76rem;
    overflow-wrap: anywhere;
  }

  .graph-node.kind-leaf {
    border-width: 2px;
  }

  .graph-node.kind-leaf.leaf-calm {
    border-color: #3d6a00;
    background: #eef9e3;
  }

  .graph-node.kind-leaf.leaf-watch {
    border-color: #b78100;
    background: #fff8e1;
  }

  .graph-node.kind-leaf.leaf-flood {
    border-color: #ba1a1a;
    background: #ffefed;
  }

  .graph-node.kind-leaf.leaf-calm .node-title {
    color: #3d6a00;
  }

  .graph-node.kind-leaf.leaf-watch .node-title {
    color: #795900;
  }

  .graph-node.kind-leaf.leaf-flood .node-title {
    color: #93000a;
  }

  .port-out {
    max-width: 49%;
    padding: 4px 5px;
    font-size: 0.6rem;
    white-space: nowrap;
  }

  .port-label-long {
    display: none;
  }

  .port-label-short {
    display: inline;
  }
}
</style>
