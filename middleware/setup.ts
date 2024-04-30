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
    
    
    // else if(to.path === '/welcome/subscribe' && data.value.data.isSubscribed > 1) {
    //     return navigateTo('/')
    // }

    // if(to.path === '/welcome') {
    //     if (data.value.data.businessInfo.name ) {
    //         return navigateTo('/')
    //     }
    // }
    // // In a real app you would probably not redirect every route to `/`
    // // however it is important to check `to.path` before redirecting or you
    // // might get an infinite redirect loop
    // if (to.path !== '/') {
    //   return navigateTo('/')
    // }
})