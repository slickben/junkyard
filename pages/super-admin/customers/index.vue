<template>
  <div
    class="bg-fakeWhite h-full flex-grow flex flex-col py-10 px-12 2xl:px-20 overflow-hidden"
  >
    <h1 class="2xl:text-4xl xl:text-2xl font-bold mb-5">Customers</h1>

    <div class="mt-12 mb-4 w-full">
      <div class="flex gap-7 items-center">
        <p class="2xl:text-xl xl:text-sm xl:font-bold flex-none">Filter by:</p>
        <div class="flex gap-7 w-full">
          <div class="flex text-collectionText rounded-md gap-4 w-full">
            <select
              v-model="filter"
              name=""
              id=""
              class="border-none outline-none bg-collectionBtn focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2"
            >
              <option selected value="">Status</option>
              <option value="subscribed">Subscribed</option>
              <option value="not subscribed">Not Subscribed</option>
            </select>
            <!-- <select v-model="transaction_type" name="" id="" 
                class="border-none outline-none bg-collectionBtn focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2">
                <option selected value="">Transaction Type</option>
                <option value="collection">Collection</option>
                <option value="deposit">Deposit</option>
                <option value="subscription">Subscription</option>
              </select> -->
            <input
              v-model="search"
              placeholder="Search by collector name"
              class="border-none outline-none bg-collectionBtn focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2"
              type="text"
            />
            <div class="flex justify-end items-center flex-grow gap-2">
              <!-- {{ limit }} -->
              <button
                type="button"
                @click.prevent="limit = 10"
                :class="
                  limit === 10 ? 'text-white' : 'bg-opacity-10 text-secondary'
                "
                class="px-4 py-2 rounded bg-secondary font-bold capitalize"
              >
                10
              </button>
              <button
                type="button"
                @click.prevent="limit = 20"
                :class="
                  limit === 20 ? 'text-white' : 'bg-opacity-10 text-secondary'
                "
                class="px-4 py-2 rounded bg-secondary font-bold capitalize"
              >
                20
              </button>
              <button
                type="button"
                @click.prevent="limit = 30"
                :class="
                  limit === 30 ? 'text-white' : 'bg-opacity-10 text-secondary'
                "
                class="px-4 py-2 rounded bg-secondary font-bold capitalize"
              >
                30
              </button>
              <button
                type="button"
                @click.prevent="limit = 10000"
                :class="
                  limit === 10000
                    ? 'text-white'
                    : 'bg-opacity-10 text-secondary'
                "
                class="px-4 py-2 rounded bg-secondary font-bold capitalize"
              >
                all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="card-shadow rounded-xl w-full flex-grow overflow-y-auto hide-scroll"
    >
      <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
        <thead
          class="text-textGray 2xl:text-lg xl:text-sm font-semibold sticky top-0 bg-white"
        >
          <tr class="text-left border-b">
            <th class="py-[16px] px-5">Name</th>
            <th class="py-[16px] px-5">Email</th>
            <th class="py-[16px] px-5">Company name</th>
            <th class="py-[16px] px-5">Phone number</th>
            <th class="py-[16px] px-5">Subscribed</th>
            <th class="py-[16px] px-5">Date</th>
            <th class="py-[16px] px-5">Last Login</th>
            <th class="py-[16px] px-5">Action</th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            v-for="item in filteredTransaction"
            :key="item.id"
            class="border-b 2xl:text-[16px] xl:text-sm font-medium"
          >
            <td class="py-[16px] px-5">
              {{ item.name }}
            </td>
            <td class="py-[16px] px-5">
              <!-- {{ useCurrencyFormat(item.amount) }} -->
              {{ item.email }}
            </td>
            <td class="py-[16px] px-5">
              {{ item.company_name }}
            </td>
            <td class="py-[16px] px-5">
              {{ item.phone_number }}
            </td>
            <td
              :class="[item.isSubscribed ? 'text-secondary' : 'text-red-600']"
              class="py-[16px] px-5 font-semibold capitalize"
            >
              {{ item.isSubscribed ? "Subscribed" : "Not Subscribed" }}
            </td>
            <td class="py-[16px] px-5">
              <time :datetime="$dayjs('2023-01-01').format('dd, DD MMM YYYY')">
                {{ $dayjs(item.created_at).format("DD MMM YYYY") }}
              </time>
            </td>
            <td class="py-[16px] px-5">
              <time
                v-if="item.last_login"
                :datetime="$dayjs(item.last_login).format('YYYY-MM-DD')"
              >
                {{ $dayjs(item.last_login).format("hh:mm a, DD MMM YYYY") }}
              </time>
            </td>
            <td
              class="py-[16px] px-5 font-semibold capitalize flex flex-col gap-2"
            >
              <nuxt-link
                :to="`/super-admin/customers/${item.id}`"
                class="bg-blue-500 px-4 py-1 text-sm rounded text-white"
              >
                View
              </nuxt-link>

              <button
                @click="toggleRestriction(item.id, item.isRestricted)"
                :class="!item.isRestricted ? 'bg-red-500' : 'bg-green-500'"
                class="px-4 py-1 rounded text-white text-sm"
              >
                {{ item.isRestricted ? "Unblock" : "Block" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="py-5">
      <!-- {{ Math.round(count) }} -->
      <paginate
        v-model="page"
        :page-count="Math.round(count)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'flex justify-center mt-4 space-x-2'"
        :page-class="'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200'"
        :prev-class="'px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-200'"
        :next-class="'px-3 cursor-pointer py-1 border border-gray-300 rounded hover:bg-gray-200'"
        :active-class="'bg-secondary text-white'"
        :page-link-class="'cursor-pointer'"
      >
      </paginate>
    </div>
  </div>
</template>

<script setup lang="ts">
import Paginate from "vuejs-paginate-next";

interface Customer {
  id: string;
  created_at: string;
  name: string;
  avatar: string | null;
  email: string;
  balance: number;
  role: string;
  isVerified: number;
  isRestricted: number;
  company_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone_number: string;
  last_login: string;
  isSubscribed: number;
}
const isLoading = ref(false);
const filter = ref("");
const transaction_type = ref("");
const search = ref("");
const { token, data } = useAuth();
const { $toast } = useNuxtApp();
const customers = ref<Customer[]>();
const page = ref(1);
const limit = ref(10);
const count = ref(0);

// const view = async (id: string | null) => {

// }

const clickCallback = (pageNum: any) => {
  console.log(pageNum);
};

// const filteredTransaction = computed( () => {
//   if(!filter.value) {
//     return transactions.value
//   }else {
//     return transactions.value?.filter((item) => item.status === filter.value)
//   }

// })

const filteredTransaction = computed(() => {
  return customers.value?.filter((item) => {
    // Filter by status if filter is set
    const isSub = item.isSubscribed ? "subscribed" : "not subscribed";
    const matchesFilter = !filter.value || isSub === filter.value;

    // Filter by transaction_type if set
    // const matchesTransactionType = !transaction_type.value || item.transaction_type === transaction_type.value;

    // Search by user_name if search value is 3 characters or more
    const matchesSearch =
      !search.value ||
      (search.value.length >= 3 &&
        item.name.toLowerCase().includes(search.value.toLowerCase()));

    // Return true if all conditions match
    return matchesFilter && matchesSearch;
  });
});

// ${params.id}
const fetchCustomers = async (limit: number, page: number) => {
  isLoading.value = true;
  await $fetch(`${useBaseUrl()}/super/admins?limit=${limit}&page=${page}`, {
    headers: {
      Authorization: `${token.value}`,
    },
    onResponse({ request, response, options }) {
      // Process the response data
      isLoading.value = false;
      if (response.ok) {
        $toast.success(response._data.message);
        customers.value = response._data.data;
        count.value = response._data.total / limit;
        // payment_modal.value = true
        // overview.value = response._data
        // collectors.value = response._data.data
        // console.log(response._data.data)
      }
    },
    onResponseError({ request, response, options }) {
      $toast.error(response._data.message);
      isLoading.value = false;
    },
  });
};

const toggleRestriction = async (id: string, isRestricted: boolean) => {
  const action = isRestricted ? "unrestrict" : "restrict";
  isLoading.value = true;
  await $fetch(`${useBaseUrl()}/super/restrict/${id}?action=${action}`, {
    method: "PATCH",
    headers: {
      Authorization: `${token.value}`,
    },
    onResponse({ request, response, options }) {
      // Process the response data
      isLoading.value = false;
      if (response.ok) {
        $toast.success(
          `Customer ${
            isRestricted ? "unrestricted" : "restricted"
          } successfully`
        );

        // Update the customers list to reflect the change
        const customer = customers.value?.find((cust) => cust.id === id);
        if (customer) {
          customer.isRestricted = !isRestricted;
        }
      }
    },
    onResponseError({ request, response, options }) {
      $toast.error(
        `Failed to ${isRestricted ? "unblock" : "block"} the customer`
      );
      isLoading.value = false;
    },
  });
};

watchEffect(async () => {
  const pageV = page.value;
  const limitV = limit.value;
  await fetchCustomers(limitV, pageV);
});

onMounted(async () => {
  // await fetchTransactions()
  // await getOverview('')
});
// useL

// useLazyAsyncData( () => fetchCollection(), { server: false });

definePageMeta({
  layout: "super",
});
</script>

<style>
</style>