<template>
  <div class="star" ref="starRef">
    <div v-for="(item, index) in props.starNumber" :key="index" class="star-item" ref="star_itemRef"
      :style="`animation-delay:${index * 2000}ms;`"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const starRef = ref();
const star_itemRef = ref();

const props = defineProps({
  starNumber: {
    type: Number,
    default: 10
  },
})
function randomStar() {
  const left = starRef.value.clientWidth;
  star_itemRef.value.forEach((item: { style: { top: string; left: string; background: string; }; }) => {
    item.style.top = Math.floor(Math.random() * 250 + 1) + "px";
    item.style.left = Math.floor(Math.random() * left + 1) + "px";
  });
}

onMounted(() => {
  randomStar();
})

</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
