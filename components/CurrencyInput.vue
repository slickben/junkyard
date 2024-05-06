<template>
    <input ref="inputRef" />
</template>
  
  <script lang="ts" setup>
    import { watch } from 'vue'
    import { useCurrencyInput } from 'vue-currency-input'

    const props = defineProps({
        modelValue: Number, // Vue 2: value
        options: Object
    })

    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)
  
    watch(
        () => props.modelValue, // Vue 2: props.value
        (value) => setValue(value)
    )
  
    watch(
        () => props.options,
        (options) => setOptions(options)

    
  

  </script>