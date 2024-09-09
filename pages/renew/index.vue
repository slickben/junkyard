<template>
    <div class="flex-grow p-5 md:p-12 2xl:px-20 pt-5 md:pt-10 relative ">
        <div class="max-w-[979px] w-full">
            <!-- {{ myPlan }} -->
            <div class="">
            <h1 class="font-bold text-base 2xl:text-4xl md:text-2xl">Renew Subscription</h1>
            </div>

            <div class="card-shadow rounded-2xl flex flex-col px-4 md:px-7 my-10 py-2 md:py-4 mt-5 md:mt-10">
                <div
                    class="flex justify-between  border-b border-b-[#F2F2F2] w-full py-3 text-sm md:text-base"
                >
                    <p class="uppercase">
                        <b>Current PLAN</b>
                    </p>
                    <p class="">AMOUNT</p>
                </div>
                <div class="justify-between flex w-full py-3 text-sm md:text-bas">
                    <p>
                        <b>{{ myPlan?.name }}</b>
                    </p>
                    <div class="text-right">
                        <p>
                            <b>{{ myPlan?.price ? useCurrencyFormat(myPlan?.price) : ''}}</b>
                        </p>
                        <p>Renewal {{ myPlan?.price ? useCurrencyFormat(myPlan?.price) : '' }}/{{ myPlan?.description ? myPlan?.description : ''}}</p>
                    </div>
                </div>
            </div>


            <div class="grid grid-cols-3 gap-2 gap-y-10 md:gap-10 mb-16">
                <button
                    v-for="item in plans.filter(i => i.description !== 'Free plan')" :key="item.description"
                    @click="duration = item.description"
                    :class="[duration === item.description ? 'active' : '']"
                    class="text-sm md:text-xl font-semibold hover:bg-secondary hover:text-white p-2 px-2 2xl:py-7 xl:p-4
                    2xl:px-20 xl:px-20 transition-all transform ease-in duration-300 rounded md:rounded-3xl text-center card-shadow capitalize"
                >
                    {{item.description}}
                </button>

                <div
                    v-for="item in selectedPlans.sort((a, b) => parseInt(a.price) - parseInt(b.price))" :key="item.id"
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl col-span-3 md:col-span-1">
                    <div
                    class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                        <h2 class="text-2xl font-semibold">{{ useCurrencyFormat(item.price) }}</h2>
                        <p class="font-medium">
                            {{ item.name }}
                        </p>
                        <p class="text-sm">7 Days trial</p>
                    </div>
                    <div class="text-center space-y-2 py-2">
                        <p><b>What's included</b></p>
                        <p class="text-sm">{{ item.name === 'Premium Plan' ? 'Unlimited' : item.name === 'Standard Plan' ? '2' : '1'}} User Access</p>
                        <p class="text-sm">Analytics Report</p>
                        <p class="text-sm">Take Pick up Request</p>
                        <p class="text-sm">Take Drop off Booking</p>
                        <p class="text-sm">Admin Panel Access</p>
                    </div>
                    <div class="py-2 flex items-center justify-center relative">
                        <NuxtLink :to="`/renew/${ item.id }?duration=${duration}`"
                            class="bg-secondary text-white px-10 py-3 rounded-xl text-center font-semibold hover:bg-opacity-70 ease-out 
                            transition-opacity duration-300 transform" >
                            Select Plan
                        </NuxtLink>

                        <p v-if="selectedPlans.length < 1" class="absolute inset-0"></p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isLoading"  class=" absolute inset-0 flex items-center justify-center bg-white">
          <svg   
            class="w-32 h-32 animate-spin"
            
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              class="opacity-75 text-secondary"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-100 text-secondary"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        </div>
    </div>
</template>

<script setup lang="ts">

    import  { type Plan, type GroupPlans} from '@/composables/useTypes'
    const isLoading = ref(false)
    import { useStore } from '@/store/index'

    const store = useStore()

    const duration = ref<string>('Monthly')

    const selectedPlans = ref<Plan[]>([])

    const { token, data } = useAuth()

    const plans = ref<GroupPlans[]>([])
    const myPlan = ref<Plan>({
        id: '',
        name: '',
        description: '',
        price: ''
    });

    const { $toast, $router } = useNuxtApp()
    const getPlans = async () => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/plans`, {
            
        method: 'get',
        headers: {
            Authorization: `${token.value}`
        },
        onResponse({ request, response, options }) {
            // Process the response data
            isLoading.value = false
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
                        description: ''
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

                myPlan.value = res.find( i => i.id === data.value.data.planId)

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
            isLoading.value = false
            $toast.error(response._data.message)
        }
    })

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
    //   auth: false
    })
</script>

<style>

</style>