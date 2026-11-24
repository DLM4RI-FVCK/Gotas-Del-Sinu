<template>
  <div class="levels-map-wrap position-relative d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Encabezado del mapa de niveles -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-3 mb-3 flex-shrink-0">
      <div>
        <span class="map-badge">Machine Learning · Árboles de Decisión</span>
        <h2 class="map-main-title font-weight-bold mt-1">
          Mapa de Niveles (Ruta 5E)
        </h2>
      </div>

      <div class="d-flex flex-wrap align-center gap-2">
        <!-- Botón de Modo Desarrollador (Contraseña 802214) -->
        <v-btn
          size="small"
          :color="allUnlocked ? 'success' : 'warning'"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          :prepend-icon="allUnlocked ? 'mdi-lock-open-check-outline' : 'mdi-key-variant'"
          @click="showDevPrompt = !showDevPrompt"
        >
          {{ allUnlocked ? 'Modo Dev Activo' : 'Desbloquear (Dev)' }}
        </v-btn>

        <v-btn
          size="small"
          variant="tonal"
          color="info"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-replay"
          @click="$emit('replay-intro')"
        >
          Ver rueda 5E
        </v-btn>

        <v-btn
          icon="mdi-close"
          variant="tonal"
          color="primary"
          size="small"
          @click="$emit('close')"
        />
      </div>
    </div>

    <!-- Barra desplegable de contraseña Desarrollador (802214) -->
    <v-expand-transition>
      <div v-if="showDevPrompt" class="dev-unlock-bar d-flex flex-wrap align-center justify-space-between gap-2 pa-3 mb-3 rounded-xl flex-shrink-0">
        <div class="d-flex align-center gap-2">
          <v-icon icon="mdi-shield-key-outline" color="primary" size="22" />
          <span class="text-body-2 font-weight-bold" style="color: #001e31;">
            Versión Desarrollador: Ingresa la clave para desbloquear todos los niveles
          </span>
        </div>

        <form class="d-flex align-center gap-2" @submit.prevent="submitDevPassword">
          <input
            v-model="devPassword"
            type="password"
            placeholder="Contraseña..."
            class="dev-input px-3 py-1 rounded-lg"
          />
          <v-btn
            type="submit"
            size="small"
            color="primary"
            variant="flat"
            rounded="lg"
            class="text-none font-weight-bold"
          >
            Desbloquear
          </v-btn>
          <span v-if="devError" class="text-caption font-weight-bold" style="color: #ba1a1a;">
            Clave incorrecta
          </span>
        </form>
      </div>
    </v-expand-transition>

    <!-- Grilla responsiva de los 5 Niveles (el nivel actual se pone ancho automáticamente) -->
    <div class="levels-grid flex-1-1">
      <div
        v-for="lvl in levels"
        :key="lvl.number"
        class="level-card d-flex flex-column justify-space-between rounded-xl"
        :class="[
          `accent-${lvl.accent}`,
          {
            'is-featured-wide': lvl.number === currentFeaturedLevel,
            'is-unlocked': isUnlocked(lvl.number),
            'is-completed': isCompleted(lvl.number),
            'is-locked': !isUnlocked(lvl.number)
          }
        ]"
        @click="handleSelectLevel(lvl.number)"
      >
        <!-- Marca de agua grande en el fondo -->
        <v-icon :icon="lvl.watermarkIcon" class="level-watermark" />

        <!-- Fila superior: Fase 5E + Badge "Nivel Actual" + Sticker -->
        <div class="d-flex align-center justify-space-between position-relative z-2">
          <div class="d-flex align-center gap-2">
            <span class="phase-pill" :class="{ locked: !isUnlocked(lvl.number) }">
              {{ lvl.phase5E }}
            </span>
            <span v-if="lvl.number === currentFeaturedLevel" class="current-focus-pill">
              🔥 Nivel Actual
            </span>
          </div>

          <div class="level-sticker-circle" :class="{ locked: !isUnlocked(lvl.number) }">
            <span class="sticker-emoji">{{ isUnlocked(lvl.number) ? lvl.emoji : '🔒' }}</span>
          </div>
        </div>

        <!-- Cuerpo central con tipografía fluida que crece con el tamaño del card -->
        <div class="my-auto py-2 position-relative z-2">
          <div class="d-flex align-center gap-2 mb-1">
            <span class="level-num font-weight-bold">
              NIVEL {{ lvl.number }}
            </span>
            <v-icon
              v-if="isCompleted(lvl.number)"
              icon="mdi-check-decagram"
              color="success"
              size="20"
            />
          </div>

          <h3 class="level-title font-weight-bold mb-2">
            {{ lvl.title }}
          </h3>

          <p class="level-desc mb-0">
            {{ lvl.desc }}
          </p>
        </div>

        <!-- Pie interactivo de la card -->
        <div class="d-flex align-center justify-space-between pt-2 level-footer position-relative z-2">
          <span v-if="isCompleted(lvl.number)" class="level-cta font-weight-bold" style="color: #3d6a00;">
            ¡Completado! Repetir
          </span>
          <span v-else-if="isUnlocked(lvl.number)" class="level-cta font-weight-bold text-primary">
            Disponible · Jugar nivel
          </span>
          <span v-else class="level-cta font-weight-medium" style="color: #6f7882;">
            Requiere Nivel {{ lvl.number - 1 }}
          </span>

          <v-icon
            :icon="isUnlocked(lvl.number) ? 'mdi-arrow-right' : 'mdi-lock-outline'"
            class="cta-icon"
            :color="isUnlocked(lvl.number) ? 'primary' : 'grey'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'select-level', levelNumber: number): void
  (e: 'replay-intro'): void
  (e: 'close'): void
}>()

const { session, unlockAllLevels } = useUserSession()

const showDevPrompt = ref(false)
const devPassword = ref('')
const devError = ref(false)

const allUnlocked = computed(() => (session.value.unlockedLevel || 1) >= 5)

// El nivel que se muestra ancho es el nivel actual en el que va el estudiante (1, y cuando pasa el 1 se pone ancho el 2, luego el 3, etc.)
const currentFeaturedLevel = computed(() => {
  return Math.min(5, Math.max(1, session.value.level || 1))
})

const submitDevPassword = () => {
  if (devPassword.value.trim() === '802214') {
    unlockAllLevels()
    devError.value = false
    showDevPrompt.value = false
    devPassword.value = ''
  } else {
    devError.value = true
  }
}

const levels = [
  {
    number: 1,
    phase5E: '1. Enganchar',
    emoji: '🌳',
    watermarkIcon: 'mdi-file-tree-outline',
    accent: 'primary',
    title: '¿Qué es un Árbol de Decisión?',
    desc: 'Descubre con analogías sencillas cómo piensa un árbol de decisión para prevenir inundaciones en Córdoba.'
  },
  {
    number: 2,
    phase5E: '2. Explorar',
    emoji: '🌿',
    watermarkIcon: 'mdi-source-branch',
    accent: 'secondary',
    title: 'Raíz, Nodos y Hojas',
    desc: 'Explora las partes clave de la estructura de un Árbol de Decisión con ejemplos del Río Sinú.'
  },
  {
    number: 3,
    phase5E: '3. Explicar',
    emoji: '🧠',
    watermarkIcon: 'mdi-brain',
    accent: 'info',
    title: '¿Cómo Aprende la Máquina?',
    desc: 'Comprende cómo los datos históricos de lluvia ayudan al modelo a encontrar patrones.'
  },
  {
    number: 4,
    phase5E: '4. Elaborar',
    emoji: '🚨',
    watermarkIcon: 'mdi-sitemap-outline',
    accent: 'warning',
    title: 'Simulador',
    desc: 'Crea desde cero tus nodos, conéctalos libremente con ramas y entrena tu árbol con datos reales de Córdoba.'
  },
  {
    number: 5,
    phase5E: '5. Evaluar',
    emoji: '🏆',
    watermarkIcon: 'mdi-trophy-outline',
    accent: 'primary',
    title: 'Gran Reto de Inundaciones',
    desc: 'Pon a prueba todo lo aprendido resolviendo casos prácticos ilustrados de la cuenca del Sinú.'
  }
]

const isUnlocked = (lvl: number) => lvl <= (session.value.unlockedLevel || 1)
const isCompleted = (lvl: number) => (session.value.xp || 0) >= lvl * 20

const handleSelectLevel = (lvl: number) => {
  if (!isUnlocked(lvl)) return
  // Actualiza el nivel actual para que si entra o regresa ese nivel sea el destacado ancho
  session.value.level = lvl
  emit('select-level', lvl)
}
</script>

<style scoped>
.levels-map-wrap {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}

.map-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: rgba(0, 100, 150, 0.1);
  color: #006496;
  font-size: clamp(0.75rem, 1.1vw, 0.9rem);
  font-weight: 800;
  text-transform: uppercase;
}

.map-main-title {
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  color: #001e31;
}

.dev-unlock-bar {
  background-color: #f0f7ff;
  border: 2px solid #006496;
}

.dev-input {
  border: 1.5px solid #90b4d4;
  background-color: #ffffff;
  font-size: 0.85rem;
  outline: none;
  width: 140px;
}

.dev-input:focus {
  border-color: #006496;
}

.levels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: dense;
  gap: 16px;
  min-height: 0;
}

.level-card {
  container-type: size;
  position: relative;
  overflow: hidden;
  padding: clamp(16px, 4.2cqmin, 28px);
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease, border-color 0.25s ease;
}

/* El nivel actual en el que va el estudiante ocupa 2 columnas de ancho dinámicamente */
.level-card.is-featured-wide {
  grid-column: span 2;
  border-color: #006496 !important;
  box-shadow: 0 12px 30px rgba(0, 100, 150, 0.16);
}

.level-card.is-unlocked {
  cursor: pointer;
  border-color: #129fea;
  background: linear-gradient(145deg, #ffffff 0%, #f0f8ff 100%);
}

.level-card.is-unlocked:hover {
  transform: translateY(-4px);
  border-color: #006496;
  box-shadow: 0 16px 34px rgba(0, 100, 150, 0.18);
}

.level-card.is-completed {
  border-color: #76b82a;
  background: linear-gradient(145deg, #ffffff 0%, #f3fce6 100%);
}

.level-card.is-locked {
  background-color: #f4f7fb;
  border-color: #dce5ef;
  opacity: 0.78;
  cursor: not-allowed;
}

.level-watermark {
  position: absolute;
  right: -10px;
  bottom: -14px;
  font-size: clamp(68px, 40cqmin, 165px) !important;
  opacity: 0.08;
  color: #006496;
  pointer-events: none;
  transform: rotate(-12deg);
}

.phase-pill {
  padding: 5px 14px;
  border-radius: 999px;
  font-size: clamp(0.76rem, 3.8cqmin, 0.98rem);
  font-weight: 800;
  background-color: rgba(0, 100, 150, 0.12);
  color: #006496;
}

.phase-pill.locked {
  background-color: #e2eaf2;
  color: #5b6670;
}

.current-focus-pill {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: clamp(0.72rem, 3.4cqmin, 0.9rem);
  font-weight: 800;
  background-color: #ffc21c;
  color: #001e31;
}

.level-sticker-circle {
  width: clamp(40px, 14cqmin, 58px);
  height: clamp(40px, 14cqmin, 58px);
  border-radius: 16px;
  background-color: rgba(18, 159, 234, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.level-sticker-circle.locked {
  background-color: #e4ecf4;
}

.sticker-emoji {
  font-size: clamp(1.25rem, 7cqmin, 1.9rem);
  line-height: 1;
}

.level-num {
  font-size: clamp(0.8rem, 4.2cqmin, 1.05rem);
  color: #129fea;
  letter-spacing: 0.06em;
}

.level-title {
  font-size: clamp(1.15rem, 8.5cqmin, 2.2rem);
  line-height: 1.12;
  color: #001e31;
}

.level-desc {
  font-size: clamp(0.9rem, 4.8cqmin, 1.25rem);
  color: #3f4851;
  line-height: 1.38;
  max-width: 56ch;
}

.level-footer {
  border-top: 1px solid rgba(0, 100, 150, 0.1);
}

.level-cta {
  font-size: clamp(0.85rem, 4.2cqmin, 1.12rem);
}

.cta-icon {
  font-size: clamp(18px, 5cqmin, 24px) !important;
  transition: transform 0.2s ease;
}

.level-card.is-unlocked:hover .cta-icon {
  transform: translateX(5px);
}

.z-2 {
  z-index: 2;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

@media (max-width: 960px) {
  .levels-map-wrap {
    padding: 14px !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  .levels-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 96px;
    flex: 0 0 auto;
  }

  .level-card {
    container-type: normal;
    min-height: 215px;
    height: auto;
    padding: 20px 22px;
    overflow: visible;
    flex-shrink: 0;
    gap: 12px;
  }

  .level-card.is-featured-wide {
    grid-column: span 1;
  }

  .phase-pill {
    font-size: 0.8rem;
    padding: 5px 12px;
  }

  .current-focus-pill {
    font-size: 0.76rem;
    padding: 4px 10px;
  }

  .level-sticker-circle {
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }

  .sticker-emoji {
    font-size: 1.45rem;
  }

  .level-num {
    font-size: 0.84rem;
  }

  .level-title {
    font-size: 1.38rem;
    line-height: 1.2;
  }

  .level-desc {
    font-size: 0.94rem;
    line-height: 1.46;
    max-width: 100%;
  }

  .level-footer {
    padding-top: 12px !important;
  }

  .level-cta {
    font-size: 0.94rem;
  }

  .cta-icon {
    font-size: 20px !important;
  }

  .level-watermark {
    font-size: 92px !important;
  }
}

@media (max-width: 600px) {
  .map-main-title {
    font-size: 1.25rem;
  }
}
</style>
