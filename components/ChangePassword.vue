<script lang="ts" setup>
    import { useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/yup';
    import * as yup from 'yup';
    import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
    const change_password_modal = ref(true)
    const isLoading = ref(false)

    const { token } = useAuth()
    const { $toast, $router } = useNuxtApp()
    const { errors, defineField, meta, handleSubmit, isSubmitting } = useForm({
        validationSchema: toTypedSchema(
            yup.object({
            old_password: yup.string().min(8).required(),
            password: yup.string().min(8).required(),
            // comfirm_password: yup.string()
            //   .oneOf([yup.ref('password'), ''], 'Passwords must match')
            }),
        ),
    });

    const toggleType = ref(true)
    const [old_password, old_passwordAttrs] = defineField('old_password');
    const [password, passwordAttrs] = defineField('password');

    const onSubmit = handleSubmit( (values) => {
    // await signIn(credentials, undefined, { callbackUrl: '/' })
        isLoading.value = true
        useFetch(`${useBaseUrl()}/auth/change-password`, {
            method: 'PATCH',
            headers: {
                Authorization: `${token.value}`,
            },
            body: { currentPassword: values.old_password, newPassword: values.password },
            onResponse({ request, response, options }) {
            // Process the response data
                if(response.ok) {
                    $toast.success(response._data.message)
                    change_password_modal.value = false
                }
                isLoading.value = false
            },
            onResponseError({ request, response, options }) {
            // console.log(response)
                $toast.error(response._data.message)
                isLoading.value = false
            }
        })
    });
</script>

<template>
    <button type="button" @click="change_password_modal = !change_password_modal">Change Password</button>
    <HeadTransitionRoot appear :show="change_password_modal" as="template">
        <HeadDialog as="div" @close="change_password_modal = !change_password_modal" class="relative z-10">
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
                class="w-full max-w-md space-y-7 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >

                    <HeadDialogTitle
                        as="h3"
                        class="text-xl font-medium leading-6 text-gray-900 text-center"
                    >
                        <b>{{ 'Change Password' }}</b>
                    </HeadDialogTitle>
                    
                    <form @submit.prevent="onSubmit">
                        <div class="space-y-8">
                            <div class="flex flex-col space-y-3 relative">
                                <div class="flex space-x-3">
                                    <img src="/img/security_lock.svg" alt="" />
                                    <label for="">Old Password</label>
                                </div>
                                <input
                                    :type="toggleType ? 'password' : 'text'"
                                    v-model="old_password"
                                    v-bind="old_passwordAttrs"
                                    class="border-[3px] border-secondary rounded-md p-3 focus:outline-none
                                     focus:ring-secondary focus:border-secondary"
                                />
                                <EyeIcon v-if="toggleType" @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
                                <EyeSlashIcon v-else @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
                                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.old_password }}</p>
                            </div>
                            <div class="flex flex-col space-y-3 relative">
                                <div class="flex space-x-3">
                                    <img src="/img/security_lock.svg" alt="" />
                                    <label for="">New Password</label>
                                </div>
                                <input
                                    :type="toggleType ? 'password' : 'text'"
                                    v-model="password"
                                    v-bind="passwordAttrs"
                                    class="border-[3px] border-secondary rounded-md p-3 focus:outline-none focus:ring-secondary focus:border-secondary"
                                />
                                <EyeIcon v-if="toggleType" @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
                                <EyeSlashIcon v-else @click="toggleType = !toggleType" class="w-6 h-6 absolute right-4 bottom-5 text-gray-700" />
                                <p class=" absolute inset-x-0 -bottom-6 text-sm text-red-500 capitalize">{{ errors.password }}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between gap-x-10 pt-6">
                            <!-- <button
                                type="submit"
                                class="uppercase text-white bg-secondary rounded-[10px] px-4 py-4 
                                flex justify-center items-center font-semibold my-12 flex-1"
                            >
                                Update
                            </button> -->
                            <button
                                    type="submit"
                                    :disabled="!meta.valid"
                                    :class="[!meta.valid ? 'cursor-not-allowed bg-gray-500' : 'bg-secondary']"
                                    class="text-center flex-1 p-4 rounded-md text-white font-bold
                                    hover:opacity-80 transition-all duration-300 ease-in-out py-4 relative"
                                >
                                    <svg
                                    v-show="isLoading"
                                    class="w-7 h-7 animate-spin absolute left-1/2 -ml-2.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle
                                        class="opacity-75 text-white"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    />
                                    <path
                                        class="opacity-100 text-white"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        fill="currentColor"
                                    />
                                    </svg>
                                    <span :class="{ invisible: isLoading }">
                                    {{ 'Update' }}
                                    </span>
                                </button>
                            <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 
                                px-4 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none 
                                focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-1"
                                @click="change_password_modal = !change_password_modal"
                                >
                                Close
                            </button>
                            
                        </div>
                    </form>
                </HeadDialogPanel>
            </HeadTransitionChild>
            </div>
        </div>
        </HeadDialog>
    </HeadTransitionRoot>
</template>
