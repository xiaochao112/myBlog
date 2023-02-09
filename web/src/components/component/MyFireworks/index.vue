<template>
  <svg stroke="#fff" @click="onclick" stroke-linecap="round">
    <g class="stage" ref="stageRef">
      <rect width="100vw" height="100vh" fill="rgba(0,0,0,0)" stroke="none" />
    </g>
  </svg>
</template>

<script setup lang="ts" >
import { onActivated, onDeactivated, onMounted, reactive, ref, watch } from "vue";
import { gsap } from "gsap";
import useFireworks from '@/hooks/useFireworks';

const props = defineProps({
  isTimer: {
    type: Boolean,
    default: true,
  }
});

const {
  stageRef,
  taggleRef,
  onclick,
  taggleAuto,
} = useFireworks();

let timer: any; // 定时器

watch(() => props.isTimer, (newValue, oldValue) => {
  if (!newValue) return clearInterval(timer);
  setTimer(5)
});

// visibilitychange事件 ，当浏览器的某个标签页切换到后台，或从后台切换到前台时就会触发该消息。
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log('页面被挂起');
    // 页面被挂起
    clearInterval(timer);

  } else {
    console.log('页面被打开');
    // 页面被打开
    setTimer(5);
  }
})

onMounted(() => {
  let i = 0;
  setTimer(5);
});
// 当元素被插入页面时触发
onActivated(() => {
  console.log('元素被插入页面');
  setTimer(5);
})

// 切换页面触发
onDeactivated(() => {
  console.log('元素从 DOM 中被移除');
  clearInterval(timer);
});

// 定时器触发器
function setTimer(leng: number) {
  let i = 0;
  // 随机设置播放时间
  let setTime = Math.floor(Math.random() * 3000 + 2000);
  timer = setInterval(() => {
    taggleAuto();
    i++;
    // 清除定时器
    if (i > leng) {
      clearInterval(timer);
    }
  }, setTime)
}

</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 9;
  font-family: 'Roboto', sans-serif;
  font-size: 19px;
}
</style>