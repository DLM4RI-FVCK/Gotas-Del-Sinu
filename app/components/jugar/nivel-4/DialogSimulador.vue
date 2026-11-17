<template>
  <Transition name="inpage-modal-fade">
    <div v-if="mode" class="inpage-dialog-backdrop pa-3 pa-sm-5" @click.self="$emit('close')">
      <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
        <!-- Cabecera -->
        <div class="d-flex align-center justify-space-between gap-2 pb-3 border-b">
          <div class="d-flex align-center gap-2">
            <v-icon icon="mdi-sitemap-outline" color="primary" size="26" />
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              {{
                mode === 'dataset'
                  ? 'Datos de Entrenamiento de Córdoba (Análisis de Umbrales)'
                  : mode === 'guide'
                    ? 'Guía del Simulador: Cómo Crear, Conectar y Entrenar tu Árbol'
                    : 'Explicación Detallada del Entrenamiento (Tree Decisions)'
              }}
            </h3>
          </div>

          <v-btn
            color="primary"
            variant="tonal"
            size="small"
            rounded="lg"
            class="text-none font-weight-bold"
            prepend-icon="mdi-close"
            @click="$emit('close')"
          >
            Volver al lienzo
          </v-btn>
        </div>

        <!-- MODO 1: TABLA AMPLIADA DE DATOS DE CÓRDOBA -->
        <div v-if="mode === 'dataset'" class="inpage-dialog-body my-auto py-4">
          <p class="text-body-1 mb-3" style="color: #3f4851;">
            Observa con atención los números de estos <strong>6 registros históricos de Córdoba</strong> para decidir qué preguntas y qué números (umbrales) poner en tus nodos:
          </p>

          <div class="full-table rounded-xl overflow-hidden mb-3">
            <div class="full-row full-head font-weight-bold">
              <span>Registro</span>
              <span>Lluvia caída (mm)</span>
              <span>Nivel Río Sinú (m)</span>
              <span>Brisa (km/h)</span>
              <span>Estado Real</span>
            </div>
            <div v-for="r in cordobaDataset" :key="r.id" class="full-row">
              <span class="font-weight-bold">{{ r.id }} · {{ r.municipio }}</span>
              <span>{{ r.lluvia_mm }} mm</span>
              <span>{{ r.nivel_rio_m }} m</span>
              <span>{{ r.viento_kmh }} km/h</span>
              <span class="font-weight-bold">{{ r.emoji }} {{ r.realClass }}</span>
            </div>
          </div>

          <div class="pa-3 rounded-xl" style="background: #f0f7ff; border: 2px solid #006496;">
            <strong style="color: #006496;">🔎 ¿Por qué funcionan ciertos umbrales en estos datos?:</strong>
            En <strong>Montería y Cereté</strong> la lluvia fue de <code>10 y 20 mm</code> (🟢 Calma), mientras que en los demás municipios superó los <strong>40 mm</strong> (<code>55 a 95 mm</code>). Por eso preguntar <code>¿Lluvia > 40 mm?</code> separa de inmediato los días en calma. Luego, entre los días lluviosos, el <strong>Nivel del Río Sinú superó 4.0 m</strong> (<code>4.6 m y 5.1 m</code>) únicamente cuando hubo 🔴 Inundación.
          </div>
        </div>

        <!-- MODO 2: GUÍA DE USO DEL SIMULADOR LIBRE -->
        <div v-else-if="mode === 'guide'" class="inpage-dialog-body my-auto py-4 d-flex flex-column gap-3">
          <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
            <div class="flow-emoji-circle bg-info-soft"><span>1️⃣</span></div>
            <div>
              <div class="text-subtitle-1 font-weight-bold" style="color: #006496;">
                Crea tus Nodos y Hojas a tu gusto
              </div>
              <div class="text-body-2" style="color: #3f4851;">
                En el panel izquierdo elige si quieres crear un <strong>👑 Nodo Raíz</strong>, un <strong>🔍 Nodo Decisión</strong> (eligiendo la variable y el valor umbral con el deslizador) o una <strong>🍃 Hoja</strong> (🟢 Calma, 🟡 Vigilancia o 🔴 Inundación).
              </div>
            </div>
          </div>

          <div class="flow-card d-flex align-center gap-3 pa-3 rounded-xl">
            <div class="flow-emoji-circle bg-warning-soft"><span>2️⃣</span></div>
            <div>
              <div class="text-subtitle-1 font-weight-bold" style="color: #795900;">
                Amplía el lienzo si tu pantalla es pequeña y conecta tus cables
              </div>
              <div class="text-body-2" style="color: #3f4851;">
                Usa el botón <strong>"Ampliar Lienzo"</strong> para ocultar temporalmente el creador de nodos o usa el zoom <strong>(- / +)</strong>. Para unir dos nodos, haz clic en <strong>"Rama NO ●"</strong> o <strong>"Rama SÍ ●"</strong> y luego en <strong>"● Entrada"</strong> del nodo destino.
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
                Al pulsar <strong>"⚡ Entrenar Árbol en Vivo"</strong>, los 6 municipios de Córdoba recorrerán tu árbol uno por uno y recibirás un diagnóstico matemático de <strong>Pureza Gini</strong> explicando el porqué de cada acierto o error.
              </div>
            </div>
          </div>
        </div>

        <!-- MODO 3: REPORTE PEDAGÓGICO CON EXPLICACIÓN DEL "PORQUÉ" DE CADA NODO Y CADA DATO -->
        <div v-else-if="mode === 'report' && report" class="inpage-dialog-body my-auto py-3">
          <div v-if="!report.validStructure" class="text-center py-6">
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
              class="d-flex flex-wrap align-center justify-space-between gap-2 pa-3 rounded-xl mb-3"
              :style="{
                background: report.passed ? '#eef9e3' : '#fff8e1',
                border: `2px solid ${report.passed ? '#76b82a' : '#ffc21c'}`
              }"
            >
              <div>
                <h4 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
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
              <v-chip :color="report.passed ? 'success' : 'warning'" variant="flat" size="large" class="font-weight-bold">
                Precisión: {{ report.accuracy }}%
              </v-chip>
            </div>

            <!-- Pestañas para ver: 1. El Porqué de cada Nodo (Gini/Pureza) y 2. El Recorrido de cada Municipio -->
            <div class="d-flex gap-2 mb-3">
              <v-btn
                size="small"
                rounded="lg"
                :color="reportTab === 'nodes' ? 'primary' : 'default'"
                :variant="reportTab === 'nodes' ? 'flat' : 'tonal'"
                class="text-none font-weight-bold"
                prepend-icon="mdi-brain"
                @click="reportTab = 'nodes'"
              >
                1. ¿Por qué funcionó o falló cada Nodo? ({{ report.nodeDiagnostics.length }})
              </v-btn>

              <v-btn
                size="small"
                rounded="lg"
                :color="reportTab === 'rows' ? 'primary' : 'default'"
                :variant="reportTab === 'rows' ? 'flat' : 'tonal'"
                class="text-none font-weight-bold"
                prepend-icon="mdi-map-marker-path"
                @click="reportTab = 'rows'"
              >
                2. Recorrido paso a paso por Municipio (6 casos)
              </v-btn>
            </div>

            <!-- PESTAÑA 1: EXPLICACIÓN DEL PORQUÉ DE CADA NODO (PUREZA GINI REAL) -->
            <div v-if="reportTab === 'nodes'" class="d-flex flex-column gap-2 mb-4">
              <div
                v-for="diag in report.nodeDiagnostics"
                :key="diag.nodeId"
                class="pa-3 rounded-xl"
                :style="{
                  backgroundColor: diag.isGoodNode ? '#f5fcf0' : '#fff8e1',
                  border: `2px solid ${diag.isGoodNode ? '#76b82a' : '#ffc21c'}`
                }"
              >
                <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-1">
                  <span class="text-subtitle-2 font-weight-bold" style="color: #001e31;">
                    {{ diag.title }}
                  </span>
                  <v-chip
                    size="x-small"
                    :color="diag.isGoodNode ? 'success' : 'warning'"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    Pureza Gini: {{ diag.purityPercent }}% · ({{ diag.samplesCount }} datos)
                  </v-chip>
                </div>
                <p class="text-body-2 mb-0" style="color: #3f4851;">
                  <strong>¿Por qué?:</strong> {{ diag.whyExplanation }}
                </p>
              </div>
            </div>

            <!-- PESTAÑA 2: EXPLICACIÓN DEL RECORRIDO DE CADA MUNICIPIO -->
            <div v-else class="d-flex flex-column gap-2 mb-4">
              <div
                v-for="res in report.rowResults"
                :key="res.row.id"
                class="pa-3 rounded-xl"
                :style="{
                  backgroundColor: res.correct ? '#f5fcf0' : '#fff5f5',
                  border: `1.5px solid ${res.correct ? '#76b82a' : '#ba1a1a'}`
                }"
              >
                <div class="d-flex flex-wrap align-center justify-space-between gap-2 mb-1">
                  <span class="text-subtitle-2 font-weight-bold" style="color: #001e31;">
                    {{ res.row.id }} · {{ res.row.municipio }} (Lluvia: {{ res.row.lluvia_mm }}mm, Río: {{ res.row.nivel_rio_m }}m)
                  </span>
                  <span class="text-caption font-weight-bold" :style="{ color: res.correct ? '#3d6a00' : '#ba1a1a' }">
                    Real: {{ res.row.emoji }} {{ res.row.realClass }} | Tu Árbol: {{ res.predicted }}
                  </span>
                </div>
                <p class="text-caption mb-0" style="color: #3f4851; line-height: 1.4;">
                  <strong>Camino en tu árbol:</strong> {{ res.stepByStepWhy }}
                </p>
              </div>
            </div>

            <div class="d-flex justify-center gap-3">
              <v-btn
                v-if="!report.passed"
                color="primary"
                size="large"
                rounded="xl"
                class="text-none font-weight-bold"
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
                class="text-none font-weight-bold"
                prepend-icon="mdi-map-marker-path"
                @click="$emit('finish-level')"
              >
                ¡Simulador Superado! Desbloquear Nivel 5 (80%)
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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

.full-table {
  border: 2px solid #d7e3ee;
}

.full-row {
  display: grid;
  grid-template-columns: 1.2fr 1.1fr 1fr 1.1fr 0.9fr;
  padding: 9px 14px;
  border-bottom: 1px solid #e4f0f7;
  font-size: 0.9rem;
  align-items: center;
}

.full-row:last-child {
  border-bottom: none;
}

.full-head {
  background-color: #006496;
  color: #ffffff;
}
</style>
