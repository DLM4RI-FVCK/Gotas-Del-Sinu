export type NivelEducativo = 'Primaria' | 'Secundaria' | 'Universidad'
export type VerbosidadIA = 'corto' | 'medio' | 'detallado'
export type SocratidadIA = 'baja' | 'media' | 'alta'

export interface AvatarConfig {
  skinColor: string
  top: string
  hairColor: string
  eyebrows: string
  eyes: string
  mouth: string
  facialHair: string
  accessories: string
  clothing: string
  clothesColor: string
  clothingGraphic: string
  backgroundColor: string
}

export interface ZenuitoConfig {
  nickname: string
  baseColor: string
  face: string
  top: string
  sides: string
  eyes: string
  mouth: string
  texture: string
  backgroundColor: string
  // Preferencias de comportamiento socrático e IA
  verbosidad?: VerbosidadIA
  socratidad?: SocratidadIA
  autoOpenTips?: boolean
}

export interface UserSession {
  isLoggedIn: boolean
  nombre: string
  edad: number | null
  nivelEducativo: NivelEducativo | ''
  gradoOSemestre: string
  level: number
  unlockedLevel: number
  xp: number
  maxXp: number
  intro5ESeen: boolean
  avatar: AvatarConfig
  zenuito: ZenuitoConfig
}

const STORAGE_KEY = 'gotas_del_sinu_session_v2'

export const defaultAvatarConfig = (): AvatarConfig => ({
  skinColor: 'edb98a',
  top: 'shortFlat',
  hairColor: '2c1b18',
  eyebrows: 'defaultNatural',
  eyes: 'happy',
  mouth: 'smile',
  facialHair: 'none',
  accessories: 'none',
  clothing: 'graphicShirt',
  clothesColor: '25557c',
  clothingGraphic: 'hola',
  backgroundColor: 'cce5ff'
})

export const defaultZenuitoConfig = (): ZenuitoConfig => ({
  nickname: 'Zenuito',
  baseColor: '00acc1',
  face: 'round01',
  top: 'glowingBulb01',
  sides: 'antenna01',
  eyes: 'eva',
  mouth: 'smile01',
  texture: 'none',
  backgroundColor: 'b2ebf2',
  verbosidad: 'medio',
  socratidad: 'alta',
  autoOpenTips: true
})

export const buildAvatarUrl = (a: AvatarConfig) => {
  const params = new URLSearchParams({
    skinColor: a.skinColor,
    hairColor: a.hairColor,
    eyebrows: a.eyebrows || 'defaultNatural',
    eyes: a.eyes,
    mouth: a.mouth,
    clothing: a.clothing,
    clothesColor: a.clothesColor,
    clothingGraphic: (a.clothingGraphic || 'hola').toLowerCase(),
    backgroundColor: a.backgroundColor,
    radius: '20'
  })

  if (a.top && a.top !== 'none') {
    const top = a.top === 'winterHat2'
      ? 'winterHat02'
      : a.top === 'winterHat3'
        ? 'winterHat03'
        : a.top
    params.set('top', top)
    params.set('topProbability', '100')
  } else {
    params.set('topProbability', '0')
  }

  if (a.accessories && a.accessories !== 'none') {
    params.set('accessories', a.accessories)
    params.set('accessoriesProbability', '100')
  } else {
    params.set('accessoriesProbability', '0')
  }

  if (a.facialHair && a.facialHair !== 'none') {
    params.set('facialHair', a.facialHair)
    params.set('facialHairProbability', '100')
    params.set('facialHairColor', a.hairColor)
  } else {
    params.set('facialHairProbability', '0')
  }

  return `https://api.dicebear.com/9.x/avataaars/svg?${params.toString()}`
}

export const buildZenuitoUrl = (z: ZenuitoConfig) => {
  const params = new URLSearchParams({
    baseColor: z.baseColor || '00acc1',
    face: z.face || 'round01',
    eyes: z.eyes || 'eva',
    backgroundColor: z.backgroundColor || 'b2ebf2',
    radius: '20'
  })

  if (z.top && z.top !== 'none') {
    params.set('top', z.top)
    params.set('topProbability', '100')
  } else {
    params.set('topProbability', '0')
  }

  if (z.sides && z.sides !== 'none') {
    params.set('sides', z.sides)
    params.set('sidesProbability', '100')
  } else {
    params.set('sidesProbability', '0')
  }

  if (z.mouth && z.mouth !== 'none') {
    params.set('mouth', z.mouth)
    params.set('mouthProbability', '100')
  } else {
    params.set('mouthProbability', '0')
  }

  if (z.texture && z.texture !== 'none') {
    params.set('texture', z.texture)
    params.set('textureProbability', '100')
  } else {
    params.set('textureProbability', '0')
  }

  return `https://api.dicebear.com/9.x/bottts/svg?${params.toString()}`
}

export const useUserSession = () => {
  const sessionCookie = useCookie<Partial<UserSession> | null>(STORAGE_KEY, {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax'
  })

  const session = useState<UserSession>('user-session', () => {
    const base = defaultSession()
    const fromCookie = sessionCookie.value
    if (fromCookie && fromCookie.isLoggedIn && fromCookie.nombre) {
      return {
        ...base,
        ...fromCookie,
        level: fromCookie.level ?? 1,
        unlockedLevel: fromCookie.unlockedLevel ?? 1,
        xp: fromCookie.xp ?? 0,
        maxXp: fromCookie.maxXp ?? 100,
        intro5ESeen: fromCookie.intro5ESeen ?? false,
        avatar: {
          ...defaultAvatarConfig(),
          ...(fromCookie.avatar || {})
        },
        zenuito: {
          ...defaultZenuitoConfig(),
          ...(fromCookie.zenuito || {})
        }
      }
    }
    return base
  })

  function defaultSession(): UserSession {
    return {
      isLoggedIn: false,
      nombre: '',
      edad: null,
      nivelEducativo: '',
      gradoOSemestre: '',
      level: 1,
      unlockedLevel: 1,
      xp: 0,
      maxXp: 100,
      intro5ESeen: false,
      avatar: defaultAvatarConfig(),
      zenuito: defaultZenuitoConfig()
    }
  }

  const persist = () => {
    sessionCookie.value = session.value
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session.value))
    }
  }

  if (import.meta.client && !session.value.isLoggedIn) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<UserSession>
        if (parsed.isLoggedIn && parsed.nombre) {
          session.value = {
            ...defaultSession(),
            ...parsed,
            level: parsed.level ?? 1,
            unlockedLevel: parsed.unlockedLevel ?? 1,
            xp: parsed.xp ?? 0,
            maxXp: parsed.maxXp ?? 100,
            intro5ESeen: parsed.intro5ESeen ?? false,
            avatar: {
              ...defaultAvatarConfig(),
              ...(parsed.avatar || {})
            },
            zenuito: {
              ...defaultZenuitoConfig(),
              ...(parsed.zenuito || {})
            }
          }
          sessionCookie.value = session.value
        }
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }

  const login = (data: Pick<UserSession, 'nombre' | 'edad' | 'nivelEducativo' | 'gradoOSemestre'>) => {
    session.value = {
      ...defaultSession(),
      isLoggedIn: true,
      nombre: data.nombre.trim(),
      edad: data.edad,
      nivelEducativo: data.nivelEducativo,
      gradoOSemestre: data.gradoOSemestre.trim()
    }
    persist()
  }

  const updateAvatar = (patch: Partial<AvatarConfig>) => {
    session.value.avatar = {
      ...session.value.avatar,
      ...patch
    }
    persist()
  }

  const updateZenuito = (patch: Partial<ZenuitoConfig>) => {
    session.value.zenuito = {
      ...session.value.zenuito,
      ...patch
    }
    persist()
  }

  const completeLevel = (completedLevel: number) => {
    const nextUnlocked = Math.min(5, Math.max(session.value.unlockedLevel || 1, completedLevel + 1))
    session.value.unlockedLevel = nextUnlocked
    session.value.level = nextUnlocked
    session.value.xp = Math.min(100, Math.max(session.value.xp || 0, completedLevel * 20))
    persist()
  }

  const unlockAllLevels = () => {
    session.value.unlockedLevel = 5
    persist()
  }

  const resetProgress = () => {
    session.value.level = 1
    session.value.unlockedLevel = 1
    session.value.xp = 0
    session.value.intro5ESeen = false
    persist()
  }

  const avatarUrl = computed(() => buildAvatarUrl(session.value.avatar || defaultAvatarConfig()))
  const zenuitoUrl = computed(() => buildZenuitoUrl(session.value.zenuito || defaultZenuitoConfig()))

  const logout = () => {
    session.value = defaultSession()
    sessionCookie.value = null
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return {
    session,
    avatarUrl,
    zenuitoUrl,
    login,
    updateAvatar,
    updateZenuito,
    completeLevel,
    unlockAllLevels,
    resetProgress,
    logout
  }
}
