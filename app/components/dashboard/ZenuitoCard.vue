<template>
  <v-card
    class="zenuito-card d-flex flex-column justify-space-between"
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
        <img :src="zenuitoUrl" alt="Zenuito" class="zenuito-img-compact" />
        <div class="min-w-0 flex-1-1">
          <div class="compact-name font-weight-bold text-truncate">
            {{ session.zenuito.nickname || 'Zenuito' }}
          </div>
          <div class="compact-role text-truncate">
            Asistente IA
          </div>
        </div>
        <v-icon icon="mdi-chevron-right" color="info" size="20" />
      </div>
    </template>

    <!-- Modo completo en la grilla principal -->
    <template v-else>
      <v-icon icon="mdi-robot-happy-outline" class="card-watermark" />

      <div class="d-flex align-center justify-space-between position-relative">
        <span class="card-pill">IA Socrática</span>
        <v-icon icon="mdi-robot-excited-outline" color="info" class="card-corner-icon" />
      </div>

      <div class="d-flex align-center gap-4 my-auto position-relative">
        <img :src="zenuitoUrl" alt="Zenuito IA" class="zenuito-img-fluid" />
        <div class="min-w-0 flex-1-1">
          <h2 class="fluid-name font-weight-bold text-truncate mb-1">
            {{ session.zenuito.nickname || 'Zenuito' }}
          </h2>
          <p class="fluid-role font-weight-semibold mb-0 text-truncate">
            Compañero Socrático
          </p>
        </div>
      </div>

      <div class="d-flex align-center justify-space-between card-cta position-relative">
        <span>Configura tu Zenuito</span>
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

const { session, zenuitoUrl } = useUserSession()
</script>

<style scoped>
.zenuito-card {
  container-type: size;
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #eaf8ff 100%);
  border: 2px solid #cbe4f5;
  padding: clamp(16px, 4cqmin, 28px);
  cursor: pointer;
  min-height: 0;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  box-shadow: 0 8px 24px rgba(0, 100, 150, 0.06) !important;
}

.zenuito-card:hover {
  transform: translateY(-4px);
  border-color: #129fea;
  box-shadow: 0 16px 32px rgba(18, 159, 234, 0.16) !important;
}

.zenuito-card.is-compact {
  padding: 10px 14px;
}

.zenuito-card.is-active-card {
  border-color: #006496;
  box-shadow: 0 10px 28px rgba(0, 100, 150, 0.22) !important;
  transform: translateX(4px);
}

.card-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: rgba(18, 159, 234, 0.14);
  color: #006496;
  font-weight: 700;
  font-size: clamp(0.75rem, 3.5cqmin, 0.95rem);
}

.card-corner-icon {
  font-size: clamp(22px, 6cqmin, 32px) !important;
}

.zenuito-img-fluid {
  width: clamp(76px, 34cqmin, 140px);
  height: clamp(76px, 34cqmin, 140px);
  border-radius: 24px;
  border: 3px solid #ffffff;
  box-shadow: 0 8px 20px rgba(18, 159, 234, 0.18);
  flex-shrink: 0;
  display: block;
}

.fluid-name {
  font-size: clamp(1.35rem, 8cqmin, 2.5rem);
  line-height: 1.1;
  color: #001e31;
}

.fluid-role {
  font-size: clamp(0.95rem, 4.8cqmin, 1.35rem);
  color: #129fea;
}

.card-cta {
  font-size: clamp(0.88rem, 4.2cqmin, 1.15rem);
  font-weight: 700;
  color: #006496;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

.zenuito-card:hover .cta-arrow {
  transform: translateX(5px);
}

.card-watermark {
  position: absolute;
  right: -12px;
  bottom: -16px;
  font-size: clamp(64px, 38cqmin, 170px) !important;
  opacity: 0.07;
  color: #006496;
  pointer-events: none;
  transform: rotate(-10deg);
}

.zenuito-img-compact {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #d7e3ee;
  flex-shrink: 0;
}

.compact-name {
  font-size: 0.95rem;
  color: #001e31;
  line-height: 1.2;
}

.compact-role {
  font-size: 0.76rem;
  color: #129fea;
  font-weight: 600;
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

@media (max-width: 900px) {
  .zenuito-card {
    container-type: normal;
    min-height: 164px;
    padding: 16px 18px;
  }

  .zenuito-card.is-compact {
    min-height: 52px !important;
    height: 52px !important;
    padding: 6px 12px !important;
  }

  .zenuito-card.is-active-card {
    transform: none !important;
  }

  .card-pill {
    font-size: 0.76rem;
    padding: 4px 11px;
  }

  .card-corner-icon {
    font-size: 22px !important;
  }

  .zenuito-img-fluid {
    width: 68px;
    height: 68px;
    border-radius: 18px;
  }

  .fluid-name {
    font-size: 1.25rem;
  }

  .fluid-role {
    font-size: 0.88rem;
  }

  .card-cta {
    font-size: 0.88rem;
    margin-top: 8px;
  }

  .card-watermark {
    font-size: 96px !important;
  }

  .zenuito-img-compact {
    width: 34px;
    height: 34px;
    border-radius: 9px;
  }

  .compact-name {
    font-size: 0.86rem;
  }

  .compact-role {
    font-size: 0.72rem;
  }
}
</style>
