<template>
  <Teleport to="body">
  <Transition name="inpage-modal-fade">
    <div v-if="modalType" class="inpage-dialog-backdrop pa-3 pa-sm-5" @click.self="$emit('close')">
      <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
        <div class="d-flex align-center justify-space-between gap-2 pb-3 border-b">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-magnify-plus-outline" color="primary" size="24" />
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              {{
                modalType === 'anatomia'
                  ? 'Esquema Ampliado: Las 4 Partes del Árbol de Decisión'
                  : 'Explorador Ampliado: Anatomía del Árbol en Córdoba'
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

        <div v-if="modalType === 'anatomia'" class="inpage-dialog-body my-auto py-4 d-flex flex-column gap-3">
          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-info-soft"><span>👑</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #006496;">1. Nodo Raíz (Root Node)</div>
              <div class="text-body-1" style="color: #3f4851;">
                Está <strong>arriba del todo</strong>. Es la primera pregunta principal que divide todos los casos (por ejemplo: <em>"¿Está lloviendo fuerte en Córdoba?"</em>).
              </div>
            </div>
          </div>

          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-warning-soft"><span>🔀</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #795900;">2. Ramas (Branches) y 3. Nodos de Decisión</div>
              <div class="text-body-1" style="color: #3f4851;">
                Las <strong>Ramas</strong> son los caminos de respuesta (<strong>SÍ</strong> o <strong>NO</strong>) que llevan a los <strong>Nodos de Decisión</strong>, donde el árbol hace una segunda pregunta para estar más seguro.
              </div>
            </div>
          </div>

          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-secondary-soft"><span>🍃</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #3d6a00;">4. Nodos Hoja (Leaf Nodes)</div>
              <div class="text-body-1" style="color: #3f4851;">
                Están al final de cada camino. <strong>Ya no tienen más ramas debajo</strong> porque entregan la decisión definitiva (<em>Calma</em>, <em>Vigilancia</em> o <em>Alerta de Inundación</em>).
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="modalType === 'explorador'" class="inpage-dialog-body d-flex flex-column justify-space-between my-auto py-3">
          <div class="d-flex flex-wrap justify-center gap-2 mb-3">
            <v-btn
              v-for="(part, idx) in parts"
              :key="part.name"
              size="default"
              rounded="lg"
              :color="activePart === idx ? part.color : 'default'"
              :variant="activePart === idx ? 'flat' : 'tonal'"
              class="text-none font-weight-bold"
              @click="$emit('update:activePart', idx)"
            >
              {{ part.emoji }} {{ part.name }}
            </v-btn>
          </div>

          <svg viewBox="0 0 640 270" class="zoomed-svg mx-auto mb-3">
            <path
              d="M320 58 L145 145 M320 58 L465 130 M465 172 L355 225 M465 172 L555 225"
              :stroke="activePart === 1 ? '#ffc21c' : '#90a4ae'"
              :stroke-width="activePart === 1 ? 7 : 3.5"
              fill="none"
              stroke-linecap="round"
            />

            <rect x="200" y="80" width="54" height="22" rx="11" :fill="activePart === 1 ? '#bf8f00' : '#78909c'" />
            <text x="227" y="95" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Rama NO</text>

            <rect x="378" y="76" width="54" height="22" rx="11" :fill="activePart === 1 ? '#bf8f00' : '#78909c'" />
            <text x="405" y="91" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Rama SÍ</text>

            <rect
              x="175"
              y="8"
              width="290"
              height="50"
              rx="14"
              :fill="activePart === 0 ? '#006496' : '#e2efff'"
              :stroke="activePart === 0 ? '#ffc21c' : '#006496'"
              :stroke-width="activePart === 0 ? 4 : 2"
            />
            <text x="320" y="30" text-anchor="middle" :fill="activePart === 0 ? '#ffffff' : '#001e31'" font-size="13" font-weight="bold">
              👑 NODO RAÍZ: ¿Llueve fuerte en Córdoba?
            </text>
            <text x="320" y="47" text-anchor="middle" :fill="activePart === 0 ? '#cce5ff' : '#4b6375'" font-size="10">
              Primera pregunta principal
            </text>

            <rect
              x="335"
              y="124"
              width="260"
              height="48"
              rx="14"
              :fill="activePart === 2 ? '#129fea' : '#f0f7ff'"
              :stroke="activePart === 2 ? '#001e31' : '#129fea'"
              :stroke-width="activePart === 2 ? 4 : 2"
            />
            <text x="465" y="146" text-anchor="middle" :fill="activePart === 2 ? '#ffffff' : '#001e31'" font-size="12" font-weight="bold">
              🔍 NODO DECISIÓN: ¿Subió el Río Sinú?
            </text>
            <text x="465" y="162" text-anchor="middle" :fill="activePart === 2 ? '#eef8ff' : '#4b6375'" font-size="10">
              Pregunta intermedia
            </text>

            <rect
              x="30"
              y="142"
              width="225"
              height="52"
              rx="14"
              :fill="activePart === 3 ? '#76b82a' : '#eef9e3'"
              :stroke="activePart === 3 ? '#001e31' : '#76b82a'"
              :stroke-width="activePart === 3 ? 3.5 : 2"
            />
            <text x="142" y="165" text-anchor="middle" :fill="activePart === 3 ? '#ffffff' : '#3d6a00'" font-size="12.5" font-weight="bold">
              🍃 NODO HOJA: Río en Calma
            </text>

            <rect
              x="245"
              y="218"
              width="195"
              height="46"
              rx="12"
              :fill="activePart === 3 ? '#76b82a' : '#eef9e3'"
              :stroke="activePart === 3 ? '#001e31' : '#76b82a'"
              :stroke-width="activePart === 3 ? 3.5 : 2"
            />
            <text x="342" y="245" text-anchor="middle" :fill="activePart === 3 ? '#ffffff' : '#3d6a00'" font-size="11.5" font-weight="bold">
              🍃 HOJA: Vigilancia
            </text>

            <rect
              x="455"
              y="218"
              width="175"
              height="46"
              rx="12"
              :fill="activePart === 3 ? '#76b82a' : '#eef9e3'"
              :stroke="activePart === 3 ? '#001e31' : '#76b82a'"
              :stroke-width="activePart === 3 ? 3.5 : 2"
            />
            <text x="542" y="245" text-anchor="middle" :fill="activePart === 3 ? '#ffffff' : '#3d6a00'" font-size="11.5" font-weight="bold">
              🍃 HOJA: ¡Alerta Roja!
            </text>
          </svg>

          <div class="pa-4 rounded-xl" style="background-color: #f7f9ff; border: 2px solid #006496;">
            <div class="text-subtitle-1 font-weight-bold mb-1" style="color: #006496;">
              {{ parts[activePart]?.emoji }} {{ parts[activePart]?.name }}:
            </div>
            <div class="text-body-1 font-weight-medium" style="color: #001e31;">
              {{ parts[activePart]?.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modalType: any
  activeScenario?: any
  scenarios?: any
  activePart?: any
  parts?: any
  activeCandidate?: any
  candidates?: any
}>()

watch(() => props.modalType, (val) => {
  if (!import.meta.client) return
  document.documentElement.classList.toggle('ova-modal-locked', !!val)
  document.body.classList.toggle('ova-modal-locked', !!val)
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.documentElement.classList.remove('ova-modal-locked')
    document.body.classList.remove('ova-modal-locked')
  }
})



defineEmits<{
  (e: 'close'): void
  (e: 'update:activePart', idx: number): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



