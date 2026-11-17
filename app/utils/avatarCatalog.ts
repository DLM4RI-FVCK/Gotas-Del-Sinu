import type { AvatarConfig } from '~/composables/useUserSession'

export type AvatarCategoryKey =
  | 'personajes'
  | 'ropa'
  | 'cabello'
  | 'accesorios'
  | 'rostro'
  | 'boca'
  | 'piel'
  | 'fondo'

export interface CatalogItem {
  prop: keyof AvatarConfig
  value: string
  label: string
  group: string
  extra?: Partial<AvatarConfig>
}

export interface CatalogSection {
  title: string
  icon: string
  items: CatalogItem[]
}

export const avatarCategories: { key: AvatarCategoryKey; label: string; icon: string }[] = [
  { key: 'personajes', label: 'Personajes', icon: 'mdi-account-star-outline' },
  { key: 'ropa', label: 'Prendas', icon: 'mdi-tshirt-crew-outline' },
  { key: 'cabello', label: 'Cabello y Gorros', icon: 'mdi-hat-fedora' },
  { key: 'accesorios', label: 'Gafas y Barba', icon: 'mdi-glasses' },
  { key: 'rostro', label: 'Ojos y Cejas', icon: 'mdi-eye-outline' },
  { key: 'boca', label: 'Sonrisas', icon: 'mdi-emoticon-happy-outline' },
  { key: 'piel', label: 'Piel', icon: 'mdi-palette-swatch-outline' },
  { key: 'fondo', label: 'Fondo', icon: 'mdi-image-filter-hdr' }
]

export const characterPresets: { name: string; role: string; config: AvatarConfig }[] = [
  {
    name: 'Explorador del Sinú',
    role: 'Aventura',
    config: {
      skinColor: 'edb98a',
      top: 'hat',
      hairColor: '2c1b18',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'sunglasses',
      clothing: 'hoodie',
      clothesColor: '25557c',
      clothingGraphic: 'hola',
      backgroundColor: 'cce5ff'
    }
  },
  {
    name: 'Científica del Agua',
    role: 'Ciencia',
    config: {
      skinColor: 'ffdbb4',
      top: 'straight01',
      hairColor: '4a312c',
      eyebrows: 'raisedExcitedNatural',
      eyes: 'default',
      mouth: 'twinkle',
      facialHair: 'none',
      accessories: 'round',
      clothing: 'blazerAndShirt',
      clothesColor: '65c9ff',
      clothingGraphic: 'diamond',
      backgroundColor: 'd7eaff'
    }
  },
  {
    name: 'Guardián Zenú',
    role: 'Territorio',
    config: {
      skinColor: 'ae5d29',
      top: 'shortCurly',
      hairColor: '2c1b18',
      eyebrows: 'defaultNatural',
      eyes: 'wink',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'none',
      clothing: 'graphicShirt',
      clothesColor: 'a7ffc4',
      clothingGraphic: 'cumbia',
      backgroundColor: 'aff763'
    }
  },
  {
    name: 'Bióloga de Manglar',
    role: 'Fauna',
    config: {
      skinColor: 'd08b5b',
      top: 'curvy',
      hairColor: '2c1b18',
      eyebrows: 'defaultNatural',
      eyes: 'hearts',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'prescription02',
      clothing: 'overall',
      clothesColor: '3c4f5c',
      clothingGraphic: 'deer',
      backgroundColor: 'b2ebf2'
    }
  },
  {
    name: 'Capitán de Chalupa',
    role: 'Río',
    config: {
      skinColor: '614335',
      top: 'winterHat2',
      hairColor: '2c1b18',
      eyebrows: 'upDownNatural',
      eyes: 'squint',
      mouth: 'default',
      facialHair: 'beardLight',
      accessories: 'wayfarers',
      clothing: 'shirtCrewNeck',
      clothesColor: 'ff5c5c',
      clothingGraphic: 'Bat',
      backgroundColor: 'ffecb3'
    }
  },
  {
    name: 'Ingeniera Solar',
    role: 'Energía',
    config: {
      skinColor: 'f8d25c',
      top: 'bun',
      hairColor: 'c93305',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'kurt',
      clothing: 'collarAndSweater',
      clothesColor: 'ffffb1',
      clothingGraphic: 'hola',
      backgroundColor: 'ffd8e4'
    }
  },
  {
    name: 'Defensor del Bosque',
    role: 'Flora',
    config: {
      skinColor: 'd08b5b',
      top: 'dreads01',
      hairColor: '2c1b18',
      eyebrows: 'defaultNatural',
      eyes: 'default',
      mouth: 'tongue',
      facialHair: 'none',
      accessories: 'none',
      clothing: 'graphicShirt',
      clothesColor: '262e33',
      clothingGraphic: 'bear',
      backgroundColor: 'aff763'
    }
  },
  {
    name: 'Aventurera Caribe',
    role: 'Mar',
    config: {
      skinColor: 'edb98a',
      top: 'froBand',
      hairColor: '724133',
      eyebrows: 'raisedExcited',
      eyes: 'winkWacky',
      mouth: 'smile',
      facialHair: 'none',
      accessories: 'sunglasses',
      clothing: 'shirtVNeck',
      clothesColor: 'ffafb9',
      clothingGraphic: 'hola',
      backgroundColor: 'ffecb3'
    }
  },
  {
    name: 'Sabio del Paramillo',
    role: 'Montaña',
    config: {
      skinColor: 'edb98a',
      top: 'shaggyMullet',
      hairColor: 'e8e1e1',
      eyebrows: 'defaultNatural',
      eyes: 'happy',
      mouth: 'smile',
      facialHair: 'beardMedium',
      accessories: 'round',
      clothing: 'blazerAndSweater',
      clothesColor: '25557c',
      clothingGraphic: 'hola',
      backgroundColor: 'cce5ff'
    }
  }
]

export const hairColors = [
  { label: 'Negro', value: '2c1b18' },
  { label: 'Castaño oscuro', value: '4a312c' },
  { label: 'Castaño', value: '724133' },
  { label: 'Rubio', value: 'b58143' },
  { label: 'Rubio claro', value: 'd6b370' },
  { label: 'Pelirrojo', value: 'c93305' },
  { label: 'Borgoña', value: 'a55728' },
  { label: 'Rosa pastel', value: 'f59797' },
  { label: 'Platino', value: 'e8e1e1' }
]

export const clothesColors = [
  { label: 'Azul Sinú', value: '25557c' },
  { label: 'Celeste Agua', value: '65c9ff' },
  { label: 'Azul Marino', value: '3c4f5c' },
  { label: 'Verde Menta', value: 'a7ffc4' },
  { label: 'Amarillo Sol', value: 'ffffb1' },
  { label: 'Naranja', value: 'ffdeb5' },
  { label: 'Rojo Coral', value: 'ff5c5c' },
  { label: 'Rojo Intenso', value: 'ff488e' },
  { label: 'Rosa Pastel', value: 'ffafb9' },
  { label: 'Morado', value: 'b1e2ff' },
  { label: 'Gris Oscuro', value: '262e33' },
  { label: 'Blanco/Gris', value: 'e6e6e6' }
]

export const sectionsByCategory: Record<Exclude<AvatarCategoryKey, 'personajes'>, CatalogSection[]> = {
  ropa: [
    {
      title: 'Prendas Casuales y de Aventura',
      icon: 'mdi-tshirt-crew-outline',
      items: [
        { prop: 'clothing', value: 'hoodie', label: 'Sudadera Hoodie', group: 'Casual' },
        { prop: 'clothing', value: 'shirtCrewNeck', label: 'Camiseta Clásica', group: 'Casual' },
        { prop: 'clothing', value: 'shirtVNeck', label: 'Cuello en V', group: 'Casual' },
        { prop: 'clothing', value: 'shirtScoopNeck', label: 'Cuello Amplio', group: 'Casual' },
        { prop: 'clothing', value: 'overall', label: 'Jardinera Explorer', group: 'Aventura' }
      ]
    },
    {
      title: 'Camisetas Estampadas',
      icon: 'mdi-star-circle-outline',
      items: [
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Cumbia', group: 'Estampado', extra: { clothingGraphic: 'cumbia' } },
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Oso', group: 'Estampado', extra: { clothingGraphic: 'bear' } },
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Venado', group: 'Estampado', extra: { clothingGraphic: 'deer' } },
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Diamante', group: 'Estampado', extra: { clothingGraphic: 'diamond' } },
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Hola', group: 'Estampado', extra: { clothingGraphic: 'hola' } },
        { prop: 'clothing', value: 'graphicShirt', label: 'Estampado Pizza', group: 'Estampado', extra: { clothingGraphic: 'pizza' } }
      ]
    },
    {
      title: 'Trajes y Ropa Formal',
      icon: 'mdi-tie',
      items: [
        { prop: 'clothing', value: 'collarAndSweater', label: 'Suéter con Cuello', group: 'Formal' },
        { prop: 'clothing', value: 'blazerAndShirt', label: 'Blazer y Camisa', group: 'Formal' },
        { prop: 'clothing', value: 'blazerAndSweater', label: 'Blazer y Suéter', group: 'Formal' }
      ]
    }
  ],
  cabello: [
    {
      title: 'Peinados y Cortes de Cabello',
      icon: 'mdi-content-cut',
      items: [
        { prop: 'top', value: 'none', label: 'Sin Cabello', group: 'Quitar' },
        { prop: 'top', value: 'shortFlat', label: 'Corto Liso', group: 'Corto' },
        { prop: 'top', value: 'shortCurly', label: 'Corto Rizado', group: 'Corto' },
        { prop: 'top', value: 'shortWaved', label: 'Corto Ondulado', group: 'Corto' },
        { prop: 'top', value: 'shortRound', label: 'Corto Redondo', group: 'Corto' },
        { prop: 'top', value: 'theCaesar', label: 'Estilo César', group: 'Corto' },
        { prop: 'top', value: 'shaggy', label: 'Despeinado', group: 'Medio' },
        { prop: 'top', value: 'shaggyMullet', label: 'Mullet', group: 'Medio' },
        { prop: 'top', value: 'frizzle', label: 'Crespo', group: 'Medio' },
        { prop: 'top', value: 'bob', label: 'Corte Bob', group: 'Medio' },
        { prop: 'top', value: 'longButNotTooLong', label: 'Media Melena', group: 'Medio' },
        { prop: 'top', value: 'straight01', label: 'Largo Liso', group: 'Largo' },
        { prop: 'top', value: 'straight02', label: 'Largo Suave', group: 'Largo' },
        { prop: 'top', value: 'straightAndStrand', label: 'Largo con Mechón', group: 'Largo' },
        { prop: 'top', value: 'curvy', label: 'Largo Ondulado', group: 'Largo' },
        { prop: 'top', value: 'bigHair', label: 'Volumen Grande', group: 'Largo' },
        { prop: 'top', value: 'miaWallace', label: 'Flequillo', group: 'Largo' },
        { prop: 'top', value: 'fro', label: 'Afro Natural', group: 'Afro' },
        { prop: 'top', value: 'froBand', label: 'Afro con Balaca', group: 'Afro' },
        { prop: 'top', value: 'bun', label: 'Moño Alto', group: 'Recogido' },
        { prop: 'top', value: 'dreads01', label: 'Rastas', group: 'Rastas' }
      ]
    },
    {
      title: 'Gorras, Gorros y Sombreros',
      icon: 'mdi-hat-fedora',
      items: [
        { prop: 'top', value: 'none', label: 'Sin Sombrero', group: 'Quitar' },
        { prop: 'top', value: 'hat', label: 'Gorra Explorador', group: 'Gorra' },
        { prop: 'top', value: 'winterHat1', label: 'Gorro de Lana', group: 'Gorro' },
        { prop: 'top', value: 'winterHat2', label: 'Gorro Montaña', group: 'Gorro' },
        { prop: 'top', value: 'winterHat3', label: 'Gorro Pompón', group: 'Gorro' },
        { prop: 'top', value: 'turban', label: 'Turbante', group: 'Sombrero' },
        { prop: 'top', value: 'hijab', label: 'Hijab', group: 'Pañoleta' }
      ]
    }
  ],
  accesorios: [
    {
      title: 'Gafas y Lentes',
      icon: 'mdi-glasses',
      items: [
        { prop: 'accessories', value: 'none', label: 'Sin Gafas', group: 'Quitar' },
        { prop: 'accessories', value: 'round', label: 'Gafas Redondas', group: 'Gafas' },
        { prop: 'accessories', value: 'sunglasses', label: 'Gafas de Sol', group: 'Gafas' },
        { prop: 'accessories', value: 'wayfarers', label: 'Wayfarers', group: 'Gafas' },
        { prop: 'accessories', value: 'prescription01', label: 'Montura Clásica', group: 'Gafas' },
        { prop: 'accessories', value: 'prescription02', label: 'Montura Moderna', group: 'Gafas' },
        { prop: 'accessories', value: 'kurt', label: 'Gafas Retro', group: 'Gafas' },
        { prop: 'accessories', value: 'eyepatch', label: 'Parche Pirata', group: 'Accesorio' }
      ]
    },
    {
      title: 'Barba y Bigote',
      icon: 'mdi-mustache',
      items: [
        { prop: 'facialHair', value: 'none', label: 'Sin Barba', group: 'Quitar' },
        { prop: 'facialHair', value: 'beardLight', label: 'Barba Suave', group: 'Barba' },
        { prop: 'facialHair', value: 'beardMedium', label: 'Barba Media', group: 'Barba' },
        { prop: 'facialHair', value: 'beardMajestic', label: 'Barba Larga', group: 'Barba' },
        { prop: 'facialHair', value: 'moustacheFancy', label: 'Bigote Elegante', group: 'Bigote' },
        { prop: 'facialHair', value: 'moustacheMagnum', label: 'Bigote Clásico', group: 'Bigote' }
      ]
    }
  ],
  rostro: [
    {
      title: 'Expresión de Ojos y Mirada',
      icon: 'mdi-eye-outline',
      items: [
        { prop: 'eyes', value: 'happy', label: 'Ojos Felices', group: 'Ojos' },
        { prop: 'eyes', value: 'default', label: 'Mirada Normal', group: 'Ojos' },
        { prop: 'eyes', value: 'wink', label: 'Guiño', group: 'Ojos' },
        { prop: 'eyes', value: 'winkWacky', label: 'Guiño Divertido', group: 'Ojos' },
        { prop: 'eyes', value: 'hearts', label: 'Corazones', group: 'Ojos' },
        { prop: 'eyes', value: 'surprised', label: 'Sorprendido', group: 'Ojos' },
        { prop: 'eyes', value: 'side', label: 'Mirada Lateral', group: 'Ojos' },
        { prop: 'eyes', value: 'squint', label: 'Sonriente', group: 'Ojos' },
        { prop: 'eyes', value: 'closed', label: 'Ojos Cerrados', group: 'Ojos' },
        { prop: 'eyes', value: 'eyeRoll', label: 'Pensativo', group: 'Ojos' }
      ]
    },
    {
      title: 'Estilo de Cejas',
      icon: 'mdi-emoticon-neutral-outline',
      items: [
        { prop: 'eyebrows', value: 'defaultNatural', label: 'Cejas Naturales', group: 'Cejas' },
        { prop: 'eyebrows', value: 'raisedExcitedNatural', label: 'Entusiasmadas', group: 'Cejas' },
        { prop: 'eyebrows', value: 'upDownNatural', label: 'Ceja Curiosa', group: 'Cejas' },
        { prop: 'eyebrows', value: 'flatNatural', label: 'Cejas Serenas', group: 'Cejas' },
        { prop: 'eyebrows', value: 'frownNatural', label: 'Ceño Decidido', group: 'Cejas' },
        { prop: 'eyebrows', value: 'sadConcernedNatural', label: 'Preocupadas', group: 'Cejas' }
      ]
    }
  ],
  boca: [
    {
      title: 'Sonrisas y Expresiones de Boca',
      icon: 'mdi-emoticon-happy-outline',
      items: [
        { prop: 'mouth', value: 'smile', label: 'Sonrisa Grande', group: 'Boca' },
        { prop: 'mouth', value: 'default', label: 'Sonrisa Suave', group: 'Boca' },
        { prop: 'mouth', value: 'twinkle', label: 'Sonrisa Pícara', group: 'Boca' },
        { prop: 'mouth', value: 'tongue', label: 'Sacando Lengua', group: 'Boca' },
        { prop: 'mouth', value: 'disbelief', label: 'Asombro', group: 'Boca' },
        { prop: 'mouth', value: 'serious', label: 'Serio', group: 'Boca' },
        { prop: 'mouth', value: 'eating', label: 'Mejillas Llenas', group: 'Boca' },
        { prop: 'mouth', value: 'grimace', label: 'Mueca', group: 'Boca' },
        { prop: 'mouth', value: 'screamOpen', label: '¡Sorpresa!', group: 'Boca' },
        { prop: 'mouth', value: 'concerned', label: 'Pensativo', group: 'Boca' }
      ]
    }
  ],
  piel: [
    {
      title: 'Tonos de Piel',
      icon: 'mdi-palette-swatch-outline',
      items: [
        { prop: 'skinColor', value: 'ffdbb4', label: 'Piel Clara', group: 'Piel' },
        { prop: 'skinColor', value: 'edb98a', label: 'Trigueño Claro', group: 'Piel' },
        { prop: 'skinColor', value: 'f8d25c', label: 'Cálido Dorado', group: 'Piel' },
        { prop: 'skinColor', value: 'fd9841', label: 'Bronceado Cálido', group: 'Piel' },
        { prop: 'skinColor', value: 'd08b5b', label: 'Trigueño Medio', group: 'Piel' },
        { prop: 'skinColor', value: 'ae5d29', label: 'Moreno', group: 'Piel' },
        { prop: 'skinColor', value: '614335', label: 'Piel Oscura', group: 'Piel' }
      ]
    }
  ],
  fondo: [
    {
      title: 'Ambientes y Colores de Escenario',
      icon: 'mdi-image-filter-hdr',
      items: [
        { prop: 'backgroundColor', value: 'cce5ff', label: 'Azul Río Sinú', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'b2ebf2', label: 'Turquesa Ciénaga', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'aff763', label: 'Verde Sabana', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'c8e6c9', label: 'Bosque Galería', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'ffecb3', label: 'Sol del Caribe', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'ffe0b2', label: 'Atardecer Sinú', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'ffd8e4', label: 'Coral Cayena', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'e1bee7', label: 'Lavanda', group: 'Fondo' },
        { prop: 'backgroundColor', value: 'd7eaff', label: 'Cielo Despejado', group: 'Fondo' }
      ]
    }
  ]
}

