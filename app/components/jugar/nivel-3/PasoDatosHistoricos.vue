<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-notebook-check-outline" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">🧠 1. ¿De dónde aprende la máquina?</span>
        <span class="card-emoji-sticker">📒</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          La bitácora de recuerdos del Río Sinú
        </h3>
        <p class="fluid-slide-p mb-3">
          Una computadora no nace sabiendo qué es una inundación en Córdoba. Para que pueda construir su <strong>Árbol de Decisión</strong>, primero debemos mostrarle <strong>ejemplos del pasado</strong>.
        </p>

        <div class="analogy-item pa-3 pa-sm-4 rounded-xl mb-3">
          <div class="fluid-box-title font-weight-bold mb-1">
            👴 Analogía del abuelo ribereño:
          </div>
          <div class="fluid-box-text">
            Un pescador experimentado en <strong>Lorica o Tierralta</strong> sabe cuándo va a crecer el río porque <em>recuerda muchas lluvias pasadas</em>. En Machine Learning, esos recuerdos se llaman <strong>Datos de Entrenamiento</strong>.
          </div>
        </div>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          📊 <strong>Mira la tabla a la derecha:</strong> Cada fila es un día real del pasado en Córdoba con sus pistas (<em>¿Llovió? ¿Subió el río?</em>) y lo que pasó al final.
        </div>
      </div>
    </div>

    <!-- Tabla visual de datos de entrenamiento en Córdoba -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="step-badge">📋 Datos de Entrenamiento (Córdoba)</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'datos')"
        >
          Ver tabla grande
        </v-btn>
      </div>

      <div class="dataset-box my-auto rounded-xl overflow-hidden" @click="$emit('zoom', 'datos')">
        <div class="dataset-row dataset-header font-weight-bold">
          <span>Día en Córdoba</span>
          <span>¿Llueve fuerte?</span>
          <span>¿Río al borde?</span>
          <span>Resultado Real</span>
        </div>

        <div
          v-for="row in trainingDays"
          :key="row.day"
          class="dataset-row"
        >
          <span class="font-weight-bold">{{ row.day }}</span>
          <span>{{ row.rain }}</span>
          <span>{{ row.river }}</span>
          <span class="font-weight-bold" :style="{ color: row.color }">
            {{ row.result }}
          </span>
        </div>
      </div>

      <div class="visual-caption text-center w-100 pa-2 rounded-lg mt-2">
        La computadora lee esta tabla para descubrir <strong>qué pistas provocan inundación</strong>.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'zoom', type: 'datos'): void
}>()

const trainingDays = [
  { day: 'Día 1 (Montería)', rain: 'No ☀️', river: 'No', result: '🟢 Calma', color: '#3d6a00' },
  { day: 'Día 2 (Cereté)', rain: 'No ☀️', river: 'No', result: '🟢 Calma', color: '#3d6a00' },
  { day: 'Día 3 (San Pelayo)', rain: 'Sí 🌧️', river: 'No', result: '🟢 Calma', color: '#3d6a00' },
  { day: 'Día 4 (Lorica)', rain: 'Sí ⛈️', river: 'Sí 🌊', result: '🔴 Inundación', color: '#ba1a1a' },
  { day: 'Día 5 (Tierralta)', rain: 'Sí ⛈️', river: 'Sí 🌊', result: '🔴 Inundación', color: '#ba1a1a' }
]
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.dataset-box {
  border: 2px solid #d7e3ee;
  background-color: #ffffff;
  cursor: pointer;
}

.dataset-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.1fr;
  gap: 6px;
  padding: clamp(7px, 2cqmin, 12px) 12px;
  font-size: clamp(0.76rem, 3.2cqmin, 0.96rem);
  border-bottom: 1px solid #e4f0f7;
  align-items: center;
}

.dataset-row:last-child {
  border-bottom: none;
}

.dataset-header {
  background-color: #006496;
  color: #ffffff;
}

@media (max-width: 960px) {
  .dataset-row {
    font-size: 0.78rem;
    padding: 8px 10px;
  }
}
</style>

