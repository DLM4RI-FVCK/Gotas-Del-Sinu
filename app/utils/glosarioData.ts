export type GlossaryCategory =
  | 'todas'
  | 'fundamentos'
  | 'anatomia'
  | 'datos'
  | 'entrenamiento'

export type DifficultyLevel = 'Básico' | 'Intermedio' | 'Avanzado'

export interface GlossaryTerm {
  id: string
  term: string
  english?: string
  emoji: string
  category: Exclude<GlossaryCategory, 'todas'>
  categoryLabel: string
  difficulty: DifficultyLevel
  difficultyOrder: number
  definition: string
  sinuExample: string
}

export const glossaryCategories: { key: GlossaryCategory; label: string; icon: string }[] = [
  { key: 'todas', label: 'Todos los conceptos', icon: 'mdi-book-alphabet' },
  { key: 'fundamentos', label: '1. Contexto y Método 5E', icon: 'mdi-compass-outline' },
  { key: 'anatomia', label: '2. Partes del Árbol', icon: 'mdi-file-tree-outline' },
  { key: 'datos', label: '3. Datos y Condiciones', icon: 'mdi-table-search' },
  { key: 'entrenamiento', label: '4. Machine Learning y Pureza', icon: 'mdi-brain' }
]

// Ordenados desde lo más sencillo (difficultyOrder 1) hasta lo más avanzado (difficultyOrder 3)
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'ova',
    term: 'OVA (Objeto Virtual de Aprendizaje)',
    english: 'Virtual Learning Object',
    emoji: '💻',
    category: 'fundamentos',
    categoryLabel: 'Contexto y Método 5E',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Recurso digital interactivo y autónomo diseñado con un propósito educativo claro que integra explicaciones visuales, simuladores y actividades de evaluación.',
    sinuExample: 'Gotas del Sinú es un OVA creado para aprender Árboles de Decisión jugando con escenarios del Río Sinú.'
  },
  {
    id: 'metodo_5e',
    term: 'Modelo Pedagógico 5E',
    english: '5E Instructional Model',
    emoji: '🧭',
    category: 'fundamentos',
    categoryLabel: 'Contexto y Método 5E',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Metodología de aprendizaje constructivista dividida en 5 fases progresivas: 1. Enganchar, 2. Explorar, 3. Explicar, 4. Elaborar y 5. Evaluar.',
    sinuExample: 'Los 5 niveles de nuestro mapa de juego corresponden exactamente a cada una de las 5 fases del método 5E.'
  },
  {
    id: 'cuenca_sinu',
    term: 'Cuenca Hidrográfica del Río Sinú',
    english: 'Sinú River Basin',
    emoji: '🌊',
    category: 'fundamentos',
    categoryLabel: 'Contexto y Método 5E',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Territorio natural del departamento de Córdoba donde todas las lluvias y quebradas confluyen hacia el Río Sinú, desde el Nudo de Paramillo hasta el Mar Caribe.',
    sinuExample: 'Municipios como Tierralta, Montería, Cereté, San Pelayo y Lorica hacen parte de la cuenca del Río Sinú.'
  },
  {
    id: 'tutor_socratico',
    term: 'Asistente Socrático (Zenuito)',
    english: 'Socratic AI Tutor',
    emoji: '🤖',
    category: 'fundamentos',
    categoryLabel: 'Contexto y Método 5E',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Compañero virtual que guía al estudiante mediante preguntas reflexivas y pistas para que descubra la respuesta por sí mismo en lugar de memorizar.',
    sinuExample: 'Zenuito te acompaña flotando en cada nivel mientras analizas las crecientes del río.'
  },
  {
    id: 'decision_tree',
    term: 'Árbol de Decisión',
    english: 'Decision Tree',
    emoji: '🌳',
    category: 'anatomia',
    categoryLabel: 'Partes del Árbol',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Técnica visual de Machine Learning que toma decisiones o realiza predicciones encadenando preguntas sencillas de SÍ o NO en forma de árbol invertido.',
    sinuExample: 'Un árbol que pregunta si llueve fuerte y si subió el río para decidir si activar una alerta de inundación en Córdoba.'
  },
  {
    id: 'nodo_raiz',
    term: 'Nodo Raíz',
    english: 'Root Node',
    emoji: '👑',
    category: 'anatomia',
    categoryLabel: 'Partes del Árbol',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Es la primera caja ubicada en la parte más alta del Árbol de Decisión. Recibe todos los datos iniciales y formula la pregunta más importante.',
    sinuExample: 'La pregunta "¿Está lloviendo fuerte en Córdoba?" ubicada arriba del todo en el Nivel 1 y Nivel 2.'
  },
  {
    id: 'rama',
    term: 'Rama',
    english: 'Branch',
    emoji: '🔀',
    category: 'anatomia',
    categoryLabel: 'Partes del Árbol',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Flecha o conector que sale de un nodo de pregunta y representa el camino que toman los datos según la respuesta obtenida (Rama SÍ o Rama NO).',
    sinuExample: 'Cuando no llueve en Montería, el caso viaja por la Rama NO hacia el estado de calma.'
  },
  {
    id: 'nodo_decision',
    term: 'Nodo de Decisión (Nodo Interno)',
    english: 'Internal / Decision Node',
    emoji: '🔍',
    category: 'anatomia',
    categoryLabel: 'Partes del Árbol',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Caja intermedia situada debajo de la raíz que realiza una pregunta adicional cuando la primera pregunta no basta para tomar una decisión segura.',
    sinuExample: 'Preguntar "¿El Río Sinú ya subió hasta la orilla?" después de saber que sí está lloviendo.'
  },
  {
    id: 'nodo_hoja',
    term: 'Nodo Hoja (Nodo Terminal)',
    english: 'Leaf Node',
    emoji: '🍃',
    category: 'anatomia',
    categoryLabel: 'Partes del Árbol',
    difficulty: 'Básico',
    difficultyOrder: 1,
    definition: 'Caja final ubicada en los extremos inferiores del árbol. Ya no hace más preguntas: entrega la clasificación, predicción o decisión definitiva.',
    sinuExample: 'Las cajas finales "🟢 Río en Calma", "🟡 Vigilancia Preventiva" y "🔴 ¡Alerta de Inundación!".'
  },
  {
    id: 'datos_entrenamiento',
    term: 'Datos de Entrenamiento',
    english: 'Training Dataset',
    emoji: '📋',
    category: 'datos',
    categoryLabel: 'Datos y Condiciones',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Tabla de registros históricos con ejemplos reales del pasado que se le entrega a la computadora para que descubra patrones y aprenda a construir el árbol.',
    sinuExample: 'La bitácora de días pasados en Montería, Cereté, San Pelayo y Lorica con sus milímetros de lluvia y niveles del río.'
  },
  {
    id: 'variable_predictora',
    term: 'Variable o Característica',
    english: 'Feature / Attribute',
    emoji: '🌡️',
    category: 'datos',
    categoryLabel: 'Datos y Condiciones',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Cada una de las pistas o columnas de información que observa el árbol para hacer sus preguntas.',
    sinuExample: 'La "Lluvia caída (mm)" y el "Nivel del Río Sinú (m)" son las variables clave en nuestro simulador.'
  },
  {
    id: 'variable_distractora',
    term: 'Variable Distractora (Ruido)',
    english: 'Irrelevant Feature / Noise',
    emoji: '📅',
    category: 'datos',
    categoryLabel: 'Datos y Condiciones',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Dato que aparece en la tabla pero que no tiene ninguna relación real con el problema que queremos predecir; si se usa en el árbol, confunde al modelo.',
    sinuExample: 'Preguntar "¿Hoy es día martes?" o "¿Hizo brisa suave?" no sirve para saber si el Río Sinú se va a desbordar.'
  },
  {
    id: 'condicion_umbral',
    term: 'Condición de Corte y Umbral',
    english: 'Split Condition & Threshold',
    emoji: '📏',
    category: 'datos',
    categoryLabel: 'Datos y Condiciones',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Regla matemática exacta con un valor límite (umbral) que usa un nodo para dividir los datos en dos caminos: menores o iguales al límite (NO) y mayores al límite (SÍ).',
    sinuExample: 'La regla "¿Lluvia > 40 mm?" tiene como valor umbral 40 milímetros.'
  },
  {
    id: 'machine_learning',
    term: 'Machine Learning (Aprendizaje Automático)',
    english: 'Machine Learning',
    emoji: '🧠',
    category: 'entrenamiento',
    categoryLabel: 'Machine Learning y Pureza',
    difficulty: 'Intermedio',
    difficultyOrder: 2,
    definition: 'Rama de la Inteligencia Computacional que permite a las computadoras aprender patrones directamente a partir de datos sin tener que programar cada regla manualmente.',
    sinuExample: 'El sistema analiza registros climáticos de Córdoba para aprender cuándo ocurren las inundaciones.'
  },
  {
    id: 'pureza_nodo',
    term: 'Pureza de un Nodo',
    english: 'Node Purity',
    emoji: '✨',
    category: 'entrenamiento',
    categoryLabel: 'Machine Learning y Pureza',
    difficulty: 'Avanzado',
    difficultyOrder: 3,
    definition: 'Grado en que los casos que llegan a un nodo pertenecen a una sola categoría sin estar revueltos. Un nodo es 100% puro cuando todos sus casos son del mismo tipo.',
    sinuExample: 'Cuando una pregunta deja todos los días de Calma (🟢🟢🟢🟢) de un lado y todas las Inundaciones (🔴🔴) del otro.'
  },
  {
    id: 'impureza_gini',
    term: 'Índice de Pureza / Impureza Gini',
    english: 'Gini Impurity',
    emoji: '📐',
    category: 'entrenamiento',
    categoryLabel: 'Machine Learning y Pureza',
    difficulty: 'Avanzado',
    difficultyOrder: 3,
    definition: 'Fórmula matemática usada por los Árboles de Decisión (algoritmo CART) para medir qué tan mezcladas están las clases dentro de un nodo y elegir la mejor pregunta.',
    sinuExample: 'En el Simulador del Nivel 4 viste cómo el porcentaje de Pureza Gini subía al 100% al elegir las preguntas correctas.'
  },
  {
    id: 'precision_modelo',
    term: 'Precisión del Modelo',
    english: 'Model Accuracy',
    emoji: '🎯',
    category: 'entrenamiento',
    categoryLabel: 'Machine Learning y Pureza',
    difficulty: 'Avanzado',
    difficultyOrder: 3,
    definition: 'Porcentaje de casos totales en los que la predicción entregada por las hojas del Árbol de Decisión coincide con lo que ocurrió en la realidad.',
    sinuExample: 'Cuando tu árbol acierta 6 de los 6 municipios de Córdoba en el Simulador, alcanza una precisión del 100%.'
  }
]

