<template>
<nav class="py-7 h-full 2xl:w-[19.375rem] xl:w-80 hidden md:flex flex-col shadow-md flex-none bg-white sticky top-0">
    <div class="px-6">
        <!-- Login -->
        <button @click="$router.push('/super-admin')" class=" text-4xl text-secondary font-extrabold" to="/super-admin">Junkyard</button>
    </div>

    <div class="hidden md:flex flex-col 2xl:gap-3 mt-4 flex-grow">
        
       

        <NuxtLink 
            to="/super-admin/transactions"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-6 text-dahboardText hover:text-secondary"
        >
            <svgo-fund_icon class="text-xl" />
            <p>Transactions</p>
        </NuxtLink>

        <!-- <NuxtLink 
            to="/account"
            class="flex gap-4 font-semibold hover:bg-secondary hover:bg-opacity-20 hover:border-r-secondary
            hover:border-r-8 transition-all ease-out transform duration-300 cursor-pointer py-3 px-6 text-dahboardText hover:text-secondary"
        >
            <svgo-myAccount_icon class="text-xl" />
            <p>My Account</p>
        </NuxtLink> -->
    </div>
</nav>

</template>

<script lang="ts" setup>
    import VueAvatar from "@webzlodimir/vue-avatar";
    import "@webzlodimir/vue-avatar/dist/style.css";
    import { type User } from '@/composables/useTypes'
    const { data } = useAuth()

    const user: User = data.value
</script>

<style>

</style>