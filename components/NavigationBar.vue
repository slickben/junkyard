<template>
<nav class="py-7 h-full 2xl:w-[19.375rem] xl:w-80 hidden md:flex flex-col shadow-md flex-none bg-white sticky top-0">
    <div class="hidden md:flex flex-col items-center space-y-2 flex-none">
        <!-- <img
            :src="data.data.avatar ? data.data.avatar : '/img/idPassport.png'"
            alt=""
            class="rounded-full mb-4 w-24"
        /> -->
        <img v-if="user.data.avatar" :src="user.data.avatar" alt="" class="" />
        <vue-avatar v-else :username="`${ user.data.role === 'collector' ? user.data.name : user.data.businessInfo.name}`" :size="100" />
        <h2 class="text-xl font-bold">
            {{ user.data.role === 'collector' ? user.data.name : user.data.businessInfo.name }}
        </h2>
        <p v-if="user.data.role !== 'collector'" class="font-semibold">Avail Bal: {{ useCurrencyFormat(user.data.balance) }}</p>
        <p class="font-normal">Basic User</p>
    </div>
    <div v-if="user.data.role === 'collector'" class="hidden md:flex flex-col 2xl:gap-3 mt-4 flex-grow">
        
        <NuxtLink 
            to="/collectors"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-dashboard_icon class="text-xl" />
            <p>Dashboard</p>
        </NuxtLink>
        
    </div>
    <div v-else class="hidden md:flex flex-col 2xl:gap-3 mt-4 flex-grow">
        
        <NuxtLink 
            to="/"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-dashboard_icon class="text-xl" />
            <p>Dashboard</p>
        </NuxtLink>

        <NuxtLink 
            to="/recyclers"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-recycler_icon class="text-xl" />
            <p>Recycler Units</p>
        </NuxtLink>

        <NuxtLink 
            to="/collection-history"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-collection_icon class="text-xl" />
            <p>Collection History</p>
        </NuxtLink>

        <NuxtLink 
            to="/renew"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-renew_icon class="text-xl" />
            <p>Renew Subscription</p>
        </NuxtLink>

        <NuxtLink 
            to="/fund"
            v-if="false"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-fund_icon class="text-xl" />
            <p>Fund Account</p>
        </NuxtLink>

        <NuxtLink 
            to="/account"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-myAccount_icon class="text-xl" />
            <p>My Account</p>
        </NuxtLink>

        <NuxtLink 
            to="/support"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-12 text-dahboardText hover:text-secondary"
        >
            <svgo-helpSupport_icon class="text-xl" />
            <p>Help & Support</p>
        </NuxtLink>
    </div>
    <NuxtLink
        v-if="user.data.role === 'collector'"
        to="/collectors/collect"
        class="flex-none bg-secondary text-white font-semibold text-center hover:bg-opacity-40 rounded-xl transition-all ease-out duration-300 delay-75 py-3 mx-12 mt-10"
    >
        Collect Item
    </NuxtLink>
    <NuxtLink
        v-else
        to="/renew"
        class="flex-none bg-secondary text-white font-semibold text-center hover:bg-opacity-40 rounded-xl transition-all ease-out duration-300 delay-75 py-3 mx-12 mt-10"
    >
        UPGRADE PLAN
    </NuxtLink>
    
</nav>
<div class="flex items-center justify-between md:hidden p-4">
    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.57143 0H9.42857C9.84534 0 10.245 0.189643 10.5397 0.527208C10.8344 0.864774 11 1.32261 11 1.8C11 2.27739 10.8344 2.73523 10.5397 3.07279C10.245 3.41036 9.84534 3.6 9.42857 3.6H1.57143C1.15466 3.6 0.754961 3.41036 0.460261 3.07279C0.165561 2.73523 0 2.27739 0 1.8C0 1.32261 0.165561 0.864774 0.460261 0.527208C0.754961 0.189643 1.15466 0 1.57143 0ZM12.5714 14.4H20.4286C20.8453 14.4 21.245 14.5896 21.5397 14.9272C21.8344 15.2648 22 15.7226 22 16.2C22 16.6774 21.8344 17.1352 21.5397 17.4728C21.245 17.8104 20.8453 18 20.4286 18H12.5714C12.1547 18 11.755 17.8104 11.4603 17.4728C11.1656 17.1352 11 16.6774 11 16.2C11 15.7226 11.1656 15.2648 11.4603 14.9272C11.755 14.5896 12.1547 14.4 12.5714 14.4ZM1.57143 7.2H20.4286C20.8453 7.2 21.245 7.38964 21.5397 7.72721C21.8344 8.06477 22 8.52261 22 9C22 9.47739 21.8344 9.93523 21.5397 10.2728C21.245 10.6104 20.8453 10.8 20.4286 10.8H1.57143C1.15466 10.8 0.754961 10.6104 0.460261 10.2728C0.165561 9.93523 0 9.47739 0 9C0 8.52261 0.165561 8.06477 0.460261 7.72721C0.754961 7.38964 1.15466 7.2 1.57143 7.2Z" fill="#1F9C00"/>
    </svg>
    <img v-if="user.data.avatar" :src="user.data.avatar" alt="" class="w-10 h-10" />
    <vue-avatar v-else :username="`${ user.data.role === 'collector' ? user.data.name : user.data.businessInfo.name}`" :size="40" />

    
    
</div>
</template>

<script lang="ts" setup>
    import VueAvatar from "@webzlodimir/vue-avatar";
    import { type User } from '@/composables/useTypes'
    const { data } = useAuth()

    const user: User = data.value
</script>

<style>

</style>