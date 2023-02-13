<template>
  <div class="nav_tag">
    <div v-for="item in props.state" :key="item._id">
      <h3>{{ item.title }}</h3>
      <ul class="tag_Nav">
        <li
          v-for="(tagItem, index) in item.secondtags"
          :key="tagItem._id"
          @click="getTagList(tagItem)"
        >
          <span>{{ index + 1 }}.</span>
          <span>{{ tagItem.title }}</span>
        </li>
      </ul>
    </div>

    <!-- <div>
          <h3>目录</h3>
          <ul class="tag_Item">
            <li>
              <span>js</span>
            </li>
            <li>
              <span>js</span>
            </li>
            <li>
              <span>js</span>
            </li>
            <li>
              <span>js</span>
            </li>
          </ul>
        </div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

// 接收父组件参数并设置默认值
interface tagStateProps {
  state?: any[]
}
const props = withDefaults(defineProps<tagStateProps>(), {})
// 点击当前二级标签
const getTagList = (item: any) => {
  const { _id } = item
  router.push(`/article/id?id=${_id}`)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>