<template>
  <div class="max-w-screen-xl md:px-16 mx-auto grid md:grid-cols-3 h-full">
    <img class="h-5  md:hidden mt-6" src="/img/logo_2.png" alt="JunkYard Logo"  />
    <div class="relative">
      <div class="md:absolute inset-y-0 left-0 md:flex items-center">
        <form
          @submit.prevent="onSubmit"
          class="md:w-[625px] h-[80vh] custom-xl:h-[75vh] rounded-2xl 2xl:text-2xl xl:text-xl space-y-5 2xl:space-y-10 xl:space-y-7 md:shadow-2xl 
          md:p-16 2xl:pt-16 md:drop-shadow-2xl md:backdrop-blur-xl md:bg-gradient-to-br from-[#FFFFFFCC] via-[#ddcececc] 
          to-[#FFFFFF00]"
        >
          <div class="flex flex-col space-y-3 relative">
            <div class="flex items-center space-x-3">
              <UserCircleIcon class="h-6 w-6 text-secondary" />
              <label for="">Fullname</label>
            </div>
            <input
              type="text"
              v-model="name"
              v-bind="nameAttrs"
              class="border-[3px] border-secondary rounded-md p-3 focus:outline-none"
            />
            <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.name }}</p>
          </div>

          <div class="flex flex-col space-y-3 relative">
            <div class="flex items-center space-x-3">
              <EnvelopeIcon class="w-6 h-6 text-secondary" />
              <label for="">Email address</label>
            </div>
            <input
              type="text"
              v-model="email"
              v-bind="emailAttrs"
              class="border-[3px] border-secondary rounded-md p-3 focus:outline-none"
            />
            <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.email }}</p>
          </div>


          <div class="flex flex-col space-y-3 relative">
            <div class="flex items-center space-x-3">
              <LockClosedIcon class="w-6 h-6 text-secondary" />
              <label for="">Password</label>
            </div>
            <input
              :type="toggleType ? 'password' : 'text'"
              v-model="password"
              v-bind="passwordAttrs"
              class="border-[3px] border-secondary rounded-md p-3 focus:outline-none"
            />
            <EyeIcon v-if="toggleType" @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
            <EyeSlashIcon v-else @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
            <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500">{{ errors.password }}</p>
          </div>


          <div class="flex flex-col space-y-3 relative">
            <div class="flex items-center space-x-3">
              <LockClosedIcon class="w-6 h-6 text-secondary" />
              <label for="">Confirm Password</label>
            </div>
            <input
              :type="toggleType ? 'password' : 'text'"
              v-model="comfirm_password"
              v-bind="comfirmPasswordAttrs"
              class="border-[3px] border-secondary rounded-md p-3 focus:outline-none"
            />
            <EyeIcon v-if="toggleType" @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
            <EyeSlashIcon v-else @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
            <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500">{{ errors.comfirm_password }}</p>
          </div>
          <!-- <div class="text-secondary text-right">Forgot password?</div> -->

          <button
            type="submit"
            :disabled="!meta.valid"
            :class="[!meta.valid ? 'cursor-not-allowed bg-gray-500' : 'bg-secondary']"
            class="text-center w-full md:w-[500px] p-4 rounded-md text-white md:text-[28px] font-bold
            hover:opacity-80 transition-all duration-300 ease-in-out"
          >
            <svg
              v-show="isSubmitting"
              class="w-7 h-7 animate-spin absolute left-1/2 -ml-2.5"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-75 text-white"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-100 text-white"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
            <span :class="{ invisible: isSubmitting }">
              {{ 'CREATE AN ACCOUNT' }}
            </span>
          </button>
          <p class="text-center">Already a collector? <NuxtLink to="/login"><b>Login</b></NuxtLink></p>
        </form>
      </div>
    </div>
    <div class="col-span-2 shadow-lg bg-login-image4 bg-cover bg-bottom rounded-[47px] h-full hidden md:flex flex-col justify-end items-end gap-8 p-5">
      <h1 class="text-white 2xl:text-4xl xl:text-3xl font-bold text-right">
        Monitor your <br> waste <span class="text-black">collections</span>.
      </h1>
      <p class="text-[28px] text-white">Login to your dashboard</p>
      <img class="h-8 mt-20" src="/img/logo.svg" alt="JunkYard Logo"  />
    </div>
  </div> 
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { EnvelopeIcon, LockClosedIcon,UserCircleIcon } from '@heroicons/vue/24/outline'

const config = useRuntimeConfig()
const { $toast, $router } = useNuxtApp()

const { signUp } = useAuth()
const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required().label('Email'),
      password: yup.string().min(8).required().label('Password'),
      comfirm_password: yup.string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match'),
      name: yup.string().required(),
    }),
  ),
});

const toggleType = ref(true)
const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
const [password, passwordAttrs] = defineField('password');
const [comfirm_password, comfirmPasswordAttrs] = defineField('comfirm_password');

const onSubmit = handleSubmit( (values) => {
  useFetch(`${useBaseUrl()}/auth/register`, {
    method: 'post',
    body: {name: values.name, email: values.email, password: values.password, callbackURL: `${config.public.baseUrl}verify`},
    onResponse({ request, response, options }) {
      // Process the response data
      if(response.ok) {
        $toast.success(response._data.message)
        $router.push(`/signup-success/${response._data.message}`)
      }
    },
    onResponseError({ request, response, options }) {
      // console.log(response)
      $toast.error(response._data.message)
    }
  })


  // signUp({name: values.name, email: values.email, password: values.password, callbackURL: `${config.public.baseUrl}verify/`}, {
  //   preventLoginFlow: true
  // }).then( resp => {
  //   console.log(resp)
  //   $toast.success('Successfully logged in!')
  // }).catch( err => {
  //   $toast.success(err.data.message)
  // })
});

watch(name, (newValue, oldValue) => {
  const cleared = newValue?.replaceAll(/[^a-zA-Z\s]/g, '');

  const words = cleared?.trim().split(/\s+/);
      
  // Check if there are more than two words
  if (words.length > 2) {
    // Keep only the first two words
    name.value = words.slice(0, 2).join(' ');
  } else {
    // Allow the new value if it's two words or less
    name.value = cleared;
  }
})


definePageMeta({
  layout: 'auth',
  auth: false
})
</script>