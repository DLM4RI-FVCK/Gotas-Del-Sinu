<template>
  <v-card
    class="avatar-card d-flex flex-column justify-space-between"
    :class="{
      'is-compact': isCompact,
      'is-active-card': isActive
    }"
    elevation="0"
    rounded="xl"
    @click="$emit('select')"
  >
    <!-- Modo compacto cuando está acoplado a la izquierda -->
    <template v-if="isCompact">
      <div class="d-flex align-center gap-3 my-auto">
        <img :src="avatarUrl" alt="Avatar" class="avatar-img-compact" />
        <div class="min-w-0 flex-1-1">
          <div class="compact-name font-weight-bold text-truncate">
            {{ session.nombre }}
          </div>
          <div class="compact-grade text-truncate">
            {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
          </div>
        </div>
        <v-icon icon="mdi-chevron-right" color="primary" size="20" />
      </div>
    </template>

    <!-- Modo completo en la grilla principal -->
    <template v-else>
      <div class="d-flex align-center justify-space-between">
        <span class="card-pill">Perfil</span>
        <v-icon icon="mdi-palette-outline" color="primary" class="card-corner-icon" />
      </div>

      <div class="d-flex align-center gap-4 my-auto">
        <img :src="avatarUrl" alt="Avatar del jugador" class="avatar-img-fluid" />
        <div class="min-w-0 flex-1-1">
          <h2 class="fluid-name font-weight-bold text-truncate mb-1">
            {{ session.nombre }}
          </h2>
          <p class="fluid-grade font-weight-semibold mb-0 text-truncate">
            {{ session.nivelEducativo }} · {{ session.gradoOSemestre }}
          </p>
        </div>
      </div>

      <div class="d-flex align-center justify-space-between card-cta">
        <span>Personalizar avatar</span>
        <v-icon icon="mdi-arrow-right" class="cta-arrow" />
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  isCompact: boolean
  isActive: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()

const { session, avatarUrl } = useUserSession()
</script>

<style scoped>
.avatar-card {
  container-type: size;
  background: linear-gradient(145deg, #ffffff 0%, #f0f7ff 100%);
  border: 2px solid #d7e3ee;
  padding: clamp(16px, 4cqmin, 28px);
  cursor: pointer;
  min-height: 0;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  box-shadow: 0 8px 24px rgba(0, 100, 150, 0.06) !important;
}

.avatar-card:hover {
  transform: translateY(-4px);
  border-color: #129fea;
  box-shadow: 0 16px 32px rgba(0, 100, 150, 0.14) !important;
}

.avatar-card.is-compact {
  padding: 12px 16px;
}

.avatar-card.is-active-card {
  border-color: #006496;
  box-shadow: 0 10px 28px rgba(0, 100, 150, 0.22) !important;
  transform: translateX(4px);
}

.card-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: rgba(0, 100, 150, 0.1);
  color: #006496;
  font-weight: 700;
  font-size: clamp(0.75rem, 3.5cqmin, 0.95rem);
}

.card-corner-icon {
  font-size: clamp(22px, 6cqmin, 32px) !important;
}

.avatar-img-fluid {
  width: clamp(76px, 34cqmin, 140px);
  height: clamp(76px, 34cqmin, 140px);
  border-radius: 24px;
  border: 3px solid #ffffff;
  box-shadow: 0 8px 20px rgba(0, 100, 150, 0.14);
  flex-shrink: 0;
  display: block;
}

.fluid-name {
  font-size: clamp(1.35rem, 8cqmin, 2.5rem);
  line-height: 1.1;
  color: #001e31;
}

.fluid-grade {
  font-size: clamp(0.95rem, 4.8cqmin, 1.35rem);
  color: #006496;
}

.card-cta {
  font-size: clamp(0.88rem, 4.2cqmin, 1.15rem);
  font-weight: 700;
  color: #006496;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

.avatar-card:hover .cta-arrow {
  transform: translateX(5px);
}

.avatar-img-compact {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid #d7e3ee;
  flex-shrink: 0;
}

.compact-name {
  font-size: 1rem;
  color: #001e31;
  line-height: 1.2;
}

.compact-grade {
  font-size: 0.8rem;
  color: #4b6375;
}

.gap-3 {
  gap: 12px;
}

.gap-4 {
  gap: 18px;
}

.min-w-0 {
  min-width: 0;
}
</style>
