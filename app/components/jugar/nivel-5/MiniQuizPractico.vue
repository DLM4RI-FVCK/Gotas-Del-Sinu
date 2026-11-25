<template>
  <!-- Mini Quiz de Ejemplos Prácticos con un Árbol de Decisión distinto ilustrado para cada pregunta -->
  <div v-if="!graduated" class="slide-grid">
    <!-- Columna Izquierda: Pregunta Práctica ABCD -->
    <div class="quiz-slide d-flex flex-column justify-space-between pa-4 pa-sm-6 rounded-xl">
      <v-icon icon="mdi-sitemap-outline" class="col-watermark" />

      <div class="d-flex flex-wrap align-center justify-space-between gap-2 position-relative z-2">
        <div class="question-counter-bar">
          <span>CASO PRÁCTICO {{ currentQ + 1 }} DE {{ questions.length }}</span>
          <span
            v-for="(_, i) in questions"
            :key="i"
            class="q-dot"
            :class="{ active: i === currentQ, done: i < currentQ }"
          />
        </div>

        <span class="step-badge">📍 {{ currentItem.town }}</span>
      </div>

      <div class="my-auto py-2 position-relative z-2">
        <div class="text-caption font-weight-bold text-primary text-uppercase mb-1">
          {{ currentItem.category }}
        </div>
        <h3 class="fluid-slide-title font-weight-bold mb-2">
          {{ currentItem.title }}
        </h3>
        <p class="fluid-slide-p mb-3">
          {{ currentItem.prompt }}
        </p>

        <!-- Opciones ABCD -->
        <div class="d-flex flex-column gap-2 mb-3">
          <div
            v-for="(opt, idx) in currentItem.options"
            :key="opt.letter"
            class="quiz-option-card pa-3 rounded-xl d-flex align-center justify-space-between"
            :class="{
              'is-correct': selectedIdx === idx && opt.correct,
              'is-wrong': selectedIdx === idx && !opt.correct
            }"
            @click="chooseOption(idx)"
          >
            <div class="d-flex align-center gap-3">
              <span class="letter-badge">{{ opt.letter }}</span>
              <span class="fluid-quiz-opt font-weight-bold">{{ opt.text }}</span>
            </div>
            <v-icon
              :icon="selectedIdx === idx ? (opt.correct ? 'mdi-check-circle' : 'mdi-close-circle') : 'mdi-chevron-right'"
              :color="selectedIdx === idx ? (opt.correct ? 'success' : 'error') : 'primary'"
            />
          </div>
        </div>

        <!-- Retroalimentación inmediata -->
        <v-alert
          v-if="selectedIdx !== null"
          :type="currentItem.options[selectedIdx]?.correct ? 'success' : 'warning'"
          variant="tonal"
          density="comfortable"
          rounded="lg"
        >
          {{
            currentItem.options[selectedIdx]?.correct
              ? currentItem.successFeedback
              : currentItem.hint
          }}
        </v-alert>
      </div>

      <div class="d-flex justify-end position-relative z-2">
        <v-btn
          v-if="selectedIdx !== null && currentItem.options[selectedIdx]?.correct"
          color="primary"
          size="large"
          rounded="lg"
          class="text-none font-weight-bold"
          append-icon="mdi-arrow-right"
          @click="nextQuestion"
        >
          {{ currentQ < questions.length - 1 ? 'Siguiente árbol práctico' : 'Ver mi graduación (100%)' }}
        </v-btn>
      </div>
    </div>

    <!-- Columna Derecha: Árbol de Decisión Ilustrado Específico para la Pregunta Actual -->
    <div class="slide-visual-col d-flex flex-column justify-space-between pa-4 pa-sm-5 rounded-xl">
      <div class="d-flex align-center justify-space-between">
        <span class="step-badge">🌳 Árbol del Caso {{ currentQ + 1 }} ({{ currentItem.town }})</span>
        <v-btn
          size="x-small"
          color="primary"
          variant="tonal"
          rounded="lg"
          class="text-none font-weight-bold"
          prepend-icon="mdi-magnify-plus-outline"
          @click="zoomTree = true"
        >
          Ampliar árbol
        </v-btn>
      </div>

      <!-- Contenedor del Árbol SVG que cambia dinámicamente en cada una de las 4 preguntas -->
      <div class="tree-box my-auto rounded-xl pa-3 d-flex align-center justify-center cursor-pointer" @click="zoomTree = true">
        <!-- ÁRBOL DE LA PREGUNTA 1 (Tierralta: Identificar el Nodo Raíz) -->
        <svg v-if="currentQ === 0" viewBox="0 0 460 245" class="case-tree-svg">
          <path d="M230 68 L115 155 M230 68 L345 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />

          <rect x="140" y="92" width="44" height="22" rx="11" fill="#76b82a" />
          <text x="162" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>

          <rect x="276" y="92" width="44" height="22" rx="11" fill="#ba1a1a" />
          <text x="298" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>

          <!-- Caja superior resaltada por la que se pregunta -->
          <rect x="95" y="10" width="270" height="58" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="4" />
          <text x="230" y="33" text-anchor="middle" fill="#ffc21c" font-size="12" font-weight="bold">
            ❓ ¿CÓMO SE LLAMA ESTE NODO INICIAL?
          </text>
          <text x="230" y="54" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">
            "¿Llueve fuerte en Tierralta?"
          </text>

          <!-- Hojas inferiores -->
          <rect x="25" y="152" width="180" height="54" rx="14" fill="#eef9e3" stroke="#76b82a" stroke-width="2.5" />
          <text x="115" y="177" text-anchor="middle" fill="#3d6a00" font-size="12" font-weight="bold">🟢 Caudal Normal</text>
          <text x="115" y="194" text-anchor="middle" fill="#3f4851" font-size="10">Nodo Hoja 1</text>

          <rect x="255" y="152" width="180" height="54" rx="14" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2.5" />
          <text x="345" y="177" text-anchor="middle" fill="#93000a" font-size="12" font-weight="bold">🔴 Vigilar Creciente</text>
          <text x="345" y="194" text-anchor="middle" fill="#93000a" font-size="10">Nodo Hoja 2</text>
        </svg>

        <!-- ÁRBOL DE LA PREGUNTA 2 (Montería: Seguir el dato Lluvia = 10 mm y Río = 2.1 m) -->
        <svg v-else-if="currentQ === 1" viewBox="0 0 460 255" class="case-tree-svg">
          <path d="M230 62 L115 140" stroke="#76b82a" stroke-width="5.5" stroke-dasharray="6 4" fill="none" />
          <path d="M230 62 L345 140 M345 182 L265 232 M345 182 L410 232" stroke="#90a4ae" stroke-width="3.5" fill="none" />

          <rect x="138" y="80" width="56" height="22" rx="11" fill="#76b82a" />
          <text x="166" y="95" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">NO (≤40)</text>

          <rect x="268" y="80" width="56" height="22" rx="11" fill="#006496" />
          <text x="296" y="95" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">SÍ (>40)</text>

          <!-- Raíz -->
          <rect x="110" y="10" width="240" height="52" rx="14" fill="#006496" />
          <text x="230" y="33" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">
            👑 ¿Lluvia en Montería > 40 mm?
          </text>
          <text x="230" y="51" text-anchor="middle" fill="#ffc21c" font-size="11" font-weight="bold">
            Dato de hoy: Lluvia = 10 mm ☀️
          </text>

          <!-- Destino Izquierdo -->
          <rect x="20" y="138" width="190" height="52" rx="14" fill="#eef9e3" stroke="#76b82a" stroke-width="3.5" />
          <text x="115" y="162" text-anchor="middle" fill="#3d6a00" font-size="12.5" font-weight="bold">
            🟢 Hoja A: Río en Calma
          </text>
          <text x="115" y="179" text-anchor="middle" fill="#3f4851" font-size="10">
            Rama NO (10 mm ≤ 40 mm)
          </text>

          <!-- Nodo Derecho -->
          <rect x="245" y="138" width="200" height="44" rx="12" fill="#e2efff" stroke="#006496" stroke-width="2" />
          <text x="345" y="164" text-anchor="middle" fill="#001e31" font-size="11.5" font-weight="bold">
            🔍 ¿Río Sinú > 4.0 m?
          </text>

          <rect x="205" y="212" width="115" height="36" rx="10" fill="#fff8e1" stroke="#ffc21c" stroke-width="2" />
          <text x="262" y="234" text-anchor="middle" fill="#795900" font-size="10.5" font-weight="bold">🟡 Vigilancia</text>

          <rect x="335" y="212" width="115" height="36" rx="10" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2" />
          <text x="392" y="234" text-anchor="middle" fill="#93000a" font-size="10.5" font-weight="bold">🔴 Inundación</text>
        </svg>

        <!-- ÁRBOL DE LA PREGUNTA 3 (San Pelayo: Descubrir qué pregunta falta en el Nodo de Decisión) -->
        <svg v-else-if="currentQ === 2" viewBox="0 0 460 255" class="case-tree-svg">
          <path d="M230 56 L110 132 M230 56 L335 128 M335 182 L245 228 M335 182 L410 228" stroke="#006496" stroke-width="4" fill="none" />

          <rect x="138" y="74" width="40" height="20" rx="10" fill="#76b82a" />
          <text x="158" y="88" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">NO</text>

          <rect x="275" y="74" width="40" height="20" rx="10" fill="#006496" />
          <text x="295" y="88" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">SÍ</text>

          <!-- Raíz -->
          <rect x="115" y="8" width="230" height="48" rx="14" fill="#006496" />
          <text x="230" y="36" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">
            👑 1. ¿Llueve fuerte en San Pelayo?
          </text>

          <!-- Hoja Calma -->
          <rect x="20" y="130" width="170" height="46" rx="12" fill="#eef9e3" stroke="#76b82a" stroke-width="2" />
          <text x="105" y="158" text-anchor="middle" fill="#3d6a00" font-size="12" font-weight="bold">🟢 Río en Calma</text>

          <!-- Nodo de Decisión con INCÓGNITA (?) -->
          <rect x="210" y="124" width="240" height="58" rx="14" fill="#fff8e1" stroke="#ffc21c" stroke-width="4" />
          <text x="330" y="147" text-anchor="middle" fill="#795900" font-size="12" font-weight="bold">
            ❓ ¿QUÉ PREGUNTA VA AQUÍ?
          </text>
          <text x="330" y="167" text-anchor="middle" fill="#001e31" font-size="10.5" font-weight="bold">
            (Para separar Río 3.2m vs Río 4.6m)
          </text>

          <!-- Hojas de abajo con las pistas de metros -->
          <rect x="175" y="212" width="135" height="38" rx="10" fill="#e1f5fe" stroke="#129fea" stroke-width="2" />
          <text x="242" y="235" text-anchor="middle" fill="#006496" font-size="10.5" font-weight="bold">NO → 🟡 Río 3.2 m</text>

          <rect x="322" y="212" width="130" height="38" rx="10" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2" />
          <text x="387" y="235" text-anchor="middle" fill="#93000a" font-size="10.5" font-weight="bold">SÍ → 🔴 Río 4.6 m</text>
        </svg>

        <!-- ÁRBOL DE LA PREGUNTA 4 (Lorica: Árbol de 3 Niveles de Profundidad) -->
        <svg v-else viewBox="0 0 460 255" class="case-tree-svg">
          <path d="M230 46 L105 106 M335 142 L225 198 M392 204 L322 238" stroke="#90a4ae" stroke-width="3" fill="none" />
          <!-- Camino crítico iluminado SÍ -> SÍ -> SÍ -->
          <path d="M230 46 L335 106 L392 170 L418 222" stroke="#ba1a1a" stroke-width="5" stroke-dasharray="6 4" fill="none" />

          <!-- Nivel 1: Raíz -->
          <rect x="120" y="6" width="220" height="40" rx="10" fill="#006496" />
          <text x="230" y="24" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">1. ¿Lluvia > 45 mm?</text>
          <text x="230" y="39" text-anchor="middle" fill="#ffc21c" font-size="9.5" font-weight="bold">(Lorica hoy: 95 mm → SÍ)</text>

          <rect x="20" y="102" width="150" height="36" rx="9" fill="#eef9e3" stroke="#76b82a" stroke-width="2" />
          <text x="95" y="124" text-anchor="middle" fill="#3d6a00" font-size="10.5" font-weight="bold">NO → 🟢 Normal</text>

          <!-- Nivel 2: Decisión 1 -->
          <rect x="225" y="102" width="220" height="40" rx="10" fill="#006496" />
          <text x="335" y="120" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">2. ¿Río Sinú > 4.0 m?</text>
          <text x="335" y="135" text-anchor="middle" fill="#ffc21c" font-size="9.5" font-weight="bold">(Lorica hoy: 4.9 m → SÍ)</text>

          <rect x="140" y="192" width="155" height="36" rx="9" fill="#e1f5fe" stroke="#129fea" stroke-width="2" />
          <text x="217" y="214" text-anchor="middle" fill="#006496" font-size="10.5" font-weight="bold">NO → 🔵 Monitoreo</text>

          <!-- Nivel 3: Decisión 2 -->
          <rect x="305" y="164" width="150" height="40" rx="10" fill="#006496" />
          <text x="380" y="182" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">3. ¿Ciénaga > 80%?</text>
          <text x="380" y="197" text-anchor="middle" fill="#ffc21c" font-size="9.5" font-weight="bold">(Hoy: 92% → SÍ)</text>

          <rect x="268" y="218" width="96" height="32" rx="8" fill="#fff3e0" stroke="#fb8c00" stroke-width="2" />
          <text x="316" y="238" text-anchor="middle" fill="#e65100" font-size="9.5" font-weight="bold">NO → 🟠 Naranja</text>

          <rect x="372" y="218" width="84" height="32" rx="8" fill="#ffdad6" stroke="#ba1a1a" stroke-width="3" />
          <text x="414" y="238" text-anchor="middle" fill="#93000a" font-size="10" font-weight="bold">SÍ → ❓</text>
        </svg>
      </div>

      <!-- Tarjeta de datos del caso actual -->
      <div class="telemetry-card pa-3 rounded-xl">
        <div class="d-flex align-center justify-space-between mb-1">
          <span class="text-subtitle-2 font-weight-bold" style="color: #006496;">
            📡 Datos de entrada del Árbol ({{ currentItem.town }}):
          </span>
          <span class="text-caption font-weight-bold" style="color: #3d6a00;">
            {{ currentItem.weatherBadge }}
          </span>
        </div>
        <div class="text-body-2" style="color: #001e31;">
          {{ currentItem.mapNote }}
        </div>
      </div>
    </div>

    <!-- Modal interno para ver el árbol de la pregunta actual en grande -->
    <Transition name="inpage-modal-fade">
      <div v-if="zoomTree" class="inpage-dialog-backdrop pa-4" @click.self="zoomTree = false">
        <div class="inpage-dialog-card d-flex flex-column justify-space-between pa-5 rounded-xl">
          <div class="d-flex align-center justify-space-between pb-3 border-b">
            <h3 class="text-h6 font-weight-bold mb-0" style="color: #001e31;">
              🌳 Árbol de Decisión del Caso {{ currentQ + 1 }} ({{ currentItem.town }})
            </h3>
            <v-btn color="primary" variant="tonal" size="small" rounded="lg" class="text-none font-weight-bold" @click="zoomTree = false">
              Cerrar vista
            </v-btn>
          </div>

          <div class="my-auto py-3 text-center">
            <!-- Árbol ampliado según la pregunta actual -->
            <svg v-if="currentQ === 0" viewBox="0 0 460 245" class="zoomed-svg mx-auto mb-3">
              <path d="M230 68 L115 155 M230 68 L345 155" stroke="#006496" stroke-width="4.5" fill="none" stroke-linecap="round" />
              <rect x="140" y="92" width="44" height="22" rx="11" fill="#76b82a" />
              <text x="162" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">NO</text>
              <rect x="276" y="92" width="44" height="22" rx="11" fill="#ba1a1a" />
              <text x="298" y="107" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">SÍ</text>
              <rect x="95" y="10" width="270" height="58" rx="14" fill="#006496" stroke="#ffc21c" stroke-width="4" />
              <text x="230" y="33" text-anchor="middle" fill="#ffc21c" font-size="12" font-weight="bold">❓ ¿CÓMO SE LLAMA ESTE NODO INICIAL?</text>
              <text x="230" y="54" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">"¿Llueve fuerte en Tierralta?"</text>
              <rect x="25" y="152" width="180" height="54" rx="14" fill="#eef9e3" stroke="#76b82a" stroke-width="2.5" />
              <text x="115" y="177" text-anchor="middle" fill="#3d6a00" font-size="12" font-weight="bold">🟢 Caudal Normal</text>
              <rect x="255" y="152" width="180" height="54" rx="14" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2.5" />
              <text x="345" y="177" text-anchor="middle" fill="#93000a" font-size="12" font-weight="bold">🔴 Vigilar Creciente</text>
            </svg>

            <svg v-else-if="currentQ === 1" viewBox="0 0 460 255" class="zoomed-svg mx-auto mb-3">
              <path d="M230 62 L115 140" stroke="#76b82a" stroke-width="5.5" stroke-dasharray="6 4" fill="none" />
              <path d="M230 62 L345 140 M345 182 L265 232 M345 182 L410 232" stroke="#90a4ae" stroke-width="3.5" fill="none" />
              <rect x="138" y="80" width="56" height="22" rx="11" fill="#76b82a" />
              <text x="166" y="95" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">NO (≤40)</text>
              <rect x="268" y="80" width="56" height="22" rx="11" fill="#006496" />
              <text x="296" y="95" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">SÍ (>40)</text>
              <rect x="110" y="10" width="240" height="52" rx="14" fill="#006496" />
              <text x="230" y="33" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">👑 ¿Lluvia en Montería > 40 mm?</text>
              <text x="230" y="51" text-anchor="middle" fill="#ffc21c" font-size="11" font-weight="bold">Dato de hoy: Lluvia = 10 mm ☀️</text>
              <rect x="20" y="138" width="190" height="52" rx="14" fill="#eef9e3" stroke="#76b82a" stroke-width="3.5" />
              <text x="115" y="162" text-anchor="middle" fill="#3d6a00" font-size="12.5" font-weight="bold">🟢 Hoja A: Río en Calma</text>
              <rect x="245" y="138" width="200" height="44" rx="12" fill="#e2efff" stroke="#006496" stroke-width="2" />
              <text x="345" y="164" text-anchor="middle" fill="#001e31" font-size="11.5" font-weight="bold">🔍 ¿Río Sinú > 4.0 m?</text>
              <rect x="205" y="212" width="115" height="36" rx="10" fill="#fff8e1" stroke="#ffc21c" stroke-width="2" />
              <text x="262" y="234" text-anchor="middle" fill="#795900" font-size="10.5" font-weight="bold">🟡 Vigilancia</text>
              <rect x="335" y="212" width="115" height="36" rx="10" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2" />
              <text x="392" y="234" text-anchor="middle" fill="#93000a" font-size="10.5" font-weight="bold">🔴 Inundación</text>
            </svg>

            <svg v-else-if="currentQ === 2" viewBox="0 0 460 255" class="zoomed-svg mx-auto mb-3">
              <path d="M230 56 L110 132 M230 56 L335 128 M335 182 L245 228 M335 182 L410 228" stroke="#006496" stroke-width="4" fill="none" />
              <rect x="115" y="8" width="230" height="48" rx="14" fill="#006496" />
              <text x="230" y="36" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">👑 1. ¿Llueve fuerte en San Pelayo?</text>
              <rect x="20" y="130" width="170" height="46" rx="12" fill="#eef9e3" stroke="#76b82a" stroke-width="2" />
              <text x="105" y="158" text-anchor="middle" fill="#3d6a00" font-size="12" font-weight="bold">🟢 Río en Calma</text>
              <rect x="210" y="124" width="240" height="58" rx="14" fill="#fff8e1" stroke="#ffc21c" stroke-width="4" />
              <text x="330" y="147" text-anchor="middle" fill="#795900" font-size="12" font-weight="bold">❓ ¿QUÉ PREGUNTA VA AQUÍ?</text>
              <text x="330" y="167" text-anchor="middle" fill="#001e31" font-size="10.5" font-weight="bold">(Para separar Río 3.2m vs Río 4.6m)</text>
              <rect x="175" y="212" width="135" height="38" rx="10" fill="#e1f5fe" stroke="#129fea" stroke-width="2" />
              <text x="242" y="235" text-anchor="middle" fill="#006496" font-size="10.5" font-weight="bold">NO → 🟡 Río 3.2 m</text>
              <rect x="322" y="212" width="130" height="38" rx="10" fill="#ffdad6" stroke="#ba1a1a" stroke-width="2" />
              <text x="387" y="235" text-anchor="middle" fill="#93000a" font-size="10.5" font-weight="bold">SÍ → 🔴 Río 4.6 m</text>
            </svg>

            <svg v-else viewBox="0 0 460 255" class="zoomed-svg mx-auto mb-3">
              <path d="M230 46 L105 106 M335 142 L225 198 M392 204 L322 238" stroke="#90a4ae" stroke-width="3" fill="none" />
              <path d="M230 46 L335 106 L392 170 L418 222" stroke="#ba1a1a" stroke-width="5" stroke-dasharray="6 4" fill="none" />
              <rect x="120" y="6" width="220" height="40" rx="10" fill="#006496" />
              <text x="230" y="24" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">1. ¿Lluvia > 45 mm? (95 mm → SÍ)</text>
              <rect x="20" y="102" width="150" height="36" rx="9" fill="#eef9e3" stroke="#76b82a" stroke-width="2" />
              <text x="95" y="124" text-anchor="middle" fill="#3d6a00" font-size="10.5" font-weight="bold">NO → 🟢 Normal</text>
              <rect x="225" y="102" width="220" height="40" rx="10" fill="#006496" />
              <text x="335" y="124" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">2. ¿Río Sinú > 4.0 m? (4.9 m → SÍ)</text>
              <rect x="140" y="192" width="155" height="36" rx="9" fill="#e1f5fe" stroke="#129fea" stroke-width="2" />
              <text x="217" y="214" text-anchor="middle" fill="#006496" font-size="10.5" font-weight="bold">NO → 🔵 Monitoreo</text>
              <rect x="305" y="164" width="150" height="40" rx="10" fill="#006496" />
              <text x="380" y="186" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="bold">3. ¿Ciénaga > 80%? (92% → SÍ)</text>
              <rect x="268" y="218" width="96" height="32" rx="8" fill="#fff3e0" stroke="#fb8c00" stroke-width="2" />
              <text x="316" y="238" text-anchor="middle" fill="#e65100" font-size="9.5" font-weight="bold">NO → 🟠 Naranja</text>
              <rect x="372" y="218" width="84" height="32" rx="8" fill="#ffdad6" stroke="#ba1a1a" stroke-width="3" />
              <text x="414" y="238" text-anchor="middle" fill="#93000a" font-size="10" font-weight="bold">SÍ → ❓</text>
            </svg>

            <div class="pa-3 rounded-xl" style="background: #f0f7ff; border: 2px solid #006496;">
              <strong style="color: #006496;">Datos reportados:</strong> {{ currentItem.weatherBadge }} — {{ currentItem.mapNote }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <!-- PANTALLA FINAL DE GRADUACIÓN DEL OVA (100% COMPLETADO) -->
  <div v-else class="graduation-screen d-flex flex-column align-center justify-space-between pa-6 rounded-xl h-100 text-center">
    <div class="d-flex align-center gap-4 mt-2">
      <img :src="avatarUrl" alt="Avatar Estudiante" class="grad-avatar" />
      <div class="celebration-emoji">🏆🌳🌊</div>
      <img :src="zenuitoUrl" alt="Zenuito" class="grad-avatar" />
    </div>

    <div class="my-auto" style="max-width: 660px;">
      <span class="step-badge mb-2">🎓 ¡OVA Gotas del Sinú Completado al 100%!</span>
      <h2 class="fluid-slide-title font-weight-bold mb-3">
        ¡Felicitaciones, {{ session.nombre }}!
      </h2>
      <p class="fluid-slide-p mb-4">
        Superaste los <strong>5 Niveles de la Ruta 5E</strong> y aprendiste cómo funcionan los <strong>Árboles de Decisión (Machine Learning)</strong> para prevenir inundaciones a lo largo del Río Sinú en Córdoba.
      </p>
    </div>

    <div class="d-flex flex-wrap justify-center gap-3 mb-2 w-100 px-2 grad-actions">
      <v-btn
        color="info"
        size="x-large"
        rounded="xl"
        class="text-none font-weight-bold finish-level-btn grad-action-btn"
        prepend-icon="mdi-chart-box-outline"
        @click="goToRendimiento"
      >
        Rendimiento
      </v-btn>

      <v-btn
        color="primary"
        variant="tonal"
        size="x-large"
        rounded="xl"
        class="text-none font-weight-bold finish-level-btn grad-action-btn"
        prepend-icon="mdi-map-marker-check"
        @click="$emit('finish-ova')"
      >
        Volver al Mapa de Niveles
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'finish-ova'): void
}>()

const { session, avatarUrl, zenuitoUrl, completeLevel } = useUserSession()
const { setContext } = useZenuitoContext()
const { performance, recordQuizAttempt, markLevelCompleted } = usePerformanceTracker()

const alreadyCompletedExam = computed(() =>
  performance.value.completedLevels.includes(5) || (session.value.xp || 0) >= 100
)

const currentQ = ref(0)
const selectedIdx = ref<number | null>(null)
const graduated = ref(alreadyCompletedExam.value)
const zoomTree = ref(false)

const questions = [
  {
    town: 'Tierralta (Alto Sinú)',
    category: 'Árbol 1 · Identificación de Estructura',
    title: 'El nodo principal del Árbol de Tierralta',
    prompt: 'Mira el Árbol de Decisión ilustrado a la derecha. La caja superior resaltada con borde amarillo pregunta "¿Llueve fuerte en Tierralta?" y de ella salen las primeras ramas. ¿Cómo se llama ese nodo?',
    weatherBadge: 'Lluvia: 60 mm · Río: Normal',
    mapNote: 'En este primer árbol debes identificar cómo se llama la caja inicial de arriba del todo.',
    hint: 'Recuerda del Nivel 2: es la caja principal arriba del todo donde nace el árbol.',
    successFeedback: '¡Exacto! El Nodo Raíz (Root Node) siempre es la primera pregunta principal del árbol.',
    options: [
      { letter: 'A', text: '👑 Nodo Raíz (Root Node)', correct: true },
      { letter: 'B', text: '🍃 Nodo Hoja final', correct: false },
      { letter: 'C', text: '📅 Variable distractora', correct: false },
      { letter: 'D', text: '🔌 Cable desconectado', correct: false }
    ]
  },
  {
    town: 'Montería (Medio Sinú)',
    category: 'Árbol 2 · Evaluación de Condición Numérica',
    title: 'Siguiendo los datos en el Árbol de Montería',
    prompt: 'Observa el Árbol 2 a la derecha: el Nodo Raíz pregunta "¿Lluvia en Montería > 40 mm?". Si el reporte de hoy dice que la lluvia fue de solo 10 mm, ¿qué rama toma el árbol y a qué hoja llega?',
    weatherBadge: 'Lluvia hoy: 10 mm ☀️ · Umbral: > 40 mm',
    mapNote: 'Compara el dato de hoy (10 mm) con la pregunta del Nodo Raíz (> 40 mm) en el gráfico.',
    hint: 'Como 10 mm NO es mayor que 40 mm, sigue la flecha verde de la izquierda (Rama NO).',
    successFeedback: '¡Muy bien! Como 10 mm es menor o igual a 40 mm, toma la Rama NO y llega a 🟢 Río en Calma.',
    options: [
      { letter: 'A', text: 'Toma la Rama SÍ y llega a 🔴 Inundación', correct: false },
      { letter: 'B', text: 'Toma la Rama NO (≤ 40) y llega a la Hoja: 🟢 Río en Calma', correct: true },
      { letter: 'C', text: 'Toma la Rama SÍ y llega a 🟡 Vigilancia', correct: false },
      { letter: 'D', text: 'No toma ninguna rama porque 10 mm es un número par', correct: false }
    ]
  },
  {
    town: 'San Pelayo (Ribera)',
    category: 'Árbol 3 · Completar el Nodo de Decisión',
    title: '¿Qué pregunta falta en el Árbol de San Pelayo?',
    prompt: 'Mira el Árbol 3 a la derecha: después de saber que SÍ llueve fuerte, necesitamos una pregunta en la caja amarilla ("❓ ¿QUÉ PREGUNTA VA AQUÍ?") que separe un río de 3.2 m (🟡) de un río de 4.6 m (🔴). ¿Cuál condición colocamos?',
    weatherBadge: 'Caso 1: Río 3.2 m (🟡) vs Caso 2: Río 4.6 m (🔴)',
    mapNote: 'Observa las dos hojas de abajo en el árbol derecho: una tiene 3.2 m y la otra 4.6 m.',
    hint: 'Busca un límite (umbral) entre 3.2 metros y 4.6 metros.',
    successFeedback: '¡Correcto! Preguntar "¿El Río Sinú superó los 4.0 metros?" separa perfectamente el caso de 3.2 m (NO) del de 4.6 m (SÍ).',
    options: [
      { letter: 'A', text: '¿Hoy es martes o jueves?', correct: false },
      { letter: 'B', text: '¿La temperatura es de 30°C?', correct: false },
      { letter: 'C', text: '¿El nivel del Río Sinú es mayor a 4.0 metros?', correct: true },
      { letter: 'D', text: '¿El nivel del Río Sinú es mayor a 100 metros?', correct: false }
    ]
  },
  {
    town: 'Lorica (Bajo Sinú)',
    category: 'Árbol 4 · Árbol de 3 Niveles de Profundidad',
    title: 'Recorrido completo en el Árbol de Lorica',
    prompt: 'Mira el Árbol 4 de 3 niveles a la derecha. Hoy en Lorica: Lluvia = 95 mm (> 45 → SÍ), Río Sinú = 4.9 m (> 4.0 → SÍ) y Ciénaga = 92% (> 80% → SÍ). Siguiendo la línea roja punteada hasta el signo "❓", ¿qué alerta se activa?',
    weatherBadge: 'Lluvia: 95 mm · Río: 4.9 m · Ciénaga: 92%',
    mapNote: 'Las 3 preguntas del árbol respondieron SÍ en cascada (Línea roja punteada).',
    hint: 'Cuando las 3 condiciones de peligro se cumplen al mismo tiempo (SÍ → SÍ → SÍ), se activa la alerta máxima.',
    successFeedback: '¡Excelente! Al cumplirse las 3 condiciones en cascada, el árbol llega a 🔴 ¡Alerta Roja de Inundación!',
    options: [
      { letter: 'A', text: '🟢 Normal (Sin riesgo)', correct: false },
      { letter: 'B', text: '🔵 Monitoreo Básico', correct: false },
      { letter: 'C', text: '🟠 Alerta Naranja Preventiva', correct: false },
      { letter: 'D', text: '🔴 ¡Alerta Roja de Inundación! (Evacuación)', correct: true }
    ]
  }
]

const currentItem = computed(() => questions[currentQ.value] ?? questions[0]!)

watch([currentQ, graduated], () => {
  if (graduated.value) {
    setContext({
      seccion: 'Misión 5: Graduación',
      nivelActual: 5,
      fase5E: 'Evaluate (Graduación 100%)',
      descripcionVisual: 'El alumno ha superado todos los niveles y completado el OVA al 100%.'
    })
  } else {
    setContext({
      seccion: `Misión 5: Caso ${currentQ.value + 1} (${currentItem.value.town})`,
      nivelActual: 5,
      fase5E: 'Evaluate (Mini Quiz)',
      descripcionVisual: `El alumno está resolviendo la pregunta ${currentQ.value + 1} de 4. Caso: ${currentItem.value.title}. Pregunta: ${currentItem.value.prompt}. Opciones visibles: ${currentItem.value.options.map(o => o.letter + ') ' + o.text).join(' | ')}.`,
      metricasEnPantalla: {
        municipio: currentItem.value.town,
        preguntaActual: currentQ.value + 1,
        totalPreguntas: questions.length,
        reporteClima: currentItem.value.weatherBadge
      }
    })
  }
}, { immediate: true })

const chooseOption = (idx: number) => {
  selectedIdx.value = idx
  const chosen = currentItem.value.options[idx]
  if (chosen) {
    recordQuizAttempt({
      level: 5,
      topic: `${currentItem.value.category} (${currentItem.value.town})`,
      questionTitle: currentItem.value.title,
      selectedText: chosen.text,
      isCorrect: chosen.correct,
      conceptHint: currentItem.value.hint
    })
  }
}

const nextQuestion = () => {
  if (currentQ.value < questions.length - 1) {
    currentQ.value += 1
    selectedIdx.value = null
  } else {
    completeLevel(5)
    markLevelCompleted(5)
    graduated.value = true
  }
}

const goToRendimiento = () => {
  navigateTo('/rendimiento')
}
</script>

<style scoped>
@import '../../../assets/css/nivel-shared.css';

.letter-badge {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: #006496;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.quiz-option-card.is-correct {
  border-color: #76b82a;
  background-color: #eef9e3;
}

.tree-box {
  background-color: #f8fbff;
  border: 2px solid #cbe0f2;
  flex: 1;
  min-height: 195px;
}

.case-tree-svg {
  width: 100%;
  height: 100%;
  max-height: 245px;
}

.telemetry-card {
  background-color: #f0f7ff;
  border: 2px solid #cbdceb;
}

.graduation-screen {
  background: radial-gradient(circle at 50% 35%, #ffffff 0%, #e8f6ff 100%);
  border: 3px solid #76b82a;
}

.grad-avatar {
  width: 84px;
  height: 84px;
  border-radius: 22px;
  border: 3px solid #ffffff;
  box-shadow: 0 8px 22px rgba(0, 100, 150, 0.16);
}

@media (max-width: 960px) {
  .slide-grid {
    padding-bottom: 84px;
  }

  .grad-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .grad-action-btn {
    width: 100%;
  }
}
</style>
