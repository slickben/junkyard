<template>
    <div class="flex-grow p-12 2xl:px-20 pt-10">
        <div class="max-w-[979px] w-full">
            <div class="">
            <h1 class="font-bold text-2xl">Subscription</h1>
            <p class="text-sm text-textGray py-4 capitalize">
                Subscription > {{ query.duration }} >  {{ plan.name }} >
                <span class="text-black font-semibold text-sm"
                >Review & Checkout</span
                >
            </p>
            </div>

            <!-- <pre>
                {{plan}}
            </pre> -->

            <div class="flex gap-9">
    <!-- Right -->
                <div class="w-[50%] mt-12 flex flex-col gap-6">
                    <div class="card-shadow rounded-2xl flex flex-col px-7 py-4">
                    <div
                        class="flex justify-between  border-b border-b-[#F2F2F2] w-full py-3"
                    >
                        <p>SUBSCRIPTION PLAN</p>
                        <p class="mr-24">AMOUNT</p>
                    </div>
                    <div class="justify-between flex border-b border-b-[#F2F2F2] w-full py-3">
                        <p>
                            {{ plan.name }}
                        </p>
                        <div>
                        <p>N{{plan.price}}</p>
                        <p class=" capitalize">Renewal {{plan.price}}/{{ query.duration }}</p>
                        </div>
                    </div>
                    <div class="mt-2">
                        <NuxtLink to="/renew" 
                            class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-textGray text-textGray
                             text-sm w-fit">
                            <img src="/img/change_vector.svg" alt="" />Change Plan
                        </NuxtLink>
                    </div>
                    </div>
        
        
                    <div class="card-shadow rounded-2xl flex flex-col px-7 py-4">
                    <div
                        class="border-b border-b-[#F2F2F2] w-full py-3"
                    >
                        <p>PAYMENT OPTIONS</p>
                    </div>
                    <div class="font-semibold">
                        <div class="border-b border-b-[#F2F2F2] w-full py-3 cursor-pointer">
                        <input type="radio" id="formRadio1" class="form-radio hover:text-secondary focus:outline-secondary h-3 w-3 cursor-pointer" name="radio-option" value="Bank Payment">
                        <label class="ml-2 cursor-pointer hover:text-secondary " for="formRadio1">Bank Payment</label>
                        </div>
                        <div class="w-full py-3 cursor-pointer">
                        <input type="radio" id="formRadio" class="text-secondary h-3 w-3 cursor-pointer hover:text-secondary" name="radio-option" value="Card (Mastercard/Verve)">
                        <label class="ml-2 hover:text-secondary cursor-pointer text-secondary" for="formRadio">Card (Mastercard/Verve)</label>
                        </div>
                    </div>
                    
                    
                    </div>
                </div>
        
                <!-- Left -->
                <div class="">
                    <div class="rounded-3xl bg-secondary text-white card-shadow mt-12 px-6 py-7">
                    <div class="text-white font-semibold">
                        Order Summary
                    </div>
                    <div class="flex justify-between border-b border-b-textGray border-opacity-50 text-white text-sm py-4">
                        <p class="">Subtotal</p>
                        <p>N{{plan.price}}</p>
                    </div>
                    <div class="flex justify-between border-b border-b-textGray border-opacity-50 text-textGray py-4">
                        <p>VAT @7.5%</p>
                        <p>N425.78</p>
                    </div>
                    <div class="flex justify-between items-center border-b-textGray py-4">
                        <div class="flex flex-col">
                        <p class="text-textGray text-sm">Total</p>
                        <p class="text-white text-sm capitalize">{{ query.duration }}</p>
                        </div>
                        <div class="mt-4">
                        <p class="text-white text-sm">N{{plan.price}}</p>
                        </div>
                    </div>
                    <div class="flex flex-col py-4">
                        <p class="text-textGray text-sm">Total due today</p>
                        <p class="text-white text-2xl font-medium">N{{plan.price}}</p>
                        <div class="flex items-center justify-center mt-7">
                        <button @click.prevent="pay" class="text-white text-lg rounded-lg border-2 border-white px-20 py-">checkout</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <HeadTransitionRoot appear :show="payment_modal" as="template">
    <HeadDialog as="div" @close="payment_modal = !payment_modal" class="relative z-10">
      <HeadTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
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
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
                <CheckCircleIcon v-if="payment_details.status === 'success'" class="w-20 h-20 mx-auto text-secondary" />
                <ExclamationCircleIcon v-else class="w-20 h-20 mx-auto text-red-500" />
                <HeadDialogTitle
                    as="h3"
                    class="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                    {{ payment_details.status }}
                </HeadDialogTitle>
                <div class="mt-2 px-8 text-center">
                    <p class="text-sm text-gray-500">
                        {{payment_details.gateway_response}}
                    </p>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <button
                        v-if="payment_details.status !== 'success'"
                        @click.prevent="pay"
                        class="uppercase text-white bg-secondary rounded-[10px] px-4 py-2 
                        flex justify-center items-center font-semibold my-12"
                    >
                        Retry
                    </button>
                    <NuxtLink
                        v-else
                        to="/"
                        class="uppercase text-white bg-secondary rounded-[10px] px-4 py-2 
                        flex justify-center items-center font-semibold my-12"
                    >
                        Dashboard
                    </NuxtLink>
                    <button
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="payment_modal = !payment_modal"
                        >
                        Close
                    </button>
                    
                </div>
            </HeadDialogPanel>
          </HeadTransitionChild>
        </div>
      </div>
    </HeadDialog>
  </HeadTransitionRoot>
</template>

<script setup lang="ts">
    import { useStore } from '@/store/index'
    import { type Plan } from '@/composables/useTypes'
    import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid'
    const params = useRoute().params
    const query = useRoute().query

    const plan = ref<Plan>({
        id: '',
        name: '',
        description: '',
        price: ''
    })

    interface Payment {
        gateway_response: string;
        status: string;
    }


    const payment_modal = ref<boolean>(false);

    const payment_details = ref<Payment>({
        gateway_response: '',
        status: ''
    });

    const { token, getSession } = useAuth();

    const { $toast, $router } = useNuxtApp();
    const store = useStore()


    const pay = async () => {
        // alert('here')
        payment_modal.value = false
        await $fetch(`${useBaseUrl()}/plans/initiate-subscription`, {
            method: "post",
            headers: {
                Authorization: `${token.value}`,
            },
            body: {
                planId: plan.value.id
            },
            onResponse({ request, response, options }) {
                if (response.ok) {
                    $toast.success(response._data.message);
                    console.log(response._data.data.url)
                    navigateTo(response._data.data.url, { external: true})
                }
            },
            async onResponseError(  { request, response, options }) {
                $toast.error(response._data.message);
                if(response._data.message === 'Admin already has a subscription field'){
                    $toast.error('Verifying Payment Details');
                    await verifyTransaction(response._data.transactionReference)
                }else {
                    await getSession()
                    $router.push('/')
                }
            },
        });
    };

    const verifyTransaction = async (id: string) => {
        await $fetch(`${useBaseUrl()}/transactions/paystack/verify-transaction?reference=${id}`, {
            headers: {
                Authorization: `${token.value}`,
            },
            onResponse({ request, response, options }) {
                // Process the response data
                // alert('here')
                if (response.ok) {
                    $toast.success(response._data.message);
                    payment_details.value = response._data.data.data
                    payment_modal.value = true
                    getSession()
                    // console.log(response._data.data)
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
            },
        });
    }

    onMounted( () => {
        plan.value = store.selectedPlan.find( i => i.id === params.id)
    })
    definePageMeta({
        // layout: 'blank',
    })
</script>

<style>

</style>