<template>
  <v-app class="gotas-app">
    <v-main class="app-main-content">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — Gotas del Sinú` : 'Gotas del Sinú'
  }
})
</script>

<style>
html,
body {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  overflow-x: hidden !important;
}

.gotas-app {
  background-color: var(--color-surface, #f7f9ff) !important;
  color: var(--color-on-surface, #001e31) !important;
  width: 100% !important;
  min-height: 100dvh !important;
}

.gotas-app .v-application__wrap {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  min-height: 100dvh !important;
  backface-visibility: hidden;
}

.app-main-content {
  flex: 1 1 auto !important;
  width: 100% !important;
  max-width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}

@media (max-width: 900px) {
  html {
    height: auto !important;
    min-height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  body {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 100dvh !important;
    margin: 0 auto !important;
    overflow-x: hidden !important;
    overflow-y: visible !important;
    touch-action: pan-y !important;
    -webkit-overflow-scrolling: touch !important;
  }

  .gotas-app,
  .gotas-app .v-application__wrap,
  .app-main-content {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 100dvh !important;
    overflow: visible !important;
  }
}
</style>
