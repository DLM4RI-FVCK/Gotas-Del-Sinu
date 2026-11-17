<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-weather-partly-rainy" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">💡 1. Analogía de la vida diaria</span>
        <span class="card-emoji-sticker">🌦️</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          Tú ya usas Árboles de Decisión todos los días
        </h3>
        <p class="fluid-slide-p mb-3">
          Imagina que vas a salir de tu casa en <strong>Montería</strong> y miras por la ventana. Sin darte cuenta, tu mente hace preguntas rápidas de <strong>SÍ o NO</strong>:
        </p>

        <div class="analogy-item pa-3 pa-sm-4 rounded-xl mb-3">
          <div class="fluid-box-title font-weight-bold mb-1">
            🤔 Pregunta 1: ¿El cielo está oscuro y nublado?
          </div>
          <div class="fluid-box-text">
            • Si es <strong>NO</strong> → Sales tranquilo sin paraguas ☀️<br>
            • Si es <strong>SÍ</strong> → Haces otra pregunta: <em>¿Ya están cayendo gotas?</em> 🌧️
          </div>
        </div>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          🤖 <strong>En Machine Learning:</strong> Un <em>Decision Tree</em> (Árbol de Decisión) es enseñarle a una computadora a decidir haciendo preguntas sencillas paso a paso, como las ramas de un árbol.
        </div>
      </div>
    </div>

    <div class="slide-visual-col d-flex flex-column align-center justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between w-100 gap-2">
        <span class="step-badge">🗺️ Mapa mental en árbol</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'analogia')"
        >
          Ver gráfico grande
        </v-btn>
      </div>

      <svg viewBox="0 0 460 285" class="diagram-svg my-auto" @click="$emit('zoom', 'analogia')">
        <path d="M230 62 L120 140" stroke="#76b82a" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M230 62 L340 140" stroke="#006496" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M340 176 L265 242" stroke="#ffc21c" stroke-width="5" fill="none" stroke-linecap="round" />
        <path d="M340 176 L405 242" stroke="#129fea" stroke-width="5" fill="none" stroke-linecap="round" />

        <rect x="148" y="84" width="42" height="24" rx="12" fill="#76b82a" />
        <text x="169" y="100" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">NO</text>

        <rect x="272" y="84" width="42" height="24" rx="12" fill="#006496" />
        <text x="293" y="100" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">SÍ</text>

        <rect x="272" y="194" width="38" height="22" rx="11" fill="#bf8f00" />
        <text x="291" y="209" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

        <rect x="366" y="194" width="38" height="22" rx="11" fill="#129fea" />
        <text x="385" y="209" text-anchor="middle" fill="#fff" font-weight="bold" font-size="11">SÍ</text>

        <rect x="120" y="12" width="220" height="52" rx="14" fill="#006496" />
        <text x="230" y="35" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">☁️ ¿Está nublado el cielo?</text>
        <text x="230" y="53" text-anchor="middle" fill="#cce5ff" font-size="11">(Primera pregunta)</text>

        <rect x="25" y="136" width="185" height="50" rx="14" fill="#eef9e3" stroke="#76b82a" stroke-width="3" />
        <text x="117" y="159" text-anchor="middle" fill="#3d6a00" font-size="13" font-weight="bold">☀️ Salir sin sombrilla</text>
        <text x="117" y="176" text-anchor="middle" fill="#3f4851" font-size="11">Decisión final</text>

        <rect x="245" y="136" width="190" height="46" rx="12" fill="#e2efff" stroke="#006496" stroke-width="2.5" />
        <text x="340" y="164" text-anchor="middle" fill="#001e31" font-size="12.5" font-weight="bold">🌧️ ¿Caen gotas de lluvia?</text>

        <rect x="195" y="236" width="132" height="44" rx="12" fill="#fff8e1" stroke="#ffc21c" stroke-width="2.5" />
        <text x="261" y="263" text-anchor="middle" fill="#795900" font-size="11.5" font-weight="bold">🌂 Llevar sombrilla</text>

        <rect x="336" y="236" width="118" height="44" rx="12" fill="#e1f5fe" stroke="#129fea" stroke-width="2.5" />
        <text x="395" y="263" text-anchor="middle" fill="#006496" font-size="11.5" font-weight="bold">🧥 Impermeable</text>
      </svg>

      <div class="visual-caption text-center w-100 pa-2 rounded-lg">
        Se llama <strong>Árbol</strong> porque empieza arriba en una pregunta principal y se abre en ramas hacia abajo.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'zoom', type: 'analogia'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



