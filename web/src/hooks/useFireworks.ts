import { onMounted, reactive, ref } from "vue";
import { gsap } from "gsap";

export default function useFireworks() {
  const auto = ref(false);
  const m = reactive({ x: 0, y: 0 });
  const stageRef = ref();
  const taggleRef = ref();

  window.onpointerdown = window.onpointermove = (e: any) => {
    m.x = Math.round(e.clientX);
    m.y = Math.round(e.clientY);
  }
  function fire(m: { x: number, y: number }) {

    const firework = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      trail = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      ring = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      hsl = 'hsl(' + gsap.utils.random(0, 360, 1) + ',100%,50%)'

    stageRef.value.appendChild(firework)
    firework.appendChild(trail)
    firework.appendChild(ring)

    for (let i = 1; i < 5; i++) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      gsap.set(t, { x: m.x, y: innerHeight, opacity: 0.25, attr: { 'stroke-width': i, d: 'M0,0 0,' + innerHeight } })
      gsap.to(t, { y: m.y, ease: 'expo' })// for some reason this can't be combined with the above set() in a fromTo() without generating errors ¯\_(ツ)_/¯
      trail.appendChild(t)
    }

    for (let i = 1; i < gsap.utils.random(6, 13, 1); i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      gsap.set(c, { x: m.x, y: m.y, attr: { class: 'core', r: () => (i / 1.5) * 18, fill: 'none', stroke: hsl, 'stroke-width': () => 0.25 + (9 - i), 'stroke-dasharray': '1 ' + i / 2 * gsap.utils.random(i + 3, i + 6) } })
      ring.appendChild(c)
    }

    gsap.timeline({ onComplete: () => stageRef.value.removeChild(firework) })
      .to(trail.children, { duration: 0.2, attr: { d: 'M0,0 0,0' }, stagger: -0.08, ease: 'expo.inOut' }, 0)
      .to(trail.children, { duration: 0.4, scale: () => gsap.utils.random(40, 80, 1), attr: { stroke: hsl }, stagger: -0.15, ease: 'expo' }, 0.4)
      .to(trail.children, { duration: 0.3, opacity: 0, ease: 'power2.inOut', stagger: -0.1 }, 0.5)
      .from(ring.children, { duration: 1, rotate: () => gsap.utils.random(-90, 90, 1), scale: 0, stagger: 0.05, ease: 'expo' }, 0.4)
      .to(ring.children, { opacity: 0, stagger: 0.1, ease: 'sine.inOut' }, 0.7)
      .to(ring.children, { duration: 1, y: '+=30', ease: 'power2.in' }, 0.7)
  }

  function onclick() {
    gsap.killTweensOf(autoPlay)
    gsap.killTweensOf(fire)
    // auto.value = true
    // taggleAuto()
    fire(m)
  }

  function taggleAuto() {
    auto.value = auto.value
    gsap.timeline({ defaults: { duration: 0.3, ease: 'power2.inOut' } })
      .to('.knob', { x: () => (auto.value) ? 18 : 0 }, 0)
      .to('.txt1', { opacity: (i: number) => (auto.value) ? 0.3 : 1 }, 0)
      .to('.txt2', { opacity: (i: number) => (auto.value) ? 1 : 0.3 }, 0)
    if (auto) autoPlay()
    else {
      gsap.killTweensOf(autoPlay)
      gsap.killTweensOf(fire)
    }
  }

  function autoPlay() {
    for (let i = 0; i < gsap.utils.random(3, 9, 1); i++) {
      gsap.delayedCall(i / 2, fire, [{ x: gsap.utils.random(99, innerWidth - 99, 1), y: gsap.utils.random(99, innerHeight - 99, 1) }])
    }
    (auto.value) ? gsap.delayedCall(3.5, autoPlay) : gsap.killTweensOf(autoPlay)
  }

  return {
    stageRef,
    taggleRef,
    onclick,
    taggleAuto,
  }
}