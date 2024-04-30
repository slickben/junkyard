<template>
    <div class="flex-grow max-h-screen h-full overflow-y-auto relative" >
        <div class="sticky top-0 bg-white mb-[50px] px-12 2xl:px-20 flex-none pt-10 ">
          <h1 class="2xl:text-4xl xl:text-2xl font-bold">Recycler Units</h1>
        </div>
        <div class="grid 2xl:grid-cols-4 grid-cols-3 pb gap-10 px-12 2xl:px-20">
          <!-- first overview -->
          <NuxtLink :to="`recyclers/${item.id}`" v-for="item in collectors" :key="item.id" class="rounded-2xl border-[3px] border-secondary shadow-xl">
            <div class="py-8 flex justify-center">
              <vue-avatar :username="`${data.data.businessInfo.name}-${item.name}`" :size="100" />
              <!-- <vue-avatar username="Some User" /> -->
              <!-- <Avatar :size="80" variant="sunset" name="Mujahid Anuar" :title="true" :colors="colors" /> -->
              <!-- <img src="/img/P-icon.png" alt="" /> -->
            </div>
            <div
              class="px-5 pb-5 flex flex-col font-semibold 2xl:text-base xl:text-sm"
            >
              <p class="truncate">ID: {{item.id}}</p>
              <p class=" truncate">Name: {{ data.data.businessInfo.name }}-{{item.name}}</p>
              <p>Email: {{item.email}}</p>
            </div>
          </NuxtLink>

          <div
            class="absolute 2xl:top-[77%] xl:top-[80%] 2xl:left-[78%] xl:left-[74%] flex items-center justify-self-end"
          >
            <NuxtLink to="recyclers/create"
              ><button
                class="bg-secondary text-white rounded-md card-shadow px-12 py-3 flex justify-center items-center text-xl gap-4 font-semibold hover:opacity-45 transition-all transform ease-out duration-300"
              >
                <span class=""> <img src="/img/addUnit.svg" alt="" /> </span>ADD
                NEW UNIT
              </button>
            </NuxtLink>
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
import Avatar from "vue-boring-avatars";
import VueAvatar from "@webzlodimir/vue-avatar";
import "@webzlodimir/vue-avatar/dist/style.css";
interface Collector {
  created_at: string
  email: string
  name: string
  id: string
}

const colors = ["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]
const isLoading = ref(false)
const collectors = ref<Collector[]>([])
const { token, data } = useAuth()
const { $toast } = useNuxtApp()



const fetch = async (id: string) => {
  isLoading.value = true
  await $fetch(`${useBaseUrl()}/admin/collectors?limit=${10}&page=${1}`, {
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
              collectors.value = response._data.data
              // console.log(response._data.data)
              
          }
      },
      onResponseError({ request, response, options }) {
          $toast.error(response._data.message);
          isLoading.value = false
      },
  });
}

useLazyAsyncData( () => fetch(''), { server: false });

definePageMeta({
  // auth: false
})
</script>

<style>

</style>