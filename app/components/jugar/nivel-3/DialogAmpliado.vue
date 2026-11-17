<template>
  <Transition name="inpage-modal-fade">
    <div v-if="modalType" class="inpage-dialog-backdrop pa-3 pa-sm-5" @click.self="$emit('close')">
      <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
        <div class="d-flex align-center justify-space-between gap-2 pb-3 border-b">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-magnify-plus-outline" color="primary" size="24" />
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              {{
                modalType === 'datos'
                  ? 'Tabla Ampliada: Datos Históricos de Entrenamiento (Córdoba)'
                  : modalType === 'pureza'
                    ? 'Comparación Ampliada: Pregunta Mala vs. Pregunta Buena'
                    : 'Laboratorio Ampliado: Entrenando al Árbol del Río Sinú'
              }}
            </h3>
          </div>
          <v-btn
            color="primary"
            variant="tonal"
            size="small"
            rounded="lg"
            class="text-none font-weight-bold"
            prepend-icon="mdi-close"
            @click="$emit('close')"
          >
            Cerrar vista
          </v-btn>
        </div>

        <!-- Vista ampliada 1: Tabla de datos históricos -->
        <div v-if="modalType === 'datos'" class="inpage-dialog-body my-auto py-4">
          <p class="text-body-1 mb-3" style="color: #3f4851;">
            Esta es la bitácora de recuerdos que usa la computadora para aprender qué condiciones causan inundaciones en el Río Sinú:
          </p>
          <div class="zoomed-table rounded-xl overflow-hidden mb-3">
            <div class="zoomed-row zoomed-header font-weight-bold">
              <span>Registro</span>
              <span>¿Llovió fuerte?</span>
              <span>¿Río al borde?</span>
              <span>¿Qué ocurrió ese día?</span>
            </div>
            <div v-for="r in trainingDays" :key="r.day" class="zoomed-row">
              <span class="font-weight-bold">{{ r.day }}</span>
              <span>{{ r.rain }}</span>
              <span>{{ r.river }}</span>
              <span class="font-weight-bold" :style="{ color: r.color }">{{ r.result }}</span>
            </div>
          </div>
          <div class="pa-3 rounded-xl" style="background: #f7f9ff; border: 1px solid #d7e3ee;">
            <strong style="color: #006496;">Patrón descubierto por la máquina:</strong> Siempre que <strong>SÍ llueve fuerte</strong> y <strong>SÍ sube el río al borde</strong>, el resultado es 🔴 <strong>Inundación</strong>.
          </div>
        </div>

        <!-- Vista ampliada 2: Pureza -->
        <div v-else-if="modalType === 'pureza'" class="inpage-dialog-body my-auto py-4 d-flex flex-column gap-4">
          <div class="flow-card pa-4 rounded-xl" style="border-color: #ba1a1a; background: #fffbfa;">
            <div class="text-h6 font-weight-bold mb-1" style="color: #ba1a1a;">
              ❌ Cuando una pregunta NO sirve ("¿Es día martes?")
            </div>
            <p class="text-body-1 mb-2" style="color: #3f4851;">
              No ayuda a predecir inundaciones porque tanto en la rama SÍ como en la rama NO quedan revueltos días soleados (🟢) con días de inundación (🔴).
            </p>
          </div>

          <div class="flow-card pa-4 rounded-xl" style="border-color: #76b82a; background: #f6fdf0;">
            <div class="text-h6 font-weight-bold mb-1" style="color: #3d6a00;">
              ✅ Cuando una pregunta es EXCELENTE ("¿Llovió fuerte y subió el río?")
            </div>
            <p class="text-body-1 mb-0" style="color: #3f4851;">
              Separa con precisión todos los días tranquilos en una hoja (🟢🟢🟢🟢) y todos los días de emergencia en otra hoja (🔴🔴). ¡A eso se le llama <strong>Nodos Puros</strong>!
            </p>
          </div>
        </div>

        <!-- Vista ampliada 3: Laboratorio de entrenamiento -->
        <div v-else-if="modalType === 'entrenamiento'" class="inpage-dialog-body d-flex flex-column justify-space-between my-auto py-3">
          <div class="d-flex flex-wrap justify-center gap-2 mb-3">
            <v-btn
              v-for="(cand, idx) in candidates"
              :key="cand.question"
              size="default"
              rounded="lg"
              :color="activeCandidate === idx ? cand.color : 'default'"
              :variant="activeCandidate === idx ? 'flat' : 'tonal'"
              class="text-none font-weight-bold"
              @click="$emit('update:activeCandidate', idx)"
            >
              {{ cand.emoji }} {{ cand.short }}
            </v-btn>
          </div>

          <svg viewBox="0 0 640 265" class="zoomed-svg mx-auto mb-3">
            <path d="M320 68 L165 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />
            <path d="M320 68 L475 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />

            <rect x="200" y="92" width="46" height="22" rx="11" fill="#006496" />
            <text x="223" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

            <rect x="394" y="92" width="46" height="22" rx="11" fill="#006496" />
            <text x="417" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>

            <rect x="145" y="8" width="350" height="60" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="3" />
            <text x="320" y="30" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">
              {{ candidates[activeCandidate]?.question }}
            </text>
            <text x="320" y="52" text-anchor="middle" fill="#cce5ff" font-size="11.5" font-weight="bold">
              Datos históricos: 🟢🟢🟢🟢 (4 Calma) y 🔴🔴 (2 Inundación)
            </text>

            <rect x="35" y="150" width="255" height="95" rx="16" :fill="activeCandidate === 2 ? '#e8f8d8' : '#fff8e1'" :stroke="activeCandidate === 2 ? '#76b82a' : '#ffc21c'" stroke-width="3" />
            <text x="162" y="176" text-anchor="middle" fill="#001e31" font-size="12.5" font-weight="bold">
              Grupo NO ({{ candidates[activeCandidate]?.leftLabel }})
            </text>
            <text x="162" y="205" text-anchor="middle" font-size="22">
              {{ candidates[activeCandidate]?.leftDots }}
            </text>
            <text x="162" y="232" text-anchor="middle" fill="#3f4851" font-size="11" font-weight="bold">
              {{ candidates[activeCandidate]?.leftStatus }}
            </text>

            <rect x="350" y="150" width="255" height="95" rx="16" :fill="activeCandidate === 2 ? '#ffdad6' : '#fff8e1'" :stroke="activeCandidate === 2 ? '#ba1a1a' : '#ffc21c'" stroke-width="3" />
            <text x="477" y="176" text-anchor="middle" fill="#001e31" font-size="12.5" font-weight="bold">
              Grupo SÍ ({{ candidates[activeCandidate]?.rightLabel }})
            </text>
            <text x="477" y="205" text-anchor="middle" font-size="22">
              {{ candidates[activeCandidate]?.rightDots }}
            </text>
            <text x="477" y="232" text-anchor="middle" fill="#3f4851" font-size="11" font-weight="bold">
              {{ candidates[activeCandidate]?.rightStatus }}
            </text>
          </svg>

          <div class="pa-4 rounded-xl" style="background-color: #f7f9ff; border: 2px solid #006496;">
            <div class="text-subtitle-1 font-weight-bold mb-1" style="color: #006496;">
              Calidad de separación ({{ candidates[activeCandidate]?.purity }}):
            </div>
            <div class="text-body-1 font-weight-medium" style="color: #001e31;">
              {{ candidates[activeCandidate]?.verdict }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modalType: 'datos' | 'pureza' | 'entrenamiento' | null
  activeCandidate: number
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
  (e: 'close'): void
  (e: 'update:activeCandidate', idx: number): void
}>()

const trainingDays = [
  { day: 'Día 1 (Montería)', rain: 'No ☀️', river: 'No', result: '🟢 Río en Calma', color: '#3d6a00' },
  { day: 'Día 2 (Cereté)', rain: 'No ☀️', river: 'No', result: '🟢 Río en Calma', color: '#3d6a00' },
  { day: 'Día 3 (San Pelayo)', rain: 'Sí 🌧️', river: 'No', result: '🟢 Río en Calma', color: '#3d6a00' },
  { day: 'Día 4 (Lorica)', rain: 'Sí ⛈️', river: 'Sí 🌊', result: '🔴 Inundación', color: '#ba1a1a' },
  { day: 'Día 5 (Tierralta)', rain: 'Sí ⛈️', river: 'Sí 🌊', result: '🔴 Inundación', color: '#ba1a1a' }
]
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.zoomed-table {
  border: 2px solid #d7e3ee;
}

.zoomed-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
  padding: 12px 16px;
  border-bottom: 1px solid #e4f0f7;
  font-size: 1rem;
}

.zoomed-header {
  background-color: #006496;
  color: #ffffff;
}
</style>

