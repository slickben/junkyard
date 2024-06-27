import { type User } from '@/composables/useTypes'


export default defineNuxtRouteMiddleware((to, from) => {
    const { data, getSession } = useAuth()
    // getSession()

    const user: User = data.value
    
    // alert(user)
    console.log(user)
    if(user.data.role === 'collector') {
        return navigateTo('/collectors')
    }
    if(user.data.role === 'super') {
        return navigateTo('/super-admin')
    }
    if (!user.data.businessInfo.name && to.path === '/') {
        // console.log(data.value)
        return navigateTo('/welcome')
    }else if(user.data.businessInfo.name && !user.data.isSubscribed) {
        // console.log(data.value)
        return navigateTo('/welcome/subscribe')
    }else if(to.path === '/welcome/setup' && user.data.businessInfo.name) {
        // console.log(data.value)
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