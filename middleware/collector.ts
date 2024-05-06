export default defineNuxtRouteMiddleware((to, from) => {
    const { data, getSession } = useAuth()
    getSession()
    // console.log(data.value)
    // alert('here ben')
    if (!data.value.data.businessInfo.name) {
        return navigateTo('/welcome')
    }else if(data.value.data.businessInfo.name && !data.value.data.isSubscribed) {
        return navigateTo('/welcome/subscribe')
    }else if(to.path === '/welcome/setup' && data.value.data.businessInfo.name) {
        return navigateTo('/welcome/subscribe')
    }
})