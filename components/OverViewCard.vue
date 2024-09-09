<script lang="ts" setup>
    const props = defineProps(['overview'])
</script>

<template>
    <div class="relative flex-none overflow-auto scrollbar-hide md:overflow-hidden flex w-full md:grid md:grid-cols-3 gap-5 md:gap-16 md:p-4">
          <!-- first overview -->
          <div
            class="rounded-xl md:rounded-[32px] border md:border-none bg-gray-50 md:bg-transparent md:shadow-card-shadow backdrop-blur-xl flex items-center gap-2 md:gap-4 min-w-64 w-full p-4 md:p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Weight()Kg</p>
              <p class="2xl:text-xl xl:text-sm font-bold">
                {{ Math.round(overview.total_weight) }}
              </p>
            </div>
          </div>

          <div
            class="rounded-xl md:rounded-[32px] border md:border-none bg-gray-50 md:bg-transparent md:shadow-card-shadow backdrop-blur-xl flex items-center gap-2 md:gap-4 min-w-64 w-full p-4 md:p-6 relative"
          >
            <img src="/img/totalCitizens.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Citizens</p>
              <p class="2xl:text-xl xl:text-sml font-bold">
                {{ overview.total_citizens }}
              </p>
            </div>
          </div>

          <div
            class="rounded-xl md:rounded-[32px] border md:border-none bg-gray-50 md:bg-transparent md:shadow-card-shadow backdrop-blur-xl flex items-center gap-2 md:gap-4 min-w-64 w-full p-4 md:p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Citizens Earning</p>
              <p class="2xl:text-xl xl:text-sm font-bold">
                {{ useCurrencyFormat(overview.total_price) }}
              </p>
            </div>
          </div>
        </div>
</template>
