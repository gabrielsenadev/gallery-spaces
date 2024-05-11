<template>
  <div class="flex flex-col gap-1">
    <label for="input-text" >{{ label }}</label>
    <input type="text" name="input-text" id="input-text"
    class="px-4 py-2 border border-solid border-black/40 rounded-md appearance-none" v-bind="attrs" v-model="model" />
  </div>
</template>

<script lang="ts" setup>

type InputTextProps = {
  label: string;
}

const attrs = useAttrs();

const model = defineModel();

const { label } = defineProps<InputTextProps>();

</script>

<style>

</style>