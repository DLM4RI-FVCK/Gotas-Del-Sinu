<p align="center">
  <img src="./public/banner.svg" alt="Gotas del Sinú — Objeto Virtual de Aprendizaje sobre árboles de decisión" width="100%">
</p>

<p align="center">
  <strong>Objeto Virtual de Aprendizaje gamificado sobre árboles de decisión, datos y riesgo hidrológico en la cuenca del Río Sinú.</strong>
</p>

<p align="center">
  Universidad de Córdoba · Licenciatura en Informática · Inteligencia Computacional
</p>

---

## Contenido

- [Descripción](#descripción)
- [Propósito y alcance](#propósito-y-alcance)
- [Público y registro](#público-y-registro)
- [Recorrido de aprendizaje](#recorrido-de-aprendizaje)
- [Funcionalidades](#funcionalidades)
- [Datos y límites de la simulación](#datos-y-límites-de-la-simulación)
- [Zenuito y la inteligencia artificial](#zenuito-y-la-inteligencia-artificial)
- [Modelos pedagógicos](#modelos-pedagógicos)
- [Tecnologías y servicios externos](#tecnologías-y-servicios-externos)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Requisitos y ejecución local](#requisitos-y-ejecución-local)
- [Variables de entorno](#variables-de-entorno)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Privacidad y persistencia](#privacidad-y-persistencia)
- [Equipo creador y docente asesor](#equipo-creador-y-docente-asesor)
- [Licencia y atribuciones](#licencia-y-atribuciones)

## Descripción

**Gotas del Sinú** es un OVA (Objeto Virtual de Aprendizaje) interactivo que enseña conceptos de aprendizaje automático supervisado usando **árboles de decisión** y situaciones didácticas inspiradas en la cuenca del Río Sinú, Córdoba, Colombia.

El estudiante recorre una secuencia de misiones con explicaciones visuales, actividades, ejercicios y un simulador. Un tutor virtual llamado **Zenuito** acompaña el aprendizaje mediante preguntas y pistas. La interfaz incluye un mapa de niveles, progreso gamificado, personalización de personaje y un glosario.

El contenido ambiental sirve como contexto educativo. **La plataforma no es un sistema oficial de monitoreo hidrológico, pronóstico, alerta temprana ni recomendación de evacuación.** Los ejemplos del simulador son datos pedagógicos fijos y no deben usarse para tomar decisiones ante emergencias reales.

### Ficha del proyecto

| Dato | Información |
|---|---|
| Nombre | Gotas del Sinú |
| Tipo | Objeto Virtual de Aprendizaje (OVA) web |
| Área | Inteligencia Computacional, aprendizaje automático y árboles de decisión |
| Contexto | Cuenca del Río Sinú, departamento de Córdoba, Colombia |
| Institución | Universidad de Córdoba |
| Programa y curso | Licenciatura en Informática · Inteligencia Computacional |
| Opciones de ingreso actuales | Secundaria, grados 6–11; Universidad, semestres 1–10 |
| Idioma de la interfaz | Español |
| Cliente web | Nuxt 4, Vue 3, TypeScript y Vuetify 3 |
| Tutor de IA | Zenuito, conectado a la API de Gemini mediante un endpoint del servidor |
| Despliegue previsto | Vercel |

## Propósito y alcance

El proyecto busca que el estudiante pueda:

- Reconocer la **raíz**, los nodos de decisión, las ramas y las hojas de un árbol.
- Interpretar condiciones numéricas con umbrales y recorridos de tipo **Sí/No**.
- Relacionar ejemplos con clases como **Calma**, **Vigilancia** e **Inundación**.
- Explorar cómo se separan conjuntos de datos y qué significan la pureza, la impureza de Gini y la precisión mostrada por el simulador.
- Explicar sus decisiones y revisar los errores con apoyo de retroalimentación.
- Construir y ejecutar un árbol definido por el estudiante sobre un conjunto didáctico de casos.

La aplicación presenta fundamentos de **ID3**, **C4.5** y **CART** en sus materiales. El constructor libre del Nivel 4, sin embargo, **no entrena automáticamente ninguno de esos algoritmos**: el estudiante define sus propias preguntas, umbrales, hojas y conexiones; el programa ejecuta ese árbol y compara sus resultados con los datos incorporados.

## Público y registro

El formulario actual solicita nombre, edad y nivel educativo. Ofrece **Secundaria** (grados enteros del **6 al 11**) y **Universidad** (semestres enteros del **1 al 10**); el campo cambia según la opción seleccionada. No hay creación de cuentas con contraseña ni autenticación contra una base de datos: el registro crea un perfil local para personalizar la experiencia.

## Recorrido de aprendizaje

La experiencia combina una introducción al modelo pedagógico **5E** con cinco misiones:

| Nivel | Fase 5E | Tema y actividad |
|---|---|---|
| 1 | Enganchar | Introduce los árboles de decisión mediante analogías, situaciones del Río Sinú y un reto interactivo. |
| 2 | Explorar | Presenta raíz, nodos, ramas y hojas; incluye un explorador visual y actividades sobre condiciones y umbrales. |
| 3 | Explicar | Revisa casos didácticos de lluvia y nivel del río, compara preguntas y trabaja pureza y Gini. |
| 4 | Elaborar | Permite crear, conectar y ejecutar un árbol de decisión propio con seis registros y un reporte de resultados. |
| 5 | Evaluar | Propone cuatro preguntas prácticas ilustradas para aplicar lo aprendido en casos de la cuenca. |

El mapa regula el acceso progresivo a las misiones. Al completar niveles se actualizan el progreso y la experiencia del perfil.

## Funcionalidades

### Aprendizaje y simuladores

- Rueda introductoria del ciclo 5E y mapa de misiones.
- Actividades por nivel con explicaciones, retos, tablas y diagramas ampliables.
- Explorador interactivo de las partes del árbol.
- Actividades sobre particiones, umbrales, mezcla de clases y pureza.
- Constructor libre del Nivel 4 con nodos de raíz, decisión y hoja; conexiones Sí/No; movimiento y eliminación de nodos; árbol de ejemplo; y ejecución paso a paso.
- Reporte del constructor con diagnóstico por nodo, recorrido por municipio, predicciones, precisión y resultados de pureza derivados de Gini.
- Mini cuestionario final de cuatro casos.

### Personalización y consulta

- Avatar del estudiante con opciones para personaje, ropa, cabello, accesorios, rostro, piel y fondo.
- Laboratorio de Zenuito para elegir su apariencia y ajustar verbosidad, socraticidad y ayudas automáticas.
- Glosario con búsqueda, filtros de categoría y dificultad.
- Pantallas de información institucional, créditos y reinicio del progreso.
- Diseño adaptable a escritorio y dispositivos móviles.

## Datos y límites de la simulación

El Nivel 4 incluye seis registros codificados en [`app/utils/nivel4Builder.ts`](./app/utils/nivel4Builder.ts):

| ID | Municipio | Lluvia | Nivel del río | Viento | Clase didáctica |
|---|---|---:|---:|---:|---|
| D1 | Montería | 10 mm | 2.2 m | 18 km/h | Calma |
| D2 | Cereté | 20 mm | 2.5 m | 25 km/h | Calma |
| D3 | San Pelayo | 55 mm | 3.1 m | 12 km/h | Vigilancia |
| D4 | Cotorra | 65 mm | 3.4 m | 22 km/h | Vigilancia |
| D5 | Lorica | 80 mm | 4.6 m | 15 km/h | Inundación |
| D6 | Tierralta | 95 mm | 5.1 m | 20 km/h | Inundación |

Son **casos demostrativos fijos del software**, no una fuente de mediciones hidrológicas verificadas. El Nivel 3 usa su propia tabla didáctica de cinco casos; no debe confundirse con los seis registros del constructor.

El constructor calcula si el árbol creado llega a la clase indicada en cada caso. El valor de **pureza Gini** que se presenta en su reporte es una escala visual normalizada para la actividad; no es una predicción oficial ni una medida de riesgo real. Los umbrales disponibles son controles pedagógicos, no umbrales hidrológicos recomendados.

## Zenuito y la inteligencia artificial

Zenuito es un tutor conversacional socrático. El cliente envía solicitudes a `POST /api/chat`; el servidor construye la instrucción del tutor en [`server/utils/zenuitoPrompt.ts`](./server/utils/zenuitoPrompt.ts) y llama a la API de Gemini desde [`server/api/chat.post.ts`](./server/api/chat.post.ts).

### Contexto de pantalla

La aplicación entrega contexto estructurado —sección, misión, fase, descripción y métricas disponibles— para orientar la respuesta. **Zenuito no recibe una captura de pantalla ni interpreta visualmente la pantalla como un sistema OCR o de visión.** Los componentes de la aplicación actualizan esa descripción.

### Preferencias

- **Verbosidad:** corta, media o detallada.
- **Socraticidad:** baja (pistas más directas), media o alta (más preguntas para deducir).
- **Ayudas automáticas:** activa o desactiva el resumen de entrada a una misión.

### Modelos configurados

El endpoint prueba estos identificadores de modelo en orden, como alternativas ante fallos de disponibilidad: `gemini-3.5-flash-lite`, `gemini-3.8-flash` y `gemini-flash-latest`. La disponibilidad y cuota dependen de Google y de la clave configurada.

Sin una clave de Gemini válida, las funciones que llaman al chat de Zenuito no estarán disponibles; las demás actividades de la aplicación no requieren esa clave.

## Modelos pedagógicos

La carpeta [`Modelos/`](./Modelos/) contiene documentos conceptuales y guías de diseño:

- **Modelo Mundo:** sitúa los ejemplos en el contexto de la cuenca del Sinú.
- **Modelo Conocimientos:** reúne contenidos sobre árboles de decisión, ID3, C4.5, CART y sus métricas.
- **Modelo Alumno:** propone una taxonomía pedagógica de errores y apoyos; no es un diagnóstico clínico.
- **Modelo Tutor:** describe la mediación socrática y el enfoque ROCAS.
- **Modelo Unificado:** integra las pautas y establece el alcance didáctico de los datos.
- **Modelo API:** contiene instrucciones de agente pedagógico.
- **Disertación:** guía institucional y distribución de roles del equipo.

Estos archivos documentan la arquitectura pedagógica; no todos se cargan como archivos en tiempo de ejecución. La instrucción que utiliza el endpoint se construye en `server/utils/zenuitoPrompt.ts`. Si una descripción conceptual difiere de una actividad implementada, el comportamiento actual del componente y sus datos es la referencia funcional.

## Tecnologías y servicios externos

### Tecnologías del proyecto

- **Nuxt 4** y **Vue 3** para la aplicación web.
- **TypeScript** para componentes, composables y lógica de las misiones.
- **Vuetify 3** y `vuetify-nuxt-module` para componentes de interfaz.
- **Nitro**, integrado en Nuxt, para el endpoint del chat en el servidor.
- **CSS** y **Sass Embedded** para estilos y diseño adaptable.
- **Material Design Icons** (`@mdi/font`) y Material Symbols para iconografía.
- **npm** para instalar dependencias y ejecutar scripts.

### Servicios y recursos externos usados por la aplicación

- **Google Gemini API** para las respuestas de Zenuito.
- **DiceBear Avataaars** para generar avatares de estudiantes y **DiceBear Bottts** para Zenuito.
- **Google Fonts** para las familias tipográficas configuradas.
- **Wikimedia Commons** para imágenes institucionales de la pantalla “Acerca de”.

Las imágenes y fuentes externas requieren conexión a Internet y están sujetas a la disponibilidad y condiciones de sus respectivos proveedores.

## Estructura del repositorio

```text
.
├── app/
│   ├── assets/css/                 # Estilos globales y compartidos
│   ├── components/dashboard/       # Dashboard, avatar, Zenuito, glosario y créditos
│   ├── components/jugar/           # Introducción 5E, mapa y misiones 1–5
│   ├── components/login/           # Formulario de ingreso del perfil local
│   ├── composables/                # Sesión del estudiante y contexto de Zenuito
│   ├── pages/                      # Rutas principales
│   └── utils/                      # Catálogo, glosario y datos/ejecución del Nivel 4
├── server/
│   ├── api/chat.post.ts            # Endpoint servidor para Gemini
│   └── utils/zenuitoPrompt.ts      # Construcción de la instrucción de Zenuito
├── Modelos/                        # Documentación pedagógica y conceptual
├── GoogleStich/                    # Prototipos visuales de referencia; no son la app ejecutable
├── public/
│   ├── banner.svg                  # Banner de este README
│   └── favicon.svg                 # Favicon de gota azul
├── nuxt.config.ts                  # Nuxt, Vuetify, estilos y configuración de servidor
├── package.json                    # Dependencias y scripts
└── README.md
```

## Requisitos y ejecución local

Se requiere **Node.js** y **npm** compatibles con la versión de Nuxt del proyecto.

1. Clona el repositorio y entra en su carpeta.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Para usar Zenuito, crea un archivo `.env` en la raíz y configura `GEMINI_API_KEY` con una clave propia de Google AI Studio. No publiques esa clave.
4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre la URL local que muestra Nuxt en la terminal.

### Scripts disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Inicia Nuxt en modo desarrollo. |
| `npm run build` | Genera la compilación de producción de Nuxt/Nitro. |
| `npm run preview` | Previsualiza localmente la compilación de producción. |
| `npm run generate` | Genera una salida estática. El endpoint de Gemini requiere ejecución de servidor y no queda operativo como una función API en un hosting puramente estático. |

## Variables de entorno

El endpoint acepta cualquiera de estas variables de servidor:

```dotenv
GEMINI_API_KEY=tu_clave_de_google_ai_studio
# Alternativa compatible:
NUXT_GEMINI_API_KEY=tu_clave_de_google_ai_studio
```

`.env` está excluido de Git mediante `.gitignore`; `.env.example` solo es una plantilla. **No pongas claves reales en el código ni en el README.**

## Despliegue en Vercel

1. Importa el repositorio en Vercel o confirma que ya esté conectado.
2. Mantén el despliegue como aplicación Nuxt con funciones de servidor; el endpoint de Zenuito necesita servidor y no basta con publicar HTML estático.
3. En **Project → Settings → Environment Variables**, añade `GEMINI_API_KEY` con el valor de tu clave. Selecciona los entornos en los que quieras usar Zenuito (Production, Preview y/o Development).
4. Guarda la variable y despliega. Si modificas una variable después de un despliegue, vuelve a desplegar para que se aplique.
5. Con el repositorio conectado a Git, cada `push` genera un despliegue; normalmente la rama de producción actualiza el sitio público y las demás ramas generan previews.

Los archivos de `public/` se sirven desde la raíz del dominio. Por ejemplo, el favicon queda disponible en `/favicon.svg` y este banner en `/banner.svg`.

## Privacidad y persistencia

- El perfil, la personalización del avatar y Zenuito, el progreso y los niveles desbloqueados se conservan en el navegador (cookie y `localStorage`); no se utiliza una base de datos de usuarios en el servidor.
- El nombre, la edad, el nivel/grado, los mensajes del chat y el contexto de pantalla se envían desde el servidor a Gemini cuando se solicita una respuesta de Zenuito. Configura la integración solo si esto es apropiado para el contexto educativo y las políticas de privacidad aplicables.
- La clave de Gemini se lee en el servidor y no debe enviarse al navegador.
- Reiniciar el progreso restablece los datos de avance locales; no borra una cuenta remota porque la aplicación no mantiene cuentas de usuario en una base de datos.
- Las actividades y datos hidrológicos son pedagógicos. No sustituyen fuentes oficiales ni orientación de autoridades de emergencia.

## Equipo creador y docente asesor

Los siguientes créditos aparecen en la aplicación:

| Integrante | Responsabilidad presentada |
|---|---|
| **Mario Castro** | Coordinación y dirección general del proyecto. |
| **Rosendo de Castro** | Arquitectura de software, desarrollo y simulador de grafos. |
| **Luis Galaraga** | Diseño de interfaz y experiencia de usuario (UI/UX). |
| **Andrea Hernández** | Diseño pedagógico, metodología 5E y actividades. |
| **Lina Franco** | Investigación conceptual, documentación y modelos del sistema tutorial. |
| **Prof. Juan Carlos Giraldo** | Docente asesor de Inteligencia Computacional. |

**Contexto académico:** Universidad de Córdoba, Licenciatura en Informática, asignatura Inteligencia Computacional.

## Licencia y atribuciones

El repositorio no contiene actualmente un archivo `LICENSE`; por tanto, no se declara aquí una licencia abierta para reutilizar o redistribuir el proyecto. Antes de hacerlo, consulta con el equipo creador y revisa también las licencias y atribuciones de los servicios y recursos externos mencionados arriba.
