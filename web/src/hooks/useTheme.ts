import { computed, onBeforeMount, ref } from "vue";
import { darkStore } from '@/stores/darkStore';

export const useTheme = () => {

  const store = darkStore();

  const isDark = computed(() => store.isDark);

  // 设置暗黑或白天模式
  const switchDark = () => {
    const body = document.documentElement as HTMLElement;

    if (isDark.value) body.setAttribute("class", "dark");
    else body.setAttribute("class", "");
  }

  const changeIsDark = () => {
    store.setIsDark();
    switchDark();
  }

  onBeforeMount(() => {
    switchDark()
  })
  return {
    changeIsDark,
  }
}