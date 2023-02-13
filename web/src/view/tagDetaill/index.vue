<template>
  <div class="myDetaill-content">
    <div class="tagContent">
      <!-- 侧边栏 -->
      <nav-left :state="tagList"></nav-left>

      <div class="tagItem_content">
        <h3>{{ tagTitle }}</h3>
        <ul>
          <li
            class="item_secondtags"
            v-for="(item, index) in secondtags"
            :key="item._id"
          >
            <p class="itemContent" @click="getTagList($event, index)">
              <span>{{ index + 1 }}.</span>
              <span>{{ item.title }}</span>
            </p>
            <p class="desc">
              <span>创建时间：{{ getData(item.createdAt) }}</span>
              <span>&emsp;</span>
              <span>最后更新时间：{{ getData(item.createdAt) }}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getRootTog } from '@/api/modules/tag'
import { useInforCard } from '@/hooks/useinforCard'
import NavLeft from './component/NavLeft/index.vue'
import { computed, onActivated, ref } from 'vue'
import { getData } from '@/utils/index'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

let typeId = ref(Number(route.query!.typeId))

const { state, getContentList, handleSizeChange, handleCurrentChange } =
  useInforCard(getRootTog)
// 根标签
const tagTitle = computed(() => {
  return state.cardList[0]?.title || 'Js'
})
// 根标签列表
const tagList = computed(() => {
  return state.cardList
})

// 二级标签列表
const secondtags = computed(() => {
  return state.cardList[0]?.secondtags || []
})

// 点击当前二级标签
const getTagList = (el: any, index: number) => {
  const { _id } = secondtags.value[index]
  router.push(`/article/id?id=${_id}`)
}
onActivated(() => {
  getContentList({ typeId: Number(route.query!.typeId) })
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>