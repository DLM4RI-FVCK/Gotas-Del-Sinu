<template>
  <div class="nivel-wrap position-relative d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Barra superior del Nivel 5 -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-3 flex-shrink-0">
      <div class="d-flex align-center gap-3">
        <v-btn
          variant="tonal"
          color="primary"
          size="small"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-arrow-left"
          @click="$emit('back-to-map')"
        >
          Niveles
        </v-btn>

        <div>
          <span class="level-tag">🏆 Nivel 5 · Fase 5: Evaluar</span>
          <h2 class="top-level-title font-weight-bold">
            Mini Quiz Práctico: Recorriendo el Mapa del Río Sinú
          </h2>
        </div>
      </div>

      <span class="step-badge">🌊 4 Estaciones de Córdoba</span>
    </div>

    <!-- Contenido principal del Mini Quiz Práctico con Mapa -->
    <div class="slide-stage flex-1-1 min-h-0">
      <JugarNivel5MiniQuizPractico
        @finish-ova="$emit('back-to-map')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'back-to-map'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>


