<template>
  <div class="px-12 2xl:px-20 py-12 w-full">
      <div class="flex justify-between">
        <div>
          <p class="2xl:text-4xl text-2xl font-bold">My Account</p>
        </div>
        <div class="flex items-center font-bold gap-12 text-lg">
          <ChangePassword />
          <button type="button" @click.prevent="signOut({ callbackUrl: '/login' })" class="text-error">Logout</button>
        </div>
      </div>
      <div class="flex mt-20 gap-20">
        <!-- Right -->
        <div class="grid grid-cols-1 grid-rows-3 gap-12">
          <div
            class="rounded-3xl card-shadow flex gap-4 px-6 py-4 items-center row-span-1"
          >
            <div class="relative">
              <img v-if="data.data.avatar" :src="data.data.avatar" alt="" class="w-[100px] h-[100px] rounded-full mx-auto object-cover" />
              <vue-avatar class="mx-auto" v-else :username="`${data.data.businessInfo.name}`" :size="100" />
              <button class="block bg-secondary text-white text-xs px-4 py-2 rounded-md font-semibold mt-3">
                {{data.data.avatar ? 'Change Avator' : 'Upload Avatar'}}
                <input @change="chageAvatar" class="absolute inset-0 opacity-0" type="file" name="" id="">
              </button>
            </div>
            <div class="flex flex-col">
              <p class="font-semibold mr-20">
                {{ data.data.businessInfo.name }}
              </p>
              <p>{{plan.name}} User</p>
            </div>
          </div>

          <div
            class="rounded-3xl card-shadow flex flex-col gap-7 px-6 2xl:py-7 xl:py-4  row-span-2"
          >
            <div class="flex items-center justify-between">
              <div
                class="flex flex-col font-semibold 2xl:text-xl xl:text-lg gap-2"
              >
                <p class="text-collectionText">Avail Bal:</p>
                <p>
                  {{ useCurrencyFormat(data.data.balance) }}
                </p>
              </div>
              <FundWallet />
            </div>
            <div
              class="flex flex-col font-semibold 2xl:text-xl xl:text-lg mb-20 gap-2"
            >
              <p class="text-collectionText">Recycler Units:</p>
              <p>{{ collectors.length }} Units</p>
            </div>
          </div>
          <!-- <div
            class="flex card-shadow rounded-2xl px-6 py-7 items-center text-center justify-center"
          >
            <button type="button" class="text-center font-medium text-lg">
              View transaction history
            </button>
          </div> -->
        </div>

        <!-- Left -->
        <div class="">
          <form @submit.prevent="onSubmit" class="rounded-3xl card-shadow px-12 py-4">
            <div class="2xl:text-xl xl:text-lg font-semibold flex">
              <p>Contact Information</p>
            </div>
            <div class="grid grid-cols-2 mt-7 gap-9">
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >Full Name</label
                >
                <input
                  type="text"
                  v-model="name"
                  v-bind="nameAttrs"
                  class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary
                    focus:outline-none"
                />
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.name }}</p>
              </div>
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >Company Name</label
                >
                <input
                  type="text"
                  v-model="company_name"
                  v-bind="company_nameAttrs"
                  disabled
                  class="border-b-2 border-b-collectionText cursor-not-allowed rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                />
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.company_name }}</p>
              </div>
              <div class="flex flex-col col-span-2 relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >Company Addres</label
                >
                <input
                  type="text"
                  v-model="company_address"
                  v-bind="company_addressAttrs"
                  class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                />
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.company_address }}</p>
              </div>
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >City</label
                >
                <input
                  type="text"
                  v-model="city"
                  v-bind="cityAttrs"
                  class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                />
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.city }}</p>
              </div>
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >State</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="state"
                    v-bind="stateAttrs"
                    class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                  />
                </div>
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.state }}</p>
              </div>
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >Country</label
                >
                <div class="">
                  <input
                    type="text"
                    v-model="country"
                    v-bind="countryAttrs"
                    class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                  />
                </div>
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.country }}</p>
              </div>
              <div class="flex flex-col relative">
                <label for="" class="text-collectionText xl:text-sm"
                  >Phone Number</label
                >
                <input
                  type="text"
                  v-model="phone_number"
                  v-bind="phone_numberAttrs"
                  placeholder="+234"
                  class="border-b-2 border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                />
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 ">{{ errors.phone_number }}</p>
              </div>
              <div class="flex flex-col col-span-2">
                <label for="" class="text-collectionText xl:text-sm"
                  >Email Address</label
                >
                <input
                  type="email"
                  v-model="email"
                  v-bind="emailAttrs"
                  readonly
                  class="border-b-2 cursor-not-allowed border-b-collectionText rounded-md focus:border-secondary focus:ring-secondary focus:outline-none"
                />
              </div>
            </div>
            <div class="2xl:py-7 xl:py-4">
              <button
                class="text-white bg-secondary text-center px-10 font-bold py-3 2xl:text-lg rounded-md"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
  </div>

 
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/yup';
  import * as yup from 'yup';
  import VueAvatar from "@webzlodimir/vue-avatar";
  import { type Plan } from '@/composables/useTypes'


  interface Collector {
    created_at: string
    email: string
    name: string
    id: string
  }
  const collectors = ref<Collector[]>([])

  const { $toast, $router } = useNuxtApp()
  const { data, token, signOut, getSession } = useAuth()
  const avatar = ref('')

  const plan = ref<Plan>({
      id: '',
      name: '',
      description: '',
      price: ''
  })

  const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      yup.object({
        email: yup.string().email().required().label('Email'),
        name: yup.string().required().label('Name'),
        company_name: yup.string().required().label('Company name'),
        company_address: yup.string().required().label('Company address'),
        city: yup.string().required().label('City'),
        state: yup.string().required().label('State'),
        country: yup.string().required().label('Country'),
        phone_number: yup.string().required().label('Phone number'),
      }),
    ),
    initialValues: {
      email: data.value.data.email,
      name: data.value.data.name,
      company_name: data.value.data.businessInfo.name,
      company_address: data.value.data.businessInfo.address,
      city: data.value.data.businessInfo.city,
      state: data.value.data.businessInfo.state,
      country: data.value.data.businessInfo.country,
      phone_number: data.value.data.phone_number,
    },
  });

  const [email, emailAttrs] = defineField('email');
  const [name, nameAttrs] = defineField('name');
  const [company_name, company_nameAttrs] = defineField('company_name');
  const [company_address, company_addressAttrs] = defineField('company_address');
  const [city, cityAttrs] = defineField('city');
  const [state, stateAttrs] = defineField('state');
  const [country, countryAttrs] = defineField('country');
  const [phone_number, phone_numberAttrs] = defineField('phone_number');

  const onSubmit = handleSubmit( (values) => {
    useFetch(`${useBaseUrl()}/admin/details`, {
      method: 'PATCH',
      headers: {
          Authorization: `${token.value}`,
      },
      body: { 
        name: values.name, 
        // company_name: values.company_name, 
        address: values.company_address,
        city: values.city,
        state: values.state,
        country: values.country,
        phone_number: values.phone_number,
      },
      onResponse({ request, response, options }) {
        // Process the response data
        if(response.ok) {
          $toast.success(response._data.message)
          getSession()
        }
      },
      onResponseError({ request, response, options }) {
        // console.log(response)
        $toast.error(response._data.message)
      }
    })
  })

  const getPlans = async () => {
        // alert('here')
        await $fetch(`${useBaseUrl()}/plans`, {
            
        method: 'get',
        headers: {
            Authorization: `${token.value}`
        },
        onResponse({ request, response, options }) {
            // Process the response data
            // alert('here')
            if(response.ok) {
                $toast.success(response._data.message)
                const res: Plan[] = response._data.data

                const sL: Plan = res.find( i => i.id == data.value.data.planId)
                // console.log(s, newX)
                if(sL) {
                    plan.value = sL
                }else {
                    plan.value = {}
                }
            }
        },
        onResponseError({ request, response, options }) {
            $toast.error(response._data.message)
        }
    })

  }

  const fetch = async (id: string) => {
    // isLoading.value = true
    await $fetch(`${useBaseUrl()}/admin/collectors?limit=${10}&page=${1}`, {
        headers: {
            Authorization: `${token.value}`,
        },
        onResponse({ request, response, options }) {
            // Process the response data
            // isLoading.value = false
            if (response.ok) {
                $toast.success(response._data.message);
                // payment_details.value = response._data.data
                // payment_modal.value = true
                // overview.value = response._data
                collectors.value = response._data.data
                // console.log(response._data.data)
                
            }
        },
        onResponseError({ request, response, options }) {
            $toast.error(response._data.message);
            // isLoading.value = false
        },
    });
  }

  const chageAvatar = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const formData = new FormData()
    if(target.files?.length > 0) {
      formData.append('avatar', target.files[0])
    }
    console.log(formData)
    await $fetch(`${useBaseUrl()}/users/avatar`, {
        headers: {
            Authorization: `${token.value}`,
        },
        method: 'PUT',
        body: formData,
        async onResponse({ request, response, options }) { 
            // Process the response data
            // isLoading.value = false
            if (response.ok) {
                $toast.success(response._data.message);
                await getSession()
                
            }
        },
        onResponseError({ request, response, options }) {
            $toast.error(response._data.message);
            // isLoading.value = false
        },
    });
  }

  // watch(avatar, newX => {
      
  //     chageAvatar(newX)
  
  // })

  const getAll = async () => {
    await fetch('')
    await getPlans()
  }

  useLazyAsyncData( () => getAll(), { server: false });



definePageMeta({
  // auth: false
})


</script>

<style>

</style>