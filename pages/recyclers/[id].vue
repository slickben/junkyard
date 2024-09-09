<template>
    <div class="bg-fakeWhite h-full flex-grow py-4 md:py-12 md: px-5 md:px-12 2xl:px-20 relative ">
        <h1  class="2xl:text-4xl xl:text-2xl font-bold mb-5 hidden md:block">Recycler Units</h1>
        <div class="flex items-center justify-between mb-5 md:mb-0">
            <button @click="$router.back()" class="text-textGray  text-xs md:text-sm font-semibold"
            >Recycler Units > <span class="text-black">{{ collector.name }}

            </span>
            </button>
            <Menu 
                v-slot="{ open }"
                as="div"
                class="relative inline-block text-left md:hidden">
                <MenuButton class="flex items-center gap-2">
                    
                   <EllipsisHorizontalIcon class="w-6 h-6" />
                </MenuButton>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems class="absolute z-50 w-60 right-0 bg-white p-5 space-y-3 flex flex-col text-left">
                        <MenuButton class="hover:text-secondary ease-out duration-300 text-xs md:text-base text-left" @click.prevent="deleteModal = !deleteModal">
                            <p>Delete Account</p>
                        </MenuButton>
                        <MenuButton>
                            <NuxtLink to="/recyclers/create" class="hover:text-secondary ease-out duration-300 text-xs md:text-base text-left">
                                <p>Add New Unit</p>
                            </NuxtLink>
                        </MenuButton>
                        <MenuButton>
                            <NuxtLink :href="`/collection-history?unit=${collector.id}`" class="hover:text-secondary ease-out duration-300 text-xs md:text-base text-left" >
                                <p>View Collection History</p>
                            </NuxtLink >
                        </MenuButton>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
        <OverViewCard :overview="overview"  />

        <div class="grid md:grid-cols-3 gap-y-4 gap-x-12 2xl:gap-x-20">
            

            <div class="flex justify-between md:col-span-2 text-sm 2xl:text-xl xl:text-lg m-7 mx-0 md:mx-7">
                <p class="font-semibold">Today's Collection</p>
                <button @click.prevent="saveLogs" class="flex  items-center gap-2">
                    <p class="font-medium md:pr-7">Export CSV</p>
                    <img class=" h-4" src="/img/Export_csv_icon.svg" alt="" />
                </button>
            </div>

            <!-- <div>h</div> -->
            <div class="md:col-span-2">
                <div
                class="card-shadow rounded-xl 2xl:h-[550px] xl:h-[400px]
                 overflow-y-auto hide-scroll hidden md:block"
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

                <div class="rounded-xl 2xl:max-h-[620px]  xl:max-h-[460px] overflow-y-auto hide-scroll  md:hidden space-y-2">
                <div v-for="item in collections" :key="item.id" class="flex items-center bg-white px-3 py-2 space-x-1">
                    <vue-avatar class="flex-none" :username="item.collector_name" :size="40" />
                    <div class="text-base font-semibold text-black flex-grow">
                    <h2>{{ wasteTypeNames(item.waste_type) }}</h2>
                    <p class="text-xs font-normal text-[#515151]">
                        {{ useCurrencyFormat(item.price) }}
                    </p>
                    </div>
                    <div class="text-base font-semibold text-black flex-none">
                    <h2>{{ item.weight }}kg</h2>
                    <p class="text-xs font-normal text-[#515151]">
                        {{ item.collection_type }}
                    </p>
                    </div>
                </div>
                </div>

                <div class="py-3 md:py-10">
                <paginate
                    v-model="page"
                    :page-count="count"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="clickCallback"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'flex justify-center mt-4 space-x-2'"
                    :page-class="'px-3 py-1 border border-gray-300 text-xs md:text-base rounded hover:bg-gray-200'"
                    :prev-class="'px-3 cursor-pointer py-1 border border-gray-300 text-xs md:text-base rounded hover:bg-gray-200'"
                    :next-class="'px-3 cursor-pointer py-1 border border-gray-300 text-xs md:text-base rounded hover:bg-gray-200'"
                    :active-class="'bg-secondary text-white'"
                    :page-link-class="'cursor-pointer'"
                >
                </paginate>
                </div>
            </div>

            <div class="hidden md:flex flex-col justify-center items-center">
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
    import { arrayToCsv, downloadBlob } from '@/composables/helper';
    import Paginate from "vuejs-paginate-next";
    import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
    import {  ChevronDownIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
    

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
        collector_name: string
        producer_type: string
        weight: string
        price: string
        location: string
        waste_type: {id: string, name: string}[]
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

    const page = ref(1)
    const limit = ref(20)
    const count = ref(0)

    const clickCallback = (pageNum: any) => {
        console.log(pageNum);
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

    const saveLogs = () => {
        const myLogs = arrayToCsv(collections.value)

        downloadBlob(myLogs, './collections.csv', 'text/csv;charset=utf-8;')

        // console.log('Logs has been saved')
    }

    const wasteTypeNames = (dataItem: any) => dataItem.map((item: any) => item.name).join(', ');


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

    const fetchCollection = async (limit: number, page: number) => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/admin/today-collection/${params.id}?limit=${limit}&page=${page}`, {
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

    watchEffect( async () => {
        const pageV = page.value
        const limitV = limit.value
        await fetchCollection(limitV, pageV)
    })

    const getAll = async () => {
        await fetch('')
        await fetchOverview()
        // await fetchCollection()
    }

    useLazyAsyncData( () => getAll(), { server: false });

    definePageMeta({
    //   auth: false
    })
</script>

<style>

</style>