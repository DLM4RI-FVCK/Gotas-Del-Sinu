<template>
  <div class="roblox-editor">
    <!-- ESCENARIO IZQUIERDO: Pedestal limpio y 100% responsive -->
    <div
      class="character-stage d-flex flex-column justify-space-between pa-4 pa-sm-6"
      :style="{ '--stage-tint': `#${session.avatar.backgroundColor}` }"
    >
      <div class="spotlight-beam" />

      <div class="d-flex align-center justify-space-between position-relative z-2">
        <div class="stage-tag d-flex align-center gap-2 px-3 py-1 rounded-pill">
          <v-icon icon="mdi-palette-outline" color="primary" size="18" />
          <span class="text-caption font-weight-bold" style="color: #001e31;">
            Estudio Avatar
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
            @click="randomizeAll"
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
            @click="resetDefault"
          />
        </div>
      </div>

      <div class="pedestal-zone d-flex flex-column align-center justify-center my-auto position-relative z-2">
        <div class="avatar-figure-wrap">
          <img :src="avatarUrl" alt="Tu Personaje" class="stage-avatar-img" />
        </div>
        <div class="pedestal-base">
          <div class="pedestal-ring" />
        </div>
      </div>

      <div class="player-nameplate text-center px-4 py-3 rounded-xl position-relative z-2">
        <h3 class="stage-player-name font-weight-bold mb-1">
          {{ session.nombre }}
        </h3>
        <div class="stage-player-grade font-weight-bold">
          {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
        </div>
      </div>
    </div>

    <!-- CATÁLOGO DERECHO DIVIDIDO POR SECCIONES -->
    <div class="catalog-panel d-flex flex-column pa-4 pa-sm-5">
      <div class="d-flex align-center justify-space-between gap-2 mb-3 flex-shrink-0">
        <div class="category-pills d-flex flex-wrap gap-2">
          <v-btn
            v-for="cat in avatarCategories"
            :key="cat.key"
            size="small"
            rounded="lg"
            :color="activeCategory === cat.key ? 'primary' : 'default'"
            :variant="activeCategory === cat.key ? 'flat' : 'tonal'"
            class="text-none font-weight-bold"
            :prepend-icon="cat.icon"
            @click="activeCategory = cat.key"
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

      <!-- Barra de Color contextual -->
      <div
        v-if="activeCategory === 'cabello' || activeCategory === 'ropa'"
        class="color-strip d-flex flex-wrap align-center justify-space-between gap-2 px-4 py-2 rounded-xl mb-3 flex-shrink-0"
      >
        <span class="text-caption font-weight-bold" style="color: #001e31;">
          {{ activeCategory === 'cabello' ? 'Color de cabello / barba:' : 'Color de prenda:' }}
        </span>

        <div class="d-flex flex-wrap gap-2">
          <button
            v-for="c in (activeCategory === 'cabello' ? hairColors : clothesColors)"
            :key="c.value"
            type="button"
            class="strip-swatch"
            :class="{
              active:
                activeCategory === 'cabello'
                  ? session.avatar.hairColor === c.value
                  : session.avatar.clothesColor === c.value
            }"
            :style="{ backgroundColor: `#${c.value}` }"
            :title="c.label"
            @click="
              activeCategory === 'cabello'
                ? updateAvatar({ hairColor: c.value })
                : updateAvatar({ clothesColor: c.value })
            "
          />
        </div>
      </div>

      <!-- Contenedor de Secciones -->
      <div class="sections-scroll flex-1-1 pr-1">
        <template v-if="activeCategory === 'personajes'">
          <div class="catalog-section mb-4">
            <div class="section-header d-flex align-center justify-space-between mb-3">
              <div class="d-flex align-center gap-2">
                <v-icon icon="mdi-account-star" color="primary" size="20" />
                <h4 class="section-title font-weight-bold mb-0">
                  Personajes de la Cuenca del Sinú
                </h4>
              </div>
              <span class="section-count">{{ characterPresets.length }} personajes</span>
            </div>

            <div class="items-grid">
              <div
                v-for="preset in characterPresets"
                :key="preset.name"
                class="catalog-tile d-flex flex-column align-center justify-space-between pa-3 rounded-xl"
                :class="{ 'is-equipped': isPresetActive(preset.config) }"
                @click="updateAvatar(preset.config)"
              >
                <div class="tile-badge-row d-flex justify-space-between align-center w-100">
                  <span class="preset-tag">{{ preset.role }}</span>
                  <span v-if="isPresetActive(preset.config)" class="equipped-dot">
                    <v-icon icon="mdi-check" size="12" color="white" />
                  </span>
                </div>

                <img :src="buildAvatarUrl(preset.config)" :alt="preset.name" class="tile-thumb my-auto" loading="lazy" />

                <span class="tile-label text-center font-weight-bold text-truncate w-100">
                  {{ preset.name }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div
            v-for="section in currentSections"
            :key="section.title"
            class="catalog-section mb-5"
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
                :key="`${section.title}_${item.prop}_${item.value}_${item.label}`"
                class="catalog-tile d-flex flex-column align-center justify-space-between pa-3 rounded-xl"
                :class="{
                  'is-equipped': isItemEquipped(item),
                  'is-none-tile': item.value === 'none'
                }"
                @click="equipCatalogItem(item)"
              >
                <div class="tile-badge-row d-flex justify-space-between align-center w-100">
                  <span class="preset-tag" :class="{ 'none-tag': item.value === 'none' }">
                    {{ item.value === 'none' ? 'Quitar' : item.group }}
                  </span>
                  <span v-if="isItemEquipped(item)" class="equipped-dot">
                    <v-icon icon="mdi-check" size="12" color="white" />
                  </span>
                </div>

                <img :src="getItemPreviewUrl(item)" :alt="item.label" class="tile-thumb my-auto" loading="lazy" />

                <span class="tile-label text-center font-weight-bold text-truncate w-100">
                  {{ item.label }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buildAvatarUrl, defaultAvatarConfig, type AvatarConfig } from '~/composables/useUserSession'
import {
  avatarCategories,
  characterPresets,
  clothesColors,
  hairColors,
  sectionsByCategory,
  type AvatarCategoryKey,
  type CatalogItem
} from '~/utils/avatarCatalog'

defineEmits<{
  (e: 'close'): void
}>()

const { session, avatarUrl, updateAvatar } = useUserSession()
const activeCategory = ref<AvatarCategoryKey>('personajes')

const currentSections = computed(() => {
  if (activeCategory.value === 'personajes') return []
  return sectionsByCategory[activeCategory.value]
})

const isItemEquipped = (item: CatalogItem) => {
  if (item.extra?.clothingGraphic) {
    return (
      session.value.avatar[item.prop] === item.value &&
      session.value.avatar.clothingGraphic === item.extra.clothingGraphic
    )
  }
  return session.value.avatar[item.prop] === item.value
}

const equipCatalogItem = (item: CatalogItem) => {
  updateAvatar({
    [item.prop]: item.value,
    ...(item.extra || {})
  })
}

const getItemPreviewUrl = (item: CatalogItem) => {
  return buildAvatarUrl({
    ...session.value.avatar,
    [item.prop]: item.value,
    ...(item.extra || {})
  })
}

const isPresetActive = (preset: AvatarConfig) => {
  const a = session.value.avatar
  return a.top === preset.top && a.clothing === preset.clothing && a.skinColor === preset.skinColor
}

const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]!

const randomizeAll = () => {
  const allClothes = sectionsByCategory.ropa.flatMap(s => s.items)
  const allHair = sectionsByCategory.cabello.flatMap(s => s.items)
  const allGlasses = sectionsByCategory.accesorios[0]!.items
  const allBeards = sectionsByCategory.accesorios[1]!.items
  const allEyes = sectionsByCategory.rostro[0]!.items
  const allBrows = sectionsByCategory.rostro[1]!.items
  const allMouths = sectionsByCategory.boca[0]!.items
  const allSkins = sectionsByCategory.piel[0]!.items
  const allBgs = sectionsByCategory.fondo[0]!.items

  const randomClothing = pickRandom(allClothes)
  updateAvatar({
    skinColor: pickRandom(allSkins).value,
    top: pickRandom(allHair).value,
    hairColor: pickRandom(hairColors).value,
    eyes: pickRandom(allEyes).value,
    eyebrows: pickRandom(allBrows).value,
    mouth: pickRandom(allMouths).value,
    accessories: pickRandom(allGlasses).value,
    facialHair: pickRandom(allBeards).value,
    clothing: randomClothing.value,
    ...(randomClothing.extra || {}),
    clothesColor: pickRandom(clothesColors).value,
    backgroundColor: pickRandom(allBgs).value
  })
}

const resetDefault = () => {
  updateAvatar(defaultAvatarConfig())
}
</script>

<style scoped>
@import '../../assets/css/customizer-shared.css';
</style>


