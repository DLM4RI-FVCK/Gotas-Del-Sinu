<template>
  <div class="dashboard-shell">
    <DashboardTopHud
      :active-section="activeSection"
      @reset-view="activeSection = null"
      @open-avatar="activeSection = 'avatar'"
      @select-section="activeSection = $event"
    />

    <DashboardGameGrid
      :active-section="activeSection"
      @select-section="activeSection = $event"
    />

    <!-- Tutor Socrático Inteligente Zenuito siempre accesible -->
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
  width: 100%;
  max-width: 100%;
  height: 100dvh;
  min-height: 100dvh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex !important;
  flex-direction: column !important;
  background-color: #f7f9ff;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .dashboard-shell {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 100dvh !important;
    overflow: visible !important;
  }
}
</style>
