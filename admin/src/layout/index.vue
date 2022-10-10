<template>
  <el-container class="common-layout">
    <el-container class="content">
      <!-- 侧边栏 -->
      <el-aside :width="munu.munuStates ? '65px' : '200px'" class="nav">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container ref="containerRef" class="content-main">
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>
        <!-- 内容区 -->
        <el-main>
          <Main></Main>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './components/Header.vue';
import NavMenu from './components/NavMenu.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
import { ref } from 'vue';
import { munuStore } from '@/store/modules/munuStore';

const munu = munuStore()
const containerRef = ref();


</script> 

<style lang='scss' scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  .content {}
}
</style>

