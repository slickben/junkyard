<script lang="ts" setup>
const notifications_modal = ref(false);
const isLoading = ref(false);

const { token } = useAuth();
import Paginate from "vuejs-paginate-next";

interface Notifications {
  id: number;
  created_at: string;
  message: string;
  read: boolean;
  type: string;
  user_id: number;
}
const notifications = ref<Notifications[]>();
const page = ref(1);
const limit = ref(10);
const count = ref(0);

const fetchNotifications = async (limit: number, page: number) => {
  isLoading.value = true;
  await $fetch(
    `${useBaseUrl()}/admin/notifications?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `${token.value}`,
      },
      onResponse({ request, response, options }) {
        // Process the response data
        isLoading.value = false;
        if (response.ok) {
          notifications.value = response._data.data;
          count.value = response._data.total / limit;
        }
      },
      // onResponseError({ request, response, options }) {
      //   $toast.error(response._data.message);
      //   isLoading.value = false;
      // },
    }
  );
};

const clickCallback = (pageNum: any) => {
  console.log(pageNum);
};

watchEffect(async () => {
  const pageV = page.value;
  const limitV = limit.value;
  await fetchNotifications(limitV, pageV);
});
</script>

<template>
  <button
    class=""
    type="button"
    @click="notifications_modal = !notifications_modal"
  >
    <SvgoNotifications />
  </button>
  <HeadTransitionRoot appear :show="notifications_modal" as="template">
    <HeadDialog
      as="div"
      @close="notifications_modal = !notifications_modal"
      class="relative z-10"
    >
      <HeadTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </HeadTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadDialogPanel
              class="w-full max-w-2xl space-y-7 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <HeadDialogTitle
                as="h3"
                class="text-xl font-medium leading-6 text-gray-900"
              >
                <b>{{ "Notifications" }}</b>
              </HeadDialogTitle>

              <div class="pt-5">
                <!-- Display notifications -->
                <ul
                  v-if="notifications && notifications.length > 0"
                  class="space-y-2 list-disc ml-4"
                >
                  <li
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="py-2"
                  >
                    <p class="text-gray-800 text-sm">
                      {{ notification.message }}
                    </p>
                  </li>
                </ul>
                <div v-else>
                  <p class="text-gray-600">No notifications available.</p>
                </div>
              </div>

              <div class="py-5">
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
            </HeadDialogPanel>
          </HeadTransitionChild>
        </div>
      </div>
    </HeadDialog>
  </HeadTransitionRoot>
</template>
