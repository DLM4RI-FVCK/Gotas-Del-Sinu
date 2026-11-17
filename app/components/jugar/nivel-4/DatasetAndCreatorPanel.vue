<template>
  <div class="creator-panel d-flex flex-column justify-space-between pa-4 rounded-xl">
    <!-- SECCIÓN 1: TABLA DE DATOS DE ENTRENAMIENTO DE CÓRDOBA -->
    <div class="dataset-section mb-3">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="step-badge">📊 1. Datos de Córdoba (Entrenamiento)</span>
        <v-btn
          size="x-small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('open-modal', 'dataset')"
        >
          Ampliar datos
        </v-btn>
      </div>

      <div class="mini-dataset rounded-xl overflow-hidden" @click="$emit('open-modal', 'dataset')">
        <div class="mini-row mini-head font-weight-bold">
          <span>Caso</span>
          <span>Lluvia</span>
          <span>Río Sinú</span>
          <span>Viento</span>
          <span>Real</span>
        </div>
        <div v-for="r in cordobaDataset" :key="r.id" class="mini-row">
          <span class="font-weight-bold">{{ r.id }} ({{ r.municipio }})</span>
          <span>{{ r.lluvia_mm }} mm</span>
          <span>{{ r.nivel_rio_m }} m</span>
          <span>{{ r.viento_kmh }} km/h</span>
          <span class="font-weight-bold">{{ r.emoji }} {{ r.realClass }}</span>
        </div>
      </div>
    </div>

    <!-- SECCIÓN 2: CREADOR LIBRE DE NODOS Y HOJAS -->
    <div class="node-factory pa-3 rounded-xl flex-1-1 d-flex flex-column justify-space-between">
      <div>
        <div class="d-flex align-center justify-space-between mb-2">
          <span class="step-badge">🛠️ 2. Crea tus propios Nodos</span>
          <v-btn
            size="x-small"
            color="info"
            variant="text"
            class="text-none font-weight-bold"
            prepend-icon="mdi-help-circle-outline"
            @click="$emit('open-modal', 'guide')"
          >
            ¿Cómo funciona?
          </v-btn>
        </div>

        <!-- Selector de tipo de nodo a crear -->
        <div class="d-flex gap-1 mb-3">
          <v-btn
            v-for="t in nodeTypes"
            :key="t.value"
            size="small"
            rounded="lg"
            :color="selectedKind === t.value ? t.color : 'default'"
            :variant="selectedKind === t.value ? 'flat' : 'tonal'"
            class="flex-1-1 text-none font-weight-bold px-2"
            @click="selectedKind = t.value"
          >
            {{ t.emoji }} {{ t.label }}
          </v-btn>
        </div>

        <!-- Configuración si es Nodo Raíz o Nodo de Decisión (Pregunta) -->
        <template v-if="selectedKind === 'root' || selectedKind === 'decision'">
          <div class="field-caption mb-1">Elige la variable de los datos para preguntar:</div>
          <div class="d-flex flex-wrap gap-1 mb-3">
            <v-chip
              v-for="(meta, key) in featureMeta"
              :key="key"
              size="small"
              :color="selectedFeature === key ? 'primary' : 'default'"
              :variant="selectedFeature === key ? 'flat' : 'tonal'"
              class="font-weight-bold cursor-pointer"
              @click="selectFeature(key as FeatureKey)"
            >
              {{ meta.label }} ({{ meta.unit }})
            </v-chip>
          </div>

          <div class="d-flex align-center justify-space-between mb-1">
            <span class="field-caption">Condición de corte (Regla SÍ / NO):</span>
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
          <div class="field-caption mb-2">Elige la decisión final que entregará esta Hoja:</div>
          <div class="d-flex flex-column gap-2 mb-2">
            <div
              v-for="leafOpt in leafClasses"
              :key="leafOpt.value"
              class="leaf-choice pa-2 px-3 rounded-lg d-flex align-center justify-space-between cursor-pointer"
              :class="{ active: selectedLeafClass === leafOpt.value }"
              @click="selectedLeafClass = leafOpt.value"
            >
              <span class="font-weight-bold text-body-2">{{ leafOpt.emoji }} {{ leafOpt.value }}</span>
              <v-icon v-if="selectedLeafClass === leafOpt.value" icon="mdi-check-circle" color="primary" size="18" />
            </div>
          </div>
        </template>
      </div>

      <!-- Botón para lanzar el nodo creado al lienzo libre -->
      <v-btn
        color="primary"
        variant="flat"
        block
        rounded="lg"
        class="text-none font-weight-bold mt-2"
        prepend-icon="mdi-plus-box-outline"
        @click="spawnNode"
      >
        Agregar {{ currentTypeLabel }} al Lienzo
      </v-btn>
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

const emit = defineEmits<{
  (e: 'create-node', payload: Omit<SimNode, 'id' | 'x' | 'y'>): void
  (e: 'open-modal', mode: 'dataset' | 'guide'): void
}>()

const selectedKind = ref<'root' | 'decision' | 'leaf'>('root')
const selectedFeature = ref<FeatureKey>('lluvia_mm')
const selectedThreshold = ref<number>(40)
const selectedLeafClass = ref<TargetClass>('Calma')

const nodeTypes: { value: 'root' | 'decision' | 'leaf'; label: string; emoji: string; color: string }[] = [
  { value: 'root', label: 'Raíz', emoji: '👑', color: 'primary' },
  { value: 'decision', label: 'Decisión', emoji: '🔍', color: 'info' },
  { value: 'leaf', label: 'Hoja', emoji: '🍃', color: 'secondary' }
]

const leafClasses: { value: TargetClass; emoji: string }[] = [
  { value: 'Calma', emoji: '🟢' },
  { value: 'Vigilancia', emoji: '🟡' },
  { value: 'Inundación', emoji: '🔴' }
]

const currentTypeLabel = computed(() => {
  if (selectedKind.value === 'root') return '👑 Nodo Raíz'
  if (selectedKind.value === 'decision') return '🔍 Nodo Decisión'
  return `🍃 Hoja (${selectedLeafClass.value})`
})

const selectFeature = (key: FeatureKey) => {
  selectedFeature.value = key
  selectedThreshold.value = featureMeta[key].defaultVal
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
    if (selectedKind.value === 'root') {
      selectedKind.value = 'decision'
    }
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

.mini-dataset {
  border: 1.5px solid #cbdceb;
  background-color: #ffffff;
  cursor: pointer;
}

.mini-row {
  display: grid;
  grid-template-columns: 1.35fr 0.8fr 0.8fr 0.8fr 1.1fr;
  padding: 5px 8px;
  font-size: 0.72rem;
  border-bottom: 1px solid #eef4fa;
  align-items: center;
}

.mini-row:last-child {
  border-bottom: none;
}

.mini-head {
  background-color: #006496;
  color: #ffffff;
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
  padding: 2px 8px;
  border-radius: 6px;
  background-color: #e2efff;
  color: #006496;
  font-size: 0.75rem;
  font-weight: 800;
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

.gap-1 {
  gap: 6px;
}
</style>

