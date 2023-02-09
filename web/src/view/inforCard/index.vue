<template>
  <div class="inforCard-content">
    <div class="content">
      <div class="header-title">
        <!-- <h3>资料卡</h3> -->
      </div>
      <my-card :requestApi="getInforCard"></my-card>
      <!-- <h3>gjoproj</h3> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import MyCard from './component/MyCard.vue';
import { getInforCard } from '@/api/modules/inforCard';

</script>

<style lang="scss" scoped>
@import "./index.scss"
</style>