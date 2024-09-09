<template>
  <!-- <pre>
    {{ data }}
  </pre> -->
    <div class="bg-fakeWhite h-full flex-grow p-5 md:p-12 2xl:px-20 pt-0 md:pt-10 relative ">
        <div class="mb-5 flex items-center justify-between">
          <h1 class="2xl:text-4xl xl:text-2xl font-bold">Overview</h1>
          <button type="button" @click.prevent="signOut({ callbackUrl: '/login' })" class="text-error text-lg font-semibold hidden md:block">Logout</button>
        </div>
        
        <OverViewCard :overview="overview"  />

        <div class="flex justify-between text-sm 2xl:text-xl xl:text-lg m-7 mx-0 md:mx-7">
          <p class="font-semibold">Today's Collection</p>
          <button @click.prevent="saveLogs" class="flex  items-center gap-2">
            <p class="font-medium md:pr-7">Export CSV</p>
            <img class=" h-4" src="/img/Export_csv_icon.svg" alt="" />
          </button>
        </div>

        <div class="card-shadow rounded-xl 2xl:max-h-[620px]  xl:max-h-[460px] overflow-y-auto hide-scroll hidden md:block">
          <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
            <thead class="text-textGray text-lg font-semibold sticky top-0 bg-white">
                <tr class="text-left border-b">
                  <th class="py-[1rem] px-[2rem]">Waste</th>
                  <th class="py-[16px] px-[32px]">Weight</th>
                  <th class="py-[16px] px-[32px]">Collection model</th>
                  <th class="py-[16px] px-[32px]">Producer</th>
                  <th class="py-[16px] px-[32px]">Recycler unit</th>
                </tr>
            </thead>
            <tbody class="">
                <tr v-for="item in collections" :key="item.id" class="border-b text-[16px] font-medium">
                    <td class="py-[16px] px-[32px]">
                      {{ wasteTypeNames(item.waste_type) }}
                    </td>
                    <td class="py-[16px] px-[32px]">
                      {{ item.weight }}
                    </td>
                    
                    <td class="py-[16px] px-[32px]">
                      {{ item.collection_type }}
                    </td>
                    <td class="py-[16px] px-[32px]">
                      {{ item.producer_type }}
                    </td>
                    <td class="py-[16px] px-[32px]">{{item.collector_name}}</td>
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
import { arrayToCsv, downloadBlob } from '@/composables/helper';
import Paginate from "vuejs-paginate-next";
import VueAvatar from "@webzlodimir/vue-avatar";
const { data, token, signOut } = useAuth()
const { $toast, $router, $config } = useNuxtApp();
const isLoading = ref(false)
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

const page = ref(1)
const limit = ref(20)
const count = ref(0)

const clickCallback = (pageNum: any) => {
    console.log(pageNum);
}

const overview = ref<Overview>({
  total_citizens: 0,
  total_price: 0,
  total_weight: 0
})

const collections = ref<Collection[]>([])

const getOverview = async (id: string) => {
  isLoading.value = true
  await $fetch(`${useBaseUrl()}/admin/overview`, {
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
              // console.log(response._data.data)
              
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


const getTodaysCollection = async (limit: number, page: number) => {
  isLoading.value = true
  // console.log(data.value.data.id)s
  await $fetch(`${useBaseUrl()}/admin/collections/today?limit=${limit}&page=${page}`, {
      headers: {
          Authorization: `${token.value}`,
      },
      onResponse({ request, response, options }) {
          // Process the response data
          isLoading.value = false
          if (response.ok) {
              $toast.success(response._data.message);
              collections.value = response._data.data
              count.value = response._data.total / limit
              // payment_modal.value = true
              // overview.value = response._data
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
  await getTodaysCollection(limitV, pageV)
})

onMounted( async () => {
  // await getTodaysCollection()
  await getOverview('')
})
// useLazyAsyncData( () => get(), { server: false });
definePageMeta({
  middleware: ['auth', 'setup']
})
</script>