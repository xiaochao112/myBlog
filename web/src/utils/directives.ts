import { useIntersectionObserver } from '@vueuse/core'
import { App } from 'vue';

export default {
  install: function (app: App<Element>) {
    // 图片懒加载
    // 默认占位图图片
    const defaultImg = 'http://www.ay1.cc/img?w=266&h=400';
    app.directive('img-lazy', {
      mounted(el, binding) {
        el.src = defaultImg;
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // isIntersecting：true进入了视口区域，false未进入视口区域
          if (isIntersecting) {
            // 加载失败
            el.onerror = function () {
              el.src = defaultImg;
            }
            el.src = binding.value;
            // 停止当前监听
            stop();
          }
        })
      },
    });

  }
}