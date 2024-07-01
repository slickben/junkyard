<template>
    <div class="bg-fakeWhite h-full  py-12 px-12 2xl:px-20 w-[741px]">
        <h1 class="2xl:text-4xl xl:text-2xl font-bold mb-5">Recycler Units</h1>
        <a href="#" class="text-textGray text-sm font-semibold">Staff Portal > 
            <span class="text-black">Add New Unit</span>
        </a>

        <form @submit.prevent="onSubmit" class="mt-12">
            <div class="card-shadow px-12 py-9 rounded-3xl flex flex-col gap-9">
                <div class="flex flex-col relative">
                    <label for="" class="font-medium">Recycler Unit Name</label>
                    <input 
                        type="text" 
                        v-model="name"
                        v-bind="nameAttrs"
                        class="border-[3px] border-secondary focus:outline-none text-sm placeholder:text-black rounded-lg px-3 py-1"
                        required 
                        placeholder="Name"
                    >
                    <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.name }}</p>
                </div>
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col relative">
                        <label for="" class="font-medium">Login ID</label>
                        <input 
                            v-model="email"
                            v-bind="emailAttrs" 
                            type="text" 
                            placeholder="Email"
                            class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]" 
                            required
                        >
                        <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.email }}</p>
                    </div>
                    <!-- <button 
                        type="submit" 
                        class="border-secondary text-secondary text-lg font-semibold rounded-lg border-[3px] px-3 py-1
                         hover:bg-secondary hover:text-white transition-all transform ease-in-out duration-300">
                         Generate ID
                    </button> -->
                </div>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col relative">
                        <label for="">Access key</label>
                        <input 
                            type="text" 
                            v-model="password"
                            v-bind="passwordAttrs" 
                            placeholder="Password"
                            class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                        >
                        <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.password }}</p>
                    </div>
                    <!-- <button 
                        type="submit" 
                        class="border-secondary text-secondary text-lg font-semibold rounded-lg border-[3px] 
                        px-3 py-1 hover:bg-secondary hover:text-white transition-all transform ease-in-out duration-300">
                        Generate Access Key
                    </button> -->
                </div>
                <button 
                    type="submit" 
                    class="border border-secondary text-white bg-secondary text-lg 
                    font-semibold px-3 py-1 mb-7 rounded-lg hover:bg-white hover:text-secondary hover:border-[3px]
                     hover:border-secondary transition-all transform ease-in-out duration-300">
                     Add New Unit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

const { $toast, $router } = useNuxtApp()
const { data, token } = useAuth()

const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup.string().required().label('Name'),
      email: yup.string().email().required().label('Email'),
      password: yup.string().min(8).required().label('Password'),
    }),
  ),
});

const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit( (values) => {
  useFetch(`${useBaseUrl()}/auth/collectors`, {
    method: 'post',
    headers: {
        Authorization: `${token.value}`,
    },
    body: {name: values.name, email: values.email, password: values.password, adminId: data.value.data.id},
    onResponse({ request, response, options }) {
      // Process the response data
      if(response.ok) {
        $toast.success(response._data.message)
        $router.back()
      }
    },
    onResponseError({ request, response, options }) {
      // console.log(response)
      $toast.error(response._data.message)
    }
  })
})


definePageMeta({
//   auth: false
})
</script>

<style>

</style>