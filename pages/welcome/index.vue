<script lang="ts" setup>

const params = useRoute().params

definePageMeta({
  layout: 'blank',
})
</script>

<template>
    <div class="font-montserrat flex items-center h-screen max-w-screen-xl px-6 md:px-16 mx-auto relative ">
        <div class="space-y-5">
          <p class="font-medium text-black text-3xl md:text-6xl">
            Welcome to <b class="text-secondary">JUNKYARD</b>
          </p>
          <p class="text-xl md:text-3xl font-medium">Setup your account in few steps!</p>
        </div>

        <NuxtLink class="text-lg md:text-2xl font-semibold text-secondary absolute bottom-20 2xl:bottom-40 right-4 md:right-0" to="/welcome/setup">SETUP ACCOUNT</NuxtLink>
    </div>
</template>
