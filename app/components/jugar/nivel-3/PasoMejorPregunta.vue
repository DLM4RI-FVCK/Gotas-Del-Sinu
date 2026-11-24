<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-filter-check-outline" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">🔬 2. El secreto del entrenamiento</span>
        <span class="card-emoji-sticker">🎯</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          Separar los casos sin dejarlos mezclados
        </h3>
        <p class="fluid-slide-p mb-3">
          ¿Cómo decide la computadora qué pregunta poner arriba en el <strong>Nodo Raíz</strong>? Prueba varias preguntas y elige la que <strong>separe más limpio</strong> los días tranquilos (🟢) de los días de inundación (🔴).
        </p>

        <div class="analogy-item pa-3 pa-sm-4 rounded-xl mb-3">
          <div class="fluid-box-title font-weight-bold mb-1">
            🧺 Analogía de separar frutas:
          </div>
          <div class="fluid-box-text">
            Es como separar mangos verdes y maduros en dos canastas: una <strong>buena pregunta</strong> deja cada canasta con un solo color, sin revolverlos.
          </div>
        </div>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          ✨ <strong>En Machine Learning:</strong> Cuando un grupo queda con casos de un solo tipo (todos 🟢 o todos 🔴), decimos que ese nodo es <strong>100% Puro</strong>.
        </div>
      </div>
    </div>

    <!-- Comparación visual: Pregunta Mala (Mezclada) vs Pregunta Buena (Pura) -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="step-badge">⚖️ Mala pregunta vs. Buena pregunta</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'pureza')"
        >
          Ampliar comparación
        </v-btn>
      </div>

      <!-- Tarjeta 1: Mala Pregunta -->
      <div class="flow-card compare-q-card pa-3 rounded-xl mb-2" style="border-color: #ffdad6; background: #fffbfa;">
        <div class="compare-q-header d-flex align-center justify-space-between mb-1">
          <span class="fluid-flow-title compare-q-title font-weight-bold" style="color: #ba1a1a;">
            ❌ Mala Pregunta: "¿Es día martes?"
          </span>
          <v-chip size="x-small" color="error" variant="flat" class="purity-capsule font-weight-bold">
            Todo mezclado
          </v-chip>
        </div>
        <div class="fluid-flow-desc compare-q-desc mb-2">
          Las inundaciones en el Río Sinú no dependen del día de la semana. Ambos grupos quedan revueltos:
        </div>
        <div class="baskets-row d-flex gap-2">
          <div class="basket-pill flex-1-1 text-center pa-2 rounded-lg">
            Rama NO: 🟢🟢🔴 (Mezclado)
          </div>
          <div class="basket-pill flex-1-1 text-center pa-2 rounded-lg">
            Rama SÍ: 🟢🔴 (Mezclado)
          </div>
        </div>
      </div>

      <!-- Tarjeta 2: Buena Pregunta -->
      <div class="flow-card compare-q-card pa-3 rounded-xl" style="border-color: #76b82a; background: #f6fdf0;">
        <div class="compare-q-header d-flex align-center justify-space-between mb-1">
          <span class="fluid-flow-title compare-q-title font-weight-bold" style="color: #3d6a00;">
            ✅ Buena Pregunta: "¿Río al borde tras lluvia?"
          </span>
          <v-chip size="x-small" color="success" variant="flat" class="purity-capsule font-weight-bold">
            ¡Grupos Puros!
          </v-chip>
        </div>
        <div class="fluid-flow-desc compare-q-desc mb-2">
          Esta pregunta separa perfectamente los días en calma de las inundaciones en Córdoba:
        </div>
        <div class="baskets-row d-flex gap-2">
          <div class="basket-pill pure-green flex-1-1 text-center pa-2 rounded-lg">
            Rama NO: 🟢🟢🟢 (100% Calma)
          </div>
          <div class="basket-pill pure-red flex-1-1 text-center pa-2 rounded-lg">
            Rama SÍ: 🔴🔴 (100% Alerta)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'zoom', type: 'pureza'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.basket-pill {
  background-color: #ffffff;
  border: 1.5px solid #cfdbe6;
  font-size: clamp(0.78rem, 3.2cqmin, 0.96rem);
  font-weight: 700;
  color: #001e31;
}

.basket-pill.pure-green {
  border-color: #76b82a;
  background-color: #eef9e3;
  color: #3d6a00;
}

.basket-pill.pure-red {
  border-color: #ba1a1a;
  background-color: #ffdad6;
  color: #93000a;
}

@media (max-width: 900px) {
  .compare-q-card {
    padding: 14px !important;
  }

  .compare-q-header {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 8px !important;
    margin-bottom: 10px !important;
  }

  .compare-q-title {
    width: 100% !important;
    text-align: center !important;
    font-size: 0.94rem !important;
    line-height: 1.28 !important;
  }

  .purity-capsule {
    height: 26px !important;
    padding: 0 14px !important;
    font-size: 0.76rem !important;
    font-weight: 800 !important;
    letter-spacing: 0.02em;
    align-self: center !important;
  }

  .compare-q-desc {
    text-align: center !important;
    margin-bottom: 10px !important;
  }

  .baskets-row {
    flex-direction: column !important;
    gap: 8px !important;
  }

  .basket-pill {
    width: 100% !important;
    font-size: 0.82rem !important;
    padding: 8px 12px !important;
    white-space: nowrap !important;
  }
}
</style>

