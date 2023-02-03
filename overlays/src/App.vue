<script setup>
import Notification from './components/Notification.vue';
import Goal from './components/Goal.vue';
import Timer from './components/Timer.vue';
</script>

<template>
  <div class="h-full flex items-center text-slate-900">
    <router-view></router-view>
    <!-- <Notification username="blkxdzn" action="Followed" />
    <Goal />
    <Timer /> -->
  </div>
</template>
