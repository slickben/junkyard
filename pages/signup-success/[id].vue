<script lang="ts" setup>

const params = useRoute().params

definePageMeta({
  layout: 'blank',
  auth: false
})
</script>

<template>
    <div class="font-montserrat flex items-center justify-center h-screen">
        <div class="space-y-5">
          <p class="text-3xl font-medium">
            {{ params.id }}
          </p>
          <NuxtLink class="text-4xl font-semibold text-secondary block" to="/login">Back to Login</NuxtLink>
        </div>
    </div>
</template>
