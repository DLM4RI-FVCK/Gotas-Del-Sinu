<template>
  <div class="interactive-tree-slide d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl h-100">
    <div class="d-flex flex-wrap align-center justify-space-between gap-2">
      <div>
        <span class="step-badge">🔍 2. Explorador interactivo de conceptos</span>
        <h3 class="fluid-sim-title font-weight-bold mt-1">
          Toca cada parte del árbol para ver cómo se llama y qué hace en Córdoba:
        </h3>
      </div>

      <v-btn
        color="primary"
        variant="flat"
        size="small"
        rounded="lg"
        class="text-none font-weight-bold"
        prepend-icon="mdi-fullscreen"
        @click="$emit('zoom', 'explorador')"
      >
        Ampliar explorador
      </v-btn>
    </div>

    <!-- Botones de las 4 partes -->
    <div class="d-flex flex-wrap gap-2 my-2">
      <v-btn
        v-for="(part, idx) in parts"
        :key="part.name"
        size="small"
        rounded="lg"
        :color="modelValue === idx ? part.color : 'default'"
        :variant="modelValue === idx ? 'flat' : 'tonal'"
        class="text-none font-weight-bold"
        @click="$emit('update:modelValue', idx)"
      >
        {{ part.emoji }} {{ part.name }}
      </v-btn>
    </div>

    <!-- Gráfico SVG donde se ilumina la parte seleccionada -->
    <div
      class="tree-canvas-wrap flex-1-1 d-flex align-center justify-center my-1 cursor-pointer"
      title="Haz clic para ampliar"
      @click="$emit('zoom', 'explorador')"
    >
      <svg viewBox="0 0 640 270" class="interactive-tree-svg">
        <!-- RAMAS (se iluminan cuando modelValue === 1) -->
        <path
          d="M320 58 L145 145 M320 58 L465 130 M465 172 L355 225 M465 172 L555 225"
          :stroke="modelValue === 1 ? '#ffc21c' : '#90a4ae'"
          :stroke-width="modelValue === 1 ? 7 : 3.5"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Etiquetas de Ramas -->
        <g :opacity="modelValue === 1 ? 1 : 0.7">
          <rect x="200" y="80" width="54" height="22" rx="11" :fill="modelValue === 1 ? '#bf8f00' : '#78909c'" />
          <text x="227" y="95" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Rama NO</text>

          <rect x="378" y="76" width="54" height="22" rx="11" :fill="modelValue === 1 ? '#bf8f00' : '#78909c'" />
          <text x="405" y="91" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Rama SÍ</text>
        </g>

        <!-- NODO RAÍZ (se ilumina cuando modelValue === 0) -->
        <g class="cursor-pointer" @click.stop="$emit('update:modelValue', 0)">
          <rect
            x="175"
            y="8"
            width="290"
            height="50"
            rx="14"
            :fill="modelValue === 0 ? '#006496' : '#e2efff'"
            :stroke="modelValue === 0 ? '#ffc21c' : '#006496'"
            :stroke-width="modelValue === 0 ? 4 : 2"
          />
          <text x="320" y="30" text-anchor="middle" :fill="modelValue === 0 ? '#ffffff' : '#001e31'" font-size="13" font-weight="bold">
            👑 NODO RAÍZ: ¿Llueve fuerte en Córdoba?
          </text>
          <text x="320" y="47" text-anchor="middle" :fill="modelValue === 0 ? '#cce5ff' : '#4b6375'" font-size="10">
            Primera pregunta principal (Arriba del todo)
          </text>
        </g>

        <!-- NODO DE DECISIÓN INTERNO (se ilumina cuando modelValue === 2) -->
        <g class="cursor-pointer" @click.stop="$emit('update:modelValue', 2)">
          <rect
            x="335"
            y="124"
            width="260"
            height="48"
            rx="14"
            :fill="modelValue === 2 ? '#129fea' : '#f0f7ff'"
            :stroke="modelValue === 2 ? '#001e31' : '#129fea'"
            :stroke-width="modelValue === 2 ? 4 : 2"
          />
          <text x="465" y="146" text-anchor="middle" :fill="modelValue === 2 ? '#ffffff' : '#001e31'" font-size="12" font-weight="bold">
            🔍 NODO DECISIÓN: ¿Subió el Río Sinú?
          </text>
          <text x="465" y="162" text-anchor="middle" :fill="modelValue === 2 ? '#eef8ff' : '#4b6375'" font-size="10">
            Pregunta intermedia
          </text>
        </g>

        <!-- NODOS HOJA (se iluminan cuando modelValue === 3) -->
        <g class="cursor-pointer" @click.stop="$emit('update:modelValue', 3)">
          <rect
            x="30"
            y="142"
            width="225"
            height="52"
            rx="14"
            :fill="modelValue === 3 ? '#76b82a' : '#eef9e3'"
            :stroke="modelValue === 3 ? '#001e31' : '#76b82a'"
            :stroke-width="modelValue === 3 ? 3.5 : 2"
          />
          <text x="142" y="165" text-anchor="middle" :fill="modelValue === 3 ? '#ffffff' : '#3d6a00'" font-size="12.5" font-weight="bold">
            🍃 NODO HOJA: Río en Calma
          </text>
          <text x="142" y="182" text-anchor="middle" :fill="modelValue === 3 ? '#f1f8e9' : '#3f4851'" font-size="10">
            Decisión final 1
          </text>

          <rect
            x="245"
            y="218"
            width="195"
            height="46"
            rx="12"
            :fill="modelValue === 3 ? '#76b82a' : '#eef9e3'"
            :stroke="modelValue === 3 ? '#001e31' : '#76b82a'"
            :stroke-width="modelValue === 3 ? 3.5 : 2"
          />
          <text x="342" y="239" text-anchor="middle" :fill="modelValue === 3 ? '#ffffff' : '#3d6a00'" font-size="11.5" font-weight="bold">
            🍃 HOJA: Vigilancia
          </text>
          <text x="342" y="254" text-anchor="middle" :fill="modelValue === 3 ? '#f1f8e9' : '#3f4851'" font-size="10">
            Decisión final 2
          </text>

          <rect
            x="455"
            y="218"
            width="175"
            height="46"
            rx="12"
            :fill="modelValue === 3 ? '#76b82a' : '#eef9e3'"
            :stroke="modelValue === 3 ? '#001e31' : '#76b82a'"
            :stroke-width="modelValue === 3 ? 3.5 : 2"
          />
          <text x="542" y="239" text-anchor="middle" :fill="modelValue === 3 ? '#ffffff' : '#3d6a00'" font-size="11.5" font-weight="bold">
            🍃 HOJA: ¡Alerta Roja!
          </text>
          <text x="542" y="254" text-anchor="middle" :fill="modelValue === 3 ? '#f1f8e9' : '#3f4851'" font-size="10">
            Decisión final 3
          </text>
        </g>
      </svg>
    </div>

    <div class="scenario-explanation d-flex align-center justify-space-between gap-2 pa-3 rounded-xl">
      <div>
        <span class="fluid-sim-exp font-weight-bold" style="color: #006496;">
          {{ parts[modelValue]?.emoji }} {{ parts[modelValue]?.name }}:
        </span>
        <span class="fluid-sim-exp ml-1" style="color: #001e31;">
          {{ parts[modelValue]?.desc }}
        </span>
      </div>
      <v-btn
        icon="mdi-magnify-plus-outline"
        size="x-small"
        color="primary"
        variant="tonal"
        @click="$emit('zoom', 'explorador')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  parts: { name: string; emoji: string; color: string; desc: string }[]
}>()

defineEmits<{
  (e: 'update:modelValue', idx: number): void
  (e: 'zoom', type: 'explorador'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



