<script setup>
import { ref, nextTick } from 'vue';
const goal = ref('Set a goal for today');
const isEditing = ref(false);
const goalInput = ref(null);
const handleInputClick = () => {
  isEditing.value = true;
  //console.log('Handling click', goalInput.value);
  nextTick(() => {
    goalInput.value.focus();
  });
};
</script>
<template>
  <div class="flex flex-col flex-grow gap-4 focus-scene:gap-1">
    <span class="text-lg leading-7 font-medium text-slate-500"
      >Current goal</span
    >
    <div class="w-full h-px bg-slate-200"></div>
    <div
      class="px-2 py-1 rounded-sm -ml-2 cursor-pointer hover:bg-slate-100"
      v-show="isEditing === false"
      @click="handleInputClick"
    >
      <p class="text-2xl leading-8 font-normal text-slate-900">{{ goal }}</p>
    </div>
    <input
      class="px-2 py-1 rounded-sm -ml-2 text-2xl leading-8 font-normal text-slate-900"
      type="text"
      ref="goalInput"
      v-model="goal"
      v-show="isEditing === true"
      @keyup.enter="isEditing = false"
    />
  </div>
</template>
