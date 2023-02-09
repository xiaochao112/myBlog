<template>
  <div ref="meteorBoxRef" class="meteorBox">
    <div class="meteor" :style="`transform:rotate(${props.rotateDeg}deg)`">
      <div class="line" :style="`animation-delay:${delay}s;width:${w}px;height:${h}px;`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const meteorBoxRef = ref()
const props = defineProps({
  delay: {
    type: Number,
    default: 0,
  },
  w: {
    type: Number,
    default: 0,
  },
  h: {
    type: Number,
    default: 0,
  },
  rotateDeg: {
    type: Number,
    default: 0,
  },
})

</script>

<style lang='scss' scoped>
.meteorBox {
  // height: 100%;
  // width: 100%;

  .meteor {
    width: 2px;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;

    // overflow: hidden;
    .line {
      animation: meteoring 6s infinite linear;
      position: absolute;
      width: 2px;
      height: 200px;
      background: linear-gradient(to top,
          rgb(2, 161, 195, 1),
          rgba(11, 36, 66, 0.1));
      border-radius: 2px;
      box-shadow: 0px 10px 20px 0px #02a1c3;
      opacity: 0;

      &::before {
        width: 2px;
        height: 2px;
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0px;
        border-radius: 50%;
        background: #00d0ff;
        box-shadow: 0px 0px 12px 5px #00d0ff;
      }
    }
  }
}

@keyframes meteoring {
  0% {
    opacity: 0;
    top: -250px;
  }

  25% {
    opacity: 0.5;
    top: 0vh;
  }

  50% {
    opacity: 0.8;
    top: 25vh;
  }

  75% {
    opacity: 1;
    top: 50vh;
  }

  100% {
    opacity: 0;
    top: 150vh;
  }
}
</style>
