# 💧 Gotas del Sinú — Documento de Diseño y Arquitectura (Design Document)

**Plataforma Gamificada de Aprendizaje de Ciencias de Datos y Algoritmos**  
**Población Objetivo:** Estudiantes de 4to Semestre de Licenciatura en Informática — Universidad de Córdoba  
**Versión:** 2.0 (Overhaul Integral: Frontend, Backend y Datos)  
**Fecha de Actualización:** Octubre 2026  

---

## 1. Visión General y Propósito del Software

**Gotas del Sinú** es una plataforma educativa interactiva y gamificada diseñada específicamente para fortalecer el pensamiento computacional, la lógica algorítmica y la didáctica tecnológica en los estudiantes de **4to semestre de Licenciatura en Informática** de la Universidad de Córdoba.

### Objetivos Clave de la Transformación:
1. **Contexto Pedagógico Claro:** Se eliminaron por completo las menciones a hidrología y conceptos confusos que no correspondían al perfil docente en informática (caudales de estiaje, curvas de gasto, sedimentos, etc.). Los problemas ahora se modelan a través de **árboles de decisión**, **cálculo de ganancia de información**, **entropía**, **matrices de confusión** y **análisis estadístico**.
2. **Depuración de Marca Institucional:** Se eliminaron todas las menciones a marcas externas obsoletas (*EdTech DAPI-VDC*) y plataformas de idiomas (*Duolingo*).
3. **Mascota y Agente Guía:** **Zenuito** (gota con Sombrero Vueltiao tradicional de Córdoba) actúa como el guía y futuro agente pedagógico inteligente.
4. **Equipo de Desarrolladores:** Sección destacada en la página de inicio que reconoce a los 5 creadores: **Mario Castro**, **Luis Galaraga**, **Rosendo de Castro**, **Lina Franco** y **Andrea Hernandez**.

---

## 2. Arquitectura de Datos y Backend (Nitro Engine)

La plataforma cuenta con un backend dinámico y persistente basado en el motor de **Nitro** de Nuxt 4, erradicando usuarios estáticos o simulados en memoria volátil.

### 2.1 Almacenamiento Persistente (`server/data/database.json`)
Los datos residen en un archivo JSON estructurado con persistencia atómica:
- **Colección `users`:** Contiene los estudiantes registrados y el docente titular con sus credenciales seguras, puntos, división científica activa, misiones completadas y exámenes de ascenso superados.
- **Utilidad `server/utils/db.ts`:** Módulo encargado de la lectura/escritura sincronizada en disco.

### 2.2 Endpoints de API Implementados (`server/api/`)
| Endpoint | Método | Descripción y Regla de Negocio |
| :--- | :---: | :--- |
| `/api/auth/login` | `POST` | Autenticación multi-campo (usuario, correo institucional o ID) con contraseñas seguras y control de rol. |
| `/api/auth/register` | `POST` | Registro automático de nuevos estudiantes en la BD con asignación de División 1 (`Trainer`) y bono de +150 PTS. |
| `/api/missions/complete` | `POST` | Persistencia de finalización de misión, otorgamiento de puntos y sincronización en BD. |
| `/api/ascenso/submit` | `POST` | Validación estricta de ascenso: requiere **≥ 75%** para aprobar, avanzar al siguiente nivel científico y desbloquear nuevas misiones. |
| `/api/leaderboard` | `GET` | Tabla de clasificación en vivo ordenada de mayor a menor puntaje con cálculo de posiciones (🥇, 🥈, 🥉). |
| `/api/teacher/students` | `GET` | Retorna la nómina en vivo de los estudiantes para el observador docente. |
| `/api/teacher/analytics` | `GET` | Analítica en tiempo real: número total de alumnos, puntos promedio, misiones resueltas, tasa de ascenso, distribución por escalafón y matriz de competencias didácticas calculadas en vivo. |

---

## 3. Modelo de Progresión y Roles

### 3.1 Los 4 Niveles del Escalafón Científico
El sistema reemplazó los esquemas tradicionales de experiencia (XP) y rachas por un modelo de **Puntos (PTS)** y **4 Divisiones Científicas**:

```mermaid
flowchart LR
    L1["División 1: Trainer
(Lógica Algorítmica)"] -->|Examen Ascenso 1 (≥75%)| L2["División 2: Junior
(Ganancia & Entropía)"]
    L2 -->|Examen Ascenso 2 (≥75%)| L3["División 3: Senior
(Poda & Métricas)"]
    L3 -->|Examen Ascenso 3 (≥75%)| L4["División 4: Director Científico
(Validación & Didáctica)"]
```

1. **Trainer (Scientist Trainer):** Fundamentos de bifurcación condicional, árboles de decisión y variables predictivas.
2. **Junior (Junior Analyst):** Entropía de Shannon, cálculo de ganancia de información y matrices de confusión.
3. **Senior (Senior Scientist):** Poda estructural, optimización de hiperparámetros y reducción de sobreajuste (*overfitting*).
4. **Director Científico (Scientific Director):** Arquitectura de validación cruzada k-fold y diseño de recursos didácticos con IA.

### 3.2 Control Estricto de Roles (`app/middleware/auth.global.ts`)
- **Estudiante (`estudiante`):** Acceso al Dashboard de misiones, ranking, tienda y páginas de trabajo. Restringido el acceso a analítica docente.
- **Docente (`docente` - `Prof. Carlos Pantoja`):** Acceso exclusivo a analítica de aula, distribución estadística, exportación de reportes y observador pedagógico. Prohibido el ingreso a misiones de estudiante para mantener la pureza de datos.

---

## 4. Diseño de Interfaz y Experiencia de Usuario (Frontend)

### 4.1 Principios de Diseño
- **Full-Screen Responsive Layout:** Todos los tableros (estudiante, docente, login) ocupan el **100% del ancho y alto** de la pantalla sin dejar contenedores comprimidos ni espacios vacíos.
- **Aesthetic Tactile Design:** Botones y tarjetas con profundidad visual (*shadows*, bordes dobles, efectos *hover* dinámicos).
- **Privacidad y Limpieza de Identificadores:** Se removieron todos los códigos visibles de ID (`EST-XXXX`, `DOC-XXXX`, `Carnet ID`) de la interfaz pública para ofrecer una experiencia centrada en el usuario.

### 4.2 Arquitectura de Páginas y Componentes

```
app/
├── components/
│   ├── auth/
│   │   ├── AuthBenefits.vue          # Beneficios institucionales (4to semestre)
│   │   ├── AuthHeader.vue            # Conmutador Iniciar Sesión / Registro
│   │   ├── LoginForm.vue             # Login por correo/usuario sin IDs visibles
│   │   ├── RegisterForm.vue          # Registro ágil para estudiantes
│   │   └── RoleSelector.vue          # Selector táctil Estudiante / Docente
│   ├── common/
│   │   ├── AppFooter.vue             # Pie de página institucional Unicórdoba
│   │   ├── AppNavbar.vue             # AppBar sin listas; badge de nombre y puntos
│   │   └── ZenuitoFloatingBubble.vue # Gota/Burbuja flotante interactiva en exámenes y misiones
│   ├── dashboard-docente/
│   │   ├── ClassAnalyticsChart.vue   # Matriz de competencias y distribución viva por división
│   │   ├── StudentsManagementTable.vue # Nómina de alumnos con observador pedagógico
│   │   ├── TeacherHeader.vue         # Membrete docente y descargas de reportes
│   │   └── TeacherKpiStats.vue       # 4 KPIs de desempeño sincronizados con la BD
│   ├── dashboard-estudiante/
│   │   ├── ActiveMissionsList.vue    # Misiones de la división + Examen de ascenso
│   │   ├── LeaderboardCard.vue       # Ranking en tiempo real (Base de datos)
│   │   ├── StudentHeader.vue         # Identidad, carrera, puntos y rango del estudiante
│   │   ├── StudentStoreCard.vue      # Tienda de recompensas (En construcción)
│   │   └── ZenuitoAgentCard.vue      # Agente Pedagógico Zenuito (En desarrollo)
│   └── home/
│       ├── AboutSoftwareSection.vue  # ¿De qué trata? ¿Qué hace? ¿Cuál es su finalidad?
│       ├── CallToAction.vue          # Acceso institucional
│       ├── DevelopersSection.vue     # 5 avatares de los desarrolladores
│       └── HeroSection.vue           # Hero limpio con Zenuito y los 4 niveles
├── pages/
│   ├── acceso.vue                    # Portal de acceso y registro a pantalla completa
│   ├── dashboard-docente.vue         # Panel de control analítico del docente
│   ├── dashboard-estudiante.vue      # Tablero gamificado principal del estudiante
│   ├── index.vue                     # Landing page institucional
│   ├── ascenso/
│   │   └── [level].vue               # Examen de ascenso (botón centrado + burbuja Zenuito)
│   └── misiones/
│       └── [id].vue                  # Área de misión (botón centrado + burbuja Zenuito)
└── composables/
    └── useUserSession.ts             # Estado reactivo global de sesión y misiones
```

---

## 5. Módulos Especiales Implementados

### 5.1 Sistema de Reportes Oficiales para el Docente
Ubicado en `TeacherHeader.vue`, permite exportar datos con membrete formal institucional:
1. **Descarga CSV:** Archivo estructurado con metadatos del docente, fecha de corte y filas de estudiantes.
2. **Descarga JSON:** Archivo JSON completo para análisis programmatico o respaldos de cohorte.
3. **Reporte PDF Oficial / Imprimible:** Genera un documento estilizado con el logotipo de **Gotas del Sinú**, membrete de la Universidad de Córdoba, tablas de rendimiento y línea de firma docente/coordinación, activando el diálogo de impresión nativo.

### 5.2 Burbuja Flotante de Zenuito (`ZenuitoFloatingBubble.vue`)
Componente flotante (*floating droplet*) presente en todas las páginas de misiones y exámenes de ascenso:
- Icono acuático animado con micro-ondulaciones (*water ripple*).
- Bocadillo de diálogo con botón de minimizar (`✕`).
- Mensaje claro al alumno: informa que Zenuito está en desarrollo y que pronto estará integrado como tutor inteligente para resolver dudas cognitivas a cambio de puntos.

### 5.3 Espacios Nuevos en el Dashboard de Estudiante
- **Tienda (`StudentStoreCard.vue`):** Espacio preparado donde el estudiante podrá adquirir recompensas. Cuenta con el aviso formal *"Estamos trabajando en esto"*.
- **Zenuito IA (`ZenuitoAgentCard.vue`):** Espacio pedagógico donde se explica el funcionamiento del asistente de inteligencia artificial y su cobro de puntos por consulta. Cuenta con el aviso formal *"Estamos trabajando en esto"*.

---

## 6. Resumen de Archivos Clave Modificados

| Área | Archivo Principal | Aporte Técnico |
| :--- | :--- | :--- |
| **Backend** | `server/data/database.json` | Base de datos real con usuarios, misiones y puntos. |
| **Backend** | `server/api/teacher/analytics.get.ts` | Endpoint de analítica viva y distribución por escalafón. |
| **Frontend** | `app/pages/acceso.vue` | Vista de login/registro a pantalla completa responsive. |
| **Frontend** | `app/pages/dashboard-estudiante.vue` | Dashboard modular con Tienda, Zenuito, Misiones y Ranking. |
| **Frontend** | `app/pages/dashboard-docente.vue` | Dashboard docente depurado sin módulos obsoletos ni grados. |
| **Frontend** | `app/components/common/ZenuitoFloatingBubble.vue` | Burbuja flotante informativa en misiones y exámenes. |
| **Frontend** | `app/pages/index.vue` | Landing page con los 5 desarrolladores y propósito claro. |

---

*Documento generado y mantenido para el equipo de desarrollo de Gotas del Sinú — Universidad de Córdoba.*
