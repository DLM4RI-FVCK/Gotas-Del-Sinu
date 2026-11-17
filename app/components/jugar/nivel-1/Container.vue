<template>
  <div class="nivel-wrap position-relative d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Barra superior del Nivel 1 -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-3 flex-shrink-0">
      <div class="d-flex align-center gap-3">
        <v-btn
          variant="tonal"
          color="primary"
          size="small"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-arrow-left"
          @click="$emit('back-to-map')"
        >
          Niveles
        </v-btn>

        <div>
          <span class="level-tag">🌳 Nivel 1 · Fase 1: Enganchar</span>
          <h2 class="top-level-title font-weight-bold">
            ¿Qué es un Árbol de Decisión (Decision Tree)?
          </h2>
        </div>
      </div>

      <div class="d-flex flex-wrap align-center gap-2">
        <v-chip
          v-for="(s, idx) in stepsInfo"
          :key="s.short"
          size="small"
          :color="currentSlide === idx ? 'primary' : (currentSlide > idx ? 'success' : 'default')"
          :variant="currentSlide === idx ? 'flat' : 'tonal'"
          class="font-weight-bold cursor-pointer"
          @click="currentSlide = idx"
        >
          {{ s.emoji }} {{ idx + 1 }}. {{ s.short }}
        </v-chip>
      </div>
    </div>

    <!-- Subcomponentes modulares del Nivel 1 -->
    <div class="slide-stage flex-1-1 min-h-0">
      <JugarNivel1PasoAnalogia
        v-if="currentSlide === 0"
        @zoom="inPageModal = $event"
      />
      <JugarNivel1PasoParaQueSirve
        v-else-if="currentSlide === 1"
        @zoom="inPageModal = $event"
      />
      <JugarNivel1PasoSimulador
        v-else-if="currentSlide === 2"
        v-model="activeScenario"
        :scenarios="sinuScenarios"
        @zoom="inPageModal = $event"
      />
      <JugarNivel1PasoReto
        v-else-if="currentSlide === 3"
        @zoom="inPageModal = $event"
        @finish="$emit('back-to-map')"
      />
    </div>

    <!-- Pie de navegación -->
    <div class="d-flex align-center justify-space-between pt-3 mt-2 border-t flex-shrink-0" style="padding-right: 170px;">
      <v-btn
        variant="tonal"
        color="primary"
        rounded="lg"
        class="text-none font-weight-bold"
        prepend-icon="mdi-arrow-left"
        :disabled="currentSlide === 0"
        @click="currentSlide--"
      >
        Anterior
      </v-btn>

      <span class="text-caption font-weight-bold" style="color: #4b6375;">
        Paso {{ currentSlide + 1 }} de 4
      </span>

      <v-btn
        v-if="currentSlide < 3"
        color="primary"
        variant="flat"
        rounded="lg"
        class="text-none font-weight-bold"
        append-icon="mdi-arrow-right"
        @click="currentSlide++"
      >
        Siguiente
      </v-btn>
      <div v-else />
    </div>

    <!-- Dialog interno ampliado -->
    <JugarNivel1DialogAmpliado
      :modal-type="inPageModal"
      v-model:active-scenario="activeScenario"
      :scenarios="sinuScenarios"
      @close="inPageModal = null"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'back-to-map'): void
}>()

const currentSlide = ref(0)
const activeScenario = ref(0)
const inPageModal = ref<'analogia' | 'flujo' | 'simulador' | null>(null)

const { setContext } = useZenuitoContext()

watch(currentSlide, (slideIdx) => {
  const steps = [
    'Paso 1: Analogía inicial del Árbol de Decisión con la vida cotidiana y el Río Sinú.',
    'Paso 2: ¿Para qué sirve un Árbol de Decisión en ciencia de datos y prevención de emergencias?',
    'Paso 3: Simulador interactivo del Río Sinú (probar días soleados vs lluvias fuertes en Montería).',
    'Paso 4: Mini-Reto evaluativo: "¡Ayuda al sistema de alerta en Lorica!". Reporte meteorológico: hoy en Lorica SÍ llueve fuerte y el Río Sinú SÍ subió al borde. Pregunta: ¿Qué decide el Árbol? Opciones: 🔴 ¡Alerta de Inundación! vs 🟡 Vigilancia vs 🟢 En calma.'
  ]
  setContext({
    seccion: 'Misión 1: Introducción',
    nivelActual: 1,
    fase5E: 'Engage (Paso ' + (slideIdx + 1) + ')',
    descripcionVisual: steps[slideIdx] || 'Explorando el Nivel 1'
  })
}, { immediate: true })

const stepsInfo = [
  { short: 'Analogía', emoji: '💡' },
  { short: '¿Para qué sirve?', emoji: '🎯' },
  { short: 'Simulador Sinú', emoji: '⚡' },
  { short: 'Mini-Reto', emoji: '🏆' }
]

const sinuScenarios = [
  {
    label: '1. Día soleado en Montería',
    icon: 'mdi-weather-sunny',
    color: 'success',
    explanation: 'Como NO está lloviendo fuerte, el árbol toma la primera rama de la izquierda y concluye de inmediato: 🟢 Río Sinú en Calma.'
  },
  {
    label: '2. Lluvia fuerte + Río bajo',
    icon: 'mdi-weather-rainy',
    color: 'warning',
    explanation: 'Como SÍ llueve fuerte, baja a la segunda pregunta. Como el río NO ha subido al borde, toma la rama amarilla: 🟡 Vigilancia Preventiva.'
  },
  {
    label: '3. Lluvia fuerte + Río al borde',
    icon: 'mdi-weather-lightning-rainy',
    color: 'error',
    explanation: 'Como SÍ llueve fuerte y el río SÍ llegó al borde de la orilla, el árbol llega a la decisión crítica: 🔴 ¡Alerta de Inundación!'
  }
]
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



