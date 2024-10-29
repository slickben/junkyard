<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
const { data, token, signOut } = useAuth();
import type { User } from "@/composables/useTypes";
const { $toast, $router, $config } = useNuxtApp();
const user: User = data.value;
const isLoading = ref(false);
const currentYear = new Date().getFullYear();
const filter = ref(currentYear);

// State for analytics data
const collectionsPerMonth = ref<number[]>([]);
const chartData = ref();
const chartOptions = ref();

// State for donut chart data
const totalData = ref({
  total_collections: 0,
  total_earnings: 0,
  total_transactions: 0,
});
const donutChartData = ref();
const donutChartOptions = ref();

const years = ref<number[]>([]);
const generateYears = () => {
  const startYear = 2024;
  const endYear = currentYear;
  years.value = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );
};

// Function to fetch analytics
const getAnalytics = async (year: number) => {
  isLoading.value = true;

  await $fetch(`${useBaseUrl()}/admin/analytics?year=${year}`, {
    headers: {
      Authorization: `${token.value}`,
    },
    onResponse({ request, response }) {
      isLoading.value = false;
      if (response.ok) {
        collectionsPerMonth.value = response._data.collections_per_month;
        totalData.value = {
          total_collections: response._data.total_collections,
          total_earnings: response._data.total_earnings,
          total_transactions: response._data.total_transactions,
        };
        updateChartData();
        updateDonutChartData(); // Update donut chart data
      }
    },
    onResponseError({ response }) {
      $toast.error(response._data.message);
      isLoading.value = false;
    },
  });
};

// Function to update the chart data based on fetched analytics
const updateChartData = () => {
  chartData.value = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: collectionsPerMonth.value,
        backgroundColor: Array(collectionsPerMonth.value.length).fill(
          "#1F9C00"
        ),
        borderColor: Array(collectionsPerMonth.value.length).fill("#1F9C00"),
        borderWidth: 1,
      },
    ],
  };
};

// Function to update the donut chart data
const updateDonutChartData = () => {
  donutChartData.value = {
    labels: ["Total Collections", "Total Earnings", "Total Transactions"],
    datasets: [
      {
        data: [
          Number(totalData.value.total_collections),
          parseFloat(totalData.value.total_earnings),
          parseFloat(totalData.value.total_transactions),
        ],
        backgroundColor: ["#6268D6", "#F2994A", "#1F9C00"],
        hoverBackgroundColor: ["#6268D6", "#F2994A", "#1F9C00"],
      },
    ],
  };
};

onMounted(async () => {
  chartOptions.value = setChartOptions();
  donutChartOptions.value = setDonutChartOptions(); // Set donut chart options
  generateYears();
  await getAnalytics(filter.value);
});

// Function to set chart options
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

// Function to set donut chart options
const setDonutChartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false, // Allow for custom height
    cutout: "50%",
    plugins: {
      legend: {
        position: "right", // Place legend on the right
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
};

// Watch for changes in filter and refetch analytics data
watch(filter, (newValue) => {
  getAnalytics(newValue);
});
</script>

<template>
  <div
    class="rounded-xl border md:border-none bg-gray-50 md:bg-transparent md:shadow-card-shadow backdrop-blur-xl flex flex-col gap-2 md:gap-4 w-full p-4 md:p-6 relative h-max"
  >
    <div class="flex justify-end">
      <select
        v-model="filter"
        class="border-collectionText outline-none bg-white focus:outline-none focus:ring-0 pl-4 pr-8 rounded-md py-2 ml-auto"
      >
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <div class="flex flex-col xl:flex-row gap-10 card">
      <Chart
        class="w-full xl:w-3/6 2xl:w-2/3 max-h-[420px] 2xl:max-h-[320px]"
        type="bar"
        :data="chartData"
        :options="chartOptions"
      />
      <div class="w-full xl:w-3/6 2xl:w-1/3 h-64 relative">
        <Chart
          class="absolute top-0 left-0 w-full h-full"
          type="doughnut"
          :data="donutChartData"
          :options="donutChartOptions"
        />
      </div>
    </div>
  </div>
</template>
