<template>
  <div class="wheel-loading-screen d-flex flex-column align-center justify-space-between pa-4 pa-sm-6">
    <!-- Encabezado no interactivo -->
    <div class="text-center">
      <span class="loading-pill">Iniciando Experiencia 5E</span>
      <h2 class="wheel-heading font-weight-bold mt-2">
        Preparando Ruta Pedagógica
      </h2>
    </div>

    <!-- Rueda Central con 5 Puntos (100% Responsiva en PC > 900px) -->
    <div class="wheel-stage desktop-wheel my-auto">
      <!-- Anillo giratorio decorativo -->
      <svg class="wheel-svg" viewBox="0 0 360 360">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#006496" />
            <stop offset="50%" stop-color="#129fea" />
            <stop offset="100%" stop-color="#76b82a" />
          </linearGradient>
        </defs>

        <!-- Círculo base punteado -->
        <circle
          cx="180"
          cy="180"
          r="128"
          fill="none"
          stroke="#d7e3ee"
          stroke-width="4"
          stroke-dasharray="8 8"
        />

        <!-- Círculo de progreso animado -->
        <circle
          cx="180"
          cy="180"
          r="128"
          fill="none"
          stroke="url(#ringGrad)"
          stroke-width="6"
          stroke-linecap="round"
          stroke-dasharray="804"
          :stroke-dashoffset="804 - (804 * progress) / 100"
          transform="rotate(-90 180 180)"
          class="progress-ring-circle"
        />
      </svg>

      <!-- Los 5 Puntos alrededor de la rueda -->
      <div
        v-for="(node, idx) in nodes5E"
        :key="node.title"
        class="wheel-point"
        :class="{
          'is-active': activeNode === idx,
          'is-done': activeNode > idx
        }"
        :style="getNodePosition(idx)"
      >
        <div class="point-circle">
          <v-icon :icon="node.icon" :size="20" />
        </div>
        <span class="point-label font-weight-bold">
          {{ idx + 1 }}. {{ node.title }}
        </span>
      </div>

      <!-- Núcleo central que muestra la fase actual -->
      <div class="wheel-center text-center pa-4">
        <div class="center-step-num font-weight-bold">
          FASE {{ activeNode + 1 }} DE 5
        </div>
        <div class="center-step-title font-weight-bold my-1">
          {{ currentNode.title }}
        </div>
        <div class="center-step-desc">
          {{ currentNode.shortDesc }}
        </div>
      </div>
    </div>

    <!-- Línea de tiempo lineal de las 5E (SOLO EN CELULAR Y TABLET <= 900px) -->
    <div class="mobile-linear-5e my-auto w-100 px-1">
      <div
        v-for="(node, idx) in nodes5E"
        :key="`linear_${node.title}`"
        class="linear-5e-item d-flex align-center gap-4 pa-4 rounded-xl"
        :class="{
          'is-active': activeNode === idx,
          'is-done': activeNode > idx
        }"
      >
        <div class="linear-5e-icon d-flex align-center justify-center flex-shrink-0 mr-2">
          <v-icon
            :icon="activeNode > idx ? 'mdi-check-bold' : node.icon"
            :size="22"
          />
        </div>
        <div class="min-w-0 flex-1-1 pl-1">
          <div class="d-flex align-center justify-space-between mb-1">
            <span class="linear-5e-title font-weight-bold">
              {{ idx + 1 }}. {{ node.title }}
            </span>
            <span v-if="activeNode === idx" class="linear-5e-badge">
              Cargando...
            </span>
          </div>
          <div class="linear-5e-desc">
            {{ node.shortDesc }}
          </div>
        </div>
      </div>
    </div>

    <!-- Barra de carga inferior -->
    <div class="loading-bar-box w-100" style="max-width: 440px;">
      <div class="d-flex align-center justify-space-between mb-1">
        <span class="text-caption font-weight-bold" style="color: #006496;">
          Cargando módulos del Río Sinú...
        </span>
        <span class="text-caption font-weight-bold" style="color: #001e31;">
          {{ Math.round(progress) }}%
        </span>
      </div>
      <div class="loading-track">
        <div class="loading-fill" :style="{ width: `${progress}%` }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'finished'): void
}>()

const nodes5E = [
  {
    title: 'Enganchar',
    icon: 'mdi-lightbulb-on-outline',
    shortDesc: 'Descubrir qué es un Árbol de Decisión'
  },
  {
    title: 'Explorar',
    icon: 'mdi-compass-outline',
    shortDesc: 'Conocer raíces, ramas y hojas de datos'
  },
  {
    title: 'Explicar',
    icon: 'mdi-brain',
    shortDesc: 'Entender cómo aprende la máquina'
  },
  {
    title: 'Elaborar',
    icon: 'mdi-sitemap-outline',
    shortDesc: 'Construir decisiones ante inundaciones'
  },
  {
    title: 'Evaluar',
    icon: 'mdi-trophy-outline',
    shortDesc: 'Superar el reto del Río Sinú'
  }
]

const progress = ref(8)
const activeNode = computed(() => Math.min(4, Math.floor((progress.value / 100) * 5)))
const currentNode = computed(() => nodes5E[activeNode.value] ?? nodes5E[0]!)

// Posiciona los 5 nodos en pentágono alrededor del círculo
const getNodePosition = (idx: number) => {
  const angleDeg = -90 + idx * 72
  const angleRad = (angleDeg * Math.PI) / 180
  const radiusPercent = 36 // % desde el centro (50%, 50%)
  const left = 50 + radiusPercent * Math.cos(angleRad)
  const top = 50 + radiusPercent * Math.sin(angleRad)
  return {
    left: `${left}%`,
    top: `${top}%`
  }
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value = Math.min(100, progress.value + 2.5)
    } else {
      if (timer) clearInterval(timer)
      setTimeout(() => {
        emit('finished')
      }, 350)
    }
  }, 95)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.wheel-loading-screen {
  height: 100%;
  width: 100%;
  user-select: none;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f7ff 100%);
  overflow: hidden;
}

.loading-pill {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 999px;
  background-color: rgba(0, 100, 150, 0.1);
  color: #006496;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.wheel-heading {
  font-size: clamp(1.25rem, 2.5vw, 1.85rem);
  color: #001e31;
}

.wheel-stage {
  position: relative;
  width: min(62cqmin, 370px);
  height: min(62cqmin, 370px);
  min-width: 250px;
  min-height: 250px;
}

.mobile-linear-5e {
  display: none;
}

@media (max-width: 900px) {
  .wheel-loading-screen {
    overflow-y: auto;
    justify-content: flex-start !important;
    gap: 14px;
  }

  .desktop-wheel {
    display: none !important;
  }

  .mobile-linear-5e {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 440px;
  }

  .linear-5e-item {
    background-color: #ffffff;
    border: 2px solid #d7e3ee;
    transition: all 0.25s ease;
  }

  .linear-5e-item.is-done {
    border-color: #76b82a;
    background-color: #f4fce8;
  }

  .linear-5e-item.is-active {
    border-color: #006496;
    background: linear-gradient(145deg, #ffffff 0%, #e8f4ff 100%);
    box-shadow: 0 6px 18px rgba(0, 100, 150, 0.14);
    transform: scale(1.01);
  }

  .linear-5e-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background-color: #f0f7ff;
    color: #6f7882;
    border: 2px solid #cbdceb;
  }

  .linear-5e-item.is-done .linear-5e-icon {
    background-color: #76b82a;
    border-color: #76b82a;
    color: #ffffff;
  }

  .linear-5e-item.is-active .linear-5e-icon {
    background: linear-gradient(135deg, #006496 0%, #129fea 100%);
    border-color: #ffc21c;
    color: #ffffff;
  }

  .linear-5e-title {
    font-size: 0.96rem;
    color: #001e31;
  }

  .linear-5e-desc {
    font-size: 0.8rem;
    color: #4b6375;
    line-height: 1.3;
  }

  .linear-5e-badge {
    font-size: 0.68rem;
    font-weight: 800;
    color: #006496;
    background-color: rgba(18, 159, 234, 0.14);
    padding: 2px 8px;
    border-radius: 999px;
  }
}

.wheel-svg {
  width: 100%;
  height: 100%;
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.12s linear;
}

.wheel-point {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.point-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid #cbdceb;
  color: #6f7882;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 50, 79, 0.08);
  transition: all 0.3s ease;
}

.wheel-point.is-done .point-circle {
  background-color: #76b82a;
  border-color: #ffffff;
  color: #ffffff;
}

.wheel-point.is-active {
  transform: translate(-50%, -50%) scale(1.16);
}

.wheel-point.is-active .point-circle {
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  border-color: #ffc21c;
  color: #ffffff;
  box-shadow: 0 0 0 6px rgba(18, 159, 234, 0.2);
}

.point-label {
  margin-top: 4px;
  font-size: 0.74rem;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 2px 8px;
  border-radius: 999px;
  color: #001e31;
  white-space: nowrap;
  border: 1px solid #d7e3ee;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52%;
  height: 52%;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  box-shadow: 0 10px 28px rgba(0, 100, 150, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center-step-num {
  font-size: 0.68rem;
  color: #129fea;
  letter-spacing: 0.06em;
}

.center-step-title {
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  color: #001e31;
}

.center-step-desc {
  font-size: 0.72rem;
  color: #4b6375;
  line-height: 1.25;
}

.loading-track {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background-color: #dce9f5;
  overflow: hidden;
}

.loading-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #006496 0%, #129fea 60%, #76b82a 100%);
  transition: width 0.1s linear;
}
</style>

