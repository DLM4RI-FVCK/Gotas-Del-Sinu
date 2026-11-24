<template>
  <div class="login-page d-flex align-center justify-center px-3 py-6">
    <LoginCard />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Acceso'
})
</script>

<style scoped>
.login-page {
  width: 100%;
  max-width: 100%;
  min-height: 100dvh;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: visible;
  box-sizing: border-box;
}
</style>
