import { ref, watch } from "vue";
export default function layoutHooks() {
  const Width = ref(236);

  // 计算侧边栏宽度变化
  function setNavWidth(width) {
    Width.value = width

  }

  return {
    Width,
    setNavWidth
  }
}