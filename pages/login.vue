<template>
  <div class="max-w-screen-xl md:px-16 mx-auto grid md:grid-cols-3 h-full">
    <div class="col-span-2 shadow-lg bg-login-image4 bg-cover bg-bottom rounded-[47px] h-full
     hidden md:flex flex-col justify-end items-start gap-8 p-5">
      <h1 class="text-white 2xl:text-4xl xl:text-3xl font-bold">
        Monitor your <br> waste <span class="text-black">collections</span>.
      </h1>
      <p class="text-[28px] text-white">Login to your dashboard</p>
      <img class="h-8 mt-20" src="/img/logo.svg" alt="JunkYard Logo"  />
    </div>
    <div class="relative">
      <div class="md:absolute inset-y-0 md:right-0 md:flex items-center">
        <form
          @submit.prevent="onSubmit"
          class="md:w-[625px] h-[70vh] custom-xl:h-[75vh] rounded-2xl 2xl:text-2xl xl:text-xl space-y-5 2xl:space-y-10 xl:space-y-7 
          shadow-2xl pt-10 md:pt-16 p-4 md:p-16 drop-shadow-2xl backdrop-blur-xl bg-gradient-to-br from-[#FFFFFFCC] via-[#ddcececc] to-[#FFFFFF00]"
        >

          <div class="flex flex-col space-y-3 relative">
            <div class="flex items-center space-x-3">
              <EnvelopeIcon class="w-6 h-6 text-secondary" />
              <!-- <img src="/img/security_lock.svg" alt="" width="24" height="24" /> -->
              <label for="">Email address</label>
            </div>
            <input
              type="text"
              v-model="email"
              v-bind="emailAttrs"
              class="border-[3px] border-secondary rounded-md p-3 focus:outline-none"
            />
            <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500">{{ errors.email }}</p>
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
          <NuxtLink to="/forget-password" class="text-secondary text-right block">Forgot password?</NuxtLink>
          <button
            type="submit"
            :disabled="!meta.valid"
            :class="[!meta.valid ? 'cursor-not-allowed bg-gray-500' : 'bg-secondary']"
            class="text-center  md:w-[500px] w-full p-4 rounded-md text-white md:text-[28px] font-bold
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
              {{ 'Login' }}
            </span>
          </button>
          <p class="text-center">New collector? <NuxtLink to="/register"><b>Create an account</b></NuxtLink></p>
        </form>
      </div>
    </div>
  </div> 
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { EnvelopeIcon, LockClosedIcon,UserCircleIcon } from '@heroicons/vue/24/outline'
const { $toast, $router } = useNuxtApp()

const { signIn } = useAuth()
const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email().required().label('Email'),
      password: yup.string().min(8).required().label('Password'),
      // comfirm_password: yup.string()
      //   .oneOf([yup.ref('password'), ''], 'Passwords must match')
    }),
  ),
});

const toggleType = ref(true)
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
// const [comfirm_password, comfirmPasswordAttrs] = defineField('password');

const onSubmit = handleSubmit( (values) => {
  const credentials = values
  // await signIn(credentials, undefined, { callbackUrl: '/' })
  signIn(credentials, { callbackUrl: '/', redirect: true }).then( _resp => {
    // $toast.success('Successfully logged in!')
    $router.push('/')
    // console.log('here')
  }).catch( err => {
    // console.log(err)
    // console.log(err.data)
    $toast.error(err.data.message)
  })
});

definePageMeta({
  layout: 'auth',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/'
  }
})
</script>