<script lang="ts" setup>
const config = useRuntimeConfig()
const { $toast, $router } = useNuxtApp()
const params = useRoute().params
const query = useRoute().query
const { token, getSession } = useAuth()

const reSend = () => {
  useFetch(`${useBaseUrl()}/auth/resend-verification-mail`, {
    method: 'post',
    headers: {
      Authorization: `${token.value}`,
    },
    body: {
      email: query.email,
      callbackURL: `${config.public.baseUrl}verify`,
    },
    async onResponse({ request, response, options }) {
      // Process the response data
      if(response.ok) {
        $toast.success(response._data.message)
        await getSession()
        $router.replace(`/signup-success/${response._data.message}`)
      }
    },
    onResponseError({ request, response, options }) {
      // console.log(response)
      $toast.error(response._data.message)
    }
  })
};

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
          <!-- User not verified. Check your email for the verification link -->
          <Button @click.prevent="reSend" v-if="params.id === 'User not verified. Check your email for the verification link'" 
          class="text-4xl font-semibold text-secondary block">Resend Email</Button>
          <NuxtLink v-else class="text-4xl font-semibold text-secondary block" to="/login">Back to Login</NuxtLink>
        </div>
    </div>
</template>
