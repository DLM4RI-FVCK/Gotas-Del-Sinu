<template>
  <div class="credits-screen d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Cabecera -->
    <div class="d-flex align-center justify-space-between gap-3 mb-3 flex-shrink-0">
      <div class="d-flex align-center gap-3">
        <div class="header-icon-box">
          <v-icon icon="mdi-account-group-outline" color="white" size="26" />
        </div>
        <div>
          <span class="top-tag">Equipo Creador · Licenciatura en Informática (5° Semestre)</span>
          <h2 class="credits-title font-weight-bold">
            Créditos del OVA Gotas del Sinú
          </h2>
        </div>
      </div>

      <v-btn icon="mdi-close" variant="tonal" color="primary" size="small" @click="$emit('close')" />
    </div>

    <!-- Grilla 3x2 con los 5 Integrantes del Equipo + Docente de la Asignatura (cada uno con Avatar Personalizado) -->
    <div class="team-grid flex-1-1 min-h-0">
      <div
        v-for="member in teamMembers"
        :key="member.name"
        class="member-card d-flex flex-column justify-space-between pa-4 rounded-xl"
        :class="{ 'is-professor': member.isProfessor }"
      >
        <v-icon :icon="member.watermark" class="member-watermark" />

        <!-- Fila superior: Rol + Icono -->
        <div class="d-flex align-center justify-space-between position-relative z-2">
          <span class="role-badge" :style="{ backgroundColor: member.badgeBg, color: member.badgeColor }">
            {{ member.emoji }} {{ member.role }}
          </span>
          <v-icon :icon="member.icon" :color="member.vuetifyColor" size="22" />
        </div>

        <!-- Centro: Avatar Personalizado + Nombre + Rol descriptivo -->
        <div class="d-flex align-center gap-3 my-auto py-2 position-relative z-2">
          <img
            :src="buildAvatarUrl(member.avatar)"
            :alt="member.name"
            class="member-avatar"
          />
          <div class="min-w-0 flex-1-1">
            <h3 class="member-name font-weight-bold text-truncate mb-1">
              {{ member.name }}
            </h3>
            <p class="member-desc mb-0">
              {{ member.desc }}
            </p>
          </div>
        </div>

        <!-- Pie de tarjeta -->
        <div class="member-footer pt-2 d-flex align-center justify-space-between position-relative z-2">
          <span class="text-caption font-weight-bold" style="color: #4b6375;">
            {{ member.tag }}
          </span>
          <span class="text-caption font-weight-bold" style="color: #006496;">
            Unicórdoba
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buildAvatarUrl, type AvatarConfig } from '~/composables/useUserSession'

defineEmits<{
  (e: 'close'): void
}>()

interface TeamMember {
  name: string
  role: string
  emoji: string
  desc: string
  tag: string
  icon: string
  watermark: string
  vuetifyColor: string
  badgeBg: string
  badgeColor: string
  isProfessor?: boolean
  avatar: AvatarConfig
}

const teamMembers: TeamMember[] = [
  {
    name: 'Mario Castro',
    role: 'Coordinador',
    emoji: '🎯',
    desc: 'Dirección general del proyecto, planeación estratégica y articulación del equipo.',
    tag: 'Gestión y Liderazgo',
    icon: 'mdi-compass-rose',
    watermark: 'mdi-account-tie-outline',
    vuetifyColor: 'primary',
    badgeBg: 'rgba(0, 100, 150, 0.12)',
    badgeColor: '#006496',
    avatar: {
      skinColor: 'edb98a',
      top: 'shortFlat',
      hairColor: '2c1b18',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'beardLight',
      accessories: 'wayfarers',
      clothing: 'blazerAndShirt',
      clothesColor: '25557c',
      clothingGraphic: 'hola',
      backgroundColor: 'cce5ff'
    }
  },
  {
    name: 'Rosendo de Castro',
    role: 'Técnico',
    emoji: '💻',
    desc: 'Arquitectura de software, programación del simulador de grafos y motor de Machine Learning.',
    tag: 'Desarrollo e Ingeniería',
    icon: 'mdi-code-tags',
    watermark: 'mdi-console-line',
    vuetifyColor: 'info',
    badgeBg: 'rgba(18, 159, 234, 0.14)',
    badgeColor: '#006496',
    avatar: {
      skinColor: 'd08b5b',
      top: 'shortCurly',
      hairColor: '2c1b18',
      eyebrows: 'raisedExcitedNatural',
      eyes: 'default',
      mouth: 'twinkle',
      facialHair: 'none',
      accessories: 'prescription02',
      clothing: 'hoodie',
      clothesColor: '262e33',
      clothingGraphic: 'diamond',
      backgroundColor: 'b2ebf2'
    }
  },
  {
    name: 'Luis Galaraga',
    role: 'Diseño',
    emoji: '🎨',
    desc: 'Diseño de interfaz de usuario (UI/UX), identidad visual del Río Sinú y experiencia interactiva.',
    tag: 'Arte y Experiencia Visual',
    icon: 'mdi-palette-outline',
    watermark: 'mdi-brush-variant',
    vuetifyColor: 'warning',
    badgeBg: 'rgba(255, 194, 28, 0.22)',
    badgeColor: '#795900',
    avatar: {
      skinColor: 'ffdbb4',
      top: 'shaggy',
      hairColor: '4a312c',
      eyebrows: 'defaultNatural',
      eyes: 'wink',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'round',
      clothing: 'graphicShirt',
      clothesColor: 'ff5c5c',
      clothingGraphic: 'cumbia',
      backgroundColor: 'ffecb3'
    }
  },
  {
    name: 'Andrea Hernández',
    role: 'Pedagógica',
    emoji: '📚',
    desc: 'Estructuración metodológica basada en las 5E, analogías didácticas y retos de aprendizaje.',
    tag: 'Didáctica y Método 5E',
    icon: 'mdi-school-outline',
    watermark: 'mdi-book-education-outline',
    vuetifyColor: 'secondary',
    badgeBg: 'rgba(61, 106, 0, 0.12)',
    badgeColor: '#3d6a00',
    avatar: {
      skinColor: 'edb98a',
      top: 'straight01',
      hairColor: '2c1b18',
      eyebrows: 'raisedExcitedNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'none',
      clothing: 'collarAndSweater',
      clothesColor: 'a7ffc4',
      clothingGraphic: 'hola',
      backgroundColor: 'aff763'
    }
  },
  {
    name: 'Lina Franco',
    role: 'Documentación',
    emoji: '📝',
    desc: 'Investigación conceptual, construcción del glosario técnico y documentación académica del OVA.',
    tag: 'Investigación y Contenidos',
    icon: 'mdi-file-document-edit-outline',
    watermark: 'mdi-notebook-edit-outline',
    vuetifyColor: 'primary',
    badgeBg: 'rgba(0, 100, 150, 0.12)',
    badgeColor: '#006496',
    avatar: {
      skinColor: 'ffdbb4',
      top: 'curvy',
      hairColor: '724133',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'twinkle',
      facialHair: 'none',
      accessories: 'prescription01',
      clothing: 'blazerAndShirt',
      clothesColor: 'ffafb9',
      clothingGraphic: 'hola',
      backgroundColor: 'ffd8e4'
    }
  },
  {
    name: 'Prof. Juan Carlos Giraldo',
    role: 'Docente Asesor',
    emoji: '👨‍🏫',
    desc: 'Docente titular de la asignatura Inteligencia Computacional · Licenciatura en Informática (5° Semestre).',
    tag: 'Inteligencia Computacional',
    icon: 'mdi-human-male-board',
    watermark: 'mdi-brain',
    vuetifyColor: 'secondary',
    badgeBg: 'rgba(61, 106, 0, 0.16)',
    badgeColor: '#3d6a00',
    isProfessor: true,
    avatar: {
      skinColor: 'edb98a',
      top: 'theCaesar',
      hairColor: '4a312c',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'beardMedium',
      accessories: 'prescription01',
      clothing: 'blazerAndSweater',
      clothesColor: '25557c',
      clothingGraphic: 'hola',
      backgroundColor: 'd7eaff'
    }
  }
]
</script>

<style scoped>
.credits-screen {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #d7e3ee;
  border-radius: 24px;
  overflow: hidden;
}

.header-icon-box {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, #bf8f00 0%, #ffc21c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.top-tag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #795900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.credits-title {
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  color: #001e31;
  line-height: 1.15;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 14px;
  overflow-y: auto;
}

.member-card {
  container-type: size;
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #f7f9ff 100%);
  border: 2px solid #d7e3ee;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.member-card:hover {
  transform: translateY(-3px);
  border-color: #129fea;
  box-shadow: 0 12px 26px rgba(0, 100, 150, 0.12);
}

.member-card.is-professor {
  background: linear-gradient(145deg, #ffffff 0%, #f2fbe8 100%);
  border-color: #76b82a;
}

.member-watermark {
  position: absolute;
  right: -12px;
  bottom: -14px;
  font-size: clamp(64px, 38cqmin, 145px) !important;
  opacity: 0.06;
  color: #006496;
  pointer-events: none;
  transform: rotate(-10deg);
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: clamp(0.72rem, 3.6cqmin, 0.88rem);
  font-weight: 800;
}

.member-avatar {
  width: clamp(68px, 32cqmin, 105px);
  height: clamp(68px, 32cqmin, 105px);
  border-radius: 20px;
  border: 3px solid #ffffff;
  box-shadow: 0 6px 18px rgba(0, 100, 150, 0.14);
  flex-shrink: 0;
  display: block;
}

.member-name {
  font-size: clamp(1.05rem, 7cqmin, 1.45rem);
  color: #001e31;
  line-height: 1.15;
}

.member-desc {
  font-size: clamp(0.8rem, 4.4cqmin, 0.98rem);
  color: #3f4851;
  line-height: 1.32;
}

.member-footer {
  border-top: 1px solid #e4f0f7;
}

.z-2 {
  z-index: 2;
}

.min-w-0 {
  min-width: 0;
}

.min-h-0 {
  min-height: 0;
}

.gap-3 {
  gap: 12px;
}

@media (max-width: 960px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
}

@media (max-width: 600px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
