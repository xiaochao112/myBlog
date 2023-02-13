<template>
  <div class="app" v-cloak>
    <my-header></my-header>
    <main class="content">
      <MyToggle></MyToggle>
      <MyStar :starNumber="10"></MyStar>
      <MyMeteor :delay="0" :w="3" :h="200" :rotateDeg="-80"></MyMeteor>
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <div class="footer_href">
        <ul class="footer_ul">
          <li><a href="#">GITHUB</a></li>
          <li><a href="#">ZHIHU</a></li>
          <li><a href="#">WEIBO</a></li>
          <li><a href="#">TWITTER</a></li>
        </ul>
      </div>
      <div class="footer_text">
        <!-- <p>Hwc Dreagreatger</p> -->
        <p>
          桂ICP备302032号-1
          <span>xxx@qq.com</span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>
<style>
[v-cloak] {
  display: none;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
  /* transform: translateY(400px); */
}

.fade-transform-leave-from,
.fade-transform-enter-to {
  opacity: 1;
  /* transform: translateY(0px); */
}

/* .app {
  display: none;

} */
</style>
