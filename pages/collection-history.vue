<template>
    <div
        class="bg-fakeWhite h-full flex-grow flex flex-col py-12 px-12 2xl:px-20 overflow-hidden"
      >
        <h1 class="2xl:text-4xl xl:text-2xl font-bold mb-5">Collection History</h1>
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
        <div class="flex justify-between mt-12 mb-4">
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

        <div
          class="card-shadow rounded-xl w-full flex-grow overflow-y-auto hide-scroll"
        >
        <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
          <thead class="text-textGray 2xl:text-lg xl:text-sm font-semibold sticky top-0 bg-white">
              <tr class="text-left border-b">
                <th class="py-[16px] px-[32px]">Waste</th>
                <th class="py-[16px] px-[32px]">Price</th>
                <th class="py-[16px] px-[32px]">Collection model</th>
                <th class="py-[16px] px-[32px]">Producer</th>
                <th class="py-[16px] px-[32px]">Weight(KG)</th>
              </tr>
          </thead>
          <tbody class="">
              <tr v-for="item in filteredDatas" :key="item.id" class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">
                    {{ wasteTypeNames(item.waste_type) }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ useCurrencyFormat(item.price) }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ item.collection_type }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ item.producer_type }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ item.weight }}
                  </td>
              </tr>
          </tbody>
        </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { arrayToCsv, downloadBlob } from '@/composables/helper';
import { type User } from '@/composables/useTypes'
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
  producer_type: string
  weight: string
  price: string
  location: string
  waste_details: string
  waste_type: WasteType[]
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
const fetchCollection = async () => {
  isLoading.value = true
  await $fetch(`${useBaseUrl()}/admin/collections?limit=${40}&page=${1}`, {
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

const wasteTypeNames = (dataItem: any) => dataItem.map((item: any) => item.name).join(', ');

onMounted( async () => {
  await fetchCollection()
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