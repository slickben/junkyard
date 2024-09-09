<template>
    <nav v-if="user.data.role !== 'collector'" class="w-full fixed bottom-0 inset-x-0 bg-white h-[79px] lg:hidden text-dahboardText">
        <div v-if="user.data.role === 'collector'" class="flex flex-grow p-2">
            <NuxtLink 
                to="/collector"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer  "
            >
                <svgo-dashboard_icon class="text-xl" />
            </NuxtLink>
        </div>
        <div v-else class="flex justify-between flex-grow p-2">
            
            <NuxtLink 
                to="/"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-dashboard_icon class="text-xl" />
            </NuxtLink>
    
            <NuxtLink 
                to="/recyclers"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-recycler_icon class="text-xl" />
            </NuxtLink>
    
            <NuxtLink 
                to="/collection-history"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-collection_icon class="text-xl" />
            </NuxtLink>
    
            <NuxtLink 
                to="/renew"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-renew_icon class="text-xl" />
            </NuxtLink>
    
            <NuxtLink 
                to="/fund"
                v-if="false"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-fund_icon class="text-xl" />
            </NuxtLink>
    
            <NuxtLink 
                to="/account"
                class="font-semibold p-5 w-max h-max hover:bg-opacity-20 transition-all ease-out transform duration-300 cursor-pointer "
            >
                <svgo-myAccount_icon class="text-xl" />
            </NuxtLink>
    
        </div>
        
    </nav>
    </template>
    
    <script lang="ts" setup>
        import { type User } from '@/composables/useTypes'
        import { type Plan } from '@/composables/useTypes'
        const { $toast, $router } = useNuxtApp()
        
        // const { data } = useAuth()
        const { data, token, signOut, getSession } = useAuth()
    
        const user: User = data.value
    </script>
    
    <style>
    .router-link-exact-active {
        border: none !important;
         
    }
    </style>