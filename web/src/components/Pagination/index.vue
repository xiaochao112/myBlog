<template>
  <div class="pagination">
    <button :disabled='pageNo == 1' @click="emit('currentChange', pageNo - 1)" class="bgBtn">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="emit('currentChange', 1)"
      :class="{arcive: pageNo==1}">1</button>
    <button v-show="startNumAndEndNum.start > 1">···</button>

    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start"
      @click="emit('currentChange', page)" :class="{arcive: pageNo==page}">{{page}}</button>

    <button v-show="startNumAndEndNum.end <  pageCount - 1">···</button>
    <button v-show="startNumAndEndNum.end !=  pageCount" @click="emit('currentChange',  pageCount)"
      :class="{arcive: pageNo ==  pageCount}">{{ pageCount }}</button>
    <button :disabled='pageNo ==  pageCount' @click="emit('currentChange', pageNo + 1)" class="bgBtn">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['sizeChange', 'currentChange'])

const props = defineProps({
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 20
  },
  total: {
    type: Number,
    default: 100,
  },
  continues: {
    type: Number,
    default: 4
  }
})
// 总页数
const pageCount = computed(() => {
  return Math.ceil(props.total / props.pageSize);
})

// 当前显示的最小页数和最大页数
const startNumAndEndNum = computed(() => {
  let { pageNo, pageSize, continues, total } = props;
  let start = 0;
  let end = 0;
  // 如果总页数小于pageSize
  if (total < pageSize) {
    start = 1;
    end = pageCount.value;
  } else {
    // 如果页数正常
    start = pageNo - (continues / 2);
    end = pageNo + (continues / 2);

    if (start <= 1) {
      start = 1
      end = continues + 2
    }
    if (end > pageCount.value) {
      end = pageCount.value
      start = pageCount.value - continues
    }
  }
  return { start, end }
})
</script>

<style lang="scss" scoped>
@import './index';
</style>