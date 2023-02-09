<template>
  <div class="titleH2">
    <h2>{{ props.title }}</h2>
  </div>
  <div class="border box-01" :style="isActiveHeight"></div>
  <div class="border box-02" :style="isActiveWidth"></div>
  <div class="border box-03" :style="isActiveHeight"></div>
  <div class="border box-04" :style="isActiveWidth"></div>
  <my-cart :isActive="isActive" :opacity="opacity"></my-cart>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const opacity = ref(0);

const props = defineProps({
  title: {
    type: String,
    default: '资料卡'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 100
  },
  width: {
    type: Number,
    default: 100
  }
})
const isActiveHeight = computed(() => {
  return props.isActive ? `height: ${props.height}%;` : '';
})
const isActiveWidth = computed(() => {
  return props.isActive ? `width: ${props.width}%;` : '';
})
watch(() => props.isActive, (newValue, oldValue) => {
  if (newValue) {
    setTimeout(() => {
      opacity.value = 1;
    }, 1900)
  }
})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>