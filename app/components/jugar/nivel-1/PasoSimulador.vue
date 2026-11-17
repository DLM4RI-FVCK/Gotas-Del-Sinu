<template>
  <div class="interactive-tree-slide d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl h-100">
    <div class="d-flex flex-wrap align-center justify-space-between gap-2">
      <div>
        <span class="step-badge">⚡ 3. Simulador en vivo del Río Sinú</span>
        <h3 class="fluid-sim-title font-weight-bold mt-1">
          Elige un clima en Córdoba y mira qué ramas se iluminan:
        </h3>
      </div>

      <v-btn
        color="primary"
        variant="flat"
        size="small"
        rounded="lg"
        class="text-none font-weight-bold"
        prepend-icon="mdi-fullscreen"
        @click="$emit('zoom', 'simulador')"
      >
        Ampliar simulador y explicación
      </v-btn>
    </div>

    <div class="d-flex flex-wrap gap-2 my-2">
      <v-btn
        v-for="(sc, idx) in scenarios"
        :key="sc.label"
        size="small"
        rounded="lg"
        :color="modelValue === idx ? sc.color : 'default'"
        :variant="modelValue === idx ? 'flat' : 'tonal'"
        class="text-none font-weight-bold"
        :prepend-icon="sc.icon"
        @click="$emit('update:modelValue', idx)"
      >
        {{ sc.label }}
      </v-btn>
    </div>

    <div
      class="tree-canvas-wrap flex-1-1 d-flex align-center justify-center my-1 cursor-pointer"
      title="Haz clic para ampliar el gráfico"
      @click="$emit('zoom', 'simulador')"
    >
      <svg viewBox="0 0 640 270" class="interactive-tree-svg">
        <path d="M320 58 L145 145" :stroke="modelValue === 0 ? '#76b82a' : '#cfdbe6'" :stroke-width="modelValue === 0 ? 6 : 3" fill="none" stroke-linecap="round" />
        <path d="M320 58 L465 130" :stroke="modelValue !== 0 ? '#006496' : '#cfdbe6'" :stroke-width="modelValue !== 0 ? 6 : 3" fill="none" stroke-linecap="round" />
        <path d="M465 170 L355 225" :stroke="modelValue === 1 ? '#ffc21c' : '#cfdbe6'" :stroke-width="modelValue === 1 ? 6 : 3" fill="none" stroke-linecap="round" />
        <path d="M465 170 L555 225" :stroke="modelValue === 2 ? '#ba1a1a' : '#cfdbe6'" :stroke-width="modelValue === 2 ? 6 : 3" fill="none" stroke-linecap="round" />

        <rect x="200" y="80" width="44" height="22" rx="11" :fill="modelValue === 0 ? '#76b82a' : '#b0bec5'" />
        <text x="222" y="95" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

        <rect x="380" y="76" width="44" height="22" rx="11" :fill="modelValue !== 0 ? '#006496' : '#b0bec5'" />
        <text x="402" y="91" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>

        <rect x="380" y="182" width="40" height="20" rx="10" :fill="modelValue === 1 ? '#bf8f00' : '#b0bec5'" />
        <text x="400" y="196" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">NO</text>

        <rect x="502" y="182" width="40" height="20" rx="10" :fill="modelValue === 2 ? '#ba1a1a' : '#b0bec5'" />
        <text x="522" y="196" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">SÍ</text>

        <rect x="185" y="10" width="270" height="48" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="3" />
        <text x="320" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">1. ¿Está lloviendo fuerte en Córdoba?</text>
        <text x="320" y="48" text-anchor="middle" fill="#cce5ff" font-size="10">Pregunta inicial del árbol</text>

        <rect x="35" y="142" width="220" height="54" rx="14" :fill="modelValue === 0 ? '#e8f8d8' : '#f5f7fa'" :stroke="modelValue === 0 ? '#76b82a' : '#cfdbe6'" stroke-width="3" />
        <text x="145" y="166" text-anchor="middle" fill="#3d6a00" font-size="13" font-weight="bold">🟢 Río Sinú en Calma</text>
        <text x="145" y="184" text-anchor="middle" fill="#3f4851" font-size="11">Sin riesgo de inundación</text>

        <rect x="345" y="124" width="240" height="48" rx="14" :fill="modelValue !== 0 ? '#e2efff' : '#f5f7fa'" :stroke="modelValue !== 0 ? '#006496' : '#cfdbe6'" stroke-width="3" />
        <text x="465" y="146" text-anchor="middle" fill="#001e31" font-size="12" font-weight="bold">2. ¿El río ya subió hasta la orilla?</text>
        <text x="465" y="162" text-anchor="middle" fill="#4b6375" font-size="10">Segunda pregunta</text>

        <rect x="255" y="218" width="195" height="46" rx="12" :fill="modelValue === 1 ? '#fff8e1' : '#f5f7fa'" :stroke="modelValue === 1 ? '#ffc21c' : '#cfdbe6'" stroke-width="3" />
        <text x="352" y="239" text-anchor="middle" fill="#795900" font-size="12" font-weight="bold">🟡 Vigilancia Preventiva</text>
        <text x="352" y="255" text-anchor="middle" fill="#3f4851" font-size="10">Estar atentos a la ribera</text>

        <rect x="468" y="218" width="162" height="46" rx="12" :fill="modelValue === 2 ? '#ffdad6' : '#f5f7fa'" :stroke="modelValue === 2 ? '#ba1a1a' : '#cfdbe6'" stroke-width="3" />
        <text x="549" y="239" text-anchor="middle" fill="#93000a" font-size="12" font-weight="bold">🔴 ¡Alerta Inundación!</text>
        <text x="549" y="255" text-anchor="middle" fill="#93000a" font-size="10">Avisar a los barrios</text>
      </svg>
    </div>

    <div class="scenario-explanation d-flex align-center justify-space-between gap-2 pa-3 rounded-xl">
      <div>
        <span class="fluid-sim-exp font-weight-bold" style="color: #001e31;">🧭 Recorrido:</span>
        <span class="fluid-sim-exp ml-1" style="color: #3f4851;">
          {{ scenarios[modelValue]?.explanation }}
        </span>
      </div>
      <v-btn
        icon="mdi-magnify-plus-outline"
        size="x-small"
        color="primary"
        variant="tonal"
        title="Ver explicación ampliada"
        @click="$emit('zoom', 'simulador')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: number
  scenarios: { label: string; icon: string; color: string; explanation: string }[]
}>()

defineEmits<{
  (e: 'update:modelValue', idx: number): void
  (e: 'zoom', type: 'simulador'): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



