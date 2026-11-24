<template>
  <div
    class="creator-panel d-flex flex-column justify-space-between pa-3 pa-sm-4 rounded-xl"
    :class="{
      'is-top-deployed-creator': compactWindowMode,
      'is-dataset-only': onlyDatasetMode
    }"
  >
    <!-- SECCIÓN 1: TABLA DE DATOS DE ENTRENAMIENTO DE CÓRDOBA -->
    <div v-if="!compactWindowMode" class="dataset-section" :class="{ 'mb-3': !onlyDatasetMode }">
      <div class="dataset-top-header d-flex align-center justify-space-between mb-2">
        <span class="step-badge">📊 1. Datos de Córdoba (Entrenamiento)</span>
        <v-btn
          size="x-small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold ampliar-datos-btn"
          prepend-icon="mdi-fullscreen"
          @click="$emit('open-modal', 'dataset')"
        >
          Ampliar datos
        </v-btn>
      </div>

      <!-- Tabla con overflow horizontal responsive y columna Real alineada a la izquierda en 1 sola línea -->
      <div class="mini-dataset rounded-xl" @click="$emit('open-modal', 'dataset')">
        <table class="sim-org-table">
          <thead>
            <tr>
              <th class="text-left">Caso</th>
              <th class="text-left">Lluvia</th>
              <th class="text-left">Río Sinú</th>
              <th class="text-left">Viento</th>
              <th class="text-left">Real</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in cordobaDataset" :key="r.id">
              <td class="font-weight-bold text-left cell-nowrap">{{ r.id }} ({{ r.municipio }})</td>
              <td class="text-left cell-nowrap">{{ r.lluvia_mm }} mm</td>
              <td class="text-left cell-nowrap">{{ r.nivel_rio_m }} m</td>
              <td class="text-left cell-nowrap">{{ r.viento_kmh }} km/h</td>
              <td class="text-left cell-nowrap">
                <span class="real-inline-badge" :class="`real-${r.realClass}`">
                  <span>{{ r.emoji }}</span>
                  <span>{{ r.realClass }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SECCIÓN 2: CREADOR Y CONFIGURACIÓN DE NODOS Y HOJAS (Sin botón Guía extra) -->
    <div v-if="!onlyDatasetMode" class="node-factory pa-3 rounded-xl flex-1-1 d-flex flex-column justify-space-between">
      <div>
        <div class="creator-top-header d-flex align-center justify-center mb-2">
          <span class="step-badge text-center w-100">
            🛠️ Configura y Agrega Nodos
          </span>
        </div>

        <!-- Selector de tipo de nodo (Botones nativos adaptativos que nunca se rompen en Raíz / Decisión / Hoja) -->
        <div class="node-kind-grid mb-2">
          <button
            v-for="t in nodeTypes"
            :key="t.value"
            type="button"
            class="kind-select-btn"
            :class="[`kind-btn-${t.value}`, { active: selectedKind === t.value }]"
            @click="selectedKind = t.value"
          >
            <span>{{ t.emoji }}</span>
            <span>{{ t.label }}</span>
          </button>
        </div>

        <!-- Configuración si es Nodo Raíz o Nodo de Decisión (Pregunta) -->
        <template v-if="selectedKind === 'root' || selectedKind === 'decision'">
          <div class="field-caption mb-1">Variable climática a preguntar:</div>
          <div class="feature-Selector-grid mb-2">
            <button
              v-for="(meta, key) in featureMeta"
              :key="key"
              type="button"
              class="feature-pill-btn"
              :class="{ active: selectedFeature === key }"
              @click="selectFeature(key as FeatureKey)"
            >
              {{ meta.label }} ({{ meta.unit }})
            </button>
          </div>

          <div class="rule-condition-box mb-1">
            <span class="field-caption">Umbral (SÍ / NO):</span>
            <span class="rule-preview-badge">
              ¿{{ featureMeta[selectedFeature].label }} > {{ selectedThreshold }} {{ featureMeta[selectedFeature].unit }}?
            </span>
          </div>

          <v-slider
            v-model="selectedThreshold"
            :min="featureMeta[selectedFeature].min"
            :max="featureMeta[selectedFeature].max"
            :step="featureMeta[selectedFeature].step"
            density="compact"
            color="primary"
            hide-details
            class="mb-2"
          />
        </template>

        <!-- Configuración si es Nodo Hoja (Decisión final) -->
        <template v-else>
          <div class="field-caption mb-1">Decisión final de esta Hoja:</div>
          <div class="leaf-choices-grid mb-2">
            <div
              v-for="leafOpt in leafClasses"
              :key="leafOpt.value"
              class="leaf-choice pa-2 px-3 rounded-lg d-flex align-center justify-space-between cursor-pointer"
              :class="[
                leafChoiceClass(leafOpt.value),
                { active: selectedLeafClass === leafOpt.value }
              ]"
              :aria-label="`Decisión final: ${leafOpt.value}`"
              :title="leafOpt.value"
              @click="selectedLeafClass = leafOpt.value"
            >
              <span class="leaf-choice-label font-weight-bold text-body-2">
                <span class="leaf-choice-label-full">{{ leafOpt.emoji }} {{ leafOpt.value }}</span>
                <span class="leaf-choice-label-short">{{ leafOpt.emoji }} {{ shortLeafLabel(leafOpt.value) }}</span>
              </span>
              <v-icon v-if="selectedLeafClass === leafOpt.value" icon="mdi-check-circle" color="primary" size="16" />
            </div>
          </div>
        </template>
      </div>

      <!-- Bloque final de configuración con botones cortos y 100% adaptativos -->
      <div class="creator-actions-footer mt-1">
        <button
          type="button"
          class="sim-Responsive-btn btn-primary-add w-100"
          @click="spawnNode"
        >
          <v-icon icon="mdi-plus-box-outline" size="18" />
          <span>{{ shortAddButtonText }}</span>
        </button>

        <!-- En versión vertical de celular: Ejemplo, Vaciar y Entrenar Árbol compactos al final de la configuración -->
        <div v-if="showMobileActionsInCreator" class="mobile-creator-extra-actions mt-2">
          <div class="mobile-quick-pair">
            <button
              type="button"
              class="sim-Responsive-btn btn-info-soft"
              @click="$emit('load-starter')"
            >
              <v-icon icon="mdi-auto-fix" size="16" />
              <span>Ejemplo</span>
            </button>

            <button
              type="button"
              class="sim-Responsive-btn btn-error-soft"
              :disabled="nodesCount === 0 || isTrainingLive"
              @click="$emit('clear-all')"
            >
              <v-icon icon="mdi-delete-sweep-outline" size="16" />
              <span>Vaciar</span>
            </button>
          </div>

          <button
            type="button"
            class="sim-Responsive-btn btn-success-train w-100 mt-2"
            :disabled="nodesCount === 0 || isTrainingLive"
            @click="$emit('train-and-test')"
          >
            <v-progress-circular v-if="isTrainingLive" indeterminate size="16" width="2" color="white" />
            <v-icon v-else icon="mdi-play-circle" size="18" />
            <span>⚡ Entrenar Árbol</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  cordobaDataset,
  featureMeta,
  type FeatureKey,
  type SimNode,
  type TargetClass
} from '~/utils/nivel4Builder'

withDefaults(defineProps<{
  compactWindowMode?: boolean
  onlyDatasetMode?: boolean
  showMobileActionsInCreator?: boolean
  nodesCount?: number
  edgesCount?: number
  isTrainingLive?: boolean
}>(), {
  compactWindowMode: false,
  onlyDatasetMode: false,
  showMobileActionsInCreator: false,
  nodesCount: 0,
  edgesCount: 0,
  isTrainingLive: false
})

const emit = defineEmits<{
  (e: 'create-node', payload: Omit<SimNode, 'id' | 'x' | 'y'>): void
  (e: 'open-modal', mode: 'dataset' | 'guide'): void
  (e: 'load-starter'): void
  (e: 'clear-all'): void
  (e: 'train-and-test'): void
}>()

const selectedKind = ref<'root' | 'decision' | 'leaf'>('root')
const selectedFeature = ref<FeatureKey>('lluvia_mm')
const selectedThreshold = ref<number>(40)
const selectedLeafClass = ref<TargetClass>('Calma')

const nodeTypes: { value: 'root' | 'decision' | 'leaf'; label: string; emoji: string }[] = [
  { value: 'root', label: 'Raíz', emoji: '👑' },
  { value: 'decision', label: 'Decisión', emoji: '🔍' },
  { value: 'leaf', label: 'Hoja', emoji: '🍃' }
]

const leafClasses: { value: TargetClass; emoji: string }[] = [
  { value: 'Calma', emoji: '🟢' },
  { value: 'Vigilancia', emoji: '🟡' },
  { value: 'Inundación', emoji: '🔴' }
]

const shortAddButtonText = computed(() => {
  if (selectedKind.value === 'root') return 'Agregar Raíz'
  if (selectedKind.value === 'decision') return 'Agregar Decisión'
  return `Agregar Hoja`
})

const shortLeafLabel = (value: TargetClass) => {
  if (value === 'Vigilancia') return 'Vigila'
  if (value === 'Inundación') return 'Inunda'
  return value
}

const leafChoiceClass = (value: TargetClass) => {
  if (value === 'Calma') return 'leaf-choice-calm'
  if (value === 'Vigilancia') return 'leaf-choice-watch'
  return 'leaf-choice-flood'
}

const selectFeature = (f: FeatureKey) => {
  selectedFeature.value = f
  selectedThreshold.value = featureMeta[f].defaultThreshold
}

const spawnNode = () => {
  if (selectedKind.value === 'leaf') {
    emit('create-node', {
      kind: 'leaf',
      predictedClass: selectedLeafClass.value
    })
  } else {
    emit('create-node', {
      kind: selectedKind.value,
      feature: selectedFeature.value,
      threshold: selectedThreshold.value
    })
  }
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.creator-panel {
  background-color: #f7f9ff;
  border: 2px solid #d7e3ee;
  height: 100%;
  overflow-y: auto;
}

.creator-panel.is-top-deployed-creator {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  height: auto !important;
  overflow: visible !important;
}

/* Grilla 3 columnas para Raíz / Decisión / Hoja sin romperse jamás */
.node-kind-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.kind-select-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.76rem;
  font-weight: 800;
  background-color: #f0f7ff;
  color: #001e31;
  border: 1.5px solid #cbdceb;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.kind-select-btn.kind-btn-root.active {
  background-color: #006496;
  color: #ffffff;
  border-color: #006496;
}

.kind-select-btn.kind-btn-decision.active {
  background-color: #129fea;
  color: #ffffff;
  border-color: #129fea;
}

.kind-select-btn.kind-btn-leaf.active {
  background-color: #3d6a00;
  color: #ffffff;
  border-color: #3d6a00;
}

.feature-Selector-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feature-pill-btn {
  flex: 1 1 auto;
  padding: 5px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 800;
  background-color: #f0f7ff;
  color: #006496;
  border: 1.5px solid #cbdceb;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
  white-space: nowrap;
}

.feature-pill-btn.active {
  background-color: #006496;
  color: #ffffff;
  border-color: #006496;
}

.rule-condition-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
}

/* Tabla con overflow horizontal garantizado y estado Real alineado a la izquierda */
.mini-dataset {
  border: 1.5px solid #cbdceb;
  background-color: #ffffff;
  cursor: pointer;
  width: 100%;
  max-width: 100%;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch;
  display: block;
}

.sim-org-table {
  width: 100%;
  min-width: 340px;
  border-collapse: collapse;
}

.sim-org-table thead tr {
  background-color: #006496;
  color: #ffffff;
}

.sim-org-table th {
  padding: 6px 8px;
  font-size: 0.72rem;
  font-weight: 800;
  text-align: left !important;
  white-space: nowrap !important;
}

.sim-org-table td {
  padding: 6px 8px;
  font-size: 0.72rem;
  border-bottom: 1px solid #eef4fa;
  color: #001e31;
  text-align: left !important;
  white-space: nowrap !important;
  vertical-align: middle;
}

.sim-org-table tbody tr:last-child td {
  border-bottom: none;
}

.cell-nowrap {
  white-space: nowrap !important;
}

.real-inline-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 4px !important;
  white-space: nowrap !important;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
}

.real-inline-badge.real-Calma {
  background-color: #eef9e3;
  color: #3d6a00;
}

.real-inline-badge.real-Vigilancia {
  background-color: #fff8e1;
  color: #795900;
}

.real-inline-badge.real-Inundación {
  background-color: #ffdad6;
  color: #93000a;
}

.node-factory {
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
}

.field-caption {
  font-size: 0.75rem;
  font-weight: 800;
  color: #3f4851;
}

.rule-preview-badge {
  padding: 3px 10px;
  border-radius: 8px;
  background-color: #e2efff;
  color: #006496;
  font-size: 0.74rem;
  font-weight: 800;
  white-space: nowrap;
}

.leaf-choices-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.leaf-choice {
  border: 1.5px solid #d7e3ee;
  background-color: #f7f9ff;
  transition: all 0.15s ease;
}

.leaf-choice.active {
  border-color: #006496;
  background-color: #e2efff;
}

/* Botones de acción 100% adaptativos que nunca se rompen */
.sim-Responsive-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 800;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.sim-Responsive-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.sim-Responsive-btn:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.btn-primary-add {
  background-color: #006496;
  color: #ffffff;
}

.btn-info-soft {
  background-color: #e2efff;
  color: #006496;
  border: 1px solid #91cdff;
}

.btn-error-soft {
  background-color: #ffdad6;
  color: #93000a;
  border: 1px solid #ffb4ab;
}

.btn-success-train {
  background-color: #3d6a00;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(61, 106, 0, 0.22);
}

.mobile-quick-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

@media (max-width: 900px) {
  .creator-panel {
    height: auto !important;
    overflow: visible !important;
    padding: 12px !important;
  }

  .dataset-top-header {
    flex-direction: column !important;
    align-items: stretch !important;
    gap: 8px !important;
    margin-bottom: 10px !important;
  }

  .dataset-top-header .step-badge {
    display: block !important;
    width: 100% !important;
    text-align: center !important;
    white-space: nowrap !important;
  }

  .ampliar-datos-btn {
    width: 100% !important;
    height: 34px !important;
    font-size: 0.78rem !important;
  }

  .rule-condition-box {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }

  .rule-preview-badge {
    text-align: center;
    display: block;
    width: 100%;
  }

  .leaf-choices-grid {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 6px !important;
  }

  .leaf-choices-grid .leaf-choice {
    justify-content: center !important;
    padding: 8px 4px !important;
    font-size: 0.74rem !important;
  }
}

.leaf-choice-label-short {
  display: none;
}

@media (max-width: 600px) {
  .leaf-choices-grid .leaf-choice {
    min-width: 0;
    gap: 2px;
  }

  .leaf-choice-label {
    min-width: 0;
    font-size: 0.68rem !important;
    line-height: 1.15;
    text-align: center;
  }

  .leaf-choice-label-full {
    display: none;
  }

  .leaf-choice-label-short {
    display: inline;
  }

  .leaf-choices-grid .v-icon {
    flex-shrink: 0;
  }

  .leaf-choice-calm {
    color: #3d6a00;
    border-color: #76b82a;
  }

  .leaf-choice-watch {
    color: #795900;
    border-color: #ffc21c;
  }

  .leaf-choice-flood {
    color: #93000a;
    border-color: #ffb4ab;
  }

  .leaf-choice-calm.active {
    background-color: #eef9e3;
    border-color: #3d6a00;
  }

  .leaf-choice-watch.active {
    background-color: #fff8e1;
    border-color: #b78100;
  }

  .leaf-choice-flood.active {
    background-color: #ffefed;
    border-color: #ba1a1a;
  }
}
</style>
