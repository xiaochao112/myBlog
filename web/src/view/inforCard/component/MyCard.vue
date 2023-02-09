<template>
  <div class="MyCard-content">
    <ul class="nav_card">
      <li @click="clickItemCard($event, index)" v-for="(item, index) in cardList" :key="item._id"
        :class="{'item_curtion': currentItem == index}">{{ item.title }}
      </li>
    </ul>
    <div class="content_card">
      <p class="cardItem" v-for="item in state.cardList" :key="item._id">{{ item.english }} <span>{{ item.title
      }}</span></p>
    </div>

    <Pagination :pageNo="state.pageable.pageNo" :pageSize="state.pageable.pageSize" :total="state.pageable.total"
      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></Pagination>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getWebWord } from '@/api/modules/inforCard';
import { useInforCard } from '@/hooks/useinforCard';

// 使用hooks
const { state, getContentList, handleSizeChange, handleCurrentChange } = useInforCard(getWebWord);

const cardList = ref<{ [key: string]: any }[]>([]);
const currentItem = ref(0);

// 接收父组件参数并设置默认值
interface InforCardProps {
  requestApi?: (data?: any) => Promise<any>;
}
const props = withDefaults(defineProps<InforCardProps>(), {
});

// 当前资料卡
const clickItemCard = (el: any, index: number) => {
  currentItem.value = index;
}

// 获取资料卡列表信息
const getInfo = async () => {
  props.requestApi!().then(res => {
    let dataList = res.data.slice();
    dataList.forEach((item: any) => {
      item.img = import.meta.env.VITE_API_URL as string + item.img;
      return item
    });
    cardList.value = [...dataList];
  })
    .catch(err => { });
}


onMounted(() => {
  getInfo();
  getContentList()

})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>