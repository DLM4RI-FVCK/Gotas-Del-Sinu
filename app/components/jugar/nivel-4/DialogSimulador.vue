<template>
  <Teleport to="body">
    <Transition name="inpage-modal-fade">
      <div v-if="mode" class="inpage-dialog-backdrop pa-3 pa-sm-5" @click.self="$emit('close')">
        <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
          <!-- Cabecera -->
          <div class="dialog-header-bar d-flex align-center justify-space-between gap-2 pb-3 border-b flex-shrink-0">
            <div class="d-flex align-center gap-2 min-w-0">
              <v-icon icon="mdi-sitemap-outline" color="primary" size="24" class="flex-shrink-0" />
              <h3 class="dialog-main-title text-h6 font-weight-bold mb-0" style="color: #001e31;">
                {{
                  mode === 'dataset'
                    ? 'Datos Históricos de Córdoba (Entrenamiento)'
                    : mode === 'guide'
                      ? 'Guía del Simulador: Crea, Conecta y Entrena'
                      : 'Explicación Detallada del Entrenamiento'
                }}
              </h3>
            </div>

            <v-btn
              color="primary"
              variant="tonal"
              size="small"
              rounded="lg"
              class="text-none font-weight-bold flex-shrink-0"
              prepend-icon="mdi-close"
              @click="$emit('close')"
            >
              Cerrar
            </v-btn>
          </div>

          <!-- MODO 1: TABLA AMPLIADA DE DATOS DE CÓRDOBA A PANTALLA COMPLETA -->
          <div v-if="mode === 'dataset'" class="inpage-dialog-body py-3 d-flex flex-column justify-space-between gap-3">
            <div>
              <p class="text-body-2 text-sm-body-1 mb-3" style="color: #3f4851;">
                Analiza los <strong>6 registros históricos de Córdoba</strong>. Cada fila está organizada en una sola línea desde el <strong>Caso</strong> hasta el estado <strong>Real</strong> para que elijas los mejores umbrales de tu árbol:
              </p>

              <!-- Tabla organizada al 100% en 1 sola línea por celda sin partir iconos ni textos -->
              <div class="full-table-wrap rounded-xl overflow-hidden mb-3">
                <table class="full-org-table">
                  <thead>
                    <tr>
                      <th class="text-left">Caso</th>
                      <th class="text-left">Lluvia</th>
                      <th class="text-left">Río Sinú</th>
                      <th class="text-left">Viento</th>
                      <th class="text-left">Real</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in cordobaDataset" :key="r.id">
                      <td class="font-weight-bold text-left cell-nowrap">{{ r.id }} · {{ r.municipio }}</td>
                      <td class="text-left cell-nowrap">{{ r.lluvia_mm }} mm</td>
                      <td class="text-left cell-nowrap">{{ r.nivel_rio_m }} m</td>
                      <td class="text-left cell-nowrap">{{ r.viento_kmh }} km/h</td>
                      <td class="text-left cell-nowrap">
                        <span class="real-status-chip" :class="`chip-${r.realClass}`">
                          <span>{{ r.emoji }}</span>
                          <span>{{ r.realClass }}</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Tarjetas resumen de pistas y umbrales para aprovechar toda la pantalla -->
              <div class="threshold-hints-grid mb-3">
                <div class="hint-card pa-3 rounded-xl">
                  <div class="hint-card-title font-weight-bold" style="color: #006496;">
                    🌧️ Pista 1: Umbral de Lluvia (> 40 mm)
                  </div>
                  <div class="hint-card-desc">
                    En <strong>Montería (10 mm)</strong> y <strong>Cereté (20 mm)</strong> la lluvia fue menor a 40 mm y el estado fue <strong>🟢 Calma</strong>. Preguntar <code>¿Lluvia > 40 mm?</code> en el Nodo Raíz separa los días en calma de inmediato.
                  </div>
                </div>

                <div class="hint-card pa-3 rounded-xl">
                  <div class="hint-card-title font-weight-bold" style="color: #3d6a00;">
                    🌊 Pista 2: Umbral del Río Sinú (> 4.0 m)
                  </div>
                  <div class="hint-card-desc">
                    Entre los municipios lluviosos, cuando el Río Sinú superó los <strong>4.0 m</strong> (<strong>San Pelayo 5.1 m</strong> y <strong>Tierralta 4.6 m</strong>) ocurrió <strong>🔴 Inundación</strong>; con menos de 4.0 m quedó en <strong>🟡 Vigilancia</strong>.
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-center pt-2 flex-shrink-0">
              <v-btn
                color="primary"
                variant="flat"
                size="large"
                block
                rounded="xl"
                class="text-none font-weight-bold"
                prepend-icon="mdi-check-circle-outline"
                @click="$emit('close')"
              >
                Entendido · Volver al Simulador
              </v-btn>
            </div>
          </div>

          <!-- MODO 2: GUÍA DE USO DEL SIMULADOR LIBRE -->
          <div v-else-if="mode === 'guide'" class="inpage-dialog-body py-3 d-flex flex-column justify-space-between gap-3">
            <div class="d-flex flex-column gap-3">
              <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
                <div class="flow-emoji-circle bg-info-soft"><span>1️⃣</span></div>
                <div>
                  <div class="text-subtitle-1 font-weight-bold" style="color: #006496;">
                    Despliega "Crear Nodo" arriba y mira tu Árbol abajo
                  </div>
                  <div class="text-body-2" style="color: #3f4851;">
                    Toca <strong>"Crear Nodo"</strong> para desplegar en la parte superior el creador de <strong>👑 Nodo Raíz</strong>, <strong>🔍 Nodo Decisión</strong> o <strong>🍃 Hoja</strong> (🟢 Calma, 🟡 Vigilancia o 🔴 Inundación) mientras ves cómo se agregan al árbol en la parte inferior.
                  </div>
                </div>
              </div>

              <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
                <div class="flow-emoji-circle bg-warning-soft"><span>2️⃣</span></div>
                <div>
                  <div class="text-subtitle-1 font-weight-bold" style="color: #795900;">
                    Conecta las ramas NO y SÍ
                  </div>
                  <div class="text-body-2" style="color: #3f4851;">
                    Para unir dos nodos, toca el botón <strong>"Rama NO (≤) ●"</strong> o <strong>"Rama SÍ (>) ●"</strong> del nodo superior y luego toca el botón <strong>"● Entrada"</strong> en la parte superior del nodo destino.
                  </div>
                </div>
              </div>

              <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
                <div class="flow-emoji-circle bg-secondary-soft"><span>3️⃣</span></div>
                <div>
                  <div class="text-subtitle-1 font-weight-bold" style="color: #3d6a00;">
                    Entrenamiento Dinámico con Explicación del Porqué
                  </div>
                  <div class="text-body-2" style="color: #3f4851;">
                    Al pulsar <strong>"⚡ Entrenar Árbol en Vivo"</strong>, los 6 municipios de Córdoba recorrerán tu árbol uno por uno y recibirás un diagnóstico matemático de <strong>Pureza Gini</strong>.
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex justify-center pt-2 flex-shrink-0">
              <v-btn
                color="primary"
                variant="flat"
                size="large"
                block
                rounded="xl"
                class="text-none font-weight-bold"
                prepend-icon="mdi-check-circle-outline"
                @click="$emit('close')"
              >
                Volver al Simulador
              </v-btn>
            </div>
          </div>

          <!-- MODO 3: REPORTE PEDAGÓGICO CON EXPLICACIÓN DEL "PORQUÉ" DE CADA NODO Y CADA DATO -->
          <div v-else-if="mode === 'report' && report" class="inpage-dialog-body py-3">
            <div v-if="!report.validStructure" class="text-center py-6 my-auto">
              <div class="text-h2 mb-2">🔌🛠️</div>
              <h3 class="text-h5 font-weight-bold mb-2" style="color: #ba1a1a;">
                Estructura incompleta en tu Árbol
              </h3>
              <p class="text-body-1 mx-auto mb-4" style="color: #3f4851; max-width: 560px;">
                {{ report.errorMsg }}
              </p>
              <v-btn
                color="primary"
                size="large"
                rounded="xl"
                class="text-none font-weight-bold"
                @click="$emit('close')"
              >
                Volver al lienzo para conectar
              </v-btn>
            </div>

            <div v-else>
              <!-- Banner resumen de precisión -->
              <div
                class="report-summary d-flex flex-wrap align-center justify-space-between gap-2 pa-3 rounded-xl mb-3"
                :style="{
                  background: report.passed ? '#eef9e3' : '#fff8e1',
                  border: `2px solid ${report.passed ? '#76b82a' : '#ffc21c'}`
                }"
              >
                <div class="report-summary-copy">
                  <h4 class="report-summary-title text-subtitle-1 text-sm-h6 font-weight-bold mb-0" style="color: #001e31;">
                    {{
                      report.passed
                        ? '🎉 ¡Tu Árbol de Decisión aprendió correctamente los patrones del Río Sinú!'
                        : '🔍 Analicemos por qué tu Árbol confundió algunos casos en Córdoba'
                    }}
                  </h4>
                  <span class="text-body-2" style="color: #3f4851;">
                    Clasificó correctamente <strong>{{ report.correctCount }} de {{ report.totalCount }}</strong> municipios de entrenamiento.
                  </span>
                </div>

                <v-chip
                  size="large"
                  :color="report.passed ? 'success' : 'warning'"
                  variant="flat"
                  class="report-accuracy-chip font-weight-bold"
                >
                  Precisión: {{ report.accuracy }}%
                </v-chip>
              </div>

              <!-- Pestañas del reporte -->
              <div class="report-tabs d-flex flex-wrap gap-2 mb-3">
                <v-btn
                  size="small"
                  rounded="lg"
                  :color="reportTab === 'nodes' ? 'primary' : 'default'"
                  :variant="reportTab === 'nodes' ? 'flat' : 'tonal'"
                  class="report-tab-btn text-none font-weight-bold flex-1-1"
                  prepend-icon="mdi-filter-check-outline"
                  :aria-pressed="reportTab === 'nodes'"
                  @click="reportTab = 'nodes'"
                >
                  <span class="report-tab-long">1. Diagnóstico de cada Nodo (Pureza Gini)</span>
                  <span class="report-tab-short">Diagnóstico</span>
                </v-btn>

                <v-btn
                  size="small"
                  rounded="lg"
                  :color="reportTab === 'rows' ? 'primary' : 'default'"
                  :variant="reportTab === 'rows' ? 'flat' : 'tonal'"
                  class="report-tab-btn text-none font-weight-bold flex-1-1"
                  prepend-icon="mdi-map-marker-path"
                  :aria-pressed="reportTab === 'rows'"
                  @click="reportTab = 'rows'"
                >
                  <span class="report-tab-long">2. Recorrido paso a paso por Municipio (6 casos)</span>
                  <span class="report-tab-short">Recorrido</span>
                </v-btn>
              </div>

              <!-- PESTAÑA 1: EXPLICACIÓN DEL PORQUÉ DE CADA NODO (PUREZA GINI REAL) -->
              <div v-if="reportTab === 'nodes'" class="d-flex flex-column gap-2 mb-4">
                <div
                  v-for="diag in report.nodeDiagnostics"
                  :key="diag.nodeId"
                  class="report-diagnostic-card pa-3 rounded-xl"
                  :style="{
                    backgroundColor: diag.isGoodNode ? '#f5fcf0' : '#fff8e1',
                    border: `2px solid ${diag.isGoodNode ? '#76b82a' : '#ffc21c'}`
                  }"
                >
                  <div class="report-diagnostic-heading d-flex flex-wrap align-center justify-space-between gap-2 mb-1">
                    <span class="report-diagnostic-title text-subtitle-2 font-weight-bold" style="color: #001e31;">
                      {{ diag.title }}
                    </span>
                    <v-chip
                      size="x-small"
                      :color="diag.isGoodNode ? 'success' : 'warning'"
                      variant="flat"
                      class="report-metric-chip font-weight-bold"
                    >
                      Pureza Gini: {{ diag.purityPercent }}% · ({{ diag.samplesCount }} datos)
                    </v-chip>
                  </div>
                  <p class="report-explanation text-body-2 mb-0" style="color: #3f4851;">
                    <strong>¿Por qué?:</strong> {{ diag.whyExplanation }}
                  </p>
                </div>
              </div>

              <!-- PESTAÑA 2: EXPLICACIÓN DEL RECORRIDO DE CADA MUNICIPIO -->
              <div v-else class="d-flex flex-column gap-2 mb-4">
                <div
                  v-for="res in report.rowResults"
                  :key="res.row.id"
                  class="report-result-card pa-3 rounded-xl"
                  :style="{
                    backgroundColor: res.correct ? '#f5fcf0' : '#fff5f5',
                    border: `1.5px solid ${res.correct ? '#76b82a' : '#ba1a1a'}`
                  }"
                >
                  <div class="report-result-heading d-flex flex-wrap align-center justify-space-between gap-2 mb-1">
                    <span class="report-result-title text-subtitle-2 font-weight-bold" style="color: #001e31;">
                      {{ res.row.id }} · {{ res.row.municipio }} (Lluvia: {{ res.row.lluvia_mm }}mm, Río: {{ res.row.nivel_rio_m }}m)
                    </span>
                    <span class="report-result-status text-caption font-weight-bold" :style="{ color: res.correct ? '#3d6a00' : '#ba1a1a' }">
                      Real: {{ res.row.emoji }} {{ res.row.realClass }} | Tu Árbol: {{ res.predicted }}
                    </span>
                  </div>
                  <p class="report-explanation text-caption mb-0" style="color: #3f4851; line-height: 1.4;">
                    <strong>Camino en tu árbol:</strong> {{ res.stepByStepWhy }}
                  </p>
                </div>
              </div>

              <div class="report-actions d-flex justify-center gap-3 w-100">
                <v-btn
                  v-if="!report.passed"
                  color="primary"
                  size="large"
                  rounded="xl"
                  class="text-none font-weight-bold finish-level-btn"
                  prepend-icon="mdi-wrench-outline"
                  @click="$emit('close')"
                >
                  Ajustar Nodos o Umbrales en mi Lienzo
                </v-btn>

                <v-btn
                  v-else
                  color="primary"
                  size="x-large"
                  rounded="xl"
                  class="text-none font-weight-bold finish-level-btn"
                  prepend-icon="mdi-map-marker-path"
                  @click="$emit('finish-level')"
                >
                  <span class="finish-level-long">¡Simulador Superado! Desbloquear Nivel 5 (80%)</span>
                  <span class="finish-level-short">¡Simulador superado!<br>Ir al Nivel 5</span>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { cordobaDataset, type TreeExecutionReport } from '~/utils/nivel4Builder'

defineProps<{
  mode: 'dataset' | 'guide' | 'report' | null
  report: TreeExecutionReport | null
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'finish-level'): void
}>()

const reportTab = ref<'nodes' | 'rows'>('nodes')
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.full-table-wrap {
  border: 2px solid #d7e3ee;
  background-color: #ffffff;
  width: 100%;
  overflow-x: auto;
}

.full-org-table {
  width: 100%;
  min-width: 380px;
  border-collapse: collapse;
  table-layout: auto;
}

.full-org-table thead tr {
  background-color: #006496;
  color: #ffffff;
}

.full-org-table th {
  padding: 11px 12px;
  font-size: 0.88rem;
  font-weight: 800;
  white-space: nowrap !important;
}

.full-org-table td {
  padding: 11px 12px;
  font-size: 0.88rem;
  border-bottom: 1px solid #e4f0f7;
  color: #001e31;
  white-space: nowrap !important;
  vertical-align: middle;
}

.full-org-table tbody tr:last-child td {
  border-bottom: none;
}

.cell-nowrap {
  white-space: nowrap !important;
}

.real-status-chip {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  white-space: nowrap !important;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
}

.real-status-chip.chip-Calma {
  background-color: #eef9e3;
  color: #3d6a00;
}

.real-status-chip.chip-Vigilancia {
  background-color: #fff8e1;
  color: #795900;
}

.real-status-chip.chip-Inundación {
  background-color: #ffdad6;
  color: #93000a;
}

.threshold-hints-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hint-card {
  background-color: #f0f7ff;
  border: 1.5px solid #cbdceb;
}

.hint-card-title {
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.hint-card-desc {
  font-size: 0.84rem;
  color: #3f4851;
  line-height: 1.42;
}

.report-tab-short,
.finish-level-short {
  display: none;
}

@media (max-width: 900px) {
  .dialog-main-title {
    font-size: 0.98rem !important;
    line-height: 1.22 !important;
  }

  .full-org-table th,
  .full-org-table td {
    padding: 11px 6px;
    font-size: 0.74rem;
  }

  .real-status-chip {
    font-size: 0.7rem;
    padding: 3px 7px;
    gap: 3px !important;
  }

  .threshold-hints-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .inpage-dialog-body .v-btn {
    white-space: normal !important;
    height: auto !important;
    min-height: 42px !important;
    padding: 8px 12px !important;
  }
}

@media (max-width: 600px) {
  .report-summary {
    align-items: stretch !important;
    padding: 12px !important;
  }

  .report-summary-copy {
    min-width: 0;
  }

  .report-summary-title {
    font-size: 0.98rem !important;
    line-height: 1.3 !important;
    overflow-wrap: anywhere;
  }

  .report-accuracy-chip {
    align-self: flex-start;
  }

  .report-tabs {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px !important;
  }

  .report-tab-btn {
    width: 100%;
    min-width: 0 !important;
    min-height: 42px;
    padding: 6px 8px !important;
  }

  .report-tab-btn :deep(.v-btn__content) {
    min-width: 0;
    white-space: normal !important;
    line-height: 1.15;
    text-align: center;
  }

  .report-tab-btn :deep(.v-btn__prepend) {
    margin-inline-end: 4px !important;
  }

  .report-tab-long,
  .finish-level-long {
    display: none;
  }

  .report-tab-short {
    display: inline;
  }

  .report-diagnostic-card,
  .report-result-card {
    padding: 10px !important;
  }

  .report-diagnostic-heading,
  .report-result-heading {
    align-items: flex-start !important;
    flex-direction: column !important;
    gap: 6px !important;
  }

  .report-diagnostic-title,
  .report-result-title,
  .report-result-status {
    width: 100%;
    min-width: 0;
    white-space: normal !important;
    overflow-wrap: anywhere;
    line-height: 1.3;
  }

  .report-metric-chip {
    max-width: 100%;
    height: auto !important;
    min-height: 24px;
    padding: 3px 8px !important;
  }

  .report-metric-chip :deep(.v-chip__content) {
    white-space: normal;
    line-height: 1.2;
  }

  .report-explanation {
    line-height: 1.45 !important;
    overflow-wrap: anywhere;
  }

  .report-actions {
    flex-direction: column;
    gap: 8px !important;
  }

  .report-actions .v-btn {
    width: 100%;
    min-width: 0 !important;
  }

  .finish-level-short {
    display: inline;
    line-height: 1.25;
  }

  .finish-level-btn {
    height: auto !important;
    min-height: 52px !important;
    padding: 10px 12px !important;
    white-space: normal !important;
  }

  .finish-level-btn :deep(.v-btn__content) {
    display: block;
    white-space: normal !important;
    line-height: 1.25;
    text-align: center;
  }
}
</style>
