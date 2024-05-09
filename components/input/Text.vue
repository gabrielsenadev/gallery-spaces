<template>
  <div class="flex flex-col gap-1">
    <label :for="componentInputId" >{{ label }}</label>
    <input type="text" :name="componentInputId" :id="componentInputId"
    class="px-4 py-2 border border-solid border-black rounded-lg appearance-none" v-bind="attrs" v-model="model" />
  </div>
</template>

<script lang="ts" setup>

type InputTextProps = {
  label: string;
}

let localId = 0;

const key = ref(++localId);

const attrs = useAttrs();

const model = defineModel();

const { label } = defineProps<InputTextProps>();

const componentInputId = computed(() => {
  return `input-text-${key.value}`;
});

</script>

<style>

</style>