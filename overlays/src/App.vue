<script setup>
import Notification from './components/Notification.vue';
import Goal from './components/Goal.vue';
import Timer from './components/Timer.vue';
</script>

<template>
  <div
    class="p-6 h-full flex flex-col space-between focus-scene:gap-6 focus-scene:flex-row focus-scene:items-center text-slate-900"
  >
    <Notification username="blkxdzn" action="Followed" />
    <Goal />
    <Timer />
  </div>
</template>

<style scoped></style>
