<script setup>
defineProps({
  username: String,
  action: String,
});
</script>

<template>
  <div class="flex flex-col flex-grow gap-4 focus-scene:gap-1">
    <span class="text-lg leading-7 font-medium text-slate-500"
      >Last notification</span
    >
    <div class="w-full h-px bg-slate-200"></div>
    <div class="flex gap-2 items-baseline">
      <span class="text-2xl leading-8 font-normal text-slate-900">{{
        username
      }}</span>
      <span class="text-sm leading-5 font-medium text-slate-400">{{
        action
      }}</span>
    </div>
  </div>
</template>
