<template>
  <div class="interactive-tree-slide d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl h-100">
    <div class="d-flex flex-wrap align-center justify-space-between gap-2">
      <div>
        <span class="step-badge">⚡ 3. Laboratorio de Entrenamiento en Córdoba</span>
        <h3 class="fluid-sim-title font-weight-bold mt-1">
          Prueba 3 preguntas posibles y descubre cuál entrena mejor al Árbol:
        </h3>
      </div>

      <v-btn
        color="primary"
        variant="flat"
        size="small"
        rounded="lg"
        class="text-none font-weight-bold"
        prepend-icon="mdi-fullscreen"
        @click="$emit('zoom', 'entrenamiento')"
      >
        Ampliar laboratorio
      </v-btn>
    </div>

    <!-- Botones de las 3 preguntas candidatas -->
    <div class="d-flex flex-wrap gap-2 my-2">
      <v-btn
        v-for="(cand, idx) in candidates"
        :key="cand.question"
        size="small"
        rounded="lg"
        :color="modelValue === idx ? cand.color : 'default'"
        :variant="modelValue === idx ? 'flat' : 'tonal'"
        class="text-none font-weight-bold"
        @click="$emit('update:modelValue', idx)"
      >
        {{ cand.emoji }} {{ cand.short }}
      </v-btn>
    </div>

    <!-- Visualizador SVG de cómo se separan los 6 días históricos de Córdoba -->
    <div
      class="tree-canvas-wrap flex-1-1 d-flex align-center justify-center my-1 cursor-pointer"
      @click="$emit('zoom', 'entrenamiento')"
    >
      <svg viewBox="0 0 640 265" class="interactive-tree-svg">
        <path d="M320 68 L165 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />
        <path d="M320 68 L475 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />

        <rect x="200" y="92" width="46" height="22" rx="11" fill="#006496" />
        <text x="223" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

        <rect x="394" y="92" width="46" height="22" rx="11" fill="#006496" />
        <text x="417" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>

        <!-- Nodo Raíz con los 6 días iniciales -->
        <rect x="145" y="8" width="350" height="60" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="3" />
        <text x="320" y="30" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">
          {{ candidates[modelValue]?.question }}
        </text>
        <text x="320" y="52" text-anchor="middle" fill="#cce5ff" font-size="11.5" font-weight="bold">
          Datos históricos: 🟢🟢🟢🟢 (4 Calma) y 🔴🔴 (2 Inundación)
        </text>

        <!-- Canasta Izquierda (NO) -->
        <rect
          x="35"
          y="150"
          width="255"
          height="95"
          rx="16"
          :fill="modelValue === 2 ? '#e8f8d8' : '#fff8e1'"
          :stroke="modelValue === 2 ? '#76b82a' : '#ffc21c'"
          stroke-width="3"
        />
        <text x="162" y="176" text-anchor="middle" fill="#001e31" font-size="12.5" font-weight="bold">
          Grupo NO ({{ candidates[modelValue]?.leftLabel }})
        </text>
        <text x="162" y="205" text-anchor="middle" font-size="22">
          {{ candidates[modelValue]?.leftDots }}
        </text>
        <text x="162" y="232" text-anchor="middle" fill="#3f4851" font-size="11" font-weight="bold">
          {{ candidates[modelValue]?.leftStatus }}
        </text>

        <!-- Canasta Derecha (SÍ) -->
        <rect
          x="350"
          y="150"
          width="255"
          height="95"
          rx="16"
          :fill="modelValue === 2 ? '#ffdad6' : '#fff8e1'"
          :stroke="modelValue === 2 ? '#ba1a1a' : '#ffc21c'"
          stroke-width="3"
        />
        <text x="477" y="176" text-anchor="middle" fill="#001e31" font-size="12.5" font-weight="bold">
          Grupo SÍ ({{ candidates[modelValue]?.rightLabel }})
        </text>
        <text x="477" y="205" text-anchor="middle" font-size="22">
          {{ candidates[modelValue]?.rightDots }}
        </text>
        <text x="477" y="232" text-anchor="middle" fill="#3f4851" font-size="11" font-weight="bold">
          {{ candidates[modelValue]?.rightStatus }}
        </text>
      </svg>
    </div>

    <!-- Resultado de calidad de la pregunta -->
    <div class="scenario-explanation d-flex align-center justify-space-between gap-2 pa-3 rounded-xl">
      <div>
        <span class="fluid-sim-exp font-weight-bold" style="color: #006496;">
          Calidad de la pregunta ({{ candidates[modelValue]?.purity }}):
        </span>
        <span class="fluid-sim-exp ml-1" style="color: #001e31;">
          {{ candidates[modelValue]?.verdict }}
        </span>
      </div>
      <v-btn
        icon="mdi-magnify-plus-outline"
        size="x-small"
        color="primary"
        variant="tonal"
        @click="$emit('zoom', 'entrenamiento')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  candidates: {
    short: string
    emoji: string
    color: string
    question: string
    leftLabel: string
    leftDots: string
    leftStatus: string
    rightLabel: string
    rightDots: string
    rightStatus: string
    purity: string
    verdict: string
  }[]
}>()

defineEmits<{
  (e: 'update:modelValue', idx: number): void
  (e: 'zoom', type: 'entrenamiento'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



