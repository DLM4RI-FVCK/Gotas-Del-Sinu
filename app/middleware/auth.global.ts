export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { session } = useUserSession()

  if (!session.value.isLoggedIn && to.path !== '/') {
    return navigateTo('/')
  }

  if (session.value.isLoggedIn && to.path === '/') {
    return navigateTo('/dashboard')
  }
})
