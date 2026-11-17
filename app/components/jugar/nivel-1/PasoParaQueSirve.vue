<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-waves-arrow-up" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">🎯 2. ¿Para qué sirve esta técnica?</span>
        <span class="card-emoji-sticker">🌊</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          Prevenir inundaciones en Córdoba con inteligencia
        </h3>
        <p class="fluid-slide-p mb-3">
          En municipios cercanos al <strong>Río Sinú</strong> (Montería, Cereté, San Pelayo o Lorica), cuando llueve
          mucho el río puede subir y causar <strong>inundaciones</strong>.
        </p>
        <p class="fluid-slide-p mb-0">
          <strong>¿Para qué sirve un Árbol de Decisión aquí?</strong><br>
          Para que la computadora analice pistas sencillas del clima y del río y <strong>decida en segundos si hay
            riesgo de inundación</strong>, avisando a las comunidades a tiempo.
        </p>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          ✨ <strong>Su gran ventaja:</strong> ¡Es transparente! Cualquier estudiante o habitante puede mirar las ramas
          del árbol y entender <em>exactamente por qué</em> se activó una alerta.
        </div>
      </div>
    </div>

    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="step-badge">⚙️ Cómo actúa paso a paso</span>
        <v-btn size="small" color="primary" variant="tonal" rounded="lg" class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline" @click="$emit('zoom', 'flujo')">
          Ver detalles
        </v-btn>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl mb-2">
        <div class="flow-emoji-circle bg-info-soft"><span>🌧️</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #006496;">
            1. Observa pistas sencillas (Datos)
          </div>
          <div class="fluid-flow-desc">
            Mira si está lloviendo fuerte en Córdoba y si el Río Sinú ha subido hacia la orilla.
          </div>
        </div>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl mb-2">
        <div class="flow-emoji-circle bg-secondary-soft"><span>🌿</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #3d6a00;">
            2. El Árbol hace preguntas (Sí / No)
          </div>
          <div class="fluid-flow-desc">
            Recorre las ramas paso a paso según lo que está pasando en el río en ese momento.
          </div>
        </div>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
        <div class="flow-emoji-circle bg-warning-soft"><span>📢</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #795900;">
            3. Clasifica y avisa a la comunidad
          </div>
          <div class="fluid-flow-desc">
            Decide entre <strong>🟢 Río en Calma</strong>, <strong>🟡 Vigilancia</strong> o <strong>🔴 Alerta de
              Inundación</strong>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'zoom', type: 'flujo'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>


