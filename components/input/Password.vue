<template>
  <div class="flex flex-col gap-1">
    <label :for="componentInputId" >{{ label }}</label>
    <input type="password" :name="componentInputId" :id="componentInputId"
    class="px-4 py-2 border border-solid border-black/40 rounded-md appearance-none" v-bind="$attrs" v-model="model"/>
  </div>
</template>

<script lang="ts" setup>

type InputPasswordProps = {
  label: string;
}

let localId = 0;

const key = ref(++localId);

const model = defineModel();

const { label } = defineProps<InputPasswordProps>();

const componentInputId = computed(() => {
  return `input-password-${key.value}`;
})

</script>

<style>

</style>