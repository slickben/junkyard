<template>
    <div class="flex-grow px-5 md:p-12 2xl:px-20 pt-10 ">
        <div class="max-w-[979px] mx-auto w-full">
            <div class="pb-10">
            <h1 class="font-bold text-2xl">Subscription Plan</h1>
            <p>Pick your preferred plan</p>
            </div>

            <div class="grid grid-cols-3 gap-2 gap-y-10 md:gap-10 mb-16">
                <button
                    v-for="item in plans.filter(i => i.description !== 'Basic')" :key="item.description"
                    @click="duration = item.description"
                    :class="[duration === item.description ? 'active' : '']"
                    class="text-sm md:text-xl font-semibold hover:bg-secondary hover:text-white p-2 px-2 2xl:py-7 xl:p-4
                    2xl:px-20 xl:px-20 transition-all transform ease-in duration-300 rounded md:rounded-3xl text-center card-shadow capitalize"
                >
                    {{item.description}}
                </button>
                
                <div
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl col-span-3 md:col-span-1">
                    <div
                    class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                        <!-- <h2 class="text-2xl font-semibold">N{{ 0.00 }}</h2> -->
                        <p class="font-medium">
                            {{ 'Basic Plan' }}
                        </p>
                        <p class="text-sm">7 Days trial</p>
                    </div>
                    <div class="text-center space-y-2 py-2">
                        <p><b>What's included</b></p>
                        <p class="text-sm">{{ '1' }} User Acess</p>
                        <p class="text-sm">Analytics Report</p>
                        <p class="text-sm">Take Pick up Request</p>
                        <p class="text-sm">Take Drop off Boking</p>
                        <p class="text-sm">Admin Panel Acess</p>
                    </div>
                    <div class="py-2 flex items-center justify-center relative">
                        <button @click="pay(plans.find( itm => itm.description === 'Basic')?.plans[0].id)"
                            class="bg-secondary text-white px-10 py-3 rounded-xl text-center font-semibold hover:bg-opacity-70 ease-out 
                            transition-opacity duration-300 transform" >
                            Select Plan
                        </button>

                        <!-- <p v-if="selectedPlans.length < 1" class="absolute inset-0"></p> -->
                    </div>
                </div>
                <div
                v-for="item in selectedPlans.sort((a, b) => parseInt(a.price) - parseInt(b.price))" :key="item.id"
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl col-span-3 md:col-span-1">
                    <div
                        class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                        <div>
                            <h2 class="text-2xl font-semibold">{{ item.description === 'Monthly' ? useCurrencyFormat(item.price) : useCurrencyFormat(calculateTenPercent(item.price)) }} </h2>
                            <h2 v-if="item.description !== 'Monthly'" class="text-lg font-semibold text-gray-500 line-through">{{ useCurrencyFormat(item.price) }}</h2>
                        </div>
                        <p class="font-medium">
                            {{ item.name }}
                        </p>
                        <!-- <p class="text-sm">7 Days trial</p> -->
                    </div>
                    <div class="text-center space-y-2 py-2">
                        <p><b>What's included</b></p>
                        <p class="text-sm">{{ item.name === 'Premium Plan' ? 'Unlimited' : item.name === 'Standard Plan' ? '2' : '1'}} User Acess</p>
                        <p class="text-sm">Analytics Report</p>
                        <p class="text-sm">Take Pick up Request</p>
                        <p class="text-sm">Take Drop off Boking</p>
                        <p class="text-sm">Admin Panel Acess</p>
                    </div>
                    <div class="py-2 flex items-center justify-center relative">
                        <NuxtLink :to="`/welcome/subscribe/${ item.id }?duration=${duration}`"
                            class="bg-secondary text-white px-10 py-3 rounded-xl text-center font-semibold hover:bg-opacity-70 ease-out 
                            transition-opacity duration-300 transform" >
                            Select Plan
                        </NuxtLink>

                        <p v-if="selectedPlans.length < 1" class="absolute inset-0"></p>
                    </div>
                </div>
            </div>

            <button @click="$router.push('/welcome/subscribe')" class="text-2xl text-textGray font-bold mb-10 md:mb-0">PREVIOUS</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import  { type Plan, type GroupPlans} from '@/composables/useTypes'
    import { useStore } from '@/store/index'
    interface Payment {
        gateway_response: string;
        status: string;
    }
    const payment_modal = ref<boolean>(false);
    const payment_details = ref<Payment>({
        gateway_response: '',
        status: ''
    });

    function calculateTenPercent(amount: any, persent = 0.9) {
        return Number(amount) * persent;
    }
    const store = useStore()

    const duration = ref<string>('Monthly')
    const selectedPlans = ref<Plan[]>([])

    const { token, getSession } = useAuth()
    const plans = ref<GroupPlans[]>([])



    const { $toast, $router } = useNuxtApp()
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
                const groupedPlans: { [key: string]: Plan[] } = {};

                res.forEach(plan => {
                    if (!groupedPlans[plan.description]) {
                        groupedPlans[plan.description] = [];
                    }
                    groupedPlans[plan.description].push({
                        id: plan.id, name: plan.name, price: plan.price,
                        description: plan.description
                    });
                });

                const groupedArray: GroupPlans[] = Object.keys(groupedPlans).map(description => ({
                    description: description,
                    plans: groupedPlans[description]
                }));
                const sortedGroupedArray: GroupPlans[] = groupedArray.sort((a, b) => {
                    if (a.description === "Monthly") {
                        return -1; // "monthly" comes before "annually"
                    } else if (b.description === "Monthly") {
                        return 1; // "annually" comes after "monthly"
                    } else {
                        return 0; // No change in order for other descriptions
                    }
                });

                plans.value = sortedGroupedArray

                const sL: Plan[] = plans.value.find( i => i.description == duration.value)?.plans
                // console.log(s, newX)
                if(sL) {
                    selectedPlans.value = sL
                    store.selectedPlan = sL
                }else {
                    selectedPlans.value = []
                }
            }
        },
        onResponseError({ request, response, options }) {
            $toast.error(response._data.message)
        }
    })

    }

    const pay = async (id: string) => {
        // alert('here')
        payment_modal.value = false
        await $fetch(`${useBaseUrl()}/plans/initiate-subscription`, {
            method: "post",
            headers: {
                Authorization: `${token.value}`,
            },
            body: {
                planId: id
            },
            async onResponse({ request, response, options }) {
                if (response.ok) {
                    $toast.success(response._data.message);
                    await getSession()
                    $router.push('/')
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

    watch(duration, newX => {
        const sL: Plan[] = plans.value.find( i => i.description == newX)?.plans
        // console.log(s, newX)
        if(sL) {
            selectedPlans.value = sL
            store.selectedPlan = sL
        }else {
            selectedPlans.value = []
        }
    
    })
  
    useLazyAsyncData( () => getPlans(), { server: false });
    
    definePageMeta({
        layout: 'blank',
    })
</script>

<style>

</style>