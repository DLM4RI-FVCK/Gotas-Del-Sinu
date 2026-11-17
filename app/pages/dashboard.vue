<template>
  <div class="dashboard-shell">
    <DashboardTopHud
      :active-section="activeSection"
      @reset-view="activeSection = null"
      @open-avatar="activeSection = 'avatar'"
    />

    <DashboardGameGrid
      :active-section="activeSection"
      @select-section="activeSection = $event"
    />

    <!-- Tutor Socrático Inteligente Zenuito siempre accesible abajo a la izquierda -->
    <DashboardZenuitoFloating />
  </div>
</template>

<script setup lang="ts">
import type { SectionKey } from '~/components/dashboard/GameGrid.vue'

useHead({
  title: 'Dashboard'
})

const activeSection = ref<SectionKey>(null)
</script>

<style scoped>
.dashboard-shell {
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f7f9ff;
}
</style>
