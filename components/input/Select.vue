<template>
  <div class="flex flex-col gap-1">
    <label for="input-select">{{ label }}</label>
    <select name="input-select" id="input-select" v-bind="$attrs" v-model="model"
      class="px-4 py-2 bg-neutral-50 text-black border border-black/40 rounded-md">
      <option v-for="option in options" :key="option" :value="option" class="bg-red-700"> {{ option }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>

type InputSelectProps = {
  options: string[];
  label: string;
}
const model = defineModel();

const { options, label } = defineProps<InputSelectProps>();

</script>

<style></style>