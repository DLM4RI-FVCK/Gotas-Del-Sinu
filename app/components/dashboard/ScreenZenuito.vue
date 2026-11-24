<template>
  <div class="roblox-editor">
    <!-- ESCENARIO IZQUIERDO: Pedestal Holográfico de Zenuito -->
    <div
      class="character-stage d-flex flex-column justify-space-between pa-4 pa-sm-6"
      :style="{ '--stage-tint': `#${session.zenuito.backgroundColor}` }"
    >
      <div class="spotlight-beam" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <div class="stage-tag d-flex align-center gap-2 px-3 py-1 rounded-pill">
          <v-icon icon="mdi-robot-excited-outline" color="primary" size="18" />
          <span class="text-caption font-weight-bold" style="color: #001e31;">
            Laboratorio Zenuito
          </span>
        </div>

        <div class="d-flex align-center gap-2">
          <v-btn
            size="small"
            color="white"
            variant="flat"
            rounded="pill"
            class="text-none font-weight-bold stage-action-btn"
            prepend-icon="mdi-dice-5"
            @click="randomizeZenuito"
          >
            Aleatorio
          </v-btn>
          <v-btn
            icon="mdi-restore"
            size="small"
            color="white"
            variant="flat"
            class="stage-action-btn"
            title="Restaurar por defecto"
            @click="resetZenuito"
          />
        </div>
      </div>

      <div class="pedestal-zone d-flex flex-column align-center justify-center my-auto position-relative z-2">
        <div class="avatar-figure-wrap">
          <img :src="zenuitoUrl" alt="Zenuito" class="stage-avatar-img" />
        </div>
        <div class="pedestal-base">
          <div class="pedestal-ring" />
        </div>
      </div>

      <div class="player-nameplate text-center px-4 py-3 rounded-xl position-relative z-2">
        <h3 class="stage-player-name font-weight-bold mb-1">
          {{ session.zenuito.nickname || 'Zenuito' }}
        </h3>
        <div class="stage-player-grade font-weight-bold">
          Asistente Socrático IA · Gotas del Sinú
        </div>
      </div>
    </div>

    <!-- PANEL DERECHO -->
    <div class="catalog-panel d-flex flex-column pa-4 pa-sm-5">
      <!-- Pestañas en PC (> 900px) -->
      <div class="desktop-cat-header d-flex align-center justify-space-between gap-2 mb-3 flex-shrink-0">
        <div class="category-pills d-flex flex-wrap gap-2">
          <v-btn
            v-for="cat in zenuitoCategories"
            :key="cat.key"
            size="small"
            rounded="lg"
            :color="activeCategory === cat.key ? (cat.key === 'logica' ? 'secondary' : 'primary') : 'default'"
            :variant="activeCategory === cat.key ? 'flat' : 'tonal'"
            class="text-none font-weight-bold"
            :prepend-icon="cat.icon"
            @click="selectDesktopZenuitoCat(cat.key)"
          >
            {{ cat.label }}
          </v-btn>
        </div>

        <v-btn
          icon="mdi-close"
          variant="tonal"
          color="primary"
          size="small"
          @click="$emit('close')"
        />
      </div>

      <!-- Pestañas Individuales Centradas en Celular / Tablet (<= 900px: todas visibles y centradas) -->
      <div class="mobile-cat-header mb-3 flex-shrink-0">
        <div class="mobile-cat-title">
          Personaliza a tu Zenuito
        </div>
        <div class="category-pills">
          <v-btn
            v-for="mCat in mobileZenuitoCategories"
            :key="mCat.key"
            size="small"
            rounded="pill"
            :color="activeMobileCat === mCat.key ? (mCat.desktopCat === 'logica' ? 'secondary' : 'primary') : 'default'"
            :variant="activeMobileCat === mCat.key ? 'flat' : 'tonal'"
            class="text-none font-weight-bold"
            :prepend-icon="mCat.icon"
            @click="selectMobileZenuitoCat(mCat)"
          >
            {{ mCat.label }}
          </v-btn>
        </div>
      </div>

      <!-- PESTAÑA DE LÓGICA E IA: "Configura tu Zenuito" -->
      <div
        v-if="activeCategory === 'logica'"
        class="logic-placeholder flex-1-1 d-flex flex-column pa-4 pa-sm-6 rounded-xl overflow-y-auto"
      >
        <div class="d-flex align-center gap-3 mb-4">
          <div class="logic-icon-wrap">
            <v-icon icon="mdi-brain" color="primary" size="32" />
          </div>
          <div>
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              Personalidad y Comportamiento IA
            </h3>
            <p class="text-caption mb-0" style="color: #4b6375;">
              Ajusta qué tanto escribe Zenuito y qué tan socrático debe ser durante tus misiones.
            </p>
          </div>
        </div>

        <v-divider class="mb-4" />

        <!-- 1. NIVEL DE VERBOSIDAD (¿Qué tanto habla/escribe?) -->
        <div class="setting-group mb-5">
          <div class="d-flex align-center justify-space-between mb-2">
            <label class="text-subtitle-2 font-weight-bold" style="color: #001e31;">
              💬 ¿Qué tanto debe hablar o escribir Zenuito?
            </label>
            <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold text-uppercase">
              {{ session.zenuito.verbosidad || 'medio' }}
            </v-chip>
          </div>
          <p class="text-caption mb-3" style="color: #4b6375;">
            Elige si prefieres respuestas ultra-cortas y directas, o explicaciones amplias y detalladas.
          </p>

          <v-btn-toggle
            v-model="session.zenuito.verbosidad"
            mandatory
            color="primary"
            variant="tonal"
            rounded="xl"
            class="w-100 verbosity-toggle"
          >
            <v-btn value="corto" class="flex-1-1 text-none font-weight-bold">
              ⚡ Poco (Breve)
            </v-btn>
            <v-btn value="medio" class="flex-1-1 text-none font-weight-bold">
              ⚖️ Equilibrado
            </v-btn>
            <v-btn value="detallado" class="flex-1-1 text-none font-weight-bold">
              📚 Mucho (Detallado)
            </v-btn>
          </v-btn-toggle>
        </div>

        <!-- 2. NIVEL DE SOCRATIDAD (¿Qué tan socrático es?) -->
        <div class="setting-group mb-5">
          <div class="d-flex align-center justify-space-between mb-2">
            <label class="text-subtitle-2 font-weight-bold" style="color: #001e31;">
              🧭 Nivel de Socratidad (Mayéutica)
            </label>
            <v-chip size="x-small" color="secondary" variant="flat" class="font-weight-bold text-uppercase">
              {{ session.zenuito.socratidad || 'alta' }}
            </v-chip>
          </div>
          <p class="text-caption mb-3" style="color: #4b6375;">
            Siempre te guiará socráticamente, pero puedes calibrar si da pistas muy claras o si te hace deducir todo desde cero.
          </p>

          <v-btn-toggle
            v-model="session.zenuito.socratidad"
            mandatory
            color="secondary"
            variant="tonal"
            rounded="xl"
            class="w-100 socratic-toggle"
          >
            <v-btn value="baja" class="flex-1-1 text-none font-weight-bold">
              💡 Pistas Claras (Baja)
            </v-btn>
            <v-btn value="media" class="flex-1-1 text-none font-weight-bold">
              🌿 Guiada (Media)
            </v-btn>
            <v-btn value="alta" class="flex-1-1 text-none font-weight-bold">
              🔥 Pura / Estricta (Alta)
            </v-btn>
          </v-btn-toggle>
        </div>

        <!-- 3. APERTURA AUTOMÁTICA EN CADA NIVEL -->
        <div class="setting-group mb-3 pa-3 rounded-xl d-flex align-center justify-space-between" style="background: #f0f7ff; border: 1px solid #cbe0f2;">
          <div>
            <div class="text-subtitle-2 font-weight-bold" style="color: #006496;">
              🚀 Abrir resumen automáticamente al entrar a un nivel
            </div>
            <div class="text-caption" style="color: #4b6375;">
              Zenuito se abrirá solo y te dará un resumen con pasos cortos 1, 2, 3 para orientarte.
            </div>
          </div>
          <v-switch
            v-model="session.zenuito.autoOpenTips"
            color="primary"
            hide-details
            density="compact"
          />
        </div>
      </div>

      <!-- PESTAÑAS DE PERSONALIZACIÓN FÍSICA POR SECCIONES -->
      <div v-else class="sections-scroll flex-1-1 pr-1">
        <template v-if="activeCategory === 'modelos'">
          <div class="catalog-section mb-4">
            <div class="section-header d-flex align-center justify-space-between mb-3">
              <div class="d-flex align-center gap-2">
                <v-icon icon="mdi-robot-outline" color="primary" size="20" />
                <h4 class="section-title font-weight-bold mb-0">
                  Modelos de Zenuito
                </h4>
              </div>
              <span class="section-count">{{ zenuitoPresets.length }} modelos</span>
            </div>

            <div class="items-grid">
              <div
                v-for="preset in zenuitoPresets"
                :key="preset.name"
                class="catalog-tile d-flex flex-column align-center justify-space-between pa-3 rounded-xl"
                :class="{ 'is-equipped': isPresetActive(preset.config) }"
                @click="updateZenuito(preset.config)"
              >
                <div class="tile-badge-row d-flex justify-space-between align-center w-100">
                  <span class="preset-tag">{{ preset.role }}</span>
                  <span v-if="isPresetActive(preset.config)" class="equipped-dot">
                    <v-icon icon="mdi-check" size="12" color="white" />
                  </span>
                </div>

                <img :src="buildZenuitoUrl(preset.config)" :alt="preset.name" class="tile-thumb my-auto" loading="lazy" />

                <span class="tile-label text-center font-weight-bold text-truncate w-100">
                  {{ preset.name }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="(section, sIdx) in currentSections"
            :key="section.title"
            class="catalog-section mb-5"
            :class="{ 'mobile-hidden-section': activeMobileSectionIdx !== null && activeMobileSectionIdx !== sIdx }"
          >
            <div class="section-header d-flex align-center justify-space-between mb-3">
              <div class="d-flex align-center gap-2">
                <v-icon :icon="section.icon" color="primary" size="20" />
                <h4 class="section-title font-weight-bold mb-0">
                  {{ section.title }}
                </h4>
              </div>
              <span class="section-count">{{ section.items.length }} opciones</span>
            </div>

            <div class="items-grid">
              <div
                v-for="item in section.items"
                :key="`${section.title}_${item.prop}_${item.value}`"
                class="catalog-tile d-flex flex-column align-center justify-space-between pa-3 rounded-xl"
                :class="{
                  'is-equipped': session.zenuito[item.prop] === item.value,
                  'is-none-tile': item.value === 'none'
                }"
                @click="updateZenuito({ [item.prop]: item.value })"
              >
                <div class="tile-badge-row d-flex justify-space-between align-center w-100">
                  <span class="preset-tag" :class="{ 'none-tag': item.value === 'none' }">
                    {{ item.value === 'none' ? 'Quitar' : item.group }}
                  </span>
                  <span v-if="session.zenuito[item.prop] === item.value" class="equipped-dot">
                    <v-icon icon="mdi-check" size="12" color="white" />
                  </span>
                </div>

                <img :src="getPreviewUrl(item)" :alt="item.label" class="tile-thumb my-auto" loading="lazy" />

                <span class="tile-label text-center font-weight-bold text-truncate w-100">
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- Botón inferior centrado estilo "Done / Listo" en celular -->
        <div class="mobile-done-bar">
          <button type="button" class="mobile-done-pill-btn" @click="$emit('close')">
            ✓ Listo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buildZenuitoUrl, defaultZenuitoConfig, type ZenuitoConfig } from '~/composables/useUserSession'
import {
  zenuitoCategories,
  zenuitoPresets,
  zenuitoSectionsByCategory,
  type ZenuitoCatalogItem,
  type ZenuitoCategoryKey
} from '~/utils/zenuitoCatalog'

defineEmits<{
  (e: 'close'): void
}>()

const { session, zenuitoUrl, updateZenuito } = useUserSession()
const { setContext } = useZenuitoContext()
const activeCategory = ref<ZenuitoCategoryKey>('modelos')
const activeMobileCat = ref<string>('modelos')
const activeMobileSectionIdx = ref<number | null>(null)

interface MobileZenuitoCat {
  key: string
  label: string
  icon: string
  desktopCat: ZenuitoCategoryKey
  sectionIdx: number | null
}

// En celular: cada parte de Zenuito en su propia categoría individual
const mobileZenuitoCategories: MobileZenuitoCat[] = [
  { key: 'logica', label: 'Personalidad IA', icon: 'mdi-brain', desktopCat: 'logica', sectionIdx: null },
  { key: 'modelos', label: 'Modelos', icon: 'mdi-robot-outline', desktopCat: 'modelos', sectionIdx: null },
  { key: 'antena_sup', label: 'Antenas', icon: 'mdi-radar', desktopCat: 'antenas', sectionIdx: 0 },
  { key: 'sensores_lat', label: 'Sensores Laterales', icon: 'mdi-access-point', desktopCat: 'antenas', sectionIdx: 1 },
  { key: 'ojos_visor', label: 'Visor Óptico', icon: 'mdi-eye-circle-outline', desktopCat: 'visor', sectionIdx: 0 },
  { key: 'boca_voz', label: 'Pantalla Vocal', icon: 'mdi-waveform', desktopCat: 'visor', sectionIdx: 1 },
  { key: 'forma_chasis', label: 'Forma Cabeza', icon: 'mdi-cube-outline', desktopCat: 'chasis', sectionIdx: 0 },
  { key: 'textura_chasis', label: 'Textura', icon: 'mdi-dots-grid', desktopCat: 'chasis', sectionIdx: 1 },
  { key: 'color', label: 'Pintura', icon: 'mdi-palette-swatch-outline', desktopCat: 'color', sectionIdx: 0 },
  { key: 'fondo', label: 'Fondo', icon: 'mdi-image-filter-hdr', desktopCat: 'fondo', sectionIdx: 0 }
]

const selectDesktopZenuitoCat = (catKey: ZenuitoCategoryKey) => {
  activeCategory.value = catKey
  const matchingMobile = mobileZenuitoCategories.find(m => m.desktopCat === catKey)
  if (matchingMobile) {
    activeMobileCat.value = matchingMobile.key
    activeMobileSectionIdx.value = matchingMobile.sectionIdx
  }
}

const selectMobileZenuitoCat = (mCat: MobileZenuitoCat) => {
  activeMobileCat.value = mCat.key
  activeCategory.value = mCat.desktopCat
  activeMobileSectionIdx.value = mCat.sectionIdx
}

const currentSections = computed(() => {
  if (activeCategory.value === 'logica' || activeCategory.value === 'modelos') return []
  return zenuitoSectionsByCategory[activeCategory.value]
})

const activeCategoryLabel = computed(() =>
  zenuitoCategories.find(category => category.key === activeCategory.value)?.label || 'Personalización'
)

const activeTabLabel = computed(() =>
  mobileZenuitoCategories.find(category => category.key === activeMobileCat.value)?.label || activeCategoryLabel.value
)

const screenDescription = computed(() => {
  if (activeCategory.value === 'logica') {
    return `Estás en Personalidad IA. Aquí configuras cuánto habla Zenuito (${session.value.zenuito.verbosidad || 'medio'}), qué tan socrático es (${session.value.zenuito.socratidad || 'alta'}) y si muestra ayudas automáticas (${session.value.zenuito.autoOpenTips === false ? 'desactivadas' : 'activadas'}).`
  }
  if (activeCategory.value === 'modelos') {
    return `Estás en Modelos de Zenuito. Puedes elegir uno de los ${zenuitoPresets.length} modelos visuales disponibles.`
  }
  return `Estás personalizando a Zenuito en ${activeCategoryLabel.value}, pestaña ${activeTabLabel.value}. Elige una de las opciones visibles para cambiar su apariencia.`
})

watch(
  [
    activeCategory,
    activeMobileCat,
    activeMobileSectionIdx,
    () => session.value.zenuito.verbosidad,
    () => session.value.zenuito.socratidad,
    () => session.value.zenuito.autoOpenTips
  ],
  () => {
    const isPersonalityTab = activeCategory.value === 'logica'
    setContext({
      seccion: 'Personalización de Zenuito',
      nivelActual: undefined,
      fase5E: isPersonalityTab ? 'Personalidad y comportamiento IA' : activeTabLabel.value,
      descripcionVisual: screenDescription.value,
      metricasEnPantalla: {
        categoria: activeCategoryLabel.value,
        pestaña: activeTabLabel.value,
        verbosidad: session.value.zenuito.verbosidad || 'medio',
        socratidad: session.value.zenuito.socratidad || 'alta',
        ayudasAutomaticas: session.value.zenuito.autoOpenTips !== false
      }
    })
  },
  { immediate: true }
)

const getPreviewUrl = (item: ZenuitoCatalogItem) => {
  return buildZenuitoUrl({
    ...session.value.zenuito,
    [item.prop]: item.value
  })
}

const isPresetActive = (preset: ZenuitoConfig) => {
  const z = session.value.zenuito
  return z.baseColor === preset.baseColor && z.top === preset.top && z.eyes === preset.eyes && z.face === preset.face
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!

const randomizeZenuito = () => {
  updateZenuito({
    baseColor: pickRandom(zenuitoSectionsByCategory.color[0]!.items).value,
    face: pickRandom(zenuitoSectionsByCategory.chasis[0]!.items).value,
    texture: pickRandom(zenuitoSectionsByCategory.chasis[1]!.items).value,
    top: pickRandom(zenuitoSectionsByCategory.antenas[0]!.items).value,
    sides: pickRandom(zenuitoSectionsByCategory.antenas[1]!.items).value,
    eyes: pickRandom(zenuitoSectionsByCategory.visor[0]!.items).value,
    mouth: pickRandom(zenuitoSectionsByCategory.visor[1]!.items).value,
    backgroundColor: pickRandom(zenuitoSectionsByCategory.fondo[0]!.items).value
  })
}

const resetZenuito = () => {
  updateZenuito(defaultZenuitoConfig())
}
</script>

<style scoped>
@import '../../assets/css/customizer-shared.css';

.setting-group {
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(0, 100, 150, 0.12);
}

.verbosity-toggle :deep(.v-btn),
.socratic-toggle :deep(.v-btn) {
  font-size: 0.8rem;
  letter-spacing: 0;
  text-transform: none;
}

@media (max-width: 900px) {
  .setting-group {
    padding: 12px;
    border-radius: 14px;
  }

  .setting-group label {
    font-size: 0.86rem !important;
    line-height: 1.3;
  }

  .setting-group > .d-flex:first-child {
    flex-wrap: wrap;
    gap: 6px;
  }

  /* Los 3 botones de cada ajuste se apilan para no partirse en pantallas pequeñas */
  .verbosity-toggle,
  .socratic-toggle {
    flex-direction: column !important;
    height: auto !important;
    border-radius: 14px !important;
  }

  .verbosity-toggle :deep(.v-btn),
  .socratic-toggle :deep(.v-btn) {
    width: 100% !important;
    min-height: 42px !important;
    height: 42px !important;
    font-size: 0.82rem;
    justify-content: flex-start;
    border-radius: 0 !important;
  }

  .logic-placeholder h3 {
    font-size: 1rem !important;
    line-height: 1.25;
  }
}
</style>


