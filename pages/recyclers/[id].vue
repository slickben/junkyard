<template>
    <div class="bg-fakeWhite h-full flex-grow py-12 px-12 2xl:px-20 relative">
        <h1  class="2xl:text-4xl xl:text-2xl font-bold mb-5">Recycler Units</h1>
        <button @click="$router.back()" class="text-textGray text-sm font-semibold"
            >Recycler Units > <span class="text-black">{{user.data.businessInfo.name}} {{ collector.name }}</span></button
        >
        <div class="relative grid grid-cols-3 gap-16 my-8">
          <!-- first overview -->
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Weight()Kg</p>
              <p class="2xl:text-xl xl:text-sm font-bold">
                {{ overview.total_weight }}
              </p>
            </div>
            <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p>
          </div>
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalCitizens.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Citizens</p>
              <p class="2xl:text-xl xl:text-sml font-bold">
                {{ overview.total_citizens }}
              </p>
            </div>
            <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p>
          </div>
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Citizens Earning</p>
              <p class="2xl:text-xl xl:text-sm font-bold">
                {{ useCurrencyFormat(overview.total_price) }}
              </p>
            </div>
            <p
              class="text-error font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_down_icon.svg" alt="" class="" />
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-y-4 gap-x-12 2xl:gap-x-20">
            <div class="flex justify-between 2xl:text-xl col-span-2">
                <p class="font-semibold">Today's Collection</p>
                <div
                    class="flex gap-2 hover:bg-collectionText hover:shadow-2xl rounded-lg transition-all ease-in duration-300 transform px-6  2xl:mr-12"
                >
                    <button type="button" class="font-medium  text-center">
                    Export CSV
                    </button>
                    <img src="/img/Export_csv_icon.svg" alt="" class="" />
                </div>
            </div>
            <!-- <div>h</div> -->
            <div class="col-span-2">
                <div
                class="card-shadow rounded-xl 2xl:h-[550px] xl:h-[400px] overflow-y-auto hide-scroll"
                >
                <table class="w-full font-semibold text-lg table-auto">
                    <thead
                    class="text-textGray 2xl:text-lg xl:text-sm font-semibold sticky top-0 bg-white"
                    >
                    <tr class="text-left border-b">
                        <th class="py-[16px] px-[32px]">WASTE</th>
                        <th class="py-[16px] px-[32px]">Collection model</th>
                        <th class="py-[16px] px-[32px]">Producer</th>
                    </tr>
                    </thead>
                    <tbody class="">
                    <tr v-for="item in collections" :key="item.id" class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                        <td class="py-[16px] px-[32px]">
                            {{ item.price }}
                        </td>
                        <td class="py-[16px] px-[32px]">
                            {{ item.collection_type }}
                        </td>
                        <td class="py-[16px] px-[32px]">
                            {{ item.producer_type }}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <div class="flex flex-col justify-center items-center">
                <div class="card-shadow rounded-2xl w-full flex-grow">
                    <div class="flex flex-col items-center gap-8">
                        <h4 class="2xl:text-lg xl:text-sm  font-semibold mt-4">Unit Profile</h4>
                        <vue-avatar :username="`${data.data.businessInfo.name}-${collector.name}`" :size="150" />
                        <!-- <img src="/img/profilepic.png" alt="" class="w-24" /> -->
                    </div>
                    <div class="space-y-1 2 text-sm font-medium px-6 py-7">
                        <p>ID: {{collector.id}}</p>
                        <p>Unit Name: {{collector.name}}</p>
                        <p>Email: {{collector.email}}</p>
                    </div>
                </div>
                <div
                class="2xl:text-lg xl:text-sm xl:font-bold font-semibold flex flex-col gap-2 items-center mt-3 fln"
                >
                
                    <button @click.prevent="deleteModal = !deleteModal" type="button">
                        <span class="hover:text-secondary ease-out duration-300">
                            Delete Account
                        </span>
                    </button>
                    <NuxtLink to="/recyclers/create" class="hover:text-secondary ease-out duration-300">
                        <p>Add New Unit</p>
                    </NuxtLink>
                    <NuxtLink :href="`/collection-history?unit=${collector.id}`" class="hover:text-secondary ease-out duration-300" >
                        <p>View Collection History</p>
                    </NuxtLink >
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

    <HeadTransitionRoot appear :show="deleteModal" as="template">
        <HeadDialog as="div" @close="deleteModal = !deleteModal" class="relative z-10">
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
                class="w-full max-w-lg space-y-7 transform overflow-hidden rounded-2xl bg-white p-10 py-16 text-left align-middle shadow-xl transition-all"
                >

                    <!-- <HeadDialogTitle
                        as="h3"
                        class="text-xl font-medium leading-6 text-gray-900 text-center"
                    >
                        <b>{{ 'Change Password' }}</b>
                    </HeadDialogTitle> -->
                    <div>
                        <p class="text-xl font-normal text-center">
                            Deleting this account will only delete the profile of the staff and not the collections they have made.
                            <br> <br> Do you want to proceed with deleting this account?
                        </p>

                        <div class="flex items-center gap-4 mt-8">
                            <button
                                    type="button"
                                    @click.prevent="deleteAccount(collector.id)"
                                    class="text-center flex-1 p-4 rounded-md text-white font-bold bg-secondary
                                    hover:opacity-80 transition-all duration-300 ease-in-out py-4 relative"
                                >
                                    <span :class="{ invisible: isLoading }">
                                    {{ 'Yes' }}
                                    </span>
                                </button>
                            <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-secondary bg-white 
                                px-4 py-4 text-sm font-medium text-black hover:bg-white focus:outline-none 
                                 flex-1"
                                @click="deleteModal = !deleteModal"
                                >
                                No
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
    import VueAvatar from "@webzlodimir/vue-avatar";
    import { type User } from '@/composables/useTypes'


    interface Overview {
        total_citizens: number
        total_price: number
        total_weight: number
    }

    interface Collection {
        id: string
        created_at: string
        collected_at: string
        collection_type: string
        producer_type: string
        weight: string
        price: string
        location: string
        waste_details: string
        status: string
    }


    interface Collector {
        created_at: string
        email: string
        id: string
        isVerified: number
        name: string
    }

    const overview = ref<Overview>({
        total_citizens: 0,
        total_price: 0,
        total_weight: 0
    })

    const params = useRoute().params
    const isLoading = ref(false)
    const deleteModal = ref(false)
    const collector = ref<Collector>({
        created_at: '',
        email: '',
        id: '',
        isVerified: 0,
        name: ''
    })
    const collections = ref<Collection[]>()
    const { token, data } = useAuth()
    const { $toast, $router } = useNuxtApp()
    const user: User = data.value
    const fetch = async (id: string) => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/admin/collector/${params.id}`, {
            headers: {
                Authorization: `${token.value}`,
            },
            onResponse({ request, response, options }) {
                // Process the response data
                isLoading.value = false
                if (response.ok) {
                    $toast.success(response._data.message);
                    // payment_details.value = response._data.data
                    // payment_modal.value = true
                    // overview.value = response._data
                    collector.value = response._data.data
                    // console.log(response._data.data)
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
                isLoading.value = false
            },
        });
    }

    const deleteAccount = async (id: string) => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/admin/collector/${params.id}`, {
            headers: {
                Authorization: `${token.value}`,
            },
            method: 'delete',
            onResponse({ request, response, options }) {
                // Process the response data
                isLoading.value = false
                if (response.ok) {
                    $toast.success(response._data.message);
                    $router.back()
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
                isLoading.value = false
            },
        });
    }

    const fetchOverview = async () => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/admin/overview/${params.id}`, {
            headers: {
                Authorization: `${token.value}`,
            },
            onResponse({ request, response, options }) {
                // Process the response data
                isLoading.value = false
                if (response.ok) {
                    $toast.success(response._data.message);
                    // payment_details.value = response._data.data
                    // payment_modal.value = true
                    overview.value = response._data
                    // collectors.value = response._data.data
                    console.log(response._data.data)
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
                isLoading.value = false
            },
        });
    }

    const fetchCollection = async () => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/admin/today-collection/${params.id}?limit=${10}&page=${1}`, {
            headers: {
                Authorization: `${token.value}`,
            },
            onResponse({ request, response, options }) {
                // Process the response data
                isLoading.value = false
                if (response.ok) {
                    $toast.success(response._data.message);
                    collections.value = response._data.data
                    // payment_modal.value = true
                    // overview.value = response._data
                    // collectors.value = response._data.data
                    console.log(response._data.data)
                    
                }
            },
            onResponseError({ request, response, options }) {
                $toast.error(response._data.message);
                isLoading.value = false
            },
        });
    }

    const getAll = async () => {
        await fetch('')
        await fetchOverview()
        await fetchCollection()
    }

    useLazyAsyncData( () => getAll(), { server: false });

    definePageMeta({
    //   auth: false
    })
</script>

<style>

</style>