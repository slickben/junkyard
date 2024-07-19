<template>
    <div
        class="bg-fakeWhite h-full flex-grow flex flex-col py-10 px-12 2xl:px-20 overflow-hidden"
      >
        <h1 class="2xl:text-4xl xl:text-2xl font-bold mb-5">Transaction History</h1>
        
        <div class="flex justify-between mt-12 mb-4">
          <div class="flex gap-7 items-center">
            <p class="2xl:text-xl xl:text-sm xl:font-bold">Filter by:</p>
            <div class="flex gap-7">
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md"
              >
              <select v-model="filter" name="" id="" class="bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2">
                <option selected value="">Status</option>
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
              </div>
            </div>
          </div>
          <!-- <div
            class="flex items-center bg-white card-shadow rounded-xl 2xl:px-6 xl:px-2 2xl:py-3  text-black transition-all ease-in duration-300 transform hover:bg-collectionBtn"
          >
            <button class="font-medium pr-7 2xl:text-xl xl:text-sm">Export CSV</button>
            <img src="/img/Export_csv_icon.svg" alt="" class="cursor-pointer" />
          </div> -->
        </div>

        <div
          class="card-shadow rounded-xl w-full flex-grow overflow-y-auto hide-scroll"
        >
        <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
          <thead class="text-textGray 2xl:text-lg xl:text-sm font-semibold sticky top-0 bg-white">
              <tr class="text-left border-b">
                <th class="py-[16px] px-[32px]">Reference</th>
                <th class="py-[16px] px-[32px]">Price</th>
                <th class="py-[16px] px-[32px]">Transaction Type</th>
                <th class="py-[16px] px-[32px]">Status</th>
                <th class="py-[16px] px-[32px]">Action</th>
              </tr>
          </thead>
          <tbody class="">
              <tr v-for="item in filteredTransaction" :key="item.id" class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">
                    {{ item.reference }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ useCurrencyFormat(item.amount) }}
                  </td>
                  <td class="py-[16px] px-[32px]">
                    {{ item.transaction_type }}
                  </td>
                  <td :class="[item.status === 'pending' ? 'text-orange-600' : item.status === 'failed' ? 'text-red-600' : 'text-secondary']" 
                    class="py-[16px] px-[32px] font-semibold capitalize">
                    {{ item.status }}
                  </td>

                  <td
                    v-if="item.status === 'pending'"
                    class="py-[16px] px-[32px] font-semibold capitalize ">
                    <button @click.prevent="Verify(item.reference)" class="bg-blue-500 px-6 py-2 rounded text-white">
                      Verify
                    </button>
                  </td>
              </tr>
          </tbody>
        </table>
        </div>
    </div>
</template>

<script setup lang="ts">



interface Transaction {
  id: string
  created_at: string
  completed_at: string
  reference: string | null
  recipient_code: string | null
  transfer_code: string | null
  amount: string
  details: string | null
  transaction_type: string
  status: string
  user_id: string
  related_user_id: string | null
  related_entity_id: string | null
  related_user_role: string | null
}
const isLoading = ref(false)
const filter = ref('')
const { token, data } = useAuth()
const { $toast } = useNuxtApp()
const transactions = ref<Transaction[]>()


const Verify = async (reference: string | null) => {
    // alert('here')
    await $fetch(`${useBaseUrl()}/transactions/paystack/verify-transaction?reference=${reference}`, {
      method: 'GET',
      headers: {
            Authorization: `${token.value}`,
        },

      onResponse({ request, response, options }) {
        // Process the response data
        // alert('here')
        if(response.ok) {
          $toast.success(response._data.message)
          fetchTransactions()
        }
      },
      onResponseError({ request, response, options }) {
        
        $toast.error(response._data.message)
        
      }
  })

}
  
const filteredTransaction = computed( () => {
  if(!filter.value) {
    return transactions.value
  }else {
    return transactions.value?.filter((item) => item.status === filter.value)
  }
  
})


// ${params.id}
const fetchTransactions = async () => {
  isLoading.value = true
  await $fetch(`${useBaseUrl()}/super/transactions?limit=${40}&page=${1}`, {
      headers: {
          Authorization: `${token.value}`,
      },
      onResponse({ request, response, options }) {
          // Process the response data
          isLoading.value = false
          if (response.ok) {
              $toast.success(response._data.message);
              transactions.value = response._data.data
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

onMounted( async () => {
  await fetchTransactions()
  // await getOverview('')
})
// useL

// useLazyAsyncData( () => fetchCollection(), { server: false });

definePageMeta({
    layout: 'super',
})
</script>

<style>

</style>