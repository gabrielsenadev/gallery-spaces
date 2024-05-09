<template>
  <div class="flex flex-col gap-1">
    <label :for="componentInputId">{{ label }}</label>
    <select :name="componentInputId" :id="componentInputId" v-bind="$attrs" v-model="model"
      class="px-4 py-2 rounded-lg bg-neutral-100 text-black border">
      <option v-for="option in options" :key="option" :value="option"> {{ option }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>

let localId = 0;

type InputSelectProps = {
  options: string[];
  label: string;
}

const key = ref(++localId);

const model = defineModel();

const { options, label } = defineProps<InputSelectProps>();

const componentInputId = computed(() => {
  return `input-select-${key.value}`;
})

</script>

<style></style>