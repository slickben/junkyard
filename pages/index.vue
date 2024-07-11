<template>
  <!-- <pre>
    {{ data }}
  </pre> -->
    <div class="bg-fakeWhite h-full flex-grow p-12 2xl:px-20 pt-10 relative">
        <div class="mb-5 flex items-center justify-between">
          <h1 class="2xl:text-4xl xl:text-2xl font-bold">Overview</h1>
          <button type="button" @click.prevent="signOut({ callbackUrl: '/login' })" class="text-error text-lg font-semibold">Logout</button>
        </div>
        
        <div class="relative grid grid-cols-3 gap-16">
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
            <!-- <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p> -->
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
            <!-- <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p> -->
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
            <!-- <p
              class="text-error font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_down_icon.svg" alt="" class="" />
            </p> -->
          </div>
        </div>
        <div class="flex justify-between 2xl:text-xl xl:text-lg m-7">
          <p class="font-semibold">Today's Collection</p>
          <button @click.prevent="saveLogs" class="flex gap-2">
            <p class="font-medium pr-7">Export CSV</p>
            <img src="/img/Export_csv_icon.svg" alt="" />
          </button>
        </div>

        <div class="card-shadow rounded-xl 2xl:max-h-[620px]  xl:max-h-[460px] overflow-y-auto hide-scroll">
          <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
            <thead class="text-textGray text-lg font-semibold sticky top-0 bg-white">
                <tr class="text-left border-b">
                  <th class="py-[16px] px-[32px]">Weight</th>
                  <th class="py-[16px] px-[32px]">Collection model</th>
                  <th class="py-[16px] px-[32px]">Producer</th>
                  <th class="py-[16px] px-[32px]">Recycler unit</th>
                </tr>
            </thead>
            <tbody class="">
                <tr v-for="item in collections" :key="item.id" class="border-b text-[16px] font-medium">
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


const getTodaysCollection = async () => {
  isLoading.value = true
  // console.log(data.value.data.id)s
  await $fetch(`${useBaseUrl()}/admin/collections/today?limit=${10}&page=${1}`, {
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
              console.log(response._data.data)
              
          }
      },
      onResponseError({ request, response, options }) {
          $toast.error(response._data.message);
          isLoading.value = false
      },
  });
}


onMounted( async () => {
  await getTodaysCollection()
  await getOverview('')
})
// useLazyAsyncData( () => get(), { server: false });
definePageMeta({
  middleware: ['auth', 'setup']
})
</script>