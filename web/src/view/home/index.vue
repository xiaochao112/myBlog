<template>
  <section class="setction flex">
    <!-- <my-fireworks :isTimer="props.isTimer"></my-fireworks> -->
    <main class="main_setction">
      <div class="main_setction__left">
        <article>
          <h1>Hwc Dreagreatger</h1>
          <p>Let's start showing off some magic...</p>
        </article>
      </div>
      <div class="main_setction__right">
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onActivated, onDeactivated, onMounted, ref } from "vue";

const isActive = ref(false);
const props = defineProps({
  isTimer: {
    type: Boolean,
    default: true,
  }
});
onActivated(() => {
  isActive.value = true;
})

onDeactivated(() => {
  isActive.value = false
})
onMounted(() => {
  isActive.value = true;
})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>