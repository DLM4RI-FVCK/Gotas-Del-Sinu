<template>
  <header class="top-hud d-flex align-center justify-space-between px-3 px-sm-6 py-2">
    <!-- Marca: Logo + Gotas del Sinú -->
    <div class="d-flex align-center gap-2 gap-sm-3 min-w-0">
      <div class="hud-logo d-flex align-center justify-center flex-shrink-0" @click="$emit('reset-view')">
        <v-icon icon="mdi-water" color="white" size="22" />
      </div>
      <div class="min-w-0">
        <div class="hud-title font-weight-bold text-subtitle-1 text-truncate">
          Gotas del Sinú
        </div>
        <div class="hud-subtitle text-caption desktop-only-block text-truncate">
          {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
        </div>
      </div>
    </div>

    <!-- Barra de progreso de Nivel (SOLO EN PC > 900px) -->
    <div class="level-hud desktop-only-flex align-center gap-3 mx-3">
      <div class="level-badge d-flex align-center gap-1 px-3 py-1 rounded-pill">
        <v-icon icon="mdi-star-circle" color="warning" size="18" />
        <span class="text-caption font-weight-bold" style="color: #001e31;">
          Nivel {{ session.level }}
        </span>
      </div>

      <div class="level-bar-wrap flex-1-1">
        <div class="d-flex align-center justify-space-between mb-1">
          <span class="bar-label">Progreso de aventura</span>
          <span class="bar-xp">{{ progressPercent }}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: `${progressPercent}%` }" />
        </div>
      </div>
    </div>

    <!-- Acciones en PC (> 900px) -->
    <div class="desktop-only-flex align-center gap-2 flex-shrink-0">
      <div
        class="d-flex align-center gap-2 player-pill px-3 py-1 rounded-pill cursor-pointer"
        @click="$emit('open-avatar')"
      >
        <img :src="avatarUrl" alt="Avatar" class="hud-avatar" />
        <span class="text-body-2 font-weight-bold" style="color: #001e31;">
          {{ session.nombre }}
        </span>
      </div>

      <v-btn
        v-if="activeSection"
        color="primary"
        variant="outlined"
        size="small"
        rounded="lg"
        class="text-none font-weight-bold"
        prepend-icon="mdi-view-grid-outline"
        @click="$emit('reset-view')"
      >
        Inicio
      </v-btn>

      <v-btn
        color="primary"
        variant="tonal"
        size="small"
        rounded="lg"
        class="text-none font-weight-semibold"
        prepend-icon="mdi-logout"
        @click="handleLogout"
      >
        Salir
      </v-btn>
    </div>

    <!-- Menú desplegable de Opciones (SOLO EN CELULAR Y TABLET <= 900px) -->
    <div class="mobile-only-flex align-center">
      <v-menu location="bottom end" :close-on-content-click="true" offset="8">
        <template #activator="{ props: menuProps }">
          <button
            type="button"
            v-bind="menuProps"
            class="mobile-menu-trigger d-flex align-center gap-2 px-3 py-1 rounded-pill"
          >
            <img :src="avatarUrl" alt="Avatar" class="hud-avatar-mobile" />
            <span class="mobile-menu-label font-weight-bold">Menú</span>
            <v-icon icon="mdi-menu" color="primary" size="20" />
          </button>
        </template>

        <v-card class="mobile-dropdown-card pa-3 rounded-xl" min-width="275" max-width="310" elevation="10">
          <!-- Perfil del jugador + Barra de progreso completa dentro del menú desplegable -->
          <div class="dropdown-profile-box pa-3 rounded-xl mb-2">
            <div class="d-flex align-center gap-3 mb-2">
              <img :src="avatarUrl" alt="Avatar" class="dropdown-avatar" />
              <div class="min-w-0 flex-1-1">
                <div class="font-weight-bold text-subtitle-2 text-truncate" style="color: #001e31;">
                  {{ session.nombre }}
                </div>
                <div class="text-caption text-truncate" style="color: #4b6375;">
                  {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
                </div>
              </div>
              <div class="level-badge d-flex align-center gap-1 px-2 py-1 rounded-pill">
                <v-icon icon="mdi-star-circle" color="warning" size="16" />
                <span class="text-caption font-weight-bold" style="color: #001e31;">
                  Nv. {{ session.level }}
                </span>
              </div>
            </div>

            <div>
              <div class="d-flex align-center justify-space-between mb-1">
                <span class="bar-label">Progreso de aventura</span>
                <span class="bar-xp">{{ progressPercent }}%</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: `${progressPercent}%` }" />
              </div>
            </div>
          </div>

          <div class="dropdown-nav-list d-flex flex-column gap-1">
            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === null }"
              @click="$emit('reset-view')"
            >
              <v-icon icon="mdi-view-grid-outline" color="primary" size="20" />
              <span class="font-weight-bold">Inicio (Menú Principal)</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'jugar' }"
              @click="$emit('select-section', 'jugar')"
            >
              <v-icon icon="mdi-gamepad-variant" color="primary" size="20" />
              <span class="font-weight-bold">Jugar Misiones 5E</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'avatar' }"
              @click="$emit('select-section', 'avatar')"
            >
              <v-icon icon="mdi-account-edit-outline" color="primary" size="20" />
              <span class="font-weight-bold">Personalizar Avatar</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'zenuito' }"
              @click="$emit('select-section', 'zenuito')"
            >
              <v-icon icon="mdi-robot-excited-outline" color="info" size="20" />
              <span class="font-weight-bold">Configurar a Zenuito</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'conceptos' }"
              @click="$emit('select-section', 'conceptos')"
            >
              <v-icon icon="mdi-book-open-page-variant" color="secondary" size="20" />
              <span class="font-weight-bold">Glosario</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'acerca-de' }"
              @click="$emit('select-section', 'acerca-de')"
            >
              <v-icon icon="mdi-information-outline" color="primary" size="20" />
              <span class="font-weight-bold">Acerca del OVA</span>
            </button>

            <button
              type="button"
              class="dropdown-nav-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              :class="{ 'is-current': activeSection === 'creditos' }"
              @click="$emit('select-section', 'creditos')"
            >
              <v-icon icon="mdi-account-group-outline" color="warning" size="20" />
              <span class="font-weight-bold">Créditos</span>
            </button>

            <v-divider class="my-1" />

            <button
              type="button"
              class="dropdown-nav-item logout-item d-flex align-center gap-3 px-3 py-2 rounded-lg"
              @click="handleLogout"
            >
              <v-icon icon="mdi-logout" color="error" size="20" />
              <span class="font-weight-bold" style="color: #ba1a1a;">Cerrar sesión</span>
            </button>
          </div>
        </v-card>
      </v-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { SectionKey } from '~/components/dashboard/GameGrid.vue'

defineProps<{
  activeSection: SectionKey
}>()

defineEmits<{
  (e: 'reset-view'): void
  (e: 'open-avatar'): void
  (e: 'select-section', section: SectionKey): void
}>()

const { session, avatarUrl, logout } = useUserSession()

const progressPercent = computed(() => {
  const max = session.value.maxXp || 100
  const current = session.value.xp || 0
  return Math.min(100, Math.max(0, Math.round((current / max) * 100)))
})

const handleLogout = async () => {
  logout()
  await navigateTo('/')
}
</script>

<style scoped>
.top-hud {
  background-color: #ffffff;
  border-bottom: 1px solid #d7e3ee;
  height: 62px;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .top-hud {
    height: 54px;
  }
}

.hud-logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  cursor: pointer;
}

.hud-title {
  color: #001e31;
  line-height: 1.15;
}

.hud-subtitle {
  color: #4b6375;
  line-height: 1.15;
}

.level-hud {
  display: flex;
  flex: 1;
  max-width: 480px;
  background-color: #f7f9ff;
  border: 1px solid #d7e3ee;
  border-radius: 14px;
  padding: 6px 14px;
}

.desktop-only-flex {
  display: flex;
}

.desktop-only-block {
  display: block;
}

.mobile-only-flex {
  display: none;
}

.mobile-menu-trigger {
  background-color: #f7f9ff;
  border: 1.5px solid #cbdceb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-menu-trigger:active {
  transform: scale(0.97);
}

.hud-avatar-mobile {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

.mobile-menu-label {
  font-size: 0.84rem;
  color: #001e31;
}

.mobile-dropdown-card {
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
}

.dropdown-profile-box {
  background: linear-gradient(145deg, #f7f9ff 0%, #eaf4ff 100%);
  border: 1.5px solid #d7e3ee;
}

.dropdown-avatar {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 100, 150, 0.14);
}

.dropdown-nav-item {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 0.88rem;
  color: #001e31;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-nav-item:hover {
  background-color: #f0f7ff;
}

.dropdown-nav-item.is-current {
  background-color: #e2efff;
  color: #006496;
}

.min-w-0 {
  min-width: 0;
}

@media (max-width: 900px) {
  .desktop-only-flex,
  .desktop-only-block {
    display: none !important;
  }

  .mobile-only-flex {
    display: flex !important;
  }

  .top-hud {
    height: 56px;
  }
}

.level-badge {
  background-color: #ffffff;
  border: 1px solid #d7e3ee;
  flex-shrink: 0;
}

.level-bar-wrap {
  min-width: 110px;
}

.bar-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #4b6375;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.bar-xp {
  font-size: 0.74rem;
  font-weight: 800;
  color: #006496;
}

.bar-track {
  width: 100%;
  height: 9px;
  border-radius: 999px;
  background-color: #dce9f5;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 30, 49, 0.08);
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #006496 0%, #129fea 55%, #76b82a 100%);
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.player-pill {
  background-color: #f7f9ff;
  border: 1px solid #d7e3ee;
  transition: border-color 0.2s ease;
}

.player-pill:hover {
  border-color: #006496;
}

.hud-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}
</style>
