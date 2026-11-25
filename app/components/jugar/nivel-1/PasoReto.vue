<template>
  <!-- Si aún no ha completado, usa grilla de 2 columnas para que no quede espacio vacío a la derecha -->
  <div v-if="!completed" class="slide-grid">
    <!-- Columna Izquierda: Diferenciador de Pregunta + Título + Opciones -->
    <div class="quiz-slide d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-trophy-award" class="col-watermark" />

      <div class="d-flex flex-wrap align-center justify-space-between gap-2 position-relative z-2">
        <!-- Diferenciador visual de número de pregunta -->
        <div class="question-counter-bar">
          <span>PREGUNTA 1 DE 1</span>
          <span class="q-dot active" />
        </div>
        <span class="step-badge">🏆 Reto Nivel 1</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-2">
          ¡Ayuda al sistema de alerta en Lorica!
        </h3>
        <p class="fluid-slide-p mb-3">
          Mira el reporte meteorológico a la derecha: hoy en Lorica <strong>SÍ llueve fuerte</strong> y el Río Sinú <strong>SÍ subió al borde</strong>. ¿Qué decide el Árbol?
        </p>

        <div class="d-flex flex-column gap-2 mb-2">
          <div
            v-for="(opt, idx) in options"
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
          v-if="selected !== null && !options[selected]?.correct"
          type="warning"
          variant="tonal"
          density="compact"
          rounded="lg"
        >
          Sigue las dos ramas del reporte: ¿Llueve fuerte? <strong>SÍ</strong> → ¿Río al borde? <strong>SÍ</strong>.
        </v-alert>
      </div>

      <div />
    </div>

    <!-- Columna Derecha: Tarjeta visual del caso en Lorica + Mini esquema para que no quede vacío -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between">
        <span class="step-badge">📡 Reporte en vivo: Lorica, Córdoba</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'simulador')"
        >
          Ver árbol completo
        </v-btn>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl my-2">
        <div class="flow-emoji-circle bg-info-soft"><span>⛈️</span></div>
        <div>
          <div class="fluid-flow-title font-weight-bold" style="color: #006496;">
            Pista 1: ¿Llueve fuerte en Córdoba?
          </div>
          <div class="fluid-flow-desc font-weight-bold" style="color: #ba1a1a;">
            Respuesta observada: SÍ (Tormenta intensa)
          </div>
        </div>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl mb-2">
        <div class="flow-emoji-circle bg-error-soft"><span>🌊</span></div>
        <div>
          <div class="fluid-flow-title font-weight-bold" style="color: #93000a;">
            Pista 2: ¿El Río Sinú llegó al borde?
          </div>
          <div class="fluid-flow-desc font-weight-bold" style="color: #ba1a1a;">
            Respuesta observada: SÍ (Nivel en el murallón)
          </div>
        </div>
      </div>

      <svg viewBox="0 0 420 135" class="diagram-svg my-auto" @click="$emit('zoom', 'simulador')">
        <path d="M90 65 L210 65 L325 65" stroke="#ba1a1a" stroke-width="5" stroke-dasharray="6 4" fill="none" />
        <rect x="15" y="38" width="115" height="54" rx="12" fill="#006496" />
        <text x="72" y="62" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">¿Llueve fuerte?</text>
        <text x="72" y="79" text-anchor="middle" fill="#ffc21c" font-size="11" font-weight="bold">SÍ →</text>

        <rect x="152" y="38" width="115" height="54" rx="12" fill="#006496" />
        <text x="210" y="62" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">¿Río al borde?</text>
        <text x="210" y="79" text-anchor="middle" fill="#ffc21c" font-size="11" font-weight="bold">SÍ →</text>

        <rect x="290" y="34" width="115" height="62" rx="14" fill="#fff8e1" stroke="#ba1a1a" stroke-width="3" />
        <text x="347" y="62" text-anchor="middle" fill="#93000a" font-size="16" font-weight="bold">❓</text>
        <text x="347" y="82" text-anchor="middle" fill="#93000a" font-size="10" font-weight="bold">Tu decisión</text>
      </svg>
    </div>
  </div>

  <!-- Celebración al completar -->
  <div v-else class="quiz-slide d-flex flex-column justify-center pa-6 rounded-xl h-100 text-center">
    <div class="celebration-emoji mb-3">🎉🌳🏆</div>
    <h3 class="fluid-slide-title font-weight-bold mb-3">
      ¡Excelente! Entendiste cómo funciona un Árbol de Decisión
    </h3>
    <p class="fluid-slide-p mx-auto mb-5" style="max-width: 620px;">
      Tu barra de progreso subió al <strong>20%</strong> y acabas de desbloquear el <strong>Nivel 2 (Explorar)</strong>, donde conoceremos las partes del árbol: Raíz, Nodos y Hojas.
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
        Ir al Mapa de Niveles (Nivel 2 Desbloqueado)
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'zoom', type: 'simulador'): void
  (e: 'finish'): void
}>()

const { completeLevel } = useUserSession()
const { recordQuizAttempt, markLevelCompleted } = usePerformanceTracker()
const selected = ref<number | null>(null)
const completed = ref(false)

const options = [
  { text: '🟢 Río Sinú en Calma (No pasa nada)', correct: false },
  { text: '🟡 Vigilancia Preventiva (Porque no está lloviendo)', correct: false },
  { text: '🔴 ¡Alerta de Inundación! (Porque SÍ llueve fuerte y SÍ subió el río)', correct: true }
]

const choose = (idx: number) => {
  selected.value = idx
  const chosen = options[idx]
  if (chosen) {
    recordQuizAttempt({
      level: 1,
      topic: 'Lectura de ramas y decisión en Lorica',
      questionTitle: '¡Ayuda al sistema de alerta en Lorica!',
      selectedText: chosen.text,
      isCorrect: chosen.correct,
      conceptHint: 'Seguir cada condición en orden (¿llueve fuerte? SÍ -> ¿río al borde? SÍ) lleva a la hoja correcta.'
    })
  }
  if (chosen?.correct) {
    completeLevel(1)
    markLevelCompleted(1)
    completed.value = true
  }
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>


