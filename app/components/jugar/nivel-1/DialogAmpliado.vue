<template>
  <Transition name="inpage-modal-fade">
    <div v-if="modalType" class="inpage-dialog-backdrop pa-3 pa-sm-5" @click.self="$emit('close')">
      <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
        <div class="d-flex align-center justify-space-between gap-2 pb-3 border-b">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-magnify-plus-outline" color="primary" size="24" />
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              {{
                modalType === 'analogia'
                  ? 'Vista Ampliada: Árbol de la Vida Diaria'
                  : modalType === 'flujo'
                    ? 'Vista Ampliada: Cómo actúa el Árbol en Córdoba'
                    : 'Simulador Ampliado: Elige un clima en Córdoba'
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

        <div v-if="modalType === 'analogia'" class="inpage-dialog-body my-auto py-4 text-center">
          <svg viewBox="0 0 460 285" class="zoomed-svg mx-auto mb-3">
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
            <text x="230" y="53" text-anchor="middle" fill="#cce5ff" font-size="11">(Pregunta principal)</text>

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
          <div class="pa-3 rounded-xl" style="background-color: #f7f9ff; border: 1px solid #d7e3ee;">
            <strong style="color: #006496;">Clave para recordar:</strong> Cada pregunta divide el camino en dos ramas (<strong>SÍ</strong> o <strong>NO</strong>) hasta llegar a una decisión final.
          </div>
        </div>

        <div v-else-if="modalType === 'flujo'" class="inpage-dialog-body my-auto py-4 d-flex flex-column gap-3">
          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-info-soft"><span>🌧️</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #006496;">1. Observa pistas sencillas (Datos)</div>
              <div class="text-body-1" style="color: #3f4851;">
                El sistema revisa información fácil de entender en Córdoba: ¿está lloviendo fuerte en la cuenca? ¿el nivel del Río Sinú ya subió hasta el borde?
              </div>
            </div>
          </div>

          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-secondary-soft"><span>🌿</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #3d6a00;">2. El Árbol hace preguntas en orden</div>
              <div class="text-body-1" style="color: #3f4851;">
                Empieza por la pregunta más importante arriba y baja por las ramas de <strong>SÍ</strong> o <strong>NO</strong> según las condiciones reales del río.
              </div>
            </div>
          </div>

          <div class="flow-card d-flex align-center gap-4 pa-4 rounded-xl">
            <div class="flow-emoji-circle bg-warning-soft"><span>📢</span></div>
            <div>
              <div class="text-h6 font-weight-bold" style="color: #795900;">3. Toma una decisión preventiva</div>
              <div class="text-body-1" style="color: #3f4851;">
                Al llegar al final de la rama, recomienda: <strong>🟢 Río en Calma</strong>, <strong>🟡 Vigilancia Preventiva</strong> o <strong>🔴 Alerta de Inundación</strong>.
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="modalType === 'simulador'" class="inpage-dialog-body d-flex flex-column justify-space-between my-auto py-3">
          <div class="d-flex flex-wrap justify-center gap-2 mb-3">
            <v-btn
              v-for="(sc, idx) in scenarios"
              :key="sc.label"
              size="default"
              rounded="lg"
              :color="activeScenario === idx ? sc.color : 'default'"
              :variant="activeScenario === idx ? 'flat' : 'tonal'"
              class="text-none font-weight-bold"
              :prepend-icon="sc.icon"
              @click="$emit('update:activeScenario', idx)"
            >
              {{ sc.label }}
            </v-btn>
          </div>

          <svg viewBox="0 0 640 270" class="zoomed-svg mx-auto mb-3">
            <path d="M320 58 L145 145" :stroke="activeScenario === 0 ? '#76b82a' : '#cfdbe6'" :stroke-width="activeScenario === 0 ? 6 : 3" fill="none" stroke-linecap="round" />
            <path d="M320 58 L465 130" :stroke="activeScenario !== 0 ? '#006496' : '#cfdbe6'" :stroke-width="activeScenario !== 0 ? 6 : 3" fill="none" stroke-linecap="round" />
            <path d="M465 170 L355 225" :stroke="activeScenario === 1 ? '#ffc21c' : '#cfdbe6'" :stroke-width="activeScenario === 1 ? 6 : 3" fill="none" stroke-linecap="round" />
            <path d="M465 170 L555 225" :stroke="activeScenario === 2 ? '#ba1a1a' : '#cfdbe6'" :stroke-width="activeScenario === 2 ? 6 : 3" fill="none" stroke-linecap="round" />

            <rect x="200" y="80" width="44" height="22" rx="11" :fill="activeScenario === 0 ? '#76b82a' : '#b0bec5'" />
            <text x="222" y="95" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

            <rect x="380" y="76" width="44" height="22" rx="11" :fill="activeScenario !== 0 ? '#006496' : '#b0bec5'" />
            <text x="402" y="91" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>

            <rect x="380" y="182" width="40" height="20" rx="10" :fill="activeScenario === 1 ? '#bf8f00' : '#b0bec5'" />
            <text x="400" y="196" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">NO</text>

            <rect x="502" y="182" width="40" height="20" rx="10" :fill="activeScenario === 2 ? '#ba1a1a' : '#b0bec5'" />
            <text x="522" y="196" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">SÍ</text>

            <rect x="185" y="10" width="270" height="48" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="3" />
            <text x="320" y="32" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">1. ¿Está lloviendo fuerte en Córdoba?</text>
            <text x="320" y="48" text-anchor="middle" fill="#cce5ff" font-size="10">Pregunta inicial del árbol</text>

            <rect x="35" y="142" width="220" height="54" rx="14" :fill="activeScenario === 0 ? '#e8f8d8' : '#f5f7fa'" :stroke="activeScenario === 0 ? '#76b82a' : '#cfdbe6'" stroke-width="3" />
            <text x="145" y="166" text-anchor="middle" fill="#3d6a00" font-size="13" font-weight="bold">🟢 Río Sinú en Calma</text>
            <text x="145" y="184" text-anchor="middle" fill="#3f4851" font-size="11">Sin riesgo de inundación</text>

            <rect x="345" y="124" width="240" height="48" rx="14" :fill="activeScenario !== 0 ? '#e2efff' : '#f5f7fa'" :stroke="activeScenario !== 0 ? '#006496' : '#cfdbe6'" stroke-width="3" />
            <text x="465" y="146" text-anchor="middle" fill="#001e31" font-size="12" font-weight="bold">2. ¿El río ya subió hasta la orilla?</text>
            <text x="465" y="162" text-anchor="middle" fill="#4b6375" font-size="10">Segunda pregunta</text>

            <rect x="255" y="218" width="195" height="46" rx="12" :fill="activeScenario === 1 ? '#fff8e1' : '#f5f7fa'" :stroke="activeScenario === 1 ? '#ffc21c' : '#cfdbe6'" stroke-width="3" />
            <text x="352" y="239" text-anchor="middle" fill="#795900" font-size="12" font-weight="bold">🟡 Vigilancia Preventiva</text>
            <text x="352" y="255" text-anchor="middle" fill="#3f4851" font-size="10">Estar atentos a la ribera</text>

            <rect x="468" y="218" width="162" height="46" rx="12" :fill="activeScenario === 2 ? '#ffdad6' : '#f5f7fa'" :stroke="activeScenario === 2 ? '#ba1a1a' : '#cfdbe6'" stroke-width="3" />
            <text x="549" y="239" text-anchor="middle" fill="#93000a" font-size="12" font-weight="bold">🔴 ¡Alerta Inundación!</text>
            <text x="549" y="255" text-anchor="middle" fill="#93000a" font-size="10">Avisar a los barrios</text>
          </svg>

          <div class="pa-4 rounded-xl" style="background-color: #f7f9ff; border: 2px solid #006496;">
            <div class="text-subtitle-1 font-weight-bold mb-1" style="color: #006496;">
              🧭 Explicación detallada del recorrido:
            </div>
            <div class="text-body-1 font-weight-medium" style="color: #001e31;">
              {{ scenarios[activeScenario]?.explanation }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modalType: 'analogia' | 'flujo' | 'simulador' | null
  activeScenario: number
  scenarios: { label: string; icon: string; color: string; explanation: string }[]
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'update:activeScenario', idx: number): void
}>()
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';
</style>



