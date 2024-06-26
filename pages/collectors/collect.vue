<template>
  <div class="bg-fakeWhite h-full py-2 md:py-12 px-5 md:px-12 2xl:px-20 w-full overflow-auto ">
    <div class="md:w-[741px]">
      <h1 class="2xl:text-4xl xl:text-2xl font-bold md:mb-5">Collect Item</h1>
      <NuxtLink to="/collectors" class="text-textGray text-sm font-semibold">Dashboard > 
          <span class="text-black">Collect</span>
      </NuxtLink>

      <form @submit.prevent="onSubmit" class="mt-5 md:mt-12">
          <div class="card-shadow px-4 md:px-12 py-5 md:py-9 rounded-3xl grid grid-cols-2 gap-5">
            <div class="w-full rounded-2xl md:bg-white col-span-2">
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
                        <div class="flex flex-col relative space-y-1">
                            <label for="" class="font-medium text-black">Buy Price</label>
                            <input 
                                type="number"
                                v-model="field.value.price"
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
                <button @click="push({ wasteType: '', weight: 0, price: 0})" class="bg-secondary w-fit px-2 flex items-center rounded py-1 ml-auto mt-2 text-white">
                    Add Item
                    <PlusIcon
                            class="h-5 w-5"
                        />
                </button>
                
            </div>
            <div class="flex flex-col relative col-span-1">
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
            <div class="flex flex-col relative col-span-1">
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
            <div class="flex flex-col relative col-span-1">
                <label for="">Customer Phone Number</label>
                <input 
                    type="text" 
                    v-model="phoneNumber"
                    v-bind="phoneNumberAttrs" 
                    placeholder="address"
                    class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                >
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">
                    {{ errors['user.phoneNumber'] }}
                </p>
            </div>
            <div class="flex flex-col relative space-y-1">
                <label for="" class="font-medium text-black">Gender</label>
                <select 
                    v-model="gender"
                    as="select"
                    v-bind="genderAttrs"
                    type="number" 
                    class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                            w-full px-3 py-2 focus:border-secondary focus:ring-0 "
                    required 
                    placeholder="0"
                >
                <option value="">Select Gender</option>
                <option v-for="item in ['Male', 'Female']" :key="item" :value="item">
                    {{ item }}
                </option>
                </select>
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">
                    {{ errors['user.gender'] }}
                </p>
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
                        w-full px-3 py-2 focus:border-secondary focus:ring-0 cursor-not-allowed" 
                    required
                    readonly
                >
                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.totalAmount }}</p>
            </div>
            <!-- </div> -->
            <div class="flex flex-col relative space-y-1">
                <label for="" class="font-medium text-black">Collection Type</label>
                <select 
                    v-model="collection_type"
                    as="select"
                    v-bind="collection_typeAttrs"
                    type="number" 
                    class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                            w-full px-3 py-2 focus:border-secondary focus:ring-0 "
                    required 
                    placeholder="0"
                >
                <option value="">Select Type</option>
                <option v-for="item in ['Pick up', 'Drop off']" :key="item" :value="item">
                    {{ item }}
                </option>
                </select>
            </div>
            <div class="flex flex-col relative space-y-1">
                <label for="" class="font-medium text-black">Producer</label>
                <select 
                    v-model="producer_type"
                    as="select"
                    v-bind="producer_typeAttrs"
                    type="number" 
                    class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                            w-full px-3 py-2 focus:border-secondary focus:ring-0 "
                    required 
                    placeholder="0"
                >
                <option value="">Select Type</option>
                <option v-for="item in ['Household', 'Corporate Clients', 'Public Places', 'Clean Up']" :key="item" :value="item">
                    {{ item }}
                </option>
                </select>
            </div>
            <div class="flex flex-col col-span-2 relative space-y-1">
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
  </div>

    <HeadTransitionRoot appear :show="addBankModal" as="template">
        <HeadDialog as="div" @close="closeBankModal" class="relative z-10">
            <HeadTransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/50" />
            </HeadTransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                class="flex min-h-full items-center justify-center p-4 text-center"
                >
                <HeadTransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                >
                    <HeadDialogPanel
                    class="w-full max-w-md space-y-7 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                    >

                        <HeadDialogTitle
                            as="h3"
                            class="text-xl font-medium leading-6 text-gray-900 text-center"
                        >
                            <b>{{ 'Add bank' }}</b>
                        </HeadDialogTitle>
                        
                        <div >
                            <div class="space-y-8">
                                <div class="flex flex-col relative space-y-1">
                                    <label for="" class="font-medium text-black">Bank</label>
                                    <select 
                                        v-model="bank_code"
                                        as="select"
                                        v-bind="bank_codeAttrs"
                                        type="number" 
                                        class="border-2 border-secondary focus:outline-none text-base placeholder:text-black rounded-lg 
                                                w-full px-3 py-2 focus:border-secondary focus:ring-0 "
                                        required 
                                        placeholder="0"
                                    >
                                        <option value="">Select Type</option>
                                        <option v-for="item in banks" :key="item.bank_code" :value="item.bank_code">
                                            {{ item.bank_name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="flex flex-col relative">
                                    <label for="">Account Number</label>
                                    <input 
                                        type="text" 
                                        v-model="account_number"
                                        v-bind="account_numberAttrs" 
                                        placeholder="name"
                                        class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                                    >
                                    <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors['accountDetails.account_number'] }}</p>
                                </div>
                                <div v-if="account_name" class="flex flex-col relative">
                                    <label for="">Account Name</label>
                                    <input 
                                        type="text" 
                                        v-model="account_name"
                                        v-bind="account_nameAttrs" 
                                        placeholder="name"
                                        class="border-secondary focus:outline-none rounded-lg px-3 py-2 border-[3px]"
                                        readonly
                                    >
                                    <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors['accountDetails.account_name'] }}</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between gap-x-10 pt-6">
                                <button
                                        type="button"
                                        @click="verifyBank"
                                        class="text-center flex-1 p-4 rounded-md text-white font-bold
                                        hover:opacity-80 transition-all duration-300 ease-in-out py-4 relative bg-secondary"
                                    >
                                        <svg
                                        v-show="isLoading"
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
                                        <span :class="{ invisible: isLoading }">
                                        {{  account_name ? 'Add' : 'Validate' }}
                                        </span>
                                </button>
                                
                            </div>
                        </div>
                    </HeadDialogPanel>
                </HeadTransitionChild>
                </div>
            </div>
        </HeadDialog>
    </HeadTransitionRoot>
</template>

<script setup lang="ts">

import { useForm, useFieldArray, Field } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { PlusIcon, MinusIcon } from '@heroicons/vue/20/solid'
import { type User } from '@/composables/useTypes'

interface  Bank {
    bank_code: string
    bank_name: string
    currency: string
}
interface Waste {
   wasteType: string
   weight: number,
   price: number
}

const { $toast, $router } = useNuxtApp()
const { data, token } = useAuth()
const addBankModal = ref(false)
const user: User = data.value
const isLoading = ref(false)
// const buyPrice = ref(0)
const banks = ref<Bank[]>([])

const { errors, defineField, meta, handleSubmit, isSubmitting, setFieldValue, controlledValues  } = useForm({
    validationSchema: toTypedSchema(
    yup.object({
        totalWeight: yup.number().required().label('Total Weight'),
        totalAmount: yup.number().required().label('Total Amount'),
        user: yup.object({
            name: yup.string().required().label('Name'),
            address: yup.string().required().label('Address'),
            phoneNumber: yup.string().required().label('Phone Number'),
            gender: yup.string().required().label('Gender')
        }),
        // wastes: yup.array().of(user)
        wastes: yup.array().of(
            yup.object().shape(
                {
                    wasteType: yup.string(),
                    weight: yup.number(),
                    price: yup.number()
                }
            )
        ),
        paymentType: yup.string().required().label('Payment Type'),
        collection_type: yup.string().required().label('Collection Type'),
        producer_type: yup.string().required().label('Producer Type'),
        accountDetails: yup.object({
            account_name: yup.string().when("paymentType", {
                is: 'Transfer', // alternatively: (val) => val == true
                then: schema => schema.required(),
                otherwise: schema => schema.optional(),
                // then: yup.string().required(),
                // otherwise: yup.string(),
            }),
            account_number: yup.string().when("paymentType", {
                is: 'Transfer', // alternatively: (val) => val == true
                then: schema => schema.required(),
                otherwise: schema => schema.optional(),
            }),
            bank_code: yup.string().when("paymentType", {
                is: 'Transfer', // alternatively: (val) => val == true
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
            { wasteType: '', weight: 0, price: 0}
        ],
    },
});

const closeBankModal = () => {
    addBankModal.value = false
    setFieldValue('paymentType', '')
}

const [totalWeight, totalWeightAttrs] = defineField('totalWeight');
const [totalAmount, totalAmountAttrs] = defineField('totalAmount');
const [paymentType, paymentTypeAttrs] = defineField('paymentType');
const [name, nameAttrs] = defineField('user.name');
const [phoneNumber, phoneNumberAttrs] = defineField('user.phoneNumber');
const [gender, genderAttrs] = defineField('user.gender');
const [collection_type, collection_typeAttrs] = defineField('collection_type');
const [producer_type, producer_typeAttrs] = defineField('producer_type');
const [address, addressAttrs] = defineField('user.address');
const [account_name, account_nameAttrs] = defineField('accountDetails.account_name');
const [account_number, account_numberAttrs] = defineField('accountDetails.account_number');
const [bank_code, bank_codeAttrs] = defineField('accountDetails.bank_code');
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
    let itemPrice = 0
    for (const item of newValue) {
        totalWeight += Number(item.value.weight);
        itemPrice += Number(item.value.price);
    }

    // Calculate the total price
    // const totalPrice = buyPrice.value < 1 ? totalWeight * user.data.pricePerKg : totalWeight * buyPrice.value;
    const totalPrice = totalWeight * itemPrice 

    setFieldValue('totalAmount', totalPrice)
    setFieldValue('totalWeight', totalWeight)
})

// watch(buyPrice, (newValue, oldValue) => {

//     // Calculate the total price
//     const totalPrice = totalWeight.value * buyPrice.value;

//     setFieldValue('totalAmount', totalPrice)
// })

watch(paymentType, (newValue, oldValue) => {
 if(newValue === 'Transfer') {
    addBankModal.value = true
 }
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
        collection_type: values.collection_type,
        producer_type: values.producer_type,
        wastes: values.wastes,
        accountDetails: values.accountDetails
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
    isLoading.value = true
    if(controlledValues.value.accountDetails?.account_name) {
        addBankModal.value = false
        isLoading.value = false
        return
    }else {
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
                    // $router.back()
                    // console.log(response._data.data)
                    setFieldValue('accountDetails.account_name', response._data.data.account_name)
                }
                isLoading.value = false
            },
            onResponseError({ request, response, options }) {
                // console.log(response)
                $toast.error(response._data.message)
                isLoading.value = false
            }
        })
    }
}

const getBanks = async () => {
//   isLoading.value = true
  // console.log(data.value.data.id)s
  await $fetch(`${useBaseUrl()}/transactions/all-banks`, {
      headers: {
          Authorization: `${token.value}`,
      },
      onResponse({ request, response, options }) {
          // Process the response data
        //   isLoading.value = false
          if (response.ok) {
              $toast.success(response._data.message);
              banks.value = response._data.data
              // payment_modal.value = true
              // overview.value = response._data
            //   console.log(response._data.data)
              
          }
      },
      onResponseError({ request, response, options }) {
          $toast.error(response._data.message);
        //   isLoading.value = false
      },
  });
}

const getAddress = async (lat: number, long: number) =>  {
    await $fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB2O2LnwRIFd2OM1qXvIX8s25d7orAisdE`, {
      onResponse({ request, response, options }) {
          // Process the response data
        //   isLoading.value = false
          if (response.ok) {
              $toast.success(response._data.message);
              setFieldValue('user.address', response._data.results[0].formatted_address)
            //   banks.value = response._data.data
              // payment_modal.value = true
              // overview.value = response._data
            //   console.log(response._data)
            // data.results[0].formatted_address
              
          }
      },
      onResponseError({ request, response, options }) {
          $toast.error(response._data.message);
        //   isLoading.value = false
      },
  });
    
} 

onMounted( async () => {
  await getBanks()

//   navigator.geolocation.getCurrentPosition(
//       position => {
//         console.log(position.coords.accuracy)
//          getAddress(position.coords.latitude, position.coords.longitude)
//       },
//       error => {
//          console.log(error.message);
//       },
//    )
   navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        getAddress(position.coords.latitude, position.coords.longitude)
    },
    function error(msg) {alert('Please enable your GPS position feature.');},
    {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
})

definePageMeta({
//   auth: false
})
</script>

<style>

</style>