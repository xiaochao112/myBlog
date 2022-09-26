<template>
  <el-container class="common-layout">
    <el-header>
      <Header></Header>
    </el-header>
    <el-container class="content">
      <el-aside width="200px" class="nav">
        <NavMenu></NavMenu>
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

    .nav {
      background: rgb(168, 168, 168);

    }
  }
}
</style>

