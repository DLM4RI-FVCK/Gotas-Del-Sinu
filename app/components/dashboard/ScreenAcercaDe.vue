<template>
  <div class="about-screen d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Cabecera -->
    <div class="d-flex align-center justify-space-between gap-3 mb-3 flex-shrink-0">
      <div class="d-flex align-center gap-3">
        <div class="header-icon-box">
          <v-icon icon="mdi-information-outline" color="white" size="26" />
        </div>
        <div>
          <span class="top-tag">Información Institucional y Pedagógica</span>
          <h2 class="about-title font-weight-bold">
            Acerca del OVA: Gotas del Sinú
          </h2>
        </div>
      </div>

      <div class="d-flex align-center gap-2">
        <v-btn
          color="error"
          variant="tonal"
          size="small"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-refresh-alert"
          @click="showConfirmReset = true"
        >
          Reiniciar Progreso
        </v-btn>
        <v-btn icon="mdi-close" variant="tonal" color="primary" size="small" @click="$emit('close')" />
      </div>
    </div>

    <!-- Contenido central en grilla responsiva -->
    <div class="about-grid flex-1-1 min-h-0">
      <!-- Columna Izquierda: Imagen de la Universidad de Córdoba + Contexto Académico -->
      <div class="about-card main-info-card d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
        <!-- Fotografía e insignia de la Universidad de Córdoba (Montería) obtenida de Wikimedia Commons -->
        <div class="unicor-banner position-relative rounded-xl overflow-hidden mb-3">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/20240318_Monteria_inauguracion_edificio_U_Cordoba-Juan_D_Cano0979.jpg?width=900"
            alt="Campus Universidad de Córdoba - Montería"
            class="unicor-campus-img"
          />
          <div class="unicor-overlay d-flex align-end justify-space-between pa-3">
            <div>
              <span class="campus-pill mb-1">🏛️ Alma Máter de Córdoba</span>
              <h3 class="text-h5 font-weight-bold text-white mb-0">
                Universidad de Córdoba
              </h3>
              <div class="text-caption text-white-90 font-weight-medium">
                📍 Montería, Córdoba, Colombia
              </div>
            </div>

            <div class="unicor-logo-box pa-2 rounded-lg">
              <img
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Unicor.svg"
                alt="Logo Universidad de Córdoba"
                class="unicor-logo-img"
              />
            </div>
          </div>
        </div>

        <p class="card-body-text mb-3">
          <strong>Gotas del Sinú</strong> es un Objeto Virtual de Aprendizaje (OVA) interactivo diseñado para que estudiantes comprendan de forma visual y práctica la técnica de <strong>Machine Learning: Árboles de Decisión (Decision Trees)</strong>, contextualizada en la alerta temprana de <strong>inundaciones en el Río Sinú</strong>.
        </p>

        <!-- Fichas de Datos Académicos Clave -->
        <div class="academic-details-grid">
          <div class="detail-box pa-2 px-3 rounded-xl">
            <div class="detail-label">Programa Académico</div>
            <div class="detail-value font-weight-bold">
              🎓 Licenciatura en Informática (5° Semestre)
            </div>
          </div>

          <div class="detail-box pa-2 px-3 rounded-xl">
            <div class="detail-label">Asignatura / Curso</div>
            <div class="detail-value font-weight-bold">
              🧠 Inteligencia Computacional
            </div>
          </div>

          <div class="detail-box pa-2 px-3 rounded-xl">
            <div class="detail-label">Docente de la Materia</div>
            <div class="detail-value font-weight-bold">
              👨‍🏫 Prof. Juan Carlos Giraldo
            </div>
          </div>

          <div class="detail-box pa-2 px-3 rounded-xl">
            <div class="detail-label">Contexto Territorial</div>
            <div class="detail-value font-weight-bold">
              🌊 Cuenca del Río Sinú (Córdoba)
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Pilares Pedagógicos (Método 5E + IA Socrática + Simulador) -->
      <div class="d-flex flex-column justify-space-between gap-3 min-h-0">
        <div class="about-card pillar-card pa-4 rounded-xl flex-1-1 d-flex flex-column justify-center">
          <div class="d-flex align-center gap-3 mb-2">
            <div class="pillar-emoji">🧭</div>
            <div>
              <h4 class="pillar-title font-weight-bold">
                1. Metodología Pedagógica 5E
              </h4>
              <div class="pillar-sub">Aprendizaje constructivista en 5 niveles</div>
            </div>
          </div>
          <p class="pillar-desc mb-0">
            Estructura el aprendizaje en 5 etapas secuenciales: <strong>Enganchar</strong> (analogías cotidianas), <strong>Explorar</strong> (anatomía de nodos y ramas), <strong>Explicar</strong> (entrenamiento y pureza Gini), <strong>Elaborar</strong> (simulador libre de grafos) y <strong>Evaluar</strong> (casos prácticos en Córdoba).
          </p>
        </div>

        <div class="about-card pillar-card pa-4 rounded-xl flex-1-1 d-flex flex-column justify-center">
          <div class="d-flex align-center gap-3 mb-2">
            <div class="pillar-emoji">🌳</div>
            <div>
              <h4 class="pillar-title font-weight-bold">
                2. Machine Learning: Decision Trees
              </h4>
              <div class="pillar-sub">Inteligencia Computacional explicable</div>
            </div>
          </div>
          <p class="pillar-desc mb-0">
            Permite que el estudiante no solo lea teoría, sino que <strong>construya, conecte y entrene su propio Árbol de Decisión</strong> observando en tiempo real cómo viajan los datos climáticos de los municipios de Córdoba por cada nodo.
          </p>
        </div>

        <div class="about-card pillar-card pa-4 rounded-xl flex-1-1 d-flex flex-column justify-center">
          <div class="d-flex align-center gap-3 mb-2">
            <div class="pillar-emoji">🤖</div>
            <div>
              <h4 class="pillar-title font-weight-bold">
                3. Tutor Socrático Personalizable (Zenuito)
              </h4>
              <div class="pillar-sub">Acompañamiento inteligente e interactivo</div>
            </div>
          </div>
          <p class="pillar-desc mb-0">
            Integra a <strong>Zenuito</strong> como compañero virtual personalizable pensado bajo el método socrático para guiar al estudiante durante la resolución de retos.
          </p>
        </div>
      </div>
    </div>
    <!-- Modal de confirmación para Reiniciar Progreso -->
    <v-dialog v-model="showConfirmReset" max-width="440" persistent>
      <v-card rounded="xl" class="pa-5 text-center">
        <div class="d-flex justify-center mb-3">
          <div class="reset-alert-icon-box">
            <v-icon icon="mdi-alert-octagon-outline" color="error" size="42" />
          </div>
        </div>

        <h3 class="text-h6 font-weight-bold mb-2" style="color: #001e31;">
          ¿Seguro que deseas reiniciar tu progreso?
        </h3>

        <p class="text-body-2 mb-4" style="color: #4b6375; line-height: 1.45;">
          Perderás todos los <strong>niveles desbloqueados, misiones completadas y puntos de experiencia (XP)</strong> acumulados. El juego regresará al Nivel 1 inicial. Tu nombre y avatar se conservarán.
        </p>

        <div class="d-flex align-center justify-center gap-3">
          <v-btn
            variant="tonal"
            color="primary"
            rounded="lg"
            class="text-none font-weight-bold"
            @click="showConfirmReset = false"
          >
            No, Cancelar
          </v-btn>

          <v-btn
            color="error"
            variant="flat"
            rounded="lg"
            class="text-none font-weight-bold"
            prepend-icon="mdi-trash-can-outline"
            @click="confirmReset"
          >
            Sí, Reiniciar Todo
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showSuccessReset" color="success" timeout="3000" rounded="pill">
      ✅ Progreso reiniciado con éxito. Misiones y niveles restablecidos al Nivel 1.
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { resetProgress } = useUserSession()
const showConfirmReset = ref(false)
const showSuccessReset = ref(false)

const confirmReset = () => {
  resetProgress()
  showConfirmReset.value = false
  showSuccessReset.value = true
}
</script>

<style scoped>
.reset-alert-icon-box {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffdad6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-screen {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  border-radius: 24px;
  overflow: hidden;
}

.header-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.top-tag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #006496;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.about-title {
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  color: #001e31;
  line-height: 1.15;
}

.about-grid {
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 16px;
  overflow-y: auto;
}

.about-card {
  container-type: size;
  position: relative;
  overflow: hidden;
  border: 2px solid #d7e3ee;
}

.main-info-card {
  background: linear-gradient(145deg, #f7f9ff 0%, #e8f4ff 100%);
}

.pillar-card {
  background-color: #ffffff;
}

.unicor-banner {
  height: clamp(130px, 34cqh, 195px);
  border: 2px solid #ffffff;
  box-shadow: 0 8px 22px rgba(0, 50, 79, 0.14);
  background-color: #006496;
}

.unicor-campus-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.unicor-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 30, 49, 0.1) 0%, rgba(0, 30, 49, 0.82) 100%);
}

.campus-pill {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #006496;
  font-size: 0.68rem;
  font-weight: 800;
}

.unicor-logo-box {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.unicor-logo-img {
  height: 42px;
  width: auto;
  display: block;
}

.text-white-90 {
  color: rgba(255, 255, 255, 0.9);
}

.card-body-text {
  font-size: clamp(0.86rem, 3.8cqmin, 1.05rem);
  color: #2c3e50;
  line-height: 1.42;
}

.academic-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.detail-box {
  background-color: #ffffff;
  border: 1.5px solid #cbdceb;
}

.detail-label {
  font-size: 0.68rem;
  font-weight: 800;
  color: #4b6375;
  text-transform: uppercase;
}

.detail-value {
  font-size: clamp(0.8rem, 3.4cqmin, 0.95rem);
  color: #001e31;
}

.pillar-emoji {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: #f0f7ff;
  border: 1px solid #d7e3ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.pillar-title {
  font-size: clamp(0.98rem, 7cqmin, 1.2rem);
  color: #001e31;
  line-height: 1.15;
}

.pillar-sub {
  font-size: 0.76rem;
  font-weight: 700;
  color: #006496;
}

.pillar-desc {
  font-size: clamp(0.84rem, 5.5cqmin, 0.98rem);
  color: #3f4851;
  line-height: 1.38;
}

.min-h-0 {
  min-height: 0;
}

.gap-3 {
  gap: 12px;
}

@media (max-width: 960px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .academic-details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
