<script setup>
import { ref } from 'vue';
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
    intervalHandle.value = setInterval(() => {
      if (timer.value === 0) {
        console.log('next session');
      } else {
        timer.value--;
      }
    }, 1000);
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

const timerButtons = {
  play: {
    name: 'Play',
    action: () => {
      timerActions.play();
    },
  },
  pause: {
    name: 'Pause',
    action: () => {
      timerActions.pause();
    },
  },
  skip: {
    name: 'Skip',
    action: () => {
      timerActions.skip();
    },
  },
  reset: {
    name: 'Reset',
    action: () => {
      timerActions.reset();
    },
  },
};

const timer = ref(pomoIntervals[pomoSessions[0]].duration);
const isRunning = ref(false);
const currentSession = ref(0);
</script>

<template>
  <div class="flex-grow">
    <div>
      Time:
      {{ timer }}
      isRunning:
      {{ isRunning }}
      Session:
      {{ currentSession + 1 }} / {{ pomoSessions.length }}
    </div>
    <button
      v-for="button in timerButtons"
      :key="button.name"
      @click="button.action"
      class="bg-slate-200 px-2 py-1 rounded-full hover:bg-slate-300"
    >
      {{ button.name }}
    </button>
  </div>
</template>
