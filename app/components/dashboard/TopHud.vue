<template>
  <header class="top-hud d-flex align-center justify-space-between px-4 px-sm-6 py-2">
    <!-- Marca -->
    <div class="d-flex align-center gap-3">
      <div class="hud-logo d-flex align-center justify-center" @click="$emit('reset-view')">
        <v-icon icon="mdi-water" color="white" size="22" />
      </div>
      <div>
        <div class="hud-title font-weight-bold text-subtitle-1">
          Gotas del Sinú
        </div>
        <div class="hud-subtitle text-caption d-none d-sm-block">
          {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
        </div>
      </div>
    </div>

    <!-- Barra de progreso de Nivel (vacía inicialmente, subirá al superar niveles) -->
    <div class="level-hud d-flex align-center gap-3 mx-3">
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

    <!-- Acciones y jugador -->
    <div class="d-flex align-center gap-2">
      <div
        class="d-none d-md-flex align-center gap-2 player-pill px-3 py-1 rounded-pill cursor-pointer"
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
  </header>
</template>

<script setup lang="ts">
defineProps<{
  activeSection: string | null
}>()

defineEmits<{
  (e: 'reset-view'): void
  (e: 'open-avatar'): void
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
  flex: 1;
  max-width: 480px;
  background-color: #f7f9ff;
  border: 1px solid #d7e3ee;
  border-radius: 14px;
  padding: 6px 14px;
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
