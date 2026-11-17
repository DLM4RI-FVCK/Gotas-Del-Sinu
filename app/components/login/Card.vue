<template>
  <v-card class="login-card pa-6 pa-sm-8" max-width="460" width="100%" elevation="0" rounded="xl">
    <div class="text-center mb-6">
      <div class="brand-badge mx-auto mb-4">
        <v-icon icon="mdi-water" color="white" size="30" />
      </div>
      <h1 class="login-title text-h4 font-weight-bold mb-2">
        Gotas del Sinú
      </h1>
      <p class="login-subtitle text-body-2">
        Ingresa tus datos para comenzar
      </p>
    </div>

    <v-form ref="formRef" v-model="isValid" @submit.prevent="handleSubmit">
      <v-text-field v-model="nombre" label="Nombre" placeholder="Ej. María Pérez" variant="outlined" color="primary"
        density="comfortable" prepend-inner-icon="mdi-account-outline"
        :rules="[v => !!v?.trim() || 'Ingresa tu nombre']" class="mb-3" required />

      <v-text-field v-model.number="edad" label="Edad" placeholder="Ej. 14" type="number" variant="outlined"
        color="primary" density="comfortable" prepend-inner-icon="mdi-cake-variant-outline" :rules="[
          v => (v !== null && v !== '' && !isNaN(Number(v))) || 'Ingresa tu edad',
          v => (Number(v) >= 5 && Number(v) <= 99) || 'Ingresa una edad válida (5 - 99)'
        ]" class="mb-4" required />

      <div class="mb-4">
        <label class="field-label d-block text-body-2 font-weight-medium mb-2">
          Nivel educativo
        </label>
        <v-btn-toggle v-model="nivelEducativo" mandatory color="primary" variant="outlined" divided
          class="w-100 nivel-toggle">
          <v-btn value="Primaria" class="flex-1-1 text-none">
            Primaria
          </v-btn>
          <v-btn value="Secundaria" class="flex-1-1 text-none">
            Secundaria
          </v-btn>
          <v-btn value="Universidad" class="flex-1-1 text-none">
            Universidad
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-text-field v-model="gradoOSemestre" :label="nivelEducativo === 'Universidad' ? 'Semestre' : 'Grado'"
        :placeholder="nivelEducativo === 'Universidad' ? 'Ej. 3° semestre' : 'Ej. 8° grado'" variant="outlined"
        color="primary" density="comfortable" prepend-inner-icon="mdi-school-outline"
        :rules="[v => !!v?.trim() || `Ingresa tu ${nivelEducativo === 'Universidad' ? 'semestre' : 'grado'}`]"
        class="mb-6" required />

      <v-btn type="submit" color="primary" size="large" block rounded="lg" class="text-none font-weight-bold"
        :disabled="!isValid">
        Entrar al Dashboard
        <v-icon icon="mdi-arrow-right" end />
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import type { NivelEducativo } from '~/composables/useUserSession'

const { login } = useUserSession()

const formRef = ref()
const isValid = ref(false)
const nombre = ref('')
const edad = ref<number | null>(null)
const nivelEducativo = ref<NivelEducativo>('Primaria')
const gradoOSemestre = ref('')

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  login({
    nombre: nombre.value,
    edad: edad.value,
    nivelEducativo: nivelEducativo.value,
    gradoOSemestre: gradoOSemestre.value
  })

  await navigateTo('/dashboard')
}
</script>

<style scoped>
.login-card {
  background-color: #ffffff;
  border: 1px solid #d7e3ee;
  box-shadow: 0 12px 32px rgba(0, 100, 150, 0.08) !important;
}

.brand-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #006496 0%, #129fea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-title {
  color: #001e31;
}

.login-subtitle {
  color: #4b6375;
}

.field-label {
  color: #001e31;
}

.nivel-toggle {
  display: flex;
  width: 100%;
  border-radius: 10px;
}

.nivel-toggle :deep(.v-btn) {
  flex: 1 1 0;
}
</style>
