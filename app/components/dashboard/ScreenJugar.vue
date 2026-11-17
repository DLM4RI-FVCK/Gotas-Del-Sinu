<template>
  <div class="screen-box position-relative">
    <Transition name="fade-stage" mode="out-in">
      <!-- Fase A: Animación tipo "Loading" de la Rueda 5E (No interactiva) -->
      <JugarIntroWheel5E
        v-if="stage === 'intro'"
        key="intro"
        @finished="stage = 'map'"
      />

      <!-- Fase B: Mapa de los 5 Niveles (bloqueados hasta superar el anterior) -->
      <JugarLevelsMap
        v-else-if="stage === 'map'"
        key="map"
        @select-level="openLevel"
        @replay-intro="stage = 'intro'"
        @close="$emit('close')"
      />

      <!-- Nivel 1 (Modular en app/components/jugar/nivel-1/) -->
      <JugarNivel1Container
        v-else-if="stage === 'level-1'"
        key="level-1"
        @back-to-map="stage = 'map'"
      />

      <!-- Nivel 2 (Modular en app/components/jugar/nivel-2/) -->
      <JugarNivel2Container
        v-else-if="stage === 'level-2'"
        key="level-2"
        @back-to-map="stage = 'map'"
      />

      <!-- Nivel 3 (Modular en app/components/jugar/nivel-3/) -->
      <JugarNivel3Container
        v-else-if="stage === 'level-3'"
        key="level-3"
        @back-to-map="stage = 'map'"
      />

      <!-- Nivel 4 (Modular en app/components/jugar/nivel-4/) -->
      <JugarNivel4Container
        v-else-if="stage === 'level-4'"
        key="level-4"
        @back-to-map="stage = 'map'"
      />

      <!-- Nivel 5 (Modular en app/components/jugar/nivel-5/) -->
      <JugarNivel5Container
        v-else-if="stage === 'level-5'"
        key="level-5"
        @back-to-map="stage = 'map'"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()

const { setContext } = useZenuitoContext()

type JugarStage = 'intro' | 'map' | 'level-1' | 'level-2' | 'level-3' | 'level-4' | 'level-5'
const stage = ref<JugarStage>('intro')

watch(stage, (newStage) => {
  if (newStage === 'intro') {
    setContext({
      seccion: 'Rueda 5E',
      fase5E: 'Introducción Metodológica',
      descripcionVisual: 'Rueda pedagógica 5E de Aprendizaje de Ciencias y Machine Learning.'
    })
  } else if (newStage === 'map') {
    setContext({
      seccion: 'Mapa de Misiones',
      fase5E: 'Selección de Nivel',
      descripcionVisual: 'Mapa interactivo con las 5 misiones a lo largo de la cuenca del Río Sinú.'
    })
  } else if (newStage === 'level-1') {
    setContext({
      seccion: 'Misión 1: Introducción',
      nivelActual: 1,
      fase5E: 'Engage (Enganchar)',
      descripcionVisual: 'Concepto intuitivo de árboles de decisión y analogía con el Río Sinú y el Sombrero Vueltiao.'
    })
  } else if (newStage === 'level-2') {
    setContext({
      seccion: 'Misión 2: Anatomía del Árbol',
      nivelActual: 2,
      fase5E: 'Explore (Explorar)',
      descripcionVisual: 'Partes del árbol (Raíz, Ramas, Hojas) y umbrales de decisión con caudal y lluvias.'
    })
  } else if (newStage === 'level-3') {
    setContext({
      seccion: 'Misión 3: Pureza y Datos',
      nivelActual: 3,
      fase5E: 'Explain (Explicar)',
      descripcionVisual: 'Entrenamiento del árbol, datos históricos (D1 a D6) y cálculo de pureza/Gini.'
    })
  } else if (newStage === 'level-4') {
    setContext({
      seccion: 'Misión 4: Constructor Libre',
      nivelActual: 4,
      fase5E: 'Elaborate (Elaborar)',
      descripcionVisual: 'Canvas libre para crear nodos, hojas y simular entrenamiento dinámico paso a paso.'
    })
  } else if (newStage === 'level-5') {
    setContext({
      seccion: 'Misión 5: Evaluación y Casos',
      nivelActual: 5,
      fase5E: 'Evaluate (Evaluar)',
      descripcionVisual: 'Mini Quiz de casos prácticos con árboles territoriales de Tierralta, Montería, San Pelayo y Lorica.'
    })
  }
}, { immediate: true })

const openLevel = (levelNumber: number) => {
  if (levelNumber === 1) stage.value = 'level-1'
  else if (levelNumber === 2) stage.value = 'level-2'
  else if (levelNumber === 3) stage.value = 'level-3'
  else if (levelNumber === 4) stage.value = 'level-4'
  else if (levelNumber === 5) stage.value = 'level-5'
}
</script>

<style scoped>
.screen-box {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  border-radius: 24px;
  overflow: hidden;
}

.fade-stage-enter-active,
.fade-stage-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.fade-stage-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.fade-stage-leave-to {
  opacity: 0;
  transform: scale(1.01);
}
</style>
