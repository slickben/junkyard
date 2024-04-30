<template>
    <div
        class="bg-fakeWhite h-full flex-grow flex flex-col py-12 px-12 2xl:px-20 overflow-hidden"
      >
        <h1 class="2xl:text-3xl xl:text-2xl font-bold mb-5">Overview</h1>
        <div class="relative grid grid-cols-3 gap-16">
          <!-- first overview -->
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Weight()Kg</p>
              <p class="2xl:text-xl xl:text-sm font-bold">320.89</p>
            </div>
            <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p>
          </div>
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalCitizens.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Total Citizens</p>
              <p class="2xl:text-xl xl:text-sml font-bold">2045</p>
            </div>
            <p
              class="text-secondary font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_up_icon.svg" alt="" class="" />
            </p>
          </div>
          <div
            class="rounded-[32px] card-shadow backdrop-blur-xl flex items-center gap-4 w-full p-6 relative"
          >
            <img src="/img/totalWeight.png" alt="" width="61" />
            <div class="flex flex-col">
              <p class="text-textGray font-mediumn text-sm">Citizens Earning</p>
              <p class="2xl:text-xl xl:text-sm font-bold">N120k</p>
            </div>
            <p
              class="text-error font-bold text-sm absolute flex items-center gap-1 bottom-2 right-4"
            >
              1.78% <img src="/img/Percentage_down_icon.svg" alt="" class="" />
            </p>
          </div>
        </div>
        <div class="flex justify-between mt-12 mb-4">
          <div class="flex gap-7 items-center">
            <p class="2xl:text-xl xl:text-sm xl:font-bold">Filter by:</p>
            <div class="flex gap-7">
              <div
                class="flex bg-collectionBtn text-collectionText 2xl:px-6 xl:px-3 rounded-md 2xl:py-2"
              >
                <button class="flex items-center 2xl:gap-2 xl:gap-1 2xl:text-[16px] xl:text-sm">
                  Waste <img src="/img/down_arrow.svg" alt="" />
                </button>
              </div>
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md px-6 py-2"
              >
                <button class="flex items-center 2xl:gap-2 xl:gap-1 2xl:text-[16px] xl:text-sm">
                  Collection Model
                  <img src="/img/down_arrow.svg" alt="" class="" />
                </button>
              </div>
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md px-6 2xl:py-2"
              >
                <button class="flex items-center 2xl:gap-2 xl:gap-1 2xl:text-[16px] xl:text-sm">
                  Producer <img src="/img/down_arrow.svg" alt="" />
                </button>
              </div>
              <div
                class="flex bg-collectionBtn text-collectionText rounded-md px-6 2xl:py-2"
              >
                <button class="flex items-center 2xl:gap-2 xl:gap-1 2xl:text-[16px] xl:text-sm">
                  Weight <img src="/img/down_arrow.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex items-center bg-white card-shadow rounded-xl 2xl:px-6 xl:px-2 2xl:py-3  text-black transition-all ease-in duration-300 transform hover:bg-collectionBtn"
          >
            <button class="font-medium pr-7 2xl:text-xl xl:text-sm">Export CSV</button>
            <img src="/img/Export_csv_icon.svg" alt="" class="cursor-pointer" />
          </div>
        </div>

        <div
          class="card-shadow rounded-xl w-full flex-grow overflow-y-auto hide-scroll"
        >
        <table class="w-full font-semibold 2xl:text-lg xl:text-sm table-auto">
          <thead class="text-textGray 2xl:text-lg xl:text-sm font-semibold sticky top-0 bg-white">
              <tr class="text-left border-b">
                <th class="py-[16px] px-[32px]">WASTE</th>
                <th class="py-[16px] px-[32px]">Collection model</th>
                <th class="py-[16px] px-[32px]">Producer</th>
                <th class="py-[16px] px-[32px]">Weight(KG)</th>
              </tr>
          </thead>
          <tbody class="">
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">50.78</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Brown Cartons</td>
                  <td class="py-[16px] px-[32px]">Drop Off</td>
                  <td class="py-[16px] px-[32px]">Community</td>
                  <td class="py-[16px] px-[32px]">67.89</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Institutions</td>
                  <td class="py-[16px] px-[32px]">129.90</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">320.34</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Can</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">23.78</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Others</td>
                  <td class="py-[16px] px-[32px]">Drop Off</td>
                  <td class="py-[16px] px-[32px]">Institutions</td>
                  <td class="py-[16px] px-[32px]">34.21</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">23.56</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">567.67</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Brown Cartons</td>
                  <td class="py-[16px] px-[32px]">Drop Off</td>
                  <td class="py-[16px] px-[32px]">Community</td>
                  <td class="py-[16px] px-[32px]">34.21</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Institutions</td>
                  <td class="py-[16px] px-[32px]">23.78</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">129.90</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Can</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">567.67</td>
              </tr>
              <tr class="border-b 2xl:text-[16px] xl:text-sm font-medium">
                  <td class="py-[16px] px-[32px]">Plastic Bottles</td>
                  <td class="py-[16px] px-[32px]">Pick up</td>
                  <td class="py-[16px] px-[32px]">Household</td>
                  <td class="py-[16px] px-[32px]">34.21</td>
              </tr>
              
          </tbody>
        </table>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  // auth: false
})
</script>

<style>

</style>