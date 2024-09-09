<template>
  <div v-if="!is_error" class="max-w-screen-xl px-16 mx-auto flex items-center justify-center h-full relative ">
    <svg   
      class="w-32 h-32 animate-spin absolute left-1/2 -ml-2.5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="opacity-75 text-secondary"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-100 text-secondary"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  </div> 

  <!-- <div v-else class="font-montserrat flex items-center justify-center h-screen">
      <div class="space-y-5">
        <p class="text-3xl font-medium">
          {{ error }}
        </p>
        <button class="text-4xl font-semibold text-secondary block" >Resend Email</button>
      </div>
  </div> -->
</template>

<script setup lang="ts">
// import { toast } from 'vue3-toastify';
const is_error = ref(false)
const error = ref('')
const { $toast, $router } = useNuxtApp()
const { data, token, getSession } = useAuth()

  const { reference } = useRoute().query
  const Verify = async () => {
    // alert('here')
    await $fetch(`${useBaseUrl()}/transactions/paystack/verify-transaction?reference=${reference}`, {
      method: 'GET',
      headers: {
            Authorization: `${token.value}`,
        },

      onResponse({ request, response, options }) {
        // Process the response data
        // alert('here')
        if(response.ok) {
          $toast.success(response._data.message)
          setTimeout(() => {
            getSession()
            $router.push('/account')
          }, 2000);
        }
      },
      onResponseError({ request, response, options }) {
        // console.log(response)
        is_error.value = true
        error.value = response._data.message
        $toast.error(response._data.message)
        setTimeout(() => {
            $router.push('/account')
          }, 2000);
      }
  })

  }
  
  // useLazyAsyncData( () => Verify(), { server: false });

  onMounted( async () => {
    await Verify()
  })

definePageMeta({
  layout: 'auth',
  // auth: false
})
</script>