<template>
  <div class="stage-workspace pa-3 pa-sm-5" :class="{ 'is-split': !!activeSection }">
    <!-- Columna de 6 Cards (3x2 en vista general; se acopla a la izquierda al elegir cualquiera) -->
    <div class="cards-dock" :class="{ 'docked-left': !!activeSection }">
      <!-- Card 1: PERFIL / AVATAR DEL JUGADOR -->
      <DashboardAvatarCard
        class="card-avatar"
        :is-compact="!!activeSection"
        :is-active="activeSection === 'avatar'"
        @select="toggleSection('avatar')"
      />

      <!-- Card 2: JUGAR -->
      <v-card
        class="game-card card-jugar d-flex flex-column justify-space-between"
        :class="{
          'is-active-card': activeSection === 'jugar',
          'is-compact': !!activeSection
        }"
        elevation="0"
        rounded="xl"
        @click="toggleSection('jugar')"
      >
        <v-icon icon="mdi-gamepad-variant-outline" class="card-watermark text-white" />

        <div class="d-flex align-center justify-space-between position-relative">
          <span class="card-pill pill-white">
            Aventura
          </span>
          <div class="card-icon-circle bg-white-20">
            <v-icon icon="mdi-gamepad-variant" color="white" class="fluid-icon" />
          </div>
        </div>

        <div class="my-auto py-1 position-relative">
          <h2 class="fluid-hero-title font-weight-bold text-white mb-2">
            Jugar
          </h2>
          <p v-if="!activeSection" class="fluid-desc text-white-90 mb-0">
            Pon a prueba tus decisiones cuidando la cuenca del Río Sinú en misiones interactivas.
          </p>
        </div>

        <div v-if="!activeSection" class="d-flex align-center justify-space-between card-cta text-white position-relative">
          <span>Iniciar aventura</span>
          <v-icon icon="mdi-arrow-right" class="cta-arrow" />
        </div>
      </v-card>

      <!-- Card 3: ZENUITO (IA Socrática y Personalización) -->
      <DashboardZenuitoCard
        class="card-zenuito"
        :is-compact="!!activeSection"
        :is-active="activeSection === 'zenuito'"
        @select="toggleSection('zenuito')"
      />

      <!-- Card 4: GLOSARIO (Antes Conceptos) -->
      <v-card
        class="game-card card-conceptos d-flex flex-column justify-space-between"
        :class="{
          'is-active-card': activeSection === 'conceptos',
          'is-compact': !!activeSection
        }"
        elevation="0"
        rounded="xl"
        @click="toggleSection('conceptos')"
      >
        <v-icon icon="mdi-book-alphabet" class="card-watermark watermark-secondary" />

        <div class="d-flex align-center justify-space-between position-relative">
          <span class="card-pill pill-secondary">
            Diccionario
          </span>
          <div class="card-icon-circle bg-secondary-soft">
            <v-icon icon="mdi-book-open-page-variant" color="secondary" class="fluid-icon" />
          </div>
        </div>

        <div class="my-auto py-1 position-relative">
          <h3 class="fluid-title font-weight-bold mb-2" style="color: #001e31;">
            Glosario
          </h3>
          <p v-if="!activeSection" class="fluid-desc mb-0" style="color: #3f4851;">
            Consulta de lo más sencillo a lo más avanzado todos los términos del OVA por categorías.
          </p>
        </div>

        <div v-if="!activeSection" class="d-flex align-center justify-space-between card-cta position-relative" style="color: #3d6a00;">
          <span>Abrir glosario</span>
          <v-icon icon="mdi-arrow-right" class="cta-arrow" />
        </div>
      </v-card>

      <!-- Card 5: ACERCA DE -->
      <v-card
        class="game-card card-acerca d-flex flex-column justify-space-between"
        :class="{
          'is-active-card': activeSection === 'acerca-de',
          'is-compact': !!activeSection
        }"
        elevation="0"
        rounded="xl"
        @click="toggleSection('acerca-de')"
      >
        <v-icon icon="mdi-information-outline" class="card-watermark watermark-primary" />

        <div class="d-flex align-center justify-space-between position-relative">
          <span class="card-pill pill-info">
            Proyecto
          </span>
          <div class="card-icon-circle bg-info-soft">
            <v-icon icon="mdi-information-outline" color="primary" class="fluid-icon" />
          </div>
        </div>

        <div class="my-auto py-1 position-relative">
          <h3 class="fluid-title font-weight-bold mb-2" style="color: #001e31;">
            Acerca de
          </h3>
          <p v-if="!activeSection" class="fluid-desc mb-0" style="color: #3f4851;">
            Conoce cómo funciona el OVA, su enfoque pedagógico y los objetivos del proyecto.
          </p>
        </div>

        <div v-if="!activeSection" class="d-flex align-center justify-space-between card-cta position-relative" style="color: #006496;">
          <span>Conocer más</span>
          <v-icon icon="mdi-arrow-right" class="cta-arrow" />
        </div>
      </v-card>

      <!-- Card 6: CRÉDITOS -->
      <v-card
        class="game-card card-creditos d-flex flex-column justify-space-between"
        :class="{
          'is-active-card': activeSection === 'creditos',
          'is-compact': !!activeSection
        }"
        elevation="0"
        rounded="xl"
        @click="toggleSection('creditos')"
      >
        <v-icon icon="mdi-account-group-outline" class="card-watermark watermark-warning" />

        <div class="d-flex align-center justify-space-between position-relative">
          <span class="card-pill pill-warning">
            Equipo
          </span>
          <div class="card-icon-circle bg-warning-soft">
            <v-icon icon="mdi-account-group-outline" color="warning" class="fluid-icon" />
          </div>
        </div>

        <div class="my-auto py-1 position-relative">
          <h3 class="fluid-title font-weight-bold mb-2" style="color: #001e31;">
            Créditos
          </h3>
          <p v-if="!activeSection" class="fluid-desc mb-0" style="color: #3f4851;">
            Conoce a los creadores y colaboradores detrás de Gotas del Sinú.
          </p>
        </div>

        <div v-if="!activeSection" class="d-flex align-center justify-space-between card-cta position-relative" style="color: #006496;">
          <span>Ver equipo</span>
          <v-icon icon="mdi-arrow-right" class="cta-arrow" />
        </div>
      </v-card>
    </div>

    <!-- Panel Derecho: Pantalla activa al hacer clic en cualquier tarjeta -->
    <div class="screen-stage" :class="{ 'is-open': !!activeSection }">
      <Transition name="screen-slide" mode="out-in">
        <DashboardScreenAvatar
          v-if="activeSection === 'avatar'"
          key="avatar"
          @close="$emit('select-section', null)"
        />
        <DashboardScreenZenuito
          v-else-if="activeSection === 'zenuito'"
          key="zenuito"
          @close="$emit('select-section', null)"
        />
        <DashboardScreenJugar
          v-else-if="activeSection === 'jugar'"
          key="jugar"
          @close="$emit('select-section', null)"
        />
        <DashboardScreenConceptos
          v-else-if="activeSection === 'conceptos'"
          key="conceptos"
          @close="$emit('select-section', null)"
        />
        <DashboardScreenAcercaDe
          v-else-if="activeSection === 'acerca-de'"
          key="acerca-de"
          @close="$emit('select-section', null)"
        />
        <DashboardScreenCreditos
          v-else-if="activeSection === 'creditos'"
          key="creditos"
          @close="$emit('select-section', null)"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
export type SectionKey = 'avatar' | 'zenuito' | 'jugar' | 'conceptos' | 'acerca-de' | 'creditos' | null

const props = defineProps<{
  activeSection: SectionKey
}>()

const emit = defineEmits<{
  (e: 'select-section', section: SectionKey): void
}>()

const { setContext } = useZenuitoContext()

const toggleSection = (section: Exclude<SectionKey, null>) => {
  if (props.activeSection === section) {
    emit('select-section', null)
    setContext({
      seccion: 'Dashboard',
      fase5E: 'Navegación General',
      descripcionVisual: 'Explorando las 6 tarjetas principales del panel.'
    })
  } else {
    emit('select-section', section)
    const seccionLabels: Record<string, { seccion: string; fase5E: string; desc: string }> = {
      avatar: { seccion: 'Personalización de Avatar', fase5E: 'Identidad', desc: 'Configurando el personaje del estudiante.' },
      zenuito: { seccion: 'Laboratorio de Zenuito', fase5E: 'Tutor Socrático', desc: 'Personalizando y dialogando con el asistente Zenuito.' },
      jugar: { seccion: 'Misiones del Río Sinú', fase5E: 'Ciclo 5E', desc: 'Dentro del flujo de misiones de aprendizaje.' },
      conceptos: { seccion: 'Glosario de Términos', fase5E: 'Conocimiento Epistémico', desc: 'Consultando definiciones de machine learning y cuenca del Sinú.' },
      'acerca-de': { seccion: 'Acerca del OVA', fase5E: 'Información Institucional', desc: 'Información de la Universidad de Córdoba y el proyecto.' },
      creditos: { seccion: 'Créditos del Equipo', fase5E: 'Institucional', desc: 'Revisando los integrantes y coordinadores del OVA.' }
    }
    const info = seccionLabels[section]
    if (info) {
      setContext({
        seccion: info.seccion,
        fase5E: info.fase5E,
        descripcionVisual: info.desc
      })
    }
  }
}
</script>

<style scoped>
.stage-workspace {
  flex: 1;
  min-height: 0;
  width: 100%;
  display: flex;
  gap: 0;
  overflow: hidden;
  transition: gap 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.stage-workspace.is-split {
  gap: 16px;
}

/* Grilla 3x2 simétrica (6 tarjetas) en vista general */
.cards-dock {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  flex-shrink: 0;
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1), gap 0.35s ease;
}

.cards-dock.docked-left {
  width: 280px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
}

/* Tarjetas interactivas con Container Queries */
.game-card {
  container-type: size;
  position: relative;
  overflow: hidden;
  padding: clamp(16px, 4cqmin, 28px);
  cursor: pointer;
  min-height: 0;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  box-shadow: 0 8px 24px rgba(0, 100, 150, 0.06) !important;
}

.game-card.is-compact {
  padding: 10px 14px;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 34px rgba(0, 100, 150, 0.16) !important;
}

.card-jugar {
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  border: 2px solid transparent;
}

.card-conceptos,
.card-acerca,
.card-creditos {
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
}

.card-conceptos:hover {
  border-color: #76b82a;
}

.card-acerca:hover {
  border-color: #129fea;
}

.card-creditos:hover {
  border-color: #ffc21c;
}

.game-card.is-active-card {
  border-color: #006496;
  box-shadow: 0 10px 28px rgba(0, 100, 150, 0.22) !important;
  transform: translateX(4px);
}

.card-jugar.is-active-card {
  border-color: #ffc21c;
}

/* Tipografía fluida proporcional al card */
.fluid-hero-title {
  font-size: clamp(1.2rem, 10.5cqmin, 3rem);
  line-height: 1.05;
}

.fluid-title {
  font-size: clamp(1.1rem, 9.5cqmin, 2.4rem);
  line-height: 1.1;
}

.fluid-desc {
  font-size: clamp(0.95rem, 4.8cqmin, 1.3rem);
  line-height: 1.38;
  max-width: 58ch;
}

.card-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: clamp(0.75rem, 3.5cqmin, 0.95rem);
}

.pill-white {
  background-color: #ffffff;
  color: #006496;
}

.pill-secondary {
  background-color: rgba(61, 106, 0, 0.12);
  color: #3d6a00;
}

.pill-info {
  background-color: rgba(18, 159, 234, 0.14);
  color: #006496;
}

.pill-warning {
  background-color: rgba(255, 194, 28, 0.22);
  color: #795900;
}

.card-cta {
  font-size: clamp(0.9rem, 4.4cqmin, 1.2rem);
  font-weight: 700;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

.game-card:hover .cta-arrow {
  transform: translateX(6px);
}

.card-watermark {
  position: absolute;
  right: -12px;
  bottom: -16px;
  font-size: clamp(64px, 38cqmin, 170px) !important;
  opacity: 0.08;
  pointer-events: none;
  transform: rotate(-12deg);
}

.watermark-secondary {
  color: #3d6a00;
}

.watermark-primary {
  color: #006496;
}

.watermark-warning {
  color: #bf8f00;
}

.card-icon-circle {
  width: clamp(34px, 11cqmin, 52px);
  height: clamp(34px, 11cqmin, 52px);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.fluid-icon {
  font-size: clamp(18px, 6cqmin, 28px) !important;
}

/* Panel derecho */
.screen-stage {
  width: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s ease;
}

.screen-stage.is-open {
  flex: 1;
  width: 100%;
  opacity: 1;
  min-width: 0;
  height: 100%;
}

.screen-slide-enter-active,
.screen-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.screen-slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.screen-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

.bg-white-20 {
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-secondary-soft {
  background-color: rgba(61, 106, 0, 0.1);
}

.bg-info-soft {
  background-color: rgba(18, 159, 234, 0.12);
}

.bg-warning-soft {
  background-color: rgba(255, 194, 28, 0.18);
}

.text-white-90 {
  color: rgba(255, 255, 255, 0.92);
}

@media (max-width: 900px) {
  .stage-workspace.is-split {
    flex-direction: column;
  }

  .cards-dock.docked-left {
    width: 100%;
    height: 76px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
