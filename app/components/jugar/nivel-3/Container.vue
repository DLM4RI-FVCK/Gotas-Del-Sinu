<template>
  <div class="nivel-wrap position-relative d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Barra superior del Nivel 3 -->
    <div class="level-top-bar d-flex flex-wrap align-center justify-space-between gap-2 mb-3 flex-shrink-0">
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
          <span class="level-tag">🧠 Nivel 3 · Fase 3: Explicar</span>
          <h2 class="top-level-title font-weight-bold">
            ¿Cómo Aprende la Máquina con los Datos de Córdoba?
          </h2>
        </div>
      </div>

      <div class="steps-chips-row d-flex align-center gap-2">
        <v-chip
          v-for="(s, idx) in stepsInfo"
          :key="s.short"
          size="small"
          :color="currentSlide === idx ? 'primary' : (currentSlide > idx ? 'success' : 'default')"
          :variant="currentSlide === idx ? 'flat' : 'tonal'"
          class="step-chip-item font-weight-bold cursor-pointer"
          @click="currentSlide = idx"
        >
          {{ s.emoji }} {{ idx + 1 }}. {{ s.short }}
        </v-chip>
      </div>
    </div>

    <!-- Subcomponentes modulares del Nivel 3 -->
    <div class="slide-stage flex-1-1 min-h-0">
      <JugarNivel3PasoDatosHistoricos
        v-if="currentSlide === 0"
        @zoom="inPageModal = $event"
      />
      <JugarNivel3PasoMejorPregunta
        v-else-if="currentSlide === 1"
        @zoom="inPageModal = $event"
      />
      <JugarNivel3PasoSimuladorEntrenamiento
        v-else-if="currentSlide === 2"
        v-model="activeCandidate"
        :candidates="questionCandidates"
        @zoom="inPageModal = $event"
      />
      <JugarNivel3PasoReto
        v-else-if="currentSlide === 3"
        @zoom="inPageModal = $event"
        @finish="$emit('back-to-map')"
      />
    </div>

    <!-- Pie de navegación -->
    <div class="d-flex align-center justify-space-between pt-3 mt-2 border-t flex-shrink-0 nav-footer">
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

      <span class="nav-step-indicator text-caption font-weight-bold" style="color: #4b6375;">
        <span class="step-label-desktop">Paso {{ currentSlide + 1 }} de 4</span>
        <span class="step-label-mobile">Paso {{ currentSlide + 1 }}/4</span>
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
    <JugarNivel3DialogAmpliado
      :modal-type="inPageModal"
      v-model:active-candidate="activeCandidate"
      :candidates="questionCandidates"
      @close="inPageModal = null"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'back-to-map'): void
}>()

const currentSlide = ref(0)
const activeCandidate = ref(0)
const inPageModal = ref<'datos' | 'pureza' | 'entrenamiento' | null>(null)

const { setContext } = useZenuitoContext()

watch(currentSlide, (slideIdx) => {
  const steps = [
    'Paso 1: Datos históricos de Córdoba (tabla con días D1 a D6, lluvia, caudal del Río y resultado).',
    'Paso 2: Pureza y Mezcla (¿Cuál es la mejor pregunta para separar días seguros de días de inundación?).',
    'Paso 3: Simulador de entrenamiento con cálculo de pureza (Gini) de cada rama.',
    'Paso 4: Mini-Reto evaluativo del Nivel 3: Pregunta 1 (Identificar la mejor pregunta que separe los datos sin mezcla) y Pregunta 2 (Cálculo de impureza Gini en nodos puros).'
  ]
  setContext({
    seccion: 'Misión 3: Pureza y Datos',
    nivelActual: 3,
    fase5E: 'Explain (Paso ' + (slideIdx + 1) + ')',
    descripcionVisual: steps[slideIdx] || 'Explorando el Nivel 3'
  })
}, { immediate: true })

const stepsInfo = [
  { short: 'Datos Históricos', emoji: '📒' },
  { short: 'Pureza y Mezcla', emoji: '🎯' },
  { short: 'Entrenar Árbol', emoji: '⚡' },
  { short: 'Reto Nivel 3', emoji: '🏆' }
]

const questionCandidates = [
  {
    short: '1. ¿Hizo brisa suave?',
    emoji: '🍃',
    color: 'warning',
    question: 'Pregunta A: ¿Hizo brisa suave en Córdoba?',
    leftLabel: 'Sin brisa',
    leftDots: '🟢🟢🔴',
    leftStatus: '⚠️ Mezclado (Calma e Inundación juntos)',
    rightLabel: 'Con brisa',
    rightDots: '🟢🟢🔴',
    rightStatus: '⚠️ Mezclado (No separa el peligro)',
    purity: 'Baja pureza',
    verdict: 'Mala pregunta: la brisa no distingue los días seguros de los días de inundación.'
  },
  {
    short: '2. ¿Fue fin de semana?',
    emoji: '📅',
    color: 'warning',
    question: 'Pregunta B: ¿Ocurrió en fin de semana?',
    leftLabel: 'Lunes a Viernes',
    leftDots: '🟢🟢🟢🔴',
    leftStatus: '⚠️ Mezclado (Sigue habiendo peligro oculto)',
    rightLabel: 'Sábado o Domingo',
    rightDots: '🟢🔴',
    rightStatus: '⚠️ Mezclado (Mitad calma, mitad alerta)',
    purity: 'Baja pureza',
    verdict: 'Mala pregunta: el Río Sinú puede crecer cualquier día de la semana.'
  },
  {
    short: '3. ¿Lluvia fuerte + Río al borde?',
    emoji: '🌊',
    color: 'success',
    question: 'Pregunta C: ¿Llovió fuerte Y el Río Sinú subió al borde?',
    leftLabel: 'No ambos',
    leftDots: '🟢🟢🟢🟢',
    leftStatus: '✅ ¡100% Puro! (Todos en Calma)',
    rightLabel: 'Sí ambos',
    rightDots: '🔴🔴',
    rightStatus: '✅ ¡100% Puro! (Todas las Inundaciones)',
    purity: '100% Puro',
    verdict: '¡Pregunta ganadora! La máquina elige esta condición porque separa perfectamente los grupos.'
  }
]
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



