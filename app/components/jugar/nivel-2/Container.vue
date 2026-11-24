<template>
  <div class="nivel-wrap position-relative d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Barra superior del Nivel 2 -->
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
          <span class="level-tag">🌿 Nivel 2 · Fase 2: Explorar</span>
          <h2 class="top-level-title font-weight-bold">
            Conceptos del Árbol: Raíz, Nodos, Ramas y Hojas
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

    <!-- Subcomponentes modulares del Nivel 2 -->
    <div class="slide-stage flex-1-1 min-h-0">
      <JugarNivel2PasoAnatomia
        v-if="currentSlide === 0"
        @zoom="inPageModal = $event"
      />
      <JugarNivel2PasoExploradorNodos
        v-else-if="currentSlide === 1"
        v-model="activePart"
        :parts="treeParts"
        @zoom="inPageModal = $event"
      />
      <JugarNivel2PasoCondiciones
        v-else-if="currentSlide === 2"
      />
      <JugarNivel2PasoReto
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
    <JugarNivel2DialogAmpliado
      :modal-type="inPageModal"
      v-model:active-part="activePart"
      :parts="treeParts"
      @close="inPageModal = null"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'back-to-map'): void
}>()

const currentSlide = ref(0)
const activePart = ref(0)
const inPageModal = ref<'anatomia' | 'explorador' | null>(null)

const { setContext } = useZenuitoContext()

const stepsInfo = [
  { short: 'Las 4 Partes', emoji: '🌿' },
  { short: 'Explorador', emoji: '🔍' },
  { short: 'Condiciones', emoji: '📏' },
  { short: 'Reto Nivel 2', emoji: '🏆' }
]

const treeParts = [
  {
    name: '1. Nodo Raíz (Root)',
    emoji: '👑',
    color: 'primary',
    desc: 'Es el punto de partida arriba del todo. Recibe todos los datos de Córdoba y hace la primera gran pregunta: "¿Llueve fuerte?".'
  },
  {
    name: '2. Ramas (Branches)',
    emoji: '🔀',
    color: 'warning',
    desc: 'Son las flechas conectoras que representan la respuesta ("SÍ" o "NO") y guían hacia el siguiente nodo abajo.'
  },
  {
    name: '3. Nodo de Decisión',
    emoji: '🔍',
    color: 'info',
    desc: 'Está en la mitad del árbol. Cuando saber si llueve no es suficiente, hace una segunda pregunta: "¿Subió el nivel del Río Sinú?".'
  },
  {
    name: '4. Nodos Hoja (Leaves)',
    emoji: '🍃',
    color: 'success',
    desc: 'Son los extremos finales donde termina el árbol. Ya no hacen más preguntas: entregan la alerta o decisión final.'
  }
]

watch([currentSlide, activePart], ([slideIdx, partIdx]) => {
  const steps = [
    'Paso 1: Anatomía del Árbol (Raíz, Ramas, Decisión y Hojas).',
    `Paso 2: Explorador de Nodos interactivo (explorando actualmente: ${treeParts[partIdx]?.name || 'nodo'}).`,
    'Paso 3: Condiciones y Umbrales numéricos con slider de caudal del Río Sinú.',
    'Paso 4: Mini-Reto evaluativo del Nivel 2: Pregunta 1 (Identificar el Nodo Raíz que hace la primera pregunta) y Pregunta 2 (Partición y Ramas SÍ/NO).'
  ]
  setContext({
    seccion: 'Misión 2: Anatomía del Árbol',
    nivelActual: 2,
    fase5E: 'Explore (Paso ' + (slideIdx + 1) + ')',
    descripcionVisual: steps[slideIdx] || 'Explorando el Nivel 2'
  })
}, { immediate: true })
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



