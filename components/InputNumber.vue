<template>
  <div class="flex flex-col gap-1">
    <label :for="componentInputId" >{{ label }}</label>
    <input type="number" :name="componentInputId" :id="componentInputId"
    class="px-4 py-2 border border-solid border-black rounded-lg appearance-none" v-bind="$attrs"/>
  </div>
</template>

<script lang="ts" setup>

type InputNumberProps = {
  label: string;
}

let localId = 0;

const key = ref(++localId);

const { label } = defineProps<InputNumberProps>();

const componentInputId = computed(() => {
  return `input-number-${key.value}`;
})

</script>

<style>

</style>