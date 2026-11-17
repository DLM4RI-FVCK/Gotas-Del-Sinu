<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-tune-variant" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">📏 3. ¿Cómo pregunta un Nodo?</span>
        <span class="card-emoji-sticker">⚖️</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          Las Condiciones o Reglas de Corte
        </h3>
        <p class="fluid-slide-p mb-3">
          Dentro de un <strong>Nodo Raíz</strong> o un <strong>Nodo de Decisión</strong>, la computadora no adivina al azar: usa una <strong>Condición clara</strong> (llamada <em>Split</em> o corte).
        </p>

        <div class="analogy-item pa-3 pa-sm-4 rounded-xl mb-3">
          <div class="fluid-box-title font-weight-bold mb-1">
            🌧️ Ejemplo en Montería y Cereté:
          </div>
          <div class="fluid-box-text">
            En lugar de preguntar algo confuso, el nodo pregunta con un límite claro:<br>
            <strong>"¿Lleva lloviendo más de 3 horas seguidas?"</strong>
          </div>
        </div>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          🎯 <strong>Prueba el deslizador a la derecha:</strong> Cambia las horas de lluvia en Córdoba y mira cómo el Nodo elige automáticamente la <strong>Rama NO</strong> o la <strong>Rama SÍ</strong>.
        </div>
      </div>
    </div>

    <!-- Simulador interactivo de condición / umbral -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between w-100">
        <span class="step-badge">🎛️ Prueba una condición en vivo</span>
        <span class="text-subtitle-2 font-weight-bold text-primary">
          Lluvia actual: {{ rainHours }} {{ rainHours === 1 ? 'hora' : 'horas' }}
        </span>
      </div>

      <div class="px-3 my-2">
        <v-slider
          v-model="rainHours"
          :min="0"
          :max="6"
          :step="1"
          show-ticks="always"
          thumb-label
          color="primary"
          track-color="grey-lighten-2"
          hide-details
        />
        <div class="d-flex justify-space-between text-caption font-weight-bold" style="color: #4b6375;">
          <span>0 h (Seco)</span>
          <span>3 h (Límite)</span>
          <span>6 h (Tormenta)</span>
        </div>
      </div>

      <svg viewBox="0 0 460 210" class="diagram-svg my-auto">
        <!-- Rama Izquierda: <= 3h (NO) -->
        <path
          d="M230 62 L120 140"
          :stroke="rainHours <= 3 ? '#76b82a' : '#cfdbe6'"
          :stroke-width="rainHours <= 3 ? 6 : 3"
          fill="none"
          stroke-linecap="round"
        />
        <!-- Rama Derecha: > 3h (SÍ) -->
        <path
          d="M230 62 L340 140"
          :stroke="rainHours > 3 ? '#ba1a1a' : '#cfdbe6'"
          :stroke-width="rainHours > 3 ? 6 : 3"
          fill="none"
          stroke-linecap="round"
        />

        <rect x="140" y="82" width="60" height="22" rx="11" :fill="rainHours <= 3 ? '#76b82a' : '#b0bec5'" />
        <text x="170" y="97" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO (≤ 3h)</text>

        <rect x="262" y="82" width="58" height="22" rx="11" :fill="rainHours > 3 ? '#ba1a1a' : '#b0bec5'" />
        <text x="291" y="97" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ (> 3h)</text>

        <!-- Nodo de Condición -->
        <rect x="105" y="10" width="250" height="52" rx="14" fill="#006496" />
        <text x="230" y="33" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">
          🔍 NODO: ¿Lluvia mayor a 3 horas?
        </text>
        <text x="230" y="51" text-anchor="middle" fill="#ffc21c" font-size="11" font-weight="bold">
          Dato actual: {{ rainHours }} h
        </text>

        <!-- Hoja Calma -->
        <rect
          x="20"
          y="138"
          width="195"
          height="54"
          rx="14"
          :fill="rainHours <= 3 ? '#e8f8d8' : '#f5f7fa'"
          :stroke="rainHours <= 3 ? '#76b82a' : '#cfdbe6'"
          stroke-width="3"
        />
        <text x="117" y="162" text-anchor="middle" fill="#3d6a00" font-size="12.5" font-weight="bold">
          🍃 Hoja: Caudal Normal
        </text>
        <text x="117" y="180" text-anchor="middle" fill="#3f4851" font-size="10.5">
          El suelo absorbe bien el agua
        </text>

        <!-- Hoja Alerta -->
        <rect
          x="245"
          y="138"
          width="195"
          height="54"
          rx="14"
          :fill="rainHours > 3 ? '#ffdad6' : '#f5f7fa'"
          :stroke="rainHours > 3 ? '#ba1a1a' : '#cfdbe6'"
          stroke-width="3"
        />
        <text x="342" y="162" text-anchor="middle" fill="#93000a" font-size="12.5" font-weight="bold">
          🍃 Hoja: Vigilar Creciente
        </text>
        <text x="342" y="180" text-anchor="middle" fill="#93000a" font-size="10.5">
          El Río Sinú empieza a subir
        </text>
      </svg>

      <div class="visual-caption text-center w-100 pa-2 rounded-lg">
        <span v-if="rainHours <= 3">
          Con <strong>{{ rainHours }} h</strong> (menor o igual a 3), la condición es <strong>NO</strong> y va a la hoja verde.
        </span>
        <span v-else>
          Con <strong>{{ rainHours }} h</strong> (mayor a 3), la condición se cumple (<strong>SÍ</strong>) y activa vigilancia.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rainHours = ref(2)
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



