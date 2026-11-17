<template>
  <v-container class="login-page fill-height d-flex align-center justify-center py-8">
    <LoginCard />
  </v-container>
</template>

<script setup lang="ts">
useHead({
  title: 'Acceso'
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
}
</style>
