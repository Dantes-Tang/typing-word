<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { $ref } from "vue/macros";
import { getRandom } from "@/utils/index.ts";

interface IProps {
  show: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  show: false
});

const canvas = $ref<HTMLCanvasElement | null>(null);
let animationFrame: number | null = null;
let particles: Particle[] = [];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = getRandom(2, 6);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 0;
    this.maxLife = 120; // 2秒 @ 60fps
    this.size = getRandom(3, 6);
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#FF6F91'
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1; // 重力
    this.vx *= 0.98; // 摩擦力
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 1 - (this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.life >= this.maxLife;
  }
}

function createFireworks() {
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 创建粒子（从屏幕中心发射）
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(centerX, centerY));
  }

  function animate() {
    if (!canvas || !ctx) return;
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.update();
      particle.draw(ctx);

      if (particle.isDead()) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    }
  }

  animate();
}

watch(() => props.show, (show) => {
  if (show && canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    createFireworks();
  } else {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    particles = [];
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }
});

onMounted(() => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <Teleport to="body">
    <canvas 
      ref="canvas" 
      class="word-fireworks"
      :style="{ display: show ? 'block' : 'none' }"
    />
  </Teleport>
</template>

<style scoped lang="scss">
.word-fireworks {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99997;
  pointer-events: none;
  background: transparent;
}
</style>
