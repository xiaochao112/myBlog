<template>
  <el-container class="common-layout">
    <el-container class="content">
      <el-aside :width="`${Width}px`" class="nav">
        <NavMenu @getWidth="getWidth"></NavMenu>
      </el-aside>
      <el-container ref="containerRef" class="content-main">
        <el-header>
          <Header></Header>
        </el-header>
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
import { ref, watch } from 'vue';
import layoutHooks from '../hooks/layoutHooks';

// 使用hooks
const { Width, setNavWidth } = layoutHooks();

const containerRef = ref();
const getWidth = (width) => {
  setNavWidth(width)
}

</script> 

<style lang='scss' scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  .content {}
}
</style>

