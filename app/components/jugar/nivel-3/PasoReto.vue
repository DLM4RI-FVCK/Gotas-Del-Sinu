<template>
  <!-- Grilla de 2 columnas con diferenciador claro de "PREGUNTA X DE 2" y panel visual derecho -->
  <div v-if="!completed" class="slide-grid">
    <!-- Columna Izquierda -->
    <div class="quiz-slide d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-brain" class="col-watermark" />

      <div class="d-flex flex-wrap align-center justify-space-between gap-2 position-relative z-2">
        <div class="question-counter-bar">
          <span>PREGUNTA {{ currentQ + 1 }} DE {{ questions.length }}</span>
          <span
            v-for="(_, i) in questions"
            :key="i"
            class="q-dot"
            :class="{ active: i === currentQ, done: i < currentQ }"
          />
        </div>

        <span class="step-badge">🏆 Reto Nivel 3</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <div class="text-caption font-weight-bold text-primary text-uppercase mb-1">
          {{ questions[currentQ]?.category }}
        </div>
        <h3 class="fluid-slide-title font-weight-bold mb-2">
          {{ questions[currentQ]?.title }}
        </h3>
        <p class="fluid-slide-p mb-3">
          {{ questions[currentQ]?.prompt }}
        </p>

        <div class="d-flex flex-column gap-2 mb-2">
          <div
            v-for="(opt, idx) in questions[currentQ]?.options"
            :key="opt.text"
            class="quiz-option-card pa-3 pa-sm-4 rounded-xl d-flex align-center justify-space-between"
            :class="{ 'is-wrong': selected === idx && !opt.correct }"
            @click="choose(idx)"
          >
            <span class="fluid-quiz-opt font-weight-bold">{{ opt.text }}</span>
            <v-icon icon="mdi-chevron-right" color="primary" />
          </div>
        </div>

        <v-alert
          v-if="selected !== null && !questions[currentQ]?.options[selected]?.correct"
          type="warning"
          variant="tonal"
          density="compact"
          rounded="lg"
        >
          {{ questions[currentQ]?.hint }}
        </v-alert>
      </div>

      <div />
    </div>

    <!-- Columna Derecha: Apoyo visual contextual de cada pregunta para que no quede espacio vacío -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between">
        <span class="step-badge">
          {{ currentQ === 0 ? '📊 Pista Visual: Aprendizaje' : '⚖️ Pista Visual: Comparación de Nodos' }}
        </span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', currentQ === 0 ? 'datos' : 'entrenamiento')"
        >
          Ampliar pista
        </v-btn>
      </div>

      <!-- Visual para Pregunta 1 -->
      <div v-if="currentQ === 0" class="my-auto d-flex flex-column gap-3">
        <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
          <div class="flow-emoji-circle bg-info-soft"><span>📋</span></div>
          <div>
            <div class="fluid-flow-title font-weight-bold" style="color: #006496;">
              1. Ejemplos Reales del Pasado
            </div>
            <div class="fluid-flow-desc">
              Registros de lluvias y niveles del Río Sinú en años anteriores en Córdoba.
            </div>
          </div>
        </div>

        <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
          <div class="flow-emoji-circle bg-secondary-soft"><span>🧠</span></div>
          <div>
            <div class="fluid-flow-title font-weight-bold" style="color: #3d6a00;">
              2. Descubrimiento de Patrones
            </div>
            <div class="fluid-flow-desc">
              La computadora compara qué condiciones se repitieron antes de cada inundación.
            </div>
          </div>
        </div>
      </div>

      <!-- Visual para Pregunta 2 -->
      <div v-else class="my-auto d-flex flex-column gap-3">
        <div class="flow-card pa-3 rounded-xl" style="border-color: #ffc21c;">
          <div class="fluid-flow-title font-weight-bold mb-1" style="color: #795900;">
            Opción A: "¿Hizo brisa en la mañana?"
          </div>
          <div class="fluid-flow-desc">
            Deja mezclados los días: <strong>🟢🟢🔴</strong> de un lado y <strong>🟢🟢🔴</strong> del otro.
          </div>
        </div>

        <div class="flow-card pa-3 rounded-xl" style="border-color: #76b82a; background: #f5fcf0;">
          <div class="fluid-flow-title font-weight-bold mb-1" style="color: #3d6a00;">
            Opción B: "¿Llovió fuerte y subió el río?"
          </div>
          <div class="fluid-flow-desc">
            Separa limpio: <strong>🟢🟢🟢🟢 (Calma)</strong> de un lado y <strong>🔴🔴 (Inundación)</strong> del otro.
          </div>
        </div>
      </div>

      <div class="visual-caption text-center w-100 pa-3 rounded-xl">
        <span v-if="currentQ === 0">
          💡 Sin recuerdos o datos históricos, la máquina no sabría qué preguntar.
        </span>
        <span v-else>
          💡 El mejor nodo siempre es el que separa los colores sin dejarlos revueltos.
        </span>
      </div>
    </div>
  </div>

  <!-- Celebración al completar el Nivel 3 -->
  <div v-else class="quiz-slide d-flex flex-column justify-center pa-6 rounded-xl h-100 text-center">
    <div class="celebration-emoji mb-3">🧠📊🏆</div>
    <h3 class="fluid-slide-title font-weight-bold mb-3">
      ¡Nivel 3 Completado! Ya sabes cómo aprende la máquina
    </h3>
    <p class="fluid-slide-p mx-auto mb-5" style="max-width: 620px;">
      Tu barra de progreso subió al <strong>60%</strong> y desbloqueaste el <strong>Nivel 4 (Elaborar)</strong>, donde construirás tu propio Árbol de Alerta para Córdoba.
    </p>
    <div>
      <v-btn
        color="primary"
        size="x-large"
        rounded="xl"
        class="text-none font-weight-bold finish-level-btn"
        prepend-icon="mdi-map-marker-path"
        @click="$emit('finish')"
      >
        Volver al Mapa de Niveles (Nivel 4 Desbloqueado)
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'zoom', type: 'datos' | 'entrenamiento'): void
  (e: 'finish'): void
}>()

const { completeLevel } = useUserSession()
const { recordQuizAttempt, markLevelCompleted } = usePerformanceTracker()

const currentQ = ref(0)
const selected = ref<number | null>(null)
const completed = ref(false)

const questions = [
  {
    category: 'Entrenamiento del Modelo · Concepto Clave',
    title: '¿Qué necesita la computadora para aprender?',
    prompt: 'Para que la computadora aprenda por sí sola a construir un Árbol de Decisión sobre inundaciones en Córdoba, ¿qué debemos darle primero?',
    hint: 'Piensa en la bitácora de recuerdos del abuelo ribereño.',
    options: [
      { text: '📋 Datos históricos (ejemplos de días pasados con sus lluvias y resultados)', correct: true },
      { text: '🎲 Un dado para que elija respuestas al azar sin mirar el río', correct: false },
      { text: '🎨 Solo colores bonitos sin ninguna información del clima', correct: false }
    ]
  },
  {
    category: 'Selección de Nodos · Pureza de Grupos',
    title: '¿Cuál pregunta elige el Árbol de Decisión?',
    prompt: 'Mira la comparación a la derecha. La computadora debe elegir la mejor pregunta para su Nodo Raíz. ¿Cuál de las dos preguntas elegirá?',
    hint: 'Busca la pregunta que deje los puntos verdes (🟢) de un lado y los rojos (🔴) del otro sin mezclarlos.',
    options: [
      { text: '❌ La que deja los días de calma (🟢) y de inundación (🔴) todos revueltos', correct: false },
      { text: '✅ La que separa limpio los días en calma (🟢🟢🟢🟢) de los días de inundación (🔴🔴)', correct: true },
      { text: '🤷 Cualquiera de las dos, porque no importa si quedan mezclados', correct: false }
    ]
  }
]

const choose = (idx: number) => {
  selected.value = idx
  const current = questions[currentQ.value]
  const chosen = current?.options[idx]
  if (current && chosen) {
    recordQuizAttempt({
      level: 3,
      topic: current.category,
      questionTitle: current.title,
      selectedText: chosen.text,
      isCorrect: chosen.correct,
      conceptHint: current.hint
    })
  }
  if (chosen?.correct) {
    if (currentQ.value < questions.length - 1) {
      currentQ.value += 1
      selected.value = null
    } else {
      completeLevel(3)
      markLevelCompleted(3)
      completed.value = true
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



