<template>
  <div class="slide-grid">
    <div class="slide-text-col d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-source-branch" class="col-watermark" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <span class="step-badge">🌿 1. El árbol que crece al revés</span>
        <span class="card-emoji-sticker">🙃</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <h3 class="fluid-slide-title font-weight-bold mb-3">
          Las 4 partes de un Árbol de Decisión
        </h3>
        <p class="fluid-slide-p mb-3">
          En la naturaleza, un árbol tiene la raíz abajo en la tierra y las hojas arriba. Pero en <strong>Machine Learning</strong>, ¡los Árboles de Decisión se dibujan <strong>al revés</strong>!
        </p>
        <p class="fluid-slide-p mb-0">
          Cada caja del árbol se llama <strong>Nodo</strong> y cada línea se llama <strong>Rama</strong>. Conocer sus 4 nombres te permitirá entender cualquier árbol de inteligencia artificial.
        </p>
      </div>

      <div class="highlight-callout pa-3 pa-sm-4 rounded-xl position-relative z-2">
        <div class="fluid-callout-text">
          💡 <strong>Regla de oro:</strong> Empiezas siempre arriba en la <strong>Raíz</strong>, bajas por las <strong>Ramas</strong> respondiendo preguntas en los <strong>Nodos de Decisión</strong> y terminas abajo en una <strong>Hoja</strong>.
        </div>
      </div>
    </div>

    <!-- Las 4 tarjetas de conceptos con stickers y botón de ampliar -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between mb-2">
        <span class="step-badge">🧩 Sus 4 piezas fundamentales</span>
        <v-btn
          size="small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="$emit('zoom', 'anatomia')"
        >
          Ver esquema grande
        </v-btn>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl mb-2">
        <div class="flow-emoji-circle bg-info-soft"><span>👑</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #006496;">
            1. Nodo Raíz (Root Node)
          </div>
          <div class="fluid-flow-desc">
            Es la <strong>primera gran pregunta</strong> arriba del todo donde comienza el árbol.
          </div>
        </div>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl mb-2">
        <div class="flow-emoji-circle bg-warning-soft"><span>🔀</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #795900;">
            2. Ramas (Branches) y 3. Nodos de Decisión
          </div>
          <div class="fluid-flow-desc">
            Las <strong>flechas (SÍ / NO)</strong> que bajan hacia nuevas <strong>preguntas intermedias</strong>.
          </div>
        </div>
      </div>

      <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
        <div class="flow-emoji-circle bg-secondary-soft"><span>🍃</span></div>
        <div class="flex-1-1">
          <div class="fluid-flow-title font-weight-bold" style="color: #3d6a00;">
            4. Nodos Hoja (Leaf Nodes)
          </div>
          <div class="fluid-flow-desc">
            Son las cajas finales de abajo. <strong>Ya no hacen preguntas</strong>: ¡dan la respuesta final!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'zoom', type: 'anatomia'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



