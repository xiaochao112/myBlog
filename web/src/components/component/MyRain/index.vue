<template>
  <div class="rain">
    <div v-for="(item, index) in rainNumber" :key="index" class="rain-item" ref="rain_itemRef"
      :style="`transform:rotate(${rotateDeg}deg);width:${w}px;height:${h}px;`">
      <div class="line" :style="`animation-delay:${index * 100}ms`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const rain_itemRef = ref()

const props = defineProps({
  rainNumber: {
    type: Number,
    default: 10
  },
  rotateDeg: {
    type: Number,
    default: 0,
  },
  w: {
    type: Number,
    default: 0,
  },
  h: {
    type: Number,
    default: 0,
  },
})

function randomRain() {
  console.log();
  rain_itemRef.value.forEach((item: { style: { top: string; left: string; }; }) => {
    item.style.top = Math.floor(Math.random() * 100) + "vh";
    item.style.left = Math.floor(Math.random() * 100) + "vw";
  });
}

onMounted(() => {
  randomRain()
})
</script>

<style lang='scss' scoped>
.rain {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  // background: radial-gradient(at 50% 0%,
  //     rgba(6, 55, 111, 1) 0%,
  //     rgba(11, 26, 57, 1) 70%);

  .rain-item {
    position: absolute;
    width: 2px;
    height: 30px;
    // background: skyblue;
    display: inline-block;
    // overflow: hidden;

    .line {
      animation: raining 4s infinite linear;
      position: absolute;
      content: "";
      width: 4px;
      height: 4px;
      display: inline-block;
      top: -30px;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 183, 255, .5);
      opacity: 0;
    }
  }
}

@keyframes raining {
  0% {
    top: -30vh;
    opacity: 0;
  }

  100% {
    top: 100vh;
    opacity: 1;
  }

}
</style>
