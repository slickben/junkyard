<template>
  <div class="bg-fakeWhite h-full py-2 md:py-12 px-5 md:px-12 2xl:px-20 md:w-[741px]">
      <h1 class="2xl:text-4xl xl:text-2xl font-bold md:mb-5">Collect Item</h1>
      <NuxtLink to="/collectors" class="text-textGray text-sm font-semibold">Dashboard > 
          <span class="text-black">Collect</span>
      </NuxtLink>

      <form @submit.prevent="onSubmit" class="mt-5 md:mt-12">
          <div class="card-shadow px-4 md:px-12 py-5 md:py-9 rounded-3xl flex flex-col gap-5">
            <div class="w-full rounded-2xl md:bg-white ">
                <HeadDisclosure v-for="(field, idx) in fields" :key="field.key" as="div" class="mt-2 relative" v-slot="{ open }">
                    <HeadDisclosureButton
                        :class="open ? 'rounded-b-none border-b-0 ' : ''"
                        class="flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-semibold
                        focus:outline-none focus-visible:ring focus-visible:ring-secondary/75 border-2 border-secondary"
                    >
                    <span>
                        {{ getWasteTypeNameById(field.value.wasteType) }}
                    </span>
                    <div class="w-fit h-fit p-[1px] rounded-full border-2 border-black">
                        <PlusIcon
                            v-if="!open"
                            class="h-5 w-5 text-black"
                        />
                        <MinusIcon
                            v-else
                            class="h-5 w-5 text-black"
                        />
                    </div>
                    </HeadDisclosureButton>
                    <HeadDisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500 border-2 border-secondary rounded-b-lg space-y-2">
                        <div class="flex flex-col relative space-y-1">
                            <label for="" class="font-medium text-black">Type</label>
                            <select 
                                v-model="field.value.wasteType"
                                as="select"
                                type="number" 
                                class="border-2 border-secondary focus:outline-none text-sm placeholder:text-black rounded 
                                w-full px-3 py-1 focus:border-secondary focus:ring-0"
                                required 
                                placeholder="0"
                            >
                            <option value="">Select Type</option>
                            <option v-for="item in user.data.adminWasteType" :key="item.id" :value="item.id">
                                {{ item.name }}
                            </option>
                            </select>
                        </div>
                        <div class="flex flex-col relative space-y-1">
                            <label for="" class="font-medium text-black">Weight (kg)</label>
                            <input 
                                type="number"
                                v-model="field.value.weight"
                                class="border-2 border-secondary focus:outline-none text-sm placeholder:text-black rounded 
                                w-full px-3 py-1 focus:border-secondary focus:ring-0"
                                required 
                                placeholder="0"
                            >
                            <!-- <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.name }}</p> -->
                        </div>
                    </HeadDisclosurePanel>
                    <button class="absolute -right-6 top-3 bg-red-500 text-white rounded">
                        <MinusIcon
                            @click="remove(idx)"
                            class="h-5 w-5 ">
                        </MinusIcon>
                    </button>
                </HeadDisclosure>
                <button @click="push({ wasteType: '', weight: 0})" class="bg-secondary w-fit px-2 flex items-center rounded py-1 ml-auto mt-2 text-white">
                    Add Item
                    <PlusIcon
                            class="h-5 w-5"
                        />
                </button>
                
            </div>
              <div class="flex flex-col relative">
                  <label for="" class="font-medium">Total Weight (kg) </label>
                  <input 
                      type="text" 
                      v-model="totalWeight"
                      v-bind="totalWeightAttrs"
                      class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                                w-full px-3 py-2 focus:border-secondary focus:ring-0 cursor-not-allowed"
                        readonly
                      required 
                      placeholder="0"
                  >
                  <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.totalWeight }}</p>
              </div>
              <div class="flex flex-col gap-6">
                  <div class="flex flex-col relative">
                      <label for="" class="font-medium">
                        Amount (NGN)
                      </label>
                      <input 
                          v-model="totalAmount"
                          v-bind="totalAmountAttrs" 
                          type="text" 
                          placeholder="0"
                          class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                                w-full px-3 py-2 focus:border-secondary focus:ring-0" 
                          required
                      >
                      <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.totalAmount }}</p>
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
                      <label for="">Customer Name</label>
                      <input 
                          type="text" 
                          v-model="name"
                          v-bind="nameAttrs" 
                          placeholder="name"
                          class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                      >
                      <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors['user.name'] }}</p>
                  </div>
                  <div class="flex flex-col relative">
                      <label for="">Customer Address</label>
                      <input 
                          type="text" 
                          v-model="address"
                          v-bind="addressAttrs" 
                          placeholder="address"
                          class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                      >
                      <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors['user.name'] }}</p>
                  </div>
                  <!-- <button 
                      type="submit" 
                      class="border-secondary text-secondary text-lg font-semibold rounded-lg border-[3px] 
                      px-3 py-1 hover:bg-secondary hover:text-white transition-all transform ease-in-out duration-300">
                      Generate Access Key
                  </button> -->
              </div>
              <div class="flex flex-col relative space-y-1">
                    <label for="" class="font-medium text-black">Payment Type</label>
                    <select 
                        v-model="paymentType"
                        as="select"
                        v-bind="paymentTypeAttrs"
                        type="number" 
                        class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                                w-full px-3 py-2 focus:border-secondary focus:ring-0 "
                        required 
                        placeholder="0"
                    >
                    <option value="">Select Type</option>
                    <option v-for="item in ['Cash', 'Transfer']" :key="item" :value="item">
                        {{ item }}
                    </option>
                    </select>
              </div>
              <button 
                  type="submit" 
                  class="border border-secondary text-white bg-secondary text-lg 
                  font-semibold px-3 py-1 mb-7 rounded-lg hover:bg-white hover:text-secondary hover:border-[3px]
                   hover:border-secondary transition-all transform ease-in-out duration-300">
                   Buy
              </button>
          </div>
      </form>


  </div>
</template>

<script setup lang="ts">

import { useForm, useFieldArray, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { PlusIcon, MinusIcon } from '@heroicons/vue/20/solid'
import { type User } from '@/composables/useTypes'

interface WasteType {
    id: string
    name: string
}
interface Waste {
   wasteType: string
   weight: number
}

const { $toast, $router } = useNuxtApp()
const { data, token } = useAuth()
const user: User = data.value

const { errors, defineField, meta, handleSubmit, isSubmitting, setFieldValue, controlledValues  } = useForm({
    validationSchema: toTypedSchema(
    yup.object({
        totalWeight: yup.number().required(),
        totalAmount: yup.number().required(),
        user: yup.object({
            name: yup.string().required(),
            address: yup.string().required()
        }),
        // wastes: yup.array().of(user)
        wastes: yup.array().of(
            yup.object().shape(
                {
                    wasteType: yup.string(),
                    weight: yup.number()
                }
            )
        ),
        paymentType: yup.string().required(),
        accountDetails: yup.object({
            account_name: yup.string().when("paymentType", {
                is: 'transfer', // alternatively: (val) => val == true
                then: schema => schema.required(),
                otherwise: schema => schema.optional(),
                // then: yup.string().required(),
                // otherwise: yup.string(),
            }),
            account_number: yup.string().when("paymentType", {
                is: 'transfer', // alternatively: (val) => val == true
                then: schema => schema.required(),
                otherwise: schema => schema.optional(),
            }),
            bank_code: yup.string().when("paymentType", {
                is: 'transfer', // alternatively: (val) => val == true
                then: schema => schema.required(),
                otherwise: schema => schema.optional(),
            }),
        }),
        // accountDetails: yup.string().when("paymentType", {
        //     is: true, // alternatively: (val) => val == true
        //     then: yup.object().shape(
        //         {
        //             account_name: yup.string().required(),
        //             account_number: yup.string().required(),
        //             bank_code: yup.string().required()
        //         }
        //     ),
        //     otherwise: yup.string(),
        // }),
    }),
    ),
    initialValues: {
        wastes: [
            { wasteType: '', weight: 0}
        ],
    },
});

const [totalWeight, totalWeightAttrs] = defineField('totalWeight');
const [totalAmount, totalAmountAttrs] = defineField('totalAmount');
const [paymentType, paymentTypeAttrs] = defineField('paymentType');
const [name, nameAttrs] = defineField('user.name');
const [address, addressAttrs] = defineField('user.address');
const { remove, push, fields } = useFieldArray<Waste>('wastes');

const getWasteTypeNameById = (id: string) => {
    let name: string = ''
    user.data.adminWasteType.forEach( item => {
        if(item.id === id) {
            name = item.name
        }
    })

    return name
}

watch(fields.value, (newValue, oldValue) => {
    let totalWeight = 0;
    for (const item of newValue) {
        totalWeight += item.value.weight;
    }

    // Calculate the total price
    const totalPrice = totalWeight * user.data.pricePerKg;

    setFieldValue('totalAmount', totalPrice)
    setFieldValue('totalWeight', totalWeight)
})

watch(paymentType, (newValue, oldValue) => {
 console.log('here')  
})


const onSubmit = handleSubmit( (values) => {
    console.log(values)
    useFetch(`${useBaseUrl()}/collections`, {
    method: 'post',
    headers: {
        Authorization: `${token.value}`,
    },
    body: {
        totalWeight: values.totalWeight,
        totalAmount: values.totalAmount,
        user: values.user,
        paymentType: values.paymentType.toLowerCase(),
        wastes: values.wastes,
    },
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

const verifyBank =  () => {
    useFetch(`${useBaseUrl()}/transactions/account-details`, {
        method: 'post',
        headers: {
            Authorization: `${token.value}`,
        },
        body: {
            acc_no: controlledValues.value.accountDetails?.account_number,
            bank_code: controlledValues.value.accountDetails?.bank_code,
        },
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
}


definePageMeta({
//   auth: false
})
</script>

<style>

</style>