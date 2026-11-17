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
.gotas-app {
  background-color: var(--color-surface, #f7f9ff) !important;
  color: var(--color-on-surface, #001e31) !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
