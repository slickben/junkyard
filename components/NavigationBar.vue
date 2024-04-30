<template>
<nav class="py-7 h-full 2xl:w-[19.375rem] xl:w-80 flex flex-col shadow-md flex-none">
    <div class="flex flex-col items-center space-y-2 flex-none">
        <!-- <img
            :src="data.data.avatar ? data.data.avatar : '/img/idPassport.png'"
            alt=""
            class="rounded-full mb-4 w-24"
        /> -->
        <img v-if="data.data.avatar" :src="data.data.avatar" alt="" class="" />
        <vue-avatar v-else :username="`${data.data.businessInfo.name}`" :size="100" />
        <h2 class="text-xl font-bold">
            {{ data.data.businessInfo.name }}
        </h2>
        <p class="font-semibold">Avail Bal: {{ useCurrencyFormat(data.data.balance) }}</p>
        <p class="font-normal">Basic User</p>
    </div>
    <div class="flex flex-col 2xl:gap-3 mt-4 flex-grow">
        
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
    <button
        class="flex-none bg-secondary text-white font-semibold text-center hover:bg-opacity-40 rounded-xl transition-all ease-out duration-300 delay-75 py-3 mx-12 mt-10"
    >
        UPGRADE PLAN
    </button>
</nav>
</template>

<script lang="ts" setup>
  import VueAvatar from "@webzlodimir/vue-avatar";
    const { data } = useAuth()
</script>

<style>

</style>