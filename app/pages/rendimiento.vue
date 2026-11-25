<template>
  <div class="rendimiento-page">
    <!-- Barra superior compacta y responsive -->
    <header class="rend-topbar">
      <div class="d-flex align-center gap-2 min-w-0">
        <v-btn
          color="primary"
          variant="tonal"
          size="small"
          rounded="xl"
          class="text-none font-weight-bold flex-shrink-0"
          prepend-icon="mdi-arrow-left"
          @click="goBack"
        >
          Volver
        </v-btn>
        <div class="min-w-0">
          <div class="rend-brand text-truncate">
            Gotas del Sinú · Rendimiento
          </div>
        </div>
      </div>

      <v-btn
        color="info"
        variant="tonal"
        size="small"
        rounded="xl"
        class="text-none font-weight-bold flex-shrink-0"
        prepend-icon="mdi-refresh"
        :loading="loading"
        @click="fetchAnalysis(true)"
      >
        Actualizar análisis
      </v-btn>
    </header>

    <main class="rend-container">
      <!-- Tarjeta Protagonista con Zenuito en Grande -->
      <section class="zenuito-hero-card">
        <div class="zenuito-stage">
          <div class="zenuito-halo" />
          <img
            :src="zenuitoUrl"
            :alt="zenuitoName"
            class="zenuito-giant-avatar"
          />
          <div class="zenuito-name-pill">
            <v-icon icon="mdi-robot-happy-outline" size="16" class="mr-1" />
            {{ zenuitoName }}
          </div>
          <span class="zenuito-role-tag">Tutor Socrático · Análisis Cualitativo</span>
        </div>

        <div class="zenuito-speech-box">
          <span class="speech-badge">
            🌊 Tu recorrido en la Cuenca del Sinú
          </span>

          <h1 class="speech-title">
            Análisis de tu desempeño, {{ session.nombre || 'Estudiante' }}
          </h1>

          <!-- Estado de carga -->
          <div v-if="loading" class="loading-box">
            <v-progress-circular indeterminate color="info" size="34" width="3" />
            <p class="loading-text mb-0">
              {{ zenuitoName }} está revisando tus decisiones, aciertos y tropiezos en los niveles para darte una retroalimentación personalizada...
            </p>
          </div>

          <!-- Saludo y resumen general -->
          <template v-else-if="analysis">
            <p class="speech-greeting">
              {{ analysis.saludo }}
            </p>
            <p v-if="analysis.resumenGeneral" class="speech-summary mb-0">
              {{ analysis.resumenGeneral }}
            </p>
          </template>
        </div>
      </section>

      <!-- Bloques de Análisis: Qué hizo bien vs Qué debe mejorar -->
      <section v-if="!loading && analysis" class="analysis-grid">
        <!-- Lo que hiciste bien -->
        <article class="feedback-card card-good">
          <div class="card-header-row">
            <div class="icon-circle good-circle">
              <v-icon icon="mdi-check-decagram-outline" color="success" size="24" />
            </div>
            <div>
              <span class="card-kicker good-kicker">Fortalezas</span>
              <h2 class="card-heading">Lo que hiciste bien</h2>
            </div>
          </div>

          <ul class="feedback-list">
            <li
              v-for="(item, idx) in analysis.loQueHizoBien"
              :key="`good-${idx}`"
              class="feedback-item"
            >
              <v-icon icon="mdi-check-circle" color="success" size="18" class="item-icon" />
              <div class="min-w-0 flex-1-1">
                <span v-if="typeof item !== 'string' && item.seccion" class="item-section-tag good-tag">
                  {{ item.seccion }}
                </span>
                <div class="item-body">{{ typeof item === 'string' ? item : item.texto }}</div>
              </div>
            </li>
          </ul>
        </article>

        <!-- Lo que debes mejorar -->
        <article class="feedback-card card-improve">
          <div class="card-header-row">
            <div class="icon-circle improve-circle">
              <v-icon icon="mdi-compass-outline" color="primary" size="24" />
            </div>
            <div>
              <span class="card-kicker improve-kicker">Oportunidades de mejora</span>
              <h2 class="card-heading">Lo que debes mejorar</h2>
            </div>
          </div>

          <ul class="feedback-list">
            <li
              v-for="(item, idx) in analysis.loQueDebeMejorar"
              :key="`improve-${idx}`"
              class="feedback-item"
            >
              <v-icon icon="mdi-alert-circle-outline" color="warning" size="18" class="item-icon" />
              <div class="min-w-0 flex-1-1">
                <span v-if="typeof item !== 'string' && item.seccion" class="item-section-tag improve-tag">
                  {{ item.seccion }}
                </span>
                <div class="item-body">{{ typeof item === 'string' ? item : item.texto }}</div>
              </div>
            </li>
          </ul>
        </article>
      </section>

      <!-- Consejo final de Zenuito -->
      <section v-if="!loading && analysis?.consejoFinal" class="advice-banner">
        <div class="advice-icon-wrap">
          <v-icon icon="mdi-water-check-outline" color="info" size="26" />
        </div>
        <div class="min-w-0">
          <div class="advice-label">Consejo final de {{ zenuitoName }}</div>
          <p class="advice-text mb-0">{{ analysis.consejoFinal }}</p>
        </div>
      </section>

      <!-- Botón final de navegación -->
      <footer class="rend-footer">
        <v-btn
          color="primary"
          size="large"
          rounded="xl"
          class="text-none font-weight-bold footer-btn"
          prepend-icon="mdi-view-dashboard-outline"
          @click="goBack"
        >
          Volver al Dashboard
        </v-btn>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
interface RendimientoItem {
  seccion: string
  texto: string
}

interface RendimientoAnalysis {
  saludo: string
  resumenGeneral: string
  loQueHizoBien: Array<RendimientoItem | string>
  loQueDebeMejorar: Array<RendimientoItem | string>
  consejoFinal: string
}

useHead({
  title: 'Rendimiento'
})

const { session, zenuitoUrl } = useUserSession()
const { performance, saveCachedAnalysis } = usePerformanceTracker()
const { setContext } = useZenuitoContext()

const loading = ref(!performance.value.cachedAnalysis)
const analysis = ref<RendimientoAnalysis | null>(performance.value.cachedAnalysis)

const zenuitoName = computed(() => session.value.zenuito?.nickname || 'Zenuito')

const fetchAnalysis = async (forceRefresh = false) => {
  if (!forceRefresh && performance.value.cachedAnalysis) {
    analysis.value = performance.value.cachedAnalysis
    loading.value = false
    return
  }

  loading.value = true
  try {
    const res = await $fetch<{ success: boolean; analysis: RendimientoAnalysis }>('/api/rendimiento', {
      method: 'POST',
      body: {
        profile: {
          nombre: session.value.nombre,
          edad: session.value.edad,
          nivelEducativo: session.value.nivelEducativo,
          gradoOSemestre: session.value.gradoOSemestre
        },
        performance: performance.value
      }
    })
    if (res?.analysis) {
      analysis.value = res.analysis
      saveCachedAnalysis(res.analysis)
    }
  } catch {
    analysis.value = {
      saludo: `¡Hola, ${session.value.nombre || 'Estudiante'}! Soy ${zenuitoName.value}.`,
      resumenGeneral: 'Completaste tu recorrido por Gotas del Sinú explorando cómo los Árboles de Decisión ayudan a anticipar alertas en la cuenca.',
      loQueHizoBien: [
        'Exploraste el funcionamiento de las preguntas condicionales, las ramas y las hojas finales.',
        'Conectaste las decisiones del modelo con escenarios reales de la cuenca del Río Sinú.'
      ],
      loQueDebeMejorar: [
        'Sigue practicando la lectura paso a paso de cada rama antes de elegir una hoja final.',
        'Verifica siempre si una pregunta logra separar de manera limpia los casos distintos.'
      ],
      consejoFinal: 'La clave de un buen árbol de decisión está en hacer la pregunta correcta en el momento oportuno.'
    }
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  navigateTo('/dashboard')
}

onMounted(() => {
  setContext({
    seccion: 'Rendimiento',
    fase5E: 'Evaluate (Análisis Cualitativo)',
    descripcionVisual: 'Página de análisis personalizado donde Zenuito explica cualitativamente fortalezas y aspectos a mejorar.'
  })
  fetchAnalysis()
})
</script>

<style scoped>
.rendimiento-page {
  min-height: 100dvh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: linear-gradient(160deg, #f3f9ff 0%, #eaf6f2 55%, #f7f9ff 100%);
  padding: env(safe-area-inset-top, 0px) 12px calc(28px + env(safe-area-inset-bottom, 0px));
  box-sizing: border-box;
}

.rend-topbar {
  max-width: 1040px;
  margin: 0 auto;
  padding: 12px 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.rend-brand {
  font-size: clamp(0.88rem, 2vw, 1.05rem);
  font-weight: 800;
  color: #001e31;
}

.rend-container {
  max-width: 1040px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Tarjeta principal con Zenuito en grande */
.zenuito-hero-card {
  background: linear-gradient(145deg, #ffffff 0%, #eaf8ff 100%);
  border: 2px solid #cbe4f5;
  border-radius: 26px;
  padding: clamp(18px, 3vw, 32px);
  display: flex;
  align-items: center;
  gap: clamp(18px, 3.5vw, 36px);
  box-shadow: 0 12px 32px rgba(0, 100, 150, 0.08);
}

.zenuito-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  min-width: 210px;
}

.zenuito-halo {
  position: absolute;
  top: 6px;
  width: clamp(150px, 22vw, 210px);
  height: clamp(150px, 22vw, 210px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 159, 234, 0.22) 0%, rgba(18, 159, 234, 0) 70%);
  pointer-events: none;
}

.zenuito-giant-avatar {
  position: relative;
  width: clamp(148px, 22vw, 215px);
  height: clamp(148px, 22vw, 215px);
  border-radius: 32px;
  border: 4px solid #ffffff;
  box-shadow: 0 14px 30px rgba(0, 100, 150, 0.2);
  background-color: #e6f7ff;
  object-fit: cover;
  animation: floatZenuito 4s ease-in-out infinite;
}

@keyframes floatZenuito {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.zenuito-name-pill {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  background-color: #006496;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.92rem;
}

.zenuito-role-tag {
  margin-top: 4px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #129fea;
}

.zenuito-speech-box {
  flex: 1;
  min-width: 0;
}

.speech-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: rgba(0, 100, 150, 0.1);
  color: #006496;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.speech-title {
  font-size: clamp(1.25rem, 2.8vw, 1.95rem);
  line-height: 1.2;
  font-weight: 800;
  color: #001e31;
  margin-bottom: 10px;
  word-break: break-word;
}

.speech-greeting {
  font-size: clamp(0.98rem, 1.7vw, 1.12rem);
  font-weight: 700;
  color: #004c73;
  line-height: 1.5;
  margin-bottom: 8px;
}

.speech-summary {
  font-size: clamp(0.92rem, 1.5vw, 1.02rem);
  color: #2f4354;
  line-height: 1.58;
}

.loading-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1.5px dashed #82c8ee;
}

.loading-text {
  font-size: 0.94rem;
  font-weight: 600;
  color: #004c73;
  line-height: 1.45;
}

/* Grid de tarjetas de fortalezas y mejoras */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.feedback-card {
  border-radius: 22px;
  padding: clamp(16px, 2.6vw, 24px);
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 30, 49, 0.05);
  min-width: 0;
}

.card-good {
  border: 2px solid #b9e29b;
  background: linear-gradient(180deg, #ffffff 0%, #f6fcf1 100%);
}

.card-improve {
  border: 2px solid #cbe0f5;
  background: linear-gradient(180deg, #ffffff 0%, #f4f9ff 100%);
}

.card-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.good-circle {
  background-color: #e6f6da;
}

.improve-circle {
  background-color: #e2f1ff;
}

.card-kicker {
  display: block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.good-kicker {
  color: #3d6a00;
}

.improve-kicker {
  color: #006496;
}

.card-heading {
  font-size: clamp(1.05rem, 2vw, 1.28rem);
  font-weight: 800;
  color: #001e31;
  margin: 0;
  line-height: 1.2;
}

.feedback-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feedback-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: clamp(0.9rem, 1.45vw, 0.98rem);
  line-height: 1.5;
  color: #1f3344;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(0, 100, 150, 0.08);
  word-break: break-word;
}

.item-icon {
  margin-top: 3px;
  flex-shrink: 0;
}

.item-section-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 2px 8px;
  border-radius: 999px;
  margin-bottom: 4px;
}

.good-tag {
  background-color: #e6f6da;
  color: #2f5700;
}

.improve-tag {
  background-color: #fff3d6;
  color: #8a5300;
}

.item-body {
  line-height: 1.48;
  color: #1f3344;
}

/* Banner de consejo final */
.advice-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: linear-gradient(135deg, #e7f6ff 0%, #eefaf4 100%);
  border: 2px solid #9fd6f4;
  border-radius: 20px;
  padding: 16px 20px;
}

.advice-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 100, 150, 0.1);
}

.advice-label {
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #006496;
  margin-bottom: 4px;
}

.advice-text {
  font-size: clamp(0.92rem, 1.5vw, 1.02rem);
  font-weight: 600;
  color: #001e31;
  line-height: 1.5;
}

.rend-footer {
  display: flex;
  justify-content: center;
  padding-top: 4px;
}

.gap-2 {
  gap: 8px;
}

.min-w-0 {
  min-width: 0;
}

/* Responsive para Tablets y Celulares (incluyendo pantallas pequeñas <= 480px y <= 360px) */
@media (max-width: 820px) {
  .zenuito-hero-card {
    flex-direction: column;
    text-align: center;
    padding: 20px 16px;
    border-radius: 22px;
  }

  .zenuito-stage {
    min-width: 0;
    width: 100%;
  }

  .zenuito-giant-avatar {
    width: clamp(140px, 42vw, 190px);
    height: clamp(140px, 42vw, 190px);
  }

  .loading-box {
    flex-direction: column;
    text-align: center;
  }

  .analysis-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .rendimiento-page {
    padding: env(safe-area-inset-top, 0px) 10px calc(24px + env(safe-area-inset-bottom, 0px));
  }

  .rend-topbar {
    padding: 10px 0;
  }

  .zenuito-hero-card {
    padding: 16px 14px;
    gap: 14px;
    border-radius: 18px;
  }

  .zenuito-giant-avatar {
    width: 138px;
    height: 138px;
    border-radius: 26px;
  }

  .feedback-card {
    padding: 14px 12px;
    border-radius: 18px;
  }

  .feedback-item {
    padding: 9px 10px;
    font-size: 0.88rem;
  }

  .advice-banner {
    padding: 14px 12px;
    gap: 10px;
    border-radius: 16px;
  }

  .footer-btn {
    width: 100%;
  }
}
</style>
