# GUION Y GUÍA PEDAGÓGICA DE DISERTACIÓN: PROYECTO "GOTAS DEL SINÚ"

**Contexto Institucional:**  
- **Institución:** Universidad de Córdoba (Montería, Colombia)  
- **Programa:** Licenciatura en Informática (5° Semestre)  
- **Asignatura:** Inteligencia Computacional  
- **Docente:** Prof. Juan Carlos Giraldo  
- **Objeto Virtual de Aprendizaje (OVA):** *Gotas del Sinú: Árboles de Decisión y Gestión de Riesgo Hidrológico mediante Agente Pedagógico Inteligente (DAPI-VDC)*  

> **Nota para el equipo:** Este documento no es un libreto para leer textualmente, sino una base explicativa profunda para que cada integrante comprenda el **porqué** técnico, pedagógico y territorial de lo que se construyó, dominando los argumentos frente al profesor y a los compañeros.

---

## ESTRUCTURA DEL EQUIPO Y ROLES

1. **Mario Castro** — *Coordinador General y Arquitecto Epistemológico*  
2. **Rosendo de Castro** — *Líder Técnico y Desarrollador Full-Stack (Nuxt 4 + Gemini API)*  
3. **Luis Galarraga** — *Diseñador UX/UI y Desarrollador Front-End (Design System Territorial)*  
4. **Andrea Hernández** — *Líder Pedagógica y Especialista Curricular (Modelo 5E + Didáctica)*  
5. **Lina Franco** — *Documentadora y Auditora del Modelo de Alumno/Tutor (STI & Metacognición)*  

---

```
                       ┌──────────────────────────────────────────────┐
                       │          MARIO CASTRO (Coordinador)          │
                       │ Visión Global, Problemática y Arquitectura   │
                       └──────────────────────┬───────────────────────┘
                                              │
         ┌────────────────────────────────────┼────────────────────────────────────┐
         │                                    │                                    │
┌────────┴───────────────┐       ┌────────────┴───────────┐       ┌────────────────┴───────────────┐
│ ROSENDO DE CASTRO      │       │ ANDREA HERNÁNDEZ       │       │ LUIS GALARRAGA                 │
│ Líder Técnico          │       │ Líder Pedagógica       │       │ Diseñador UX/UI                │
│ Nuxt 4 + Gemini API    │       │ Modelo 5E y Mayéutica  │       │ Design System y Gamificación   │
└────────┬───────────────┘       └────────────┬───────────┘       └────────────────┬───────────────┘
         │                                    │                                    │
         └────────────────────────────────────┼────────────────────────────────────┘
                                              │
                       ┌──────────────────────┴───────────────────────┐
                       │           LINA FRANCO (Documentadora)        │
                       │ Modelos STI, Taxonomía de Fallas y Cierre    │
                       └──────────────────────────────────────────────┘
```

---

## 1. MARIO CASTRO — Coordinador General y Arquitecto Epistemológico

### ¿Cuál es tu objetivo al hablar?
Demostrar la coherencia del proyecto, contextualizar el problema real de Córdoba y explicar cómo los **5 Modelos** de la carpeta `Modelos/` se articulan en un Sistema Tutorial Inteligente (STI).

### Ideas clave que debes dominar y explicar con tus palabras:

1. **El Problema Real vs. la Enseñanza Tradicional:**
   - En cursos de Machine Learning, siempre se enseñan Árboles de Decisión con ejemplos importados o descontextualizados: el dataset del Titanic o las Flores Iris.
   - Decidimos aplicar la **Computación Decolonial y Situada**: los estudiantes de Córdoba no viven en el Atlántico Norte ni clasifican lirios; conviven con las inundaciones y sequías del Río Sinú, el manejo del Embalse de Urrá I y la vulnerabilidad de municipios como Tierralta, Montería, San Pelayo y Lorica.

2. **La Arquitectura del Agente Pedagógico (DAPI-VDC):**
   - No queríamos hacer una simple página web con preguntas tipo test. Diseñamos un **Agente Pedagógico Inteligente (API)** formal basado en la arquitectura clásica de Sistemas Tutoriales Inteligentes (STI).
   - Un STI real no es un ChatGPT genérico; se compone de cuatro modelos que se comunican entre sí:
     - **Modelo del Mundo:** Simula el territorio y el entorno del Sinú.
     - **Modelo del Conocimiento:** Las reglas matemáticas exactas de ID3, C4.5 y CART.
     - **Modelo del Alumno:** El "gemelo cognitivo" que detecta por qué se equivoca el alumno.
     - **Modelo del Tutor:** La estrategia pedagógica (Método ROCAS y mayéutica).
   - La unión de estos cuatro modelos es lo que da vida a **`Modelo Unificado.md`**, que es el cerebro de nuestro chatbot **Zenuito**.

3. **La Toma de Decisiones Estratégica:**
   - Decidimos que la plataforma fuera adaptativa: el mismo software funciona para un niño de primaria (con metáforas de ríos y caminos), un joven de secundaria (con lógica booleana) o un universitario de 5° semestre (con formulación matemática rigurosa).

---

## 2. ROSENDO DE CASTRO — Líder Técnico y Desarrollador Full-Stack

### ¿Cuál es tu objetivo al hablar?
Explicar cómo funciona el motor computacional por debajo, la seguridad de las claves, la conexión con Google AI Studio y la telemetría en tiempo real.

### Ideas clave que debes dominar y explicar con tus palabras:

1. **Stack Tecnológico Moderno (Nuxt 4 + Vue 3 + Vuetify 3):**
   - Elegimos **Nuxt 4** por su arquitectura modular, SSR híbrido y soporte de endpoints de servidor seguros (Nitro).
   - Vuetify 3 nos dio un sistema de componentes sólido, pero lo personalizamos completamente para eliminar el aspecto corporativo y darle una estética interactiva gamificada.

2. **La Conexión con Google AI Studio (Gemini API):**
   - Explicar cómo funciona el endpoint seguro `server/api/chat.post.ts`:
     - **Seguridad:** La `GEMINI_API_KEY` reside exclusivamente en el archivo `.env` del servidor. Nunca viaja al navegador, evitando fugas de credenciales.
     - **Modelo Seleccionado:** Utilizamos `gemini-3.5-flash-lite`, un modelo de última generación con latencia ultra-baja, razonamiento multimodal y cuota activa estable, complementado con fallback a `gemini-3.8-flash`.
     - **Ajuste de Salida:** Se configuró `maxOutputTokens: 2048` para erradicar respuestas truncadas y garantizar que cada intervención cierre con su respectiva pregunta reflexiva.

3. **El Sistema de Telemetría ("Visión" en Tiempo Real):**
   - El gran diferencial de Zenuito es que **sabe lo que el alumno tiene en pantalla sin que el alumno se lo tenga que escribir**.
   - Creamos el composable `useZenuitoContext.ts`. Cada vez que el alumno avanza un paso (ej. Paso 3: Simulador del Sinú en Nivel 1, o cuando arrastra 4 nodos en el Nivel 4), se emite un payload JSON hacia el servidor con la descripción visual, el nivel y las métricas activas.
   - El servidor fusiona este contexto visual con el `Modelo Unificado.md` antes de invocar a Gemini. Por eso Zenuito puede decir: *"Veo que estás en el reto de Lorica y que el reporte indica que el río subió..."*.

4. **Persistencia y Despliegue:**
   - La sesión del estudiante se gestiona de forma reactiva con `useState` y se sincroniza en `localStorage` (`gotas_del_sinu_session_v2`), lo que permite que el estudiante cierre la pestaña y no pierda sus puntos ni sus niveles desbloqueados.
   - El código se preparó para despliegue serverless continuo en **Vercel** conectado al repositorio GitHub privado.

---

## 3. LUIS GALARRAGA — Diseñador UX/UI y Front-End

### ¿Cuál es tu objetivo al hablar?
Justificar el diseño visual, la usabilidad de la interfaz, la paleta de colores territoriales y la gamificación tipo videojuego.

### Ideas clave que debes dominar y explicar con tus palabras:

1. **Psicología del Color y Tokens Territoriales:**
   - Toda la interfaz responde a un sistema de diseño consciente de Córdoba:
     - `#006496` (Azul Sinú Profundo): Autoridad académica, agua y estabilidad.
     - `#129fea` (Azul Ciénaga / Cielo): Tecnología, interacción y dinamismo.
     - `#3d6a00` (Verde Sabana / Bosque de Galería): Vegetación ribereña, hojas de árboles de decisión y aciertos.
     - `#f7f9ff` (Superficie / Arena): Fondos descansados para evitar la fatiga visual del estudiante.
     - `#ffc21c` (Oro Zenú): Advertencias meteorológicas y elementos destacados.

2. **Ergonomía de Pantalla Única (No-Scroll Dashboard):**
   - El Dashboard principal fue concebido como un videojuego (`100vw × 100dvh`). No queríamos una página web vertical infinita donde el alumno se pierda haciendo scroll.
   - Implementamos el concepto de **Dock Dinámico (Grilla 3x2)**: las 6 tarjetas principales (Avatar, Jugar, Zenuito, Glosario, Acerca de y Créditos) se transforman de forma fluida mediante transiciones CSS en un menú lateral compacto cuando se abre cualquier actividad.

3. **Gamificación y Personalización de Identidad:**
   - Los estudiantes aprenden más cuando se sienten representados.
   - Diseñamos un editor de avatares estilo videojuego/Roblox (`ScreenAvatar.vue`) y un laboratorio para Zenuito (`ScreenZenuito.vue`), donde el estudiante puede cambiarle el chasis, visores, antenas y colores a su tutor.
   - Integramos una barra HUD superior con nivel, porcentaje de XP acumulada y la contraseña de atajo para desarrolladores (`802214`) para pruebas rápidas de sustentación.

4. **El Canvas Interactivo del Nivel 4:**
   - En el Nivel 4, no le damos un árbol estático. Diseñamos un lienzo interactivo libre (`FreeGraphCanvas.vue`) con curvas de Bézier SVG, controles de Zoom para adaptarse a computadores de cualquier resolución, y un panel retráctil para maximizar el área de trabajo.

---

## 4. ANDREA HERNÁNDEZ — Líder Pedagógica y Didáctica

### ¿Cuál es tu objetivo al hablar?
Explicar cómo se enseña la ciencia de datos mediante el **Modelo de las 5E** y por qué el método socrático es superior a los tutoriales pasivos.

### Ideas clave que debes dominar y explicar con tus palabras:

1. **La Ruta Instruccional de las 5E (Constructivismo Puro):**
   - Diseñamos las 5 misiones del juego siguiendo el modelo de Bybee (5E), donde el estudiante construye su propio aprendizaje:
     - **Nivel 1 · Enganchar (Engage):** Analogías cotidianas. ¿Cómo decide una familia si sembrar o resguardarse? Introducción a las preguntas condicionales vinculadas al Sombrero Vueltiao y al caudal del Sinú.
     - **Nivel 2 · Explorar (Explore):** La anatomía formal de un árbol: Nodo Raíz (Root), Nodos de Decisión internos, Ramas (SÍ/NO) y Nodos Hoja (terminales).
     - **Nivel 3 · Explicar (Explain):** ¿Cómo aprende la máquina? Uso de datos históricos (D1 a D6) y la necesidad de una métrica para medir qué tan mezclados están los datos (concepto de impureza y pureza).
     - **Nivel 4 · Elaborar (Elaborate):** Transferencia práctica. El estudiante construye y entrena su propio árbol en un lienzo libre, comprobando si su árbol clasifica correctamente las emergencias hidrológicas.
     - **Nivel 5 · Evaluar (Evaluate):** Mini Quiz de 4 casos prácticos territoriales a lo largo de la cuenca (Tierralta, Montería, San Pelayo y Lorica), con árboles de decisión ilustrados específicamente para cada pregunta.

2. **El Método ROCAS del Tutor Socrático:**
   - Zenuito no es un buscador que da respuestas masticadas. Aplica el framework **ROCAS** definido en `Modelo Tutor.md`:
     - *R (Representación):* Elicita la intuición del alumno.
     - *O (Observación / Conflicto):* Hace que el estudiante vea las limitaciones de su intuición ("Si solo miras si llueve pero el embalse está lleno, ¿qué pasará?").
     - *C (Cognición y Andamiaje):* Guía hacia la deducción matemática sin darle la fórmula despejada.
     - *S (Síntesis):* Valida la comprensión y previene el sobreajuste (*overfitting*).

3. **Adaptación según Nivel Cognitivo:**
   - Si el estudiante es de **Primaria**, Zenuito habla de ríos, peces y preguntas de adivinanzas.
   - Si es de **Secundaria**, habla de reglas lógicas y tablas de decisión.
   - Si es de **Universidad**, profundiza en la formulación rigurosa de algoritmos de Machine Learning.

---

## 5. LINA FRANCO — Documentadora y Auditora del Modelo STI

### ¿Cuál es tu objetivo al hablar?
Explicar la formalización matemática del **Modelo del Conocimiento**, la taxonomía de diagnóstico del **Modelo del Alumno**, y cerrar la sustentación con el valor pedagógico del proyecto.

### Ideas clave que debes dominar y explicar con tus palabras:

1. **El Modelo del Conocimiento (Base Epistémica y Cero Alucinación):**
   - Según `Modelo Conocimientos.md`, el agente restringe su dominio a tres algoritmos fundamentales:
     - **ID3:** Basado en la **Entropía de Shannon** $H(S) = -\sum p_i \log_2(p_i)$ y la **Ganancia de Información**.
     - **C4.5:** Introduce variables continuas y el **Ratio de Ganancia** para evitar el sesgo hacia atributos con muchas ramas; incluye poda por error (**EBP**).
     - **CART:** Topología rígidamente binaria con el **Índice de Impureza de Gini** $I_G = 1 - \sum p_i^2$ y poda costo-complejidad (**CCP**).
   - *Regla Epistémica Clave:* Zenuito tiene prohibido mezclar supuestos (ej. no permite usar Ratio de Ganancia en árboles CART binarios).

2. **El Modelo del Alumno (Gemelo Cognitivo y Taxonomía de Fallas):**
   - La mayoría de plataformas solo dicen "Correcto" o "Incorrecto". Nuestro modelo (`Modelo Alumno.md`) diagnostica la **etiología cognitiva** (la causa de fondo del error):
     1. **Fallo de Memoria (Slip):** El alumno sabe la lógica pero olvidó un signo o una etiqueta. -> *Acción:* Pista sutil (micro-hinting).
     2. **Error Lógico Estructural (Bug / Misconception):** Tiene un modelo mental equivocado (ej. confunde Gini con Entropía). -> *Acción:* Pregunta de choque o paradoja conceptual.
     3. **Brecha Jerárquica:** Le falta asimilar un prerrequisito. -> *Acción:* Andamiaje dinámico y retroceso a un paso previo.
     4. **Déficit Volitivo (Adivinación):** Hace clics al azar para adivinar. -> *Acción:* Poda cognitiva; se le exige que redacte en texto su razonamiento antes de avanzar.

3. **Herramientas de Soporte y Cierre:**
   - La plataforma incluye un **Glosario tipo Diccionario** con 17 términos ordenados de menor a mayor complejidad y filtrado en tiempo real.
   - En la sección **Acerca de**, integramos un botón de **Reinicio de Progreso** con modal de confirmación y advertencia, permitiendo a docentes o alumnos restablecer su partida a cero sin borrar su cuenta.
   - **Conclusión:** *Gotas del Sinú* demuestra que la inteligencia artificial y el aprendizaje automático no son conceptos lejanos o abstractos; son herramientas de empoderamiento social y científico para proteger el territorio cordobés.

---

## RESUMEN RÁPIDO PARA PREGUNTAS DEL PROFESOR (FAQ)

| Pregunta del Docente | Respuesta Clave del Equipo |
|---|---|
| **¿Por qué Árboles de Decisión y no Redes Neuronales?** | Porque los árboles son modelos de **IA explicable (White-Box)**. En educación e hidrología comunitaria, es vital que un campesino o tomador de decisiones entienda exactamente por qué una regla activó la alerta de evacuación. |
| **¿Dónde se guarda la información de los estudiantes?** | En el `localStorage` del cliente (`gotas_del_sinu_session_v2`). Garantiza privacidad, no requiere servidores de base de datos de pago y permite que cada estudiante mantenga su progreso en su propio equipo. |
| **¿Cómo evitaron que la IA dé las respuestas resueltas?** | A través del `Modelo Unificado.md` inyectado en el System Prompt de Gemini, con directivas socráticas inquebrantables, prohibición expresa de entregar código o resultados numéricos finales, y cierre forzado con preguntas mayéuticas. |
| **¿Cómo sabe Zenuito lo que pasa en la pantalla?** | Mediante el composable `useZenuitoContext.ts`. Cada sub-pantalla actualiza reactivamente el estado de la telemetría (misión, paso, nodos en canvas, datos meteorológicos) y se envía junto con cada mensaje al servidor. |
| **¿Qué pasa si no hay internet o falla la API de Google?** | Toda la lógica pedagógica del OVA (los 5 niveles, el simulador, el lienzo libre y el quiz práctico) funciona de forma autónoma en el frontend; Zenuito notifica con elegancia si hay interrupción de red sin congelar el juego. |

