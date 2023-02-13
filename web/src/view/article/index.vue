<template>
  <div class="myDetaill-content">
    <div class="tagContent">
      <!-- 侧边栏 -->
      <nav-left class="navLeft" :state="navList" ref="navLeftRef"></nav-left>

      <div class="tagItem_content">
        <h1>{{ state.cardList[0]?.title }}</h1>
        <p>
          <span>创建时间：{{ getData(state.cardList[0]?.createdAt) }}</span>
          &emsp;
          <span>最后更新时间：{{ getData(state.cardList[0]?.updatedAt) }}</span>
        </p>
        <hr />
        <div v-html="state.cardList[0]?.content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSecondTag } from '@/api/modules/tag'
import { useInforCard } from '@/hooks/useinforCard'
import NavLeft from './component/NavLeft/index.vue'
import { computed, onActivated, onBeforeMount, onMounted, ref } from 'vue'
import { getData } from '@/utils/index'
import { useRoute } from 'vue-router'
import { first } from 'lodash'

const route = useRoute()
const navLeftRef = ref()
const { state, getContentList, handleSizeChange, handleCurrentChange } =
  useInforCard(getSecondTag)

// 根标签列表
const navList = computed(() => {
  return state.contentList
})

onActivated(() => {
  getContentList({ _id: route.query!.id })
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>