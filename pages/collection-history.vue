<template>
    <div
        class="bg-fakeWhite h-full flex-grow flex flex-col py-5 md:py-12 px-5 md:px-12 2xl:px-20 overflow-auto md:overflow-hidden "
      >
        <h1 class="2xl:text-4xl xl:text-2xl font-bold mb-5">Collection History</h1>
        
        <OverViewCard :overview="overview"  />

        <div class="hidden md:flex justify-between mt-12 mb-4">
          <div class="flex gap-7 items-center">
            <p class="2xl:text-xl xl:text-sm xl:font-bold">Filter by:</p>
            <div class="flex gap-7">
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md"
              >
              <select v-model="wasteType" name="" id="" class="bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2">
                <option selected value="">Waste type</option>
                <option v-for="item in user.data.waste_type.filter( item => item.name !== 'Others')" :key="item.id" :value="item.name">
                    {{ item.name }}
                </option>
              </select>
              </div>
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md"
              >
              <select name="" v-model="collectionType" id="" class="bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2">
                <option selected value="">Collection Model</option>
                <option value="Pick up">Pick up</option>
                <option value="Drop off">Drop off</option>
              </select>

              </div>
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md"
              >
              <select v-model="producerType" name="" id="" class="bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2">
                <option selected value="">Producer Type</option>
                <option v-for="item in ['Household', 'Corporate Clients', 'Public Places', 'Clean Up']" :key="item" :value="item">
                    {{ item }}
                </option>
              </select>

              </div>
            </div>
          </div>
          <div
            class="flex items-center bg-white card-shadow rounded-xl 2xl:px-6 xl:px-2 2xl:py-3  text-black transition-all ease-in duration-300 transform hover:bg-collectionBtn"
          >
            <button @click.prevent="saveLogs" class="font-medium pr-7 2xl:text-xl xl:text-sm">Export CSV</button>
            <img src="/img/Export_csv_icon.svg" alt="" class="cursor-pointer" />
          </div>
        </div>

        <div class="card-shadow rounded-xl w-full flex-grow 
        md:overflow-y-auto hide-scroll mt-5 md:mt-0 hidden md:block"
        >
          <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
            <thead class="text-textGray 2xl:text-lg xl:text-sm font-semibold md:sticky top-0 bg-white">
                <tr class="text-left border-b">
                  <th class="py-[1rem] px-[2rem]">Waste</th>
                  <th class="py-[1rem] px-[2rem]">Price</th>
                  <th class="py-[1rem] px-[2rem]">Collection model</th>
                  <th class="py-[1rem] px-[2rem]">Producer</th>
                  <th class="py-[1rem] px-[2rem]">Weight(KG)</th>
                </tr>
            </thead>
            <tbody class="">
                <tr v-for="item in filteredDatas" :key="item.id" class="border-b 2xl:text-[1rem] xl:text-sm font-medium">
                    <td class="py-[1rem] px-[2rem]">
                      {{ wasteTypeNames(item.waste_type) }}
                    </td>
                    <td class="py-[1rem] px-[2rem]">
                      {{ useCurrencyFormat(item.price) }}
                    </td>
                    <td class="py-[1rem] px-[2rem]">
                      {{ item.collection_type }}
                    </td>
                    <td class="py-[1rem] px-[2rem]">
                      {{ item.producer_type }}
                    </td>
                    <td class="py-[1rem] px-[2rem]">
                      {{ item.weight }}
                    </td>
                </tr>
            </tbody>
          </table>
        </div>

        <div class="rounded-xl 2xl:max-h-[620px] mt-5 xl:max-h-[460px] overflow-y-auto hide-scroll  md:hidden space-y-2">
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
</template>

<script setup lang="ts">
import { arrayToCsv, downloadBlob } from '@/composables/helper';
import { type User } from '@/composables/useTypes'
import Paginate from "vuejs-paginate-next";
interface Overview {
  total_citizens: number
  total_price: number
  total_weight: number
}

const collectionType = ref("");
const producerType = ref("");
const wasteType = ref("");

interface WasteType {
  id: string
  name: string
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
interface CollectionHistory {
  id: string
  limit: number
  page: number
  waste_type?: string
  collection_type?: string
  producer_type?: string
}
const isLoading = ref(false)
const { token, data } = useAuth()
const { $toast } = useNuxtApp()
const collections = ref<Collection[]>([])
const user: User = data.value
const overview = ref<Overview>({
  total_citizens: 0,
  total_price: 0,
  total_weight: 0
})

const page = ref(1)
const limit = ref(20)
const count = ref(0)

const clickCallback = (pageNum: any) => {
    console.log(pageNum);
}

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

const filteredDatas = computed(() => {
    return collections.value.filter(item => {
      return (
        (collectionType.value === "" || item.collection_type === collectionType.value) &&
        (producerType.value === "" || item.producer_type === producerType.value) &&
        (wasteType.value === "" || item.waste_type.some(w => w.name === wasteType.value))
      );
    });
  });

const saveLogs = () => {
  const myLogs = arrayToCsv(collections.value)

  downloadBlob(myLogs, './collections.csv', 'text/csv;charset=utf-8;')

  // console.log('Logs has been saved')
}

// ${params.id}
const fetchCollection = async (limit: number, page: number) => {
  isLoading.value = true
  await $fetch(`${useBaseUrl()}/admin/collections?limit=${limit}&page=${page}`, {
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

const wasteTypeNames = (dataItem: any) => dataItem.map((item: any) => item.name).join(', ');

onMounted( async () => {
  // await fetchCollection()
  await getOverview('')
})
// useL

// useLazyAsyncData( () => fetchCollection(), { server: false });

definePageMeta({
  // auth: false
})
</script>

<style>

</style>