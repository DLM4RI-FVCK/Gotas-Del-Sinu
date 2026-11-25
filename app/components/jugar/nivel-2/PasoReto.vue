<template>
  <!-- Grilla de 2 columnas con diferenciador claro de "PREGUNTA X DE 2" y panel visual derecho -->
  <div v-if="!completed" class="slide-grid">
    <!-- Columna Izquierda: Contador diferenciado + Título separado + Opciones -->
    <div class="quiz-slide d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-leaf-circle-outline" class="col-watermark" />

      <div class="d-flex flex-wrap align-center justify-space-between gap-2 position-relative z-2">
        <!-- Diferenciador claro de Pregunta 1 de 2 -->
        <div class="question-counter-bar">
          <span>PREGUNTA {{ currentQ + 1 }} DE {{ questions.length }}</span>
          <span
            v-for="(_, i) in questions"
            :key="i"
            class="q-dot"
            :class="{ active: i === currentQ, done: i < currentQ }"
          />
        </div>

        <span class="step-badge">🏆 Reto Nivel 2</span>
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

    <!-- Columna Derecha: Mapa visual señalando la pieza exacta por la que pregunta el reto -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between">
        <span class="step-badge">🗺️ Pieza señalada en el Árbol</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'explorador')"
        >
          Repasar partes
        </v-btn>
      </div>

      <svg viewBox="0 0 460 250" class="diagram-svg my-auto" @click="$emit('zoom', 'explorador')">
        <path d="M230 62 L120 140 M230 62 L340 140 M340 176 L265 228 M340 176 L405 228" stroke="#90a4ae" stroke-width="3.5" fill="none" />

        <!-- Nodo Superior (Señalado en Pregunta 1) -->
        <rect
          x="105"
          y="12"
          width="250"
          height="50"
          rx="14"
          :fill="currentQ === 0 ? '#006496' : '#e2efff'"
          :stroke="currentQ === 0 ? '#ffc21c' : '#90a4ae'"
          :stroke-width="currentQ === 0 ? 4 : 2"
        />
        <text x="230" y="34" text-anchor="middle" :fill="currentQ === 0 ? '#fff' : '#001e31'" font-size="12" font-weight="bold">
          {{ currentQ === 0 ? '❓ ¿CÓMO SE LLAMA ESTA CAJA?' : '¿Está lloviendo fuerte?' }}
        </text>
        <text x="230" y="51" text-anchor="middle" :fill="currentQ === 0 ? '#ffc21c' : '#4b6375'" font-size="10.5" font-weight="bold">
          (Primera caja arriba del todo)
        </text>

        <!-- Nodo Intermedio -->
        <rect x="245" y="132" width="190" height="44" rx="12" fill="#f0f7ff" stroke="#90a4ae" stroke-width="2" />
        <text x="340" y="158" text-anchor="middle" fill="#001e31" font-size="11.5" font-weight="bold">
          ¿Subió el Río Sinú?
        </text>

        <!-- Nodos Inferiores (Señalados en Pregunta 2) -->
        <rect
          x="20"
          y="136"
          width="190"
          height="48"
          rx="12"
          :fill="currentQ === 1 ? '#76b82a' : '#eef9e3'"
          :stroke="currentQ === 1 ? '#ffc21c' : '#76b82a'"
          :stroke-width="currentQ === 1 ? 4 : 2"
        />
        <text x="115" y="164" text-anchor="middle" :fill="currentQ === 1 ? '#fff' : '#3d6a00'" font-size="12" font-weight="bold">
          {{ currentQ === 1 ? '❓ ¿QUÉ NODOS SON?' : '🟢 Río en Calma' }}
        </text>

        <rect
          x="195"
          y="206"
          width="125"
          height="38"
          rx="10"
          :fill="currentQ === 1 ? '#76b82a' : '#eef9e3'"
          :stroke="currentQ === 1 ? '#ffc21c' : '#76b82a'"
          :stroke-width="currentQ === 1 ? 4 : 2"
        />
        <text x="257" y="229" text-anchor="middle" :fill="currentQ === 1 ? '#fff' : '#3d6a00'" font-size="11" font-weight="bold">
          {{ currentQ === 1 ? '❓ NODO FINAL' : '🟡 Vigilancia' }}
        </text>

        <rect
          x="335"
          y="206"
          width="115"
          height="38"
          rx="10"
          :fill="currentQ === 1 ? '#76b82a' : '#eef9e3'"
          :stroke="currentQ === 1 ? '#ffc21c' : '#76b82a'"
          :stroke-width="currentQ === 1 ? 4 : 2"
        />
        <text x="392" y="229" text-anchor="middle" :fill="currentQ === 1 ? '#fff' : '#3d6a00'" font-size="11" font-weight="bold">
          {{ currentQ === 1 ? '❓ NODO FINAL' : '🔴 ¡Alerta!' }}
        </text>
      </svg>

      <div class="visual-caption text-center w-100 pa-3 rounded-xl">
        <span v-if="currentQ === 0">
          🔎 Observa la caja azul resaltada <strong>arriba del todo</strong>: de ahí salen las primeras ramas.
        </span>
        <span v-else>
          🔎 Observa las cajas verdes resaltadas <strong>al final de cada camino</strong>: ya no hacen más preguntas.
        </span>
      </div>
    </div>
  </div>

  <!-- Celebración al completar -->
  <div v-else class="quiz-slide d-flex flex-column justify-center pa-6 rounded-xl h-100 text-center">
    <div class="celebration-emoji mb-3">🌿👑🍃</div>
    <h3 class="fluid-slide-title font-weight-bold mb-3">
      ¡Nivel 2 Superado! Ya dominas la anatomía del Árbol
    </h3>
    <p class="fluid-slide-p mx-auto mb-5" style="max-width: 620px;">
      Tu barra de progreso subió al <strong>40%</strong> y desbloqueaste el <strong>Nivel 3 (Explicar)</strong>, donde veremos cómo aprende la computadora a partir de los datos de Córdoba.
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
        Volver al Mapa de Niveles (Nivel 3 Desbloqueado)
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'zoom', type: 'explorador'): void
  (e: 'finish'): void
}>()

const { completeLevel } = useUserSession()
const { recordQuizAttempt, markLevelCompleted } = usePerformanceTracker()

const currentQ = ref(0)
const selected = ref<number | null>(null)
const completed = ref(false)

const questions = [
  {
    category: 'Identificación de Estructura · Parte Superior',
    title: 'El inicio del árbol en el Río Sinú',
    prompt: 'Mira el esquema de la derecha. La primera caja de arriba del todo ("¿Está lloviendo fuerte?") es donde nace todo el recorrido. ¿Cómo se llama esa primera caja?',
    hint: 'Recuerda: aunque está arriba del todo, es de donde nace el árbol entero.',
    options: [
      { text: '🍃 Nodo Hoja (Leaf Node)', correct: false },
      { text: '👑 Nodo Raíz (Root Node)', correct: true },
      { text: '🔀 Rama final', correct: false }
    ]
  },
  {
    category: 'Identificación de Estructura · Parte Inferior',
    title: 'La decisión final para la comunidad',
    prompt: 'Ahora mira las cajas verdes resaltadas abajo en el esquema ("Río en Calma", "Vigilancia", "¡Alerta!"). ¿Cómo se llaman esos nodos donde termina el árbol?',
    hint: 'Son los extremos finales de las ramas donde ya no se hacen más preguntas.',
    options: [
      { text: '🍃 Nodos Hoja (Leaf Nodes), porque dan el resultado final', correct: true },
      { text: '👑 Nodos Raíz, porque hacen más preguntas', correct: false },
      { text: '📏 Condiciones de entrada', correct: false }
    ]
  }
]

const choose = (idx: number) => {
  selected.value = idx
  const current = questions[currentQ.value]
  const chosen = current?.options[idx]
  if (current && chosen) {
    recordQuizAttempt({
      level: 2,
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
      completeLevel(2)
      markLevelCompleted(2)
      completed.value = true
    }
  }
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>


