<template>
  <div class="flex flex-col gap-1">
    <label for="input-number" >{{ label }}</label>
    <input type="number" name="input-number" id="input-number"
    class="px-4 py-2 border border-solid border-black rounded-lg appearance-none" v-bind="$attrs" v-model="model"/>
  </div>
</template>

<script lang="ts" setup>

type InputNumberProps = {
  label: string;
}

const model = defineModel();

const { label } = defineProps<InputNumberProps>();

</script>

<style>

</style>