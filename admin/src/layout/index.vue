<template>
  <el-container class="common-layout">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container class="content">
      <el-aside :width="`${Width}px`" class="nav">
        <NavMenu @getWidth="getWidth"></NavMenu>
      </el-aside>
      <el-container class="content-main">
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

const Width = ref(236);

const getWidth = (width) => {
  // console.log(width);
  Width.value = width
}

</script> 

<style lang='scss' scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  .content {

    .content-main {
      // background: rgb(168, 168, 168);
    }
  }
}
</style>

