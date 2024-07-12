<template>
    <div class="flex-grow p-12 2xl:px-20 pt-10">
        <div class="max-w-[979px] mx-auto w-full">
            <div class="pb-10">
            <h1 class="font-bold text-2xl">Subscription Plan</h1>
            <p>Pick your preferred plan</p>
            </div>

            <div class="grid grid-cols-3 gap-10 mb-16">
                <button
                    v-for="item in plans.filter(i => i.description !== 'Free plan')" :key="item.description"
                    @click="duration = item.description"
                    :class="[duration === item.description ? 'active' : '']"
                    class="text-xl font-semibold hover:bg-secondary hover:text-white 2xl:py-7 xl:p-4
                    2xl:px-20 xl:px-20 transition-all transform ease-in duration-300 rounded-3xl text-center card-shadow capitalize"
                >
                    {{item.description}}
                </button>

                <!-- <pre>
                    {{ selectedPlans }}
                </pre> -->

                <!-- <div
                    v-if="selectedPlans.length > 0"
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl">
                    <div
                    class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                    <h2 class="text-2xl font-semibold">N{{ selectedPlans[0].price }}</h2>
                    <p class="font-medium">
                        {{ selectedPlans[0].name }}
                    </p>
                    <p class="text-sm">7 Days trial</p>
                    </div>
                    <div class="text-center space-y-2 py-2">
                    <p><b>What's included</b></p>
                    <p class="text-sm">5 User Acess</p>
                    <p class="text-sm">Analytics Report</p>
                    <p class="text-sm">Take Pick up Request</p>
                    <p class="text-sm">Take Drop off Boking</p>
                    </div>
                    <div class="py-2 mt-6 flex items-center justify-center relative">
                    <NuxtLink :to="`/welcome/subscribe/${ selectedPlans[0].id }?duration=${duration}`"
                        class="bg-secondary text-white px-10 py-3 rounded-xl text-center font-semibold
                        hover:bg-opacity-70 ease-out transition-opacity duration-300 transform">
                        Select Plan
                    </NuxtLink>
                    <p v-if="selectedPlans.length < 1" class="absolute inset-0"></p>
                    </div>
                </div>
                <div
                    v-if="selectedPlans.length > 1"
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl" >
                    <div
                        class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                        <h2 class="text-2xl font-semibold">N{{ selectedPlans[2].price }}</h2>
                        <p class="font-medium">
                            {{ selectedPlans[2].name }}
                        </p>
                        <p class="text-sm">7 Days trial</p>
                    </div>
                    <div class="text-center space-y-2 py-2">
                        <p><b>What's included</b></p>
                        <p class="text-sm">5 User Acess</p>
                        <p class="text-sm">Analytics Report</p>
                        <p class="text-sm">Take Pick up Request</p>
                        <p class="text-sm">Take Drop off Boking</p>
                        <p class="text-sm">Admin Panel Acess</p>
                    </div>
                    <div class="py-2 flex items-center justify-center relative">
                        <NuxtLink :to="`/welcome/subscribe/${selectedPlans[2].id}?duration=${duration}`"
                        class="bg-secondary text-white px-10 py-3 rounded-xl text-center font-semibold hover:bg-opacity-70
                        ease-out transition-opacity duration-300 transform" >
                        Select Plan
                        </NuxtLink>
                        <p v-if="selectedPlans.length < 1" class="absolute inset-0"></p>
                    </div>
                </div> -->
                <div
                v-for="item in selectedPlans.sort((a, b) => parseInt(a.price) - parseInt(b.price))" :key="item.id"
                    class="border-2 border-secondary card-shadow px-10 py-3 rounded-3xl">
                    <div
                    class="border-b-2 border-b-secondary text-center py-2 space-y-3" >
                        <h2 class="text-2xl font-semibold">N{{ item.price }}</h2>
                        <p class="font-medium">
                            {{ item.name }}
                        </p>
                        <p class="text-sm">7 Days trial</p>
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

            <button @click="$router.push('/welcome/subscribe')" class="text-2xl text-textGray font-bold">PREVIOUS</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import  { type Plan, type GroupPlans} from '@/composables/useTypes'
    import { useStore } from '@/store/index'

    const store = useStore()

    const duration = ref<string>('Monthly')
    const selectedPlans = ref<Plan[]>([])

    const { token } = useAuth()
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