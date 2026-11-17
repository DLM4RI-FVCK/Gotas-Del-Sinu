<template>
  <div class="glossary-screen d-flex flex-column justify-space-between pa-4 pa-sm-6">
    <!-- Cabecera del Glosario / Diccionario -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-3 mb-3 flex-shrink-0">
      <div class="d-flex align-center gap-3">
        <div class="header-icon-box">
          <v-icon icon="mdi-book-alphabet" color="white" size="26" />
        </div>
        <div>
          <span class="top-tag">Diccionario Interactivo · De lo Sencillo a lo Avanzado</span>
          <h2 class="glossary-title font-weight-bold">
            Glosario del OVA Gotas del Sinú
          </h2>
        </div>
      </div>

      <div class="d-flex align-center gap-2">
        <!-- Buscador rápido tipo diccionario -->
        <div class="search-box d-flex align-center px-3 py-1 rounded-lg">
          <v-icon icon="mdi-magnify" color="primary" size="18" class="mr-2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar término (ej. Raíz, Gini, 5E)..."
            class="search-input"
          />
          <button v-if="searchQuery" type="button" class="clear-btn" @click="searchQuery = ''">✕</button>
        </div>

        <v-btn icon="mdi-close" variant="tonal" color="primary" size="small" @click="$emit('close')" />
      </div>
    </div>

    <!-- Filtros por Categoría y por Nivel de Complejidad -->
    <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-3 flex-shrink-0">
      <div class="d-flex flex-wrap gap-2">
        <v-btn
          v-for="cat in glossaryCategories"
          :key="cat.key"
          size="small"
          rounded="lg"
          :color="activeCategory === cat.key ? 'primary' : 'default'"
          :variant="activeCategory === cat.key ? 'flat' : 'tonal'"
          class="text-none font-weight-bold"
          :prepend-icon="cat.icon"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </v-btn>
      </div>

      <!-- Filtro de Dificultad progresiva -->
      <div class="d-flex align-center gap-1">
        <v-chip
          v-for="lvl in difficultyFilters"
          :key="lvl.value"
          size="small"
          :color="activeDifficulty === lvl.value ? lvl.color : 'default'"
          :variant="activeDifficulty === lvl.value ? 'flat' : 'tonal'"
          class="font-weight-bold cursor-pointer"
          @click="activeDifficulty = lvl.value"
        >
          {{ lvl.label }}
        </v-chip>
      </div>
    </div>

    <!-- Grilla Responsiva Tipo Diccionario (Ordenada de Básico a Avanzado) -->
    <div class="dictionary-scroll flex-1-1 pr-1">
      <div v-if="filteredTerms.length === 0" class="text-center py-10">
        <div class="text-h3 mb-2">📖🔍</div>
        <h3 class="text-h6 font-weight-bold" style="color: #001e31;">
          No encontramos ningún concepto con "{{ searchQuery }}"
        </h3>
        <v-btn color="primary" variant="tonal" size="small" rounded="lg" class="text-none mt-2" @click="resetFilters">
          Mostrar todos los conceptos
        </v-btn>
      </div>

      <div v-else class="dictionary-grid">
        <div
          v-for="(item, idx) in filteredTerms"
          :key="item.id"
          class="dict-entry-card d-flex flex-column justify-space-between pa-4 rounded-xl"
        >
          <!-- Fila superior: Número de progresión + Categoría + Nivel de Dificultad -->
          <div>
            <div class="d-flex align-center justify-space-between gap-2 mb-2">
              <span class="cat-badge">{{ item.categoryLabel }}</span>
              <span
                class="diff-pill"
                :class="{
                  'diff-basic': item.difficulty === 'Básico',
                  'diff-mid': item.difficulty === 'Intermedio',
                  'diff-adv': item.difficulty === 'Avanzado'
                }"
              >
                {{
                  item.difficulty === 'Básico'
                    ? '🟢 1. Básico'
                    : item.difficulty === 'Intermedio'
                      ? '🟡 2. Intermedio'
                      : '🔴 3. Avanzado'
                }}
              </span>
            </div>

            <!-- Cabecera del término tipo Diccionario -->
            <div class="d-flex align-center gap-3 mb-2">
              <div class="term-emoji-box">
                <span>{{ item.emoji }}</span>
              </div>
              <div>
                <h3 class="term-title font-weight-bold">
                  <span class="term-index">#{{ idx + 1 }}</span> {{ item.term }}
                </h3>
                <div v-if="item.english" class="term-en font-italic">
                  Inglés: "{{ item.english }}"
                </div>
              </div>
            </div>

            <!-- Definición principal -->
            <p class="term-def mb-3">
              <strong>Definición:</strong> {{ item.definition }}
            </p>
          </div>

          <!-- Ejemplo contextualizado en Córdoba / Río Sinú -->
          <div class="example-box pa-3 rounded-lg">
            <span class="example-label font-weight-bold">🌊 En Gotas del Sinú:</span>
            <span class="example-text ml-1">{{ item.sinuExample }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  glossaryCategories,
  glossaryTerms,
  type DifficultyLevel,
  type GlossaryCategory
} from '~/utils/glosarioData'

defineEmits<{
  (e: 'close'): void
}>()

const searchQuery = ref('')
const activeCategory = ref<GlossaryCategory>('todas')
const activeDifficulty = ref<'Todos' | DifficultyLevel>('Todos')

const difficultyFilters: { value: 'Todos' | DifficultyLevel; label: string; color: string }[] = [
  { value: 'Todos', label: 'Todos los niveles', color: 'primary' },
  { value: 'Básico', label: '🟢 Básico', color: 'success' },
  { value: 'Intermedio', label: '🟡 Intermedio', color: 'warning' },
  { value: 'Avanzado', label: '🔴 Avanzado', color: 'error' }
]

const filteredTerms = computed(() => {
  return glossaryTerms
    .filter(item => {
      const matchesCat = activeCategory.value === 'todas' || item.category === activeCategory.value
      const matchesDiff = activeDifficulty.value === 'Todos' || item.difficulty === activeDifficulty.value
      const q = searchQuery.value.trim().toLowerCase()
      const matchesQuery =
        !q ||
        item.term.toLowerCase().includes(q) ||
        (item.english && item.english.toLowerCase().includes(q)) ||
        item.definition.toLowerCase().includes(q) ||
        item.sinuExample.toLowerCase().includes(q)
      return matchesCat && matchesDiff && matchesQuery
    })
    .sort((a, b) => a.difficultyOrder - b.difficultyOrder)
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCategory.value = 'todas'
  activeDifficulty.value = 'Todos'
}
</script>

<style scoped>
.glossary-screen {
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
  background: linear-gradient(135deg, #3d6a00 0%, #76b82a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.top-tag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #3d6a00;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.glossary-title {
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  color: #001e31;
  line-height: 1.15;
}

.search-box {
  background-color: #f0f7ff;
  border: 1.5px solid #cbdceb;
  min-width: 240px;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.85rem;
  color: #001e31;
  width: 100%;
}

.clear-btn {
  font-size: 0.75rem;
  color: #6f7882;
  cursor: pointer;
}

.dictionary-scroll {
  overflow-y: auto;
  min-height: 0;
}

.dictionary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(270px, 28vw, 380px), 1fr));
  gap: 14px;
  padding-bottom: 12px;
}

.dict-entry-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
  border: 2px solid #d7e3ee;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.dict-entry-card:hover {
  transform: translateY(-3px);
  border-color: #129fea;
  box-shadow: 0 10px 24px rgba(0, 100, 150, 0.1);
}

.cat-badge {
  font-size: 0.7rem;
  font-weight: 800;
  color: #006496;
  background-color: rgba(0, 100, 150, 0.1);
  padding: 3px 10px;
  border-radius: 999px;
}

.diff-pill {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 999px;
}

.diff-basic {
  background-color: #eef9e3;
  color: #3d6a00;
}

.diff-mid {
  background-color: #fff8e1;
  color: #795900;
}

.diff-adv {
  background-color: #ffdad6;
  color: #93000a;
}

.term-emoji-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: #eef6ff;
  border: 1px solid #d7e3ee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.term-index {
  color: #129fea;
  font-size: 0.85em;
}

.term-title {
  font-size: clamp(1rem, 1.6vmin, 1.18rem);
  color: #001e31;
  line-height: 1.2;
}

.term-en {
  font-size: 0.76rem;
  color: #6f7882;
}

.term-def {
  font-size: clamp(0.86rem, 1.45vmin, 0.96rem);
  color: #2c3e50;
  line-height: 1.42;
}

.example-box {
  background-color: #f0f7ff;
  border-left: 4px solid #006496;
  font-size: 0.82rem;
  line-height: 1.35;
}

.example-label {
  color: #006496;
}

.example-text {
  color: #001e31;
}

.gap-1 {
  gap: 6px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}
</style>
