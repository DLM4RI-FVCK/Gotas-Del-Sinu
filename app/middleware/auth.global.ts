export default defineNuxtRouteMiddleware((to) => {
  const { session } = useUserSession()

  if (!session.value.isLoggedIn && to.path !== '/') {
    return navigateTo('/', { replace: true })
  }

  if (session.value.isLoggedIn && to.path === '/') {
    return navigateTo('/dashboard', { replace: true })
  }
})
