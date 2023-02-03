<script setup>
import { computed, ref } from 'vue';
import pause from '../assets/pause.svg';
import play from '../assets/play.svg';
import skip from '../assets/skip.svg';
import reset from '../assets/reset.svg';

const pomoIntervals = {
  focus: {
    name: 'Focus',
    duration: 1800,
  },
  shortBreak: {
    name: 'Short break',
    duration: 300,
  },
  longBreak: {
    name: 'Long break',
    duration: 900,
  },
};

const pomoSessions = [
  'focus',
  'shortBreak',
  'focus',
  'shortBreak',
  'focus',
  'shortBreak',
  'focus',
  'longBreak',
];

const intervalHandle = ref(null);

class TimerActions {
  play() {
    isRunning.value = true;
    if (intervalHandle) {
      clearInterval(intervalHandle.value);
    }
    intervalHandle.value = setInterval(() => {
      if (timer.value <= 0.1) {
        this.skip();
      } else {
        timer.value = timer.value - 0.1;
      }
    }, 100);
    console.log('playing');
  }
  pause() {
    clearInterval(intervalHandle.value);
    isRunning.value = false;
    console.log('paused');
  }
  skip() {
    if (currentSession.value === pomoSessions.length - 1) {
      currentSession.value = 0;
      timer.value = pomoIntervals[pomoSessions[currentSession.value]].duration;
      return;
    }
    currentSession.value++;
    timer.value = pomoIntervals[pomoSessions[currentSession.value]].duration;
    console.log('skipped');
  }
  reset() {
    currentSession.value = 0;
    timer.value = pomoIntervals[pomoSessions[currentSession.value]].duration;
    console.log('reset');
  }
}

const timerActions = new TimerActions();

const timerProgress = computed(
  () => timer.value / pomoIntervals[pomoSessions[currentSession.value]].duration
);

const timerFormatted = computed(() => {
  const seconds = Math.floor(timer.value % 60);
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const minutes = Math.floor(timer.value / 60);
  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${paddedMinutes}:${paddedSeconds}`;
});

// currentSession.value >= pomoSessions.length
//     ? pomoIntervals[pomoSessions[0]].name.toLowerCase()
//     : pomoIntervals[
//         pomoSessions[currentSession.value + 1]
//       ].value.name.toLowerCase()

const timer = ref(pomoIntervals[pomoSessions[0]].duration);
const isRunning = ref(false);
const currentSession = ref(0);
const nextSession = computed(() =>
  currentSession.value >= pomoSessions.length - 1
    ? pomoIntervals[pomoSessions[0]].name
    : pomoIntervals[pomoSessions[currentSession.value + 1]].name
);
</script>

<template>
  <div
    class="flex-grow group bg-slate-100 rounded-md overflow-hidden relative flex gap-2 p-6 items-center justify-between"
  >
    <div class="z-20">
      <div class="relative text-lg leading-7 font-semibold text-slate-500">
        <span>{{ pomoIntervals[pomoSessions[currentSession]].name }}</span>
        •
        <span>{{ currentSession + 1 }} / {{ pomoSessions.length }}</span>
      </div>
      <div>
        <span class="text-2xl leading-8 font-mono pr-2">{{
          timerFormatted
        }}</span>
        <span class="text-slate-400">until {{ nextSession }}</span>
      </div>
    </div>
    <div class="hidden gap-4 group-hover:flex">
      <button
        v-show="isRunning === false"
        @click="timerActions.play(isRunning)"
        class="bg-slate-200 p-3 rounded-full hover:opacity-50 relative z-20"
      >
        <img :src="play" />
      </button>
      <button
        v-show="isRunning === true"
        @click="timerActions.pause()"
        class="bg-slate-200 p-3 rounded-full hover:opacity-50 relative z-20"
      >
        <img :src="pause" />
      </button>
      <button
        @click="timerActions.skip()"
        class="bg-slate-200 p-3 rounded-full hover:opacity-50 relative z-20"
      >
        <img :src="skip" />
      </button>
      <button
        @click="timerActions.reset()"
        class="bg-slate-200 p-3 rounded-full hover:opacity-50 relative z-20"
      >
        <img :src="reset" />
      </button>
    </div>
    <div
      class="bg-slate-300 w-full h-full absolute inset-0 z-10 origin-left"
      :style="{ transform: `scaleX(${timerProgress})` }"
    ></div>
  </div>
</template>
