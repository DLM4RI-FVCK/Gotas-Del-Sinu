<template>
  <div class="zenuito-floating-anchor">
    <!-- Panel Socrático desplegable (Modal de Chat) -->
    <v-scale-transition origin="bottom right">
      <div v-if="isOpen" class="zenuito-bubble-panel rounded-xl elevation-12">
        <!-- Encabezado del Chat -->
        <div class="chat-header d-flex align-center justify-space-between px-4 py-3">
          <div class="d-flex align-center gap-3">
            <div class="header-avatar-wrap">
              <img :src="zenuitoUrl" alt="Zenuito" class="header-zenuito-avatar" />
              <span class="online-indicator" />
            </div>
            <div>
              <div class="text-subtitle-2 font-weight-bold" style="color: #001e31; line-height: 1.2;">
                {{ session.zenuito.nickname || 'Zenuito' }}
              </div>
              <div class="text-caption d-flex align-center gap-1" style="color: #006496; font-size: 0.72rem;">
                <v-icon icon="mdi-school" size="12" />
                <span>Tutor Socrático · {{ session.nivelEducativo }}</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-center gap-1">
            <v-btn icon="mdi-refresh" size="x-small" variant="text" title="Reiniciar conversación" :disabled="loading"
              @click="resetChat" />
            <v-btn icon="mdi-close" size="x-small" variant="text" @click="isOpen = false" />
          </div>
        </div>

        <!-- Indicador de contexto de pantalla actual -->
        <div class="context-indicator px-4 py-1 d-flex align-center justify-space-between">
          <div class="d-flex align-center gap-1 text-caption" style="color: #006496; font-size: 0.73rem; font-weight: 700;">
            <v-icon icon="mdi-eye" size="14" color="#129fea" />
            <span class="text-truncate" style="max-width: 250px;" :title="telemetry.descripcionVisual">
              {{ telemetry.seccion }} · {{ telemetry.fase5E }}
            </span>
          </div>
          <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
            {{ session.edad }} años
          </v-chip>
        </div>

        <!-- Historial de Mensajes -->
        <div ref="chatContainer" class="chat-messages px-4 py-3">
          <div v-for="(msg, idx) in messages" :key="idx" class="message-wrapper mb-3"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div class="message-bubble rounded-lg pa-3 text-body-2"
              :class="msg.role === 'user' ? 'user-bubble' : 'bot-bubble'">
              <div class="d-flex align-center gap-1 mb-1 font-weight-bold" style="font-size: 0.72rem; opacity: 0.85;">
                <v-icon :icon="msg.role === 'user' ? 'mdi-account' : 'mdi-robot-happy'" size="13" />
                <span>{{ msg.role === 'user' ? (session.nombre || 'Tú') : (session.zenuito.nickname || 'Zenuito')
                  }}</span>
              </div>
              <div class="message-text" v-html="formatMessage(msg.content)" />
            </div>
          </div>

          <!-- Indicador de pensando / escribiendo -->
          <div v-if="loading" class="d-flex align-center gap-2 py-2" style="color: #006496;">
            <v-progress-circular indeterminate size="16" width="2" color="primary" />
            <span class="text-caption font-italic">Zenuito está reflexionando...</span>
          </div>
        </div>

        <!-- Sugerencias de preguntas rápidas -->
        <div v-if="messages.length <= 2 && !loading" class="quick-prompts px-3 py-1 d-flex gap-2 flex-wrap">
          <button type="button" class="quick-prompt-btn rounded-pill px-2 py-1 text-caption"
            @click="sendQuickPrompt('¿Qué debo hacer en este paso de la pantalla?')">
            💡 ¿Qué hago aquí?
          </button>
          <button type="button" class="quick-prompt-btn rounded-pill px-2 py-1 text-caption"
            @click="sendQuickPrompt('¿Por qué el Río Sinú y las lluvias se relacionan con un árbol de decisión?')">
            🌊 Relación con el Río Sinú
          </button>
        </div>

        <!-- Input de Mensaje -->
        <div class="chat-input-bar pa-3 d-flex align-center gap-2">
          <v-text-field v-model="inputMessage" placeholder="Escribe tu duda a Zenuito..." variant="solo-filled"
            density="compact" hide-details rounded="pill" bg-color="#ffffff" :disabled="loading"
            @keydown.enter.prevent="sendMessage" />
          <v-btn icon="mdi-send" color="primary" size="small" rounded="circle" elevation="2" :loading="loading"
            :disabled="!inputMessage.trim() || loading" @click="sendMessage" />
        </div>
      </div>
    </v-scale-transition>

    <!-- Botón flotante inferior izquierdo con avatar -->
    <button type="button" class="zenuito-fab d-flex align-center gap-2 pl-2 pr-4 py-2 rounded-pill elevation-6"
      @click="toggleChat">
      <div class="fab-avatar-wrap">
        <img :src="zenuitoUrl" alt="Zenuito Flotante" class="fab-avatar" />
        <span class="online-dot" />
      </div>
      <div class="text-left">
        <div class="fab-title font-weight-bold">
          {{ session.zenuito.nickname || 'Zenuito' }}
        </div>
        <div class="fab-subtitle">
          Tutor Socrático · IA
        </div>
      </div>
      <v-badge v-if="!isOpen && unreadCount > 0" :content="unreadCount" color="secondary" inline />
    </button>
  </div>
</template>

<script setup lang="ts">
const { session, zenuitoUrl } = useUserSession()
const { telemetry } = useZenuitoContext()

const isOpen = ref(false)
const inputMessage = ref('')
const loading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const unreadCount = ref(1)

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const initialGreeting = computed(() => {
  const nombre = session.value.nombre || 'Estudiante'
  const nivel = session.value.nivelEducativo || 'Secundaria'
  if (nivel === 'Primaria') {
    return `¡Hola, **${nombre}**! 🌊 Soy Zenuito, tu amigo del Río Sinú. Estoy aquí para acompañarte en tu aventura de los árboles de decisión. ¿De qué te gustaría que hablemos sobre lo que ves en tu pantalla?`
  }
  return `¡Hola, **${nombre}**! Bienvenido a Gotas del Sinú. Estoy atento a cada paso de tu misión. Recuerda que no te daré las respuestas listas, pero juntos podemos razonar cada decisión del algoritmo. ¿Qué observas en esta pantalla?`
})

const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: initialGreeting.value
  }
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    unreadCount.value = 0
    scrollToBottom()
  }
}

const resetChat = () => {
  messages.value = [
    {
      role: 'assistant',
      content: initialGreeting.value
    }
  ]
}

const formatMessage = (text: string) => {
  if (!text) return ''
  // 1. Convertir negritas markdown **texto** o __texto__ (incluso con saltos de línea intermedios)
  let formatted = text.replace(/(\*\*|__)(.*?)\1/gs, '<strong>$2</strong>')
  // 2. Convertir cursivas markdown *texto* o _texto_
  formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/gs, '<em>$1</em>')
  // 3. Resaltar listas numeradas 1. 2. 3.
  formatted = formatted.replace(/(?:^|\n)(\d+)\.\s+(.*?)(?=\n|$)/g, '<div class="chat-list-item"><span class="chat-step-num">$1</span><span>$2</span></div>')
  // 4. Reemplazar saltos de línea por <br>
  formatted = formatted.replace(/\n/g, '<br>')
  return formatted
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendQuickPrompt = (promptText: string) => {
  inputMessage.value = promptText
  sendMessage()
}

const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text || loading.value) return

  // Agregar mensaje del usuario
  messages.value.push({ role: 'user', content: text })
  inputMessage.value = ''
  loading.value = true
  scrollToBottom()

  try {
    const res: any = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        messages: messages.value,
        profile: {
          nombre: session.value.nombre,
          edad: session.value.edad,
          nivelEducativo: session.value.nivelEducativo,
          gradoOSemestre: session.value.gradoOSemestre,
          verbosidad: session.value.zenuito.verbosidad || 'medio',
          socratidad: session.value.zenuito.socratidad || 'alta'
        },
        screenContext: {
          seccion: telemetry.value.seccion,
          nivelActual: telemetry.value.nivelActual,
          fase5E: telemetry.value.fase5E,
          descripcionVisual: telemetry.value.descripcionVisual,
          metricasEnPantalla: telemetry.value.metricasEnPantalla
        }
      }
    })

    if (res?.reply) {
      messages.value.push({ role: 'assistant', content: res.reply })
    } else {
      messages.value.push({
        role: 'assistant',
        content: 'Hubo una interrupción con el motor de IA. Por favor, intenta de nuevo.'
      })
    }
  } catch (err: any) {
    const errorMsg = err?.data?.statusMessage || err?.message || 'Error al conectar con Zenuito'
    messages.value.push({
      role: 'assistant',
      content: `⚠️ *(${errorMsg})*. Verifica que tu clave de Google AI Studio en el archivo .env sea válida.`
    })
  } finally {
    loading.value = false
    scrollToBottom()
  }
}

// Observar cambios de nivel para abrir Zenuito automáticamente con un resumen guiado en pasos 1, 2, 3
const lastLevelSeen = ref<number | null>(null)

watch(() => telemetry.value.nivelActual, (newLevel) => {
  if (newLevel && newLevel !== lastLevelSeen.value) {
    lastLevelSeen.value = newLevel
    if (session.value.zenuito.autoOpenTips !== false) {
      isOpen.value = true
      unreadCount.value = 0
      // Solicitar resumen socrático estructurado en pasos
      triggerAutoLevelSummary(newLevel)
    }
  }
}, { immediate: false })

const triggerAutoLevelSummary = async (levelNumber: number) => {
  const prompt = `Acabo de entrar a la Misión ${levelNumber} (${telemetry.value.seccion}). En pantalla estoy viendo: "${telemetry.value.descripcionVisual}". Dame un resumen muy corto y amigable estructurado exactamente en 3 pasos con números (1., 2., 3.) explicando qué debo hacer aquí para aprender.`
  
  messages.value.push({ role: 'user', content: `📍 Entré a la Misión ${levelNumber}: ${telemetry.value.seccion}` })
  loading.value = true
  scrollToBottom()

  try {
    const res: any = await $fetch('/api/chat', {
      method: 'POST',
      body: {
        messages: [
          { role: 'user', content: prompt }
        ],
        profile: {
          nombre: session.value.nombre,
          edad: session.value.edad,
          nivelEducativo: session.value.nivelEducativo,
          gradoOSemestre: session.value.gradoOSemestre,
          verbosidad: session.value.zenuito.verbosidad || 'medio',
          socratidad: session.value.zenuito.socratidad || 'alta'
        },
        screenContext: {
          seccion: telemetry.value.seccion,
          nivelActual: levelNumber,
          fase5E: telemetry.value.fase5E,
          descripcionVisual: telemetry.value.descripcionVisual,
          metricasEnPantalla: telemetry.value.metricasEnPantalla
        }
      }
    })

    if (res?.reply) {
      messages.value.push({ role: 'assistant', content: res.reply })
    }
  } catch (e) {
    console.error('Error al auto-generar resumen del nivel:', e)
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.zenuito-floating-anchor {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Panel flotante de chat */
.zenuito-bubble-panel {
  width: 440px;
  max-width: calc(100vw - 32px);
  height: 560px;
  max-height: calc(100vh - 100px);
  background: #ffffff;
  border: 1px solid rgba(0, 100, 150, 0.18);
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 44px rgba(0, 30, 49, 0.22);
  overflow: hidden;
  margin-bottom: 12px;
}

.chat-header {
  background: linear-gradient(135deg, #f0f7fc 0%, #e3f2fd 100%);
  border-bottom: 1px solid rgba(0, 100, 150, 0.12);
}

.header-avatar-wrap {
  position: relative;
}

.header-zenuito-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid #129fea;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #76b82a;
  border: 2px solid #ffffff;
}

.context-indicator {
  background: #f7f9ff;
  border-bottom: 1px solid rgba(0, 100, 150, 0.08);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: #fbfcfe;
}

.message-wrapper {
  display: flex;
  width: 100%;
}

.message-bubble {
  max-width: 88%;
  line-height: 1.45;
  word-break: break-word;
}

:deep(strong) {
  font-weight: 800;
  color: #001e31;
}

:deep(.user-bubble strong) {
  color: #ffffff;
}

:deep(.chat-list-item) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 4px 0;
}

:deep(.chat-step-num) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #006496;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 2px;
}

.user-bubble {
  background: #006496;
  color: #ffffff;
  border-bottom-right-radius: 2px !important;
}

.bot-bubble {
  background: #ffffff;
  color: #001e31;
  border: 1px solid rgba(0, 100, 150, 0.15);
  border-bottom-left-radius: 2px !important;
}

.quick-prompts {
  border-top: 1px dashed rgba(0, 100, 150, 0.15);
  background: #ffffff;
}

.quick-prompt-btn {
  background: #f0f7fc;
  border: 1px solid rgba(18, 159, 234, 0.3);
  color: #006496;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-prompt-btn:hover {
  background: #006496;
  color: #ffffff;
}

.chat-input-bar {
  background: #f7f9ff;
  border-top: 1px solid rgba(0, 100, 150, 0.12);
}

/* Botón disparador */
.zenuito-fab {
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  color: #ffffff;
  border: 2px solid #ffffff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.zenuito-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 100, 150, 0.35);
}

.fab-avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
}

.fab-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #ffffff;
  object-fit: cover;
}

.online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #76b82a;
  border: 2px solid #ffffff;
}

.fab-title {
  font-size: 0.85rem;
  line-height: 1.1;
  color: #ffffff;
}

.fab-subtitle {
  font-size: 0.7rem;
  color: #e3f2fd;
  opacity: 0.9;
}
</style>
