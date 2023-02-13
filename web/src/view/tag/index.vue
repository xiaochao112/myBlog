<template>
  <div class="tag-content">
    <main class="list_title">
      <div class="tag_title">
        <div class="title">
          <h3>共{{ state.pageable.total }}个标签</h3>
          <p>xxx xxxx</p>
        </div>
        <div class="tag-link">
          <el-link
            class="tag"
            :class="{ tcTog: item.promise }"
            v-for="(item, index) in state.cardList"
            :key="item._id"
            @click="onClickTog($event, index)"
          >
            {{ item.title }}
          </el-link>
        </div>
      </div>
    </main>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { getRootTog } from '@/api/modules/tag'
import { useInforCard } from '@/hooks/useinforCard'
import { onMounted, ref } from 'vue'
import router from '@/router'

const { state, getContentList, handleSizeChange, handleCurrentChange } =
  useInforCard(getRootTog)

const onClickTog = (e: any, index: number) => {
  console.log(state.cardList[index].typeId)
  router.push(`/tag/id?typeId=${state.cardList[index].typeId}`)
}

onMounted(() => {
  getContentList()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>