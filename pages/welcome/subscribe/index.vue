<template>
  <div class="flex-grow p-5 md:p-12 2xl:px-20 pt-10 ">
    <div class="max-w-[979px] mx-auto w-full">
      <div class="pb-10">
        <h1 class="font-bold text-2xl">Subscription Plan</h1>
        <p>Make payment for your preferred plan</p>
      </div>

      <div class="md:w-[50%] md:mt-12 flex flex-col gap-6">
        <div class="card-shadow rounded-2xl flex flex-col px-7 py-4">
          <div
            class="flex justify-between border-b border-b-[#F2F2F2] w-full py-3"
          >
            <p>SUBSCRIPTION PLAN</p>
            <p class="mr-24">AMOUNT</p>
          </div>
          <div
            class="justify-between flex items-center border-b border-b-[#F2F2F2] w-full py-3"
          >
            <p><b>Free Plan</b></p>
            <div>
              <p>Free</p>
              <p>Renewal 0/Month</p>
            </div>
          </div>
          <div class="mt-2">
            <NuxtLink
                to="/welcome/subscribe/select"
              class="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-textGray text-textGray text-sm w-fit"
            >
              <img src="/img/change_vector.svg" alt="" />Change Plan
            </NuxtLink>
          </div>
        </div>
        <button
            @click.prevent="pay"
            class="uppercase text-white bg-secondary rounded-[10px] md:text-[28px] h-12 w-full md:h-20 md:w-[300px] 
            flex justify-center items-center font-semibold my-5 md:my-12"
        >
            proceed
        </button>

    </div>
    <div class="text-base md:text-2xl font-medium max-w-[988px]">
      <p class="font-bold mb-8">Note:</p>
      <p>
        Junkyard Free Plan will give you access to create only 1 recycler
        unit, and it is free forever.
      </p>
    </div>

    
    </div>
  </div>

  <!--  -->

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
    import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid'
    interface Plan {
        id: string;
        name: string;
        description: string;
        price: string;
    }

    interface Payment {
        gateway_response: string;
        status: string;
    }


    const duration = ref<string>("monthly");
    const payment_modal = ref<boolean>(false);
    const payment_details = ref<Payment>({
        gateway_response: '',
        status: ''
    });
    const selectedPlans = ref<Plan>({
        id: '',
        name: '',
        description: '',
        price: ''
    });

    const { token, getSession } = useAuth();

    const { $toast, $router, $config } = useNuxtApp();
    const getPlans = async () => {
    // alert('here')
    await $fetch(`${useBaseUrl()}/plans`, {
        method: "get",
        headers: {
        Authorization: `${token.value}`,
        },
        onResponse({ request, response, options }) {
        // Process the response data
        // alert('here')
        if (response.ok) {
            $toast.success(response._data.message);
            const res: Plan[] = response._data.data;

            res.forEach((plan) => {
            if(plan.description === 'Free plan') {
                selectedPlans.value = plan
            }
            });
        }
        },
        onResponseError({ request, response, options }) {
        $toast.error(response._data.message);
        },
    });
    };



    const pay = async () => {
        // alert('here')
        payment_modal.value = false
        await $fetch(`${useBaseUrl()}/plans/initiate-subscription`, {
            method: "post",
            headers: {
                Authorization: `${token.value}`,
            },
            body: {
                planId: selectedPlans.value.id
            },
            async onResponse({ request, response, options }) {
                if (response.ok) {
                    $toast.success(response._data.message);
                    await getSession()
                    $router.push('/')
                    // navigateTo(response._data.data.url)
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
                    payment_details.value = response._data.data
                    payment_modal.value = true
                    // console.log(response._data.data)
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
            },
        });
    }

    useLazyAsyncData(() => getPlans(), { server: false });

    definePageMeta({
    layout: "blank",
    //   middleware: ['auth', 'setup']
    });
</script>

<style></style>
