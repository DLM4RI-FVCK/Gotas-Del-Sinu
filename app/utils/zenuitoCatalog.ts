import { defaultZenuitoConfig, type ZenuitoConfig } from '~/composables/useUserSession'

export type ZenuitoCategoryKey =
  | 'logica'
  | 'modelos'
  | 'antenas'
  | 'visor'
  | 'chasis'
  | 'color'
  | 'fondo'

export interface ZenuitoCatalogItem {
  prop: keyof ZenuitoConfig
  value: string
  label: string
  group: string
}

export interface ZenuitoSection {
  title: string
  icon: string
  items: ZenuitoCatalogItem[]
}

export const zenuitoCategories: { key: ZenuitoCategoryKey; label: string; icon: string }[] = [
  { key: 'logica', label: 'Configura tu Zenuito', icon: 'mdi-brain' },
  { key: 'modelos', label: 'Modelos', icon: 'mdi-robot-outline' },
  { key: 'antenas', label: 'Antenas y Sensores', icon: 'mdi-access-point' },
  { key: 'visor', label: 'Visor y Expresión', icon: 'mdi-eye-circle-outline' },
  { key: 'chasis', label: 'Cabeza y Textura', icon: 'mdi-cpu-64-bit' },
  { key: 'color', label: 'Pintura', icon: 'mdi-palette-swatch-outline' },
  { key: 'fondo', label: 'Fondo', icon: 'mdi-image-filter-hdr' }
]

export const zenuitoPresets: { name: string; role: string; config: ZenuitoConfig }[] = [
  {
    name: 'Zenuito Clásico',
    role: 'Guía Hídrico',
    config: defaultZenuitoConfig()
  },
  {
    name: 'Oráculo del Sinú',
    role: 'Sabio Socrático',
    config: {
      nickname: 'Zenuito',
      baseColor: '1e88e5',
      face: 'round02',
      top: 'radar',
      sides: 'cables01',
      eyes: 'glow',
      mouth: 'diagram',
      texture: 'circuits',
      backgroundColor: 'cce5ff'
    }
  },
  {
    name: 'Bot Guardabosques',
    role: 'Biodiversidad',
    config: {
      nickname: 'Zenuito',
      baseColor: '43a047',
      face: 'square01',
      top: 'bulb01',
      sides: 'round',
      eyes: 'happy',
      mouth: 'smile02',
      texture: 'camo01',
      backgroundColor: 'aff763'
    }
  },
  {
    name: 'Centinela Solar',
    role: 'Energía',
    config: {
      nickname: 'Zenuito',
      baseColor: 'fdd835',
      face: 'round01',
      top: 'lights',
      sides: 'antenna02',
      eyes: 'roundFrame01',
      mouth: 'grill03',
      texture: 'dots',
      backgroundColor: 'ffecb3'
    }
  },
  {
    name: 'Explorador Submarino',
    role: 'Ciénagas',
    config: {
      nickname: 'Zenuito',
      baseColor: '00897b',
      face: 'round02',
      top: 'glowingBulb02',
      sides: 'square',
      eyes: 'sensor',
      mouth: 'square01',
      texture: 'none',
      backgroundColor: 'b2ebf2'
    }
  },
  {
    name: 'Sonda Paramillo',
    role: 'Alta Montaña',
    config: {
      nickname: 'Zenuito',
      baseColor: '8e24aa',
      face: 'square02',
      top: 'pyramid',
      sides: 'cables02',
      eyes: 'robocop',
      mouth: 'grill01',
      texture: 'circuits',
      backgroundColor: 'e1bee7'
    }
  }
]

export const zenuitoSectionsByCategory: Record<Exclude<ZenuitoCategoryKey, 'logica' | 'modelos'>, ZenuitoSection[]> = {
  antenas: [
    {
      title: 'Antena Superior y Radares',
      icon: 'mdi-radar',
      items: [
        { prop: 'top', value: 'none', label: 'Sin Antena Superior', group: 'Quitar' },
        { prop: 'top', value: 'glowingBulb01', label: 'Foco Luminoso', group: 'Antena' },
        { prop: 'top', value: 'glowingBulb02', label: 'Baliza Doble', group: 'Antena' },
        { prop: 'top', value: 'antenna', label: 'Antena Clásica', group: 'Antena' },
        { prop: 'top', value: 'antennaCrooked', label: 'Antena Zigzag', group: 'Antena' },
        { prop: 'top', value: 'radar', label: 'Radar Socrático', group: 'Radar' },
        { prop: 'top', value: 'bulb01', label: 'Bombilla Idea', group: 'Luz' },
        { prop: 'top', value: 'lights', label: 'Luces de Señal', group: 'Luz' },
        { prop: 'top', value: 'pyramid', label: 'Núcleo Pirámide', group: 'Núcleo' },
        { prop: 'top', value: 'horns', label: 'Sensores Curvos', group: 'Sensor' }
      ]
    },
    {
      title: 'Sensores y Módulos Laterales',
      icon: 'mdi-access-point',
      items: [
        { prop: 'sides', value: 'none', label: 'Sin Sensores Laterales', group: 'Quitar' },
        { prop: 'sides', value: 'antenna01', label: 'Receptores Finos', group: 'Sensor' },
        { prop: 'sides', value: 'antenna02', label: 'Antenas Dobles', group: 'Sensor' },
        { prop: 'sides', value: 'cables01', label: 'Cables de Datos', group: 'Cables' },
        { prop: 'sides', value: 'cables02', label: 'Conductos Energía', group: 'Cables' },
        { prop: 'sides', value: 'round', label: 'Auriculares Redondos', group: 'Audio' },
        { prop: 'sides', value: 'square', label: 'Módulos Cuadrados', group: 'Módulo' },
        { prop: 'sides', value: 'squareAssymetric', label: 'Escáner Asimétrico', group: 'Módulo' }
      ]
    }
  ],
  visor: [
    {
      title: 'Visor Óptico y Mirada',
      icon: 'mdi-eye-circle-outline',
      items: [
        { prop: 'eyes', value: 'eva', label: 'Visor Eva', group: 'Visor' },
        { prop: 'eyes', value: 'happy', label: 'Ojos Felices', group: 'Visor' },
        { prop: 'eyes', value: 'glow', label: 'Brillo Láser', group: 'Visor' },
        { prop: 'eyes', value: 'hearts', label: 'Corazones', group: 'Visor' },
        { prop: 'eyes', value: 'robocop', label: 'Franja Cibernética', group: 'Visor' },
        { prop: 'eyes', value: 'sensor', label: 'Escáner Digital', group: 'Visor' },
        { prop: 'eyes', value: 'roundFrame01', label: 'Lentes Ópticos', group: 'Visor' },
        { prop: 'eyes', value: 'roundFrame02', label: 'Binocular', group: 'Visor' },
        { prop: 'eyes', value: 'round', label: 'Ojos Redondos', group: 'Visor' },
        { prop: 'eyes', value: 'shade01', label: 'Gafas de Sol IA', group: 'Visor' }
      ]
    },
    {
      title: 'Pantalla Vocal y Sonrisa',
      icon: 'mdi-waveform',
      items: [
        { prop: 'mouth', value: 'none', label: 'Sin Boca', group: 'Quitar' },
        { prop: 'mouth', value: 'smile01', label: 'Sonrisa Amigable', group: 'Voz' },
        { prop: 'mouth', value: 'smile02', label: 'Sonrisa Amplia', group: 'Voz' },
        { prop: 'mouth', value: 'diagram', label: 'Onda de Voz', group: 'Voz' },
        { prop: 'mouth', value: 'grill01', label: 'Altavoz Clásico', group: 'Voz' },
        { prop: 'mouth', value: 'grill02', label: 'Altavoz Fino', group: 'Voz' },
        { prop: 'mouth', value: 'grill03', label: 'Rejilla luminosa', group: 'Voz' },
        { prop: 'mouth', value: 'square01', label: 'Módulo Vocal', group: 'Voz' },
        { prop: 'mouth', value: 'bite', label: 'Expresión Curiosa', group: 'Voz' }
      ]
    }
  ],
  chasis: [
    {
      title: 'Forma del Chasis Principal',
      icon: 'mdi-cube-outline',
      items: [
        { prop: 'face', value: 'round01', label: 'Cápsula Suave', group: 'Chasis' },
        { prop: 'face', value: 'round02', label: 'Esfera Compacta', group: 'Chasis' },
        { prop: 'face', value: 'square01', label: 'Cubo Clásico', group: 'Chasis' },
        { prop: 'face', value: 'square02', label: 'Chasis Blindado', group: 'Chasis' },
        { prop: 'face', value: 'square03', label: 'Módulo Ancho', group: 'Chasis' },
        { prop: 'face', value: 'square04', label: 'Hexágono Tech', group: 'Chasis' }
      ]
    },
    {
      title: 'Acabado y Textura de Superficie',
      icon: 'mdi-dots-grid',
      items: [
        { prop: 'texture', value: 'none', label: 'Sin Textura (Liso)', group: 'Quitar' },
        { prop: 'texture', value: 'circuits', label: 'Circuitos IA', group: 'Textura' },
        { prop: 'texture', value: 'dots', label: 'Matriz de Puntos', group: 'Textura' },
        { prop: 'texture', value: 'camo01', label: 'Camuflaje Selva', group: 'Textura' },
        { prop: 'texture', value: 'camo02', label: 'Camuflaje Río', group: 'Textura' }
      ]
    }
  ],
  color: [
    {
      title: 'Color de Pintura del Chasis',
      icon: 'mdi-palette-swatch-outline',
      items: [
        { prop: 'baseColor', value: '00acc1', label: 'Cian Río Sinú', group: 'Color' },
        { prop: 'baseColor', value: '1e88e5', label: 'Azul Profundo', group: 'Color' },
        { prop: 'baseColor', value: '00897b', label: 'Verde Manglar', group: 'Color' },
        { prop: 'baseColor', value: '43a047', label: 'Verde Naturaleza', group: 'Color' },
        { prop: 'baseColor', value: 'fdd835', label: 'Oro Zenú', group: 'Color' },
        { prop: 'baseColor', value: 'fb8c00', label: 'Naranja Sol', group: 'Color' },
        { prop: 'baseColor', value: 'e53935', label: 'Rojo Coral', group: 'Color' },
        { prop: 'baseColor', value: '8e24aa', label: 'Violeta Cósmico', group: 'Color' },
        { prop: 'baseColor', value: '546e7a', label: 'Titanio Metálico', group: 'Color' }
      ]
    }
  ],
  fondo: [
    {
      title: 'Color de Fondo de Zenuito',
      icon: 'mdi-image-filter-hdr',
      items: [
        { prop: 'backgroundColor', value: 'b2ebf2', label: 'Brillo Turquesa', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'cce5ff', label: 'Azul Río', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'aff763', label: 'Verde Sabana', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'ffecb3', label: 'Sol Caribe', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'ffd8e4', label: 'Atardecer', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'e1bee7', label: 'Holograma Violeta', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'd7eaff', label: 'Cielo Claro', group: 'Fondo' }
      ]
    }
  ]
}

