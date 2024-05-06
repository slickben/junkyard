<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
const countries = await import('~/assets/countries.json')


interface State {
  code: string;
  name: string;
  subdivision: null;
}
const { $toast, $router } = useNuxtApp()
const states = ref<State[]>()
const { token, getSession } = useAuth()
const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      company_name: yup.string().required(),
      address: yup.string().required(),
      city: yup.string().required(),
      country: yup.string().required(),
    }),
  ),
});


const [name, nameAttrs] = defineField('company_name');
const [address, addressAttrs] = defineField('address');
const [state, stateAttrs] = defineField('city');
const [country, countryAttrs] = defineField('country');

const onSubmit = handleSubmit( (values) => {
  useFetch(`${useBaseUrl()}/users/onboarding`, {
    method: 'post',
    headers: {
      Authorization: `${token.value}`,
    },
    body: {...values},
    async onResponse({ request, response, options }) {
      // Process the response data
      if(response.ok) {
        $toast.success(response._data.message)
        await getSession()
        $router.push(`/welcome/subscribe`)
      }
    },
    onResponseError({ request, response, options }) {
      // console.log(response)
      $toast.error(response._data.message)
    }
  })
});
const params = useRoute().params

watch(country, newX => {
  const s: State[] = countries.default.find( i => i.name == newX)?.states
  // console.log(s, newX)
  if(s) {
    states.value = s
  }else {
    states.value = []
  }
  
})

definePageMeta({
  layout: 'blank',
  middleware: ['auth', 'setup']
})
</script>

<template>
    <div class="font-montserrat flex items-center h-screen max-w-screen-xl px-16 mx-auto relative">
      <div class="container h-full max-h-[600px]">
        <form @submit="onSubmit" class="h-full flex flex-col justify-between">
          <h1 class="2xl:text-4xl xl:text-2xl font-semibold">
            <!-- <pre>
              {{ states }}
            </pre> -->
            Welcome to <span class="text-secondary font-bold">JUNKYARD</span>
          </h1>
          <div class="grid grid-cols-2 gap-12 2xl:gap-12 max-w-[45rem] w-full mb-4 xl:mb-2">
            <div class="relative col-span-2">
              <input
                type="text"
                v-model="name"
                v-bind="nameAttrs"
                placeholder="Company Name"
                :class="[errors.company_name ? 'border-red-500' : 'border-[#BDBDBD]']"
                class="border-b-[4px] focus:outline-none py-2 2xl:text-3xl 
                xl:text-xl ring-0 focus:ring-0 outline-none border-t-0 border-r-0 border-l-0 px-0 border-[#BDBDBD]
                focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-secondary w-full"
              />
              <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.company_name }}</p>
            </div>
            <!-- Adjusted width here -->
            <div class="relative col-span-2">
              <input
                type="text"
                v-model="address"
                v-bind="addressAttrs"
                placeholder="Company Address"
                :class="[errors.address ? 'border-red-500' : 'border-[#BDBDBD]']"
                class="border-b-[4px] focus:outline-none py-2 2xl:text-3xl 
                xl:text-xl w-full ring-0 focus:ring-0 outline-none border-t-0 border-r-0 border-l-0 px-0 border-[#BDBDBD]
                focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-secondary"
              />
              <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.address }}</p>
            </div>

            <div class="relative w-full">
              <select
                v-model="country"
                v-bind="countryAttrs"
                :class="[errors.country ? 'border-red-500' : 'border-[#BDBDBD]']"
                class="border-b-[4px] focus:outline-none py-2 2xl:text-3xl 
                xl:text-xl ring-0 focus:ring-0 outline-none border-t-0 border-r-0 border-l-0 px-0 border-[#BDBDBD]
                focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-secondary w-full"
              >
                <option selected value="">Country</option>
                <option v-for="item in countries.default.map( i => i.name)" :key="item" :value="item">{{ item }}</option>
              </select>
              <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.country }}</p>
            </div>

            <!-- <select name="" id=""></select> -->
            <div class="relative w-full">
              <select
                v-model="state"
                v-bind="stateAttrs"
                :class="[errors.city ? 'border-red-500' : 'border-[#BDBDBD]']"
                class="border-b-[4px] focus:outline-none py-2 2xl:text-3xl 
                xl:text-xl ring-0 focus:ring-0 outline-none border-t-0 border-r-0 border-l-0 px-0 border-[#BDBDBD]
                focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-secondary w-full"
                >
                <option selected value="">City/State</option>
                <option v-for="item in states" :key="item.code" :value="item.name">{{ item.name }}</option>
              </select>
              <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.city }}</p>
            </div>
            <!-- Adjusted width here -->
          </div>
          <div class="flex justify-end cursor-pointer">
            <!-- <div
              class="2xl:text-2xl xl:text-xl font-bold hover:text-secondary ease-in duration-200 text-textGray"
            >
              PREVIOUS
            </div> -->
            <button
              type="submit"
              class="text-secondary 2xl:text-2xl xl:text-xl font-bold hover:text-textGray ease-linear duration-200 mx-48"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
