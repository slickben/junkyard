<template>
    <div class="bg-fakeWhite h-full flex-grow py-4 md:py-12 md:  relative ">
        <div class="px-5 md:px-12 2xl:px-20">
            <h1  class="2xl:text-4xl xl:text-2xl font-bold mb-5 hidden md:block">Recycler Units</h1>
            <div class="flex items-center justify-between mb-5 md:mb-0">
                <button @click="$router.back()" class="text-textGray  text-xs md:text-sm font-semibold"
                >Recycler Units > <span class="text-black">{{ collector.name }}

                </span>
                </button>
            </div>
        </div>

        <div class="px-1 md:px-8 2xl:px-16 py-8">
            <OverViewCard :overview="overview" />
        </div>

        <div class=" px-5 md:px-12 2xl:px-20">

            <!-- <div>h</div> -->
            <div class="md:col-span-2">
                <div
                class="card-shadow rounded-xl 2xl:h-[600px] xl:h-[400px]
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
    import VueAvatar from "@webzlodimir/vue-avatar";
    import { type User } from '@/composables/useTypes'
    import { arrayToCsv, downloadBlob } from '@/composables/helper';
    import Paginate from "vuejs-paginate-next";
    

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
    const fetch = async (limit: number, page: number) => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/super/collector/collection/${params.id}?limit=${limit}&page=${page}`, {
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
                    collections.value = response._data.data
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

    const wasteTypeNames = (dataItem: any) => dataItem.map((item: any) => item.name).join(', ');


    const fetchOverview = async () => {
        isLoading.value = true
        await $fetch(`${useBaseUrl()}/super/collector/overview/${params.id}`, {
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

    watchEffect( async () => {
        const pageV = page.value
        const limitV = limit.value
        await fetch(limitV, pageV)
    })

    const getAll = async () => {
        await fetchOverview()
    }

    useLazyAsyncData( () => getAll(), { server: false });

    definePageMeta({
        layout: 'super',
    })
</script>

<style>

</style>