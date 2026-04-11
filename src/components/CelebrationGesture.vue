<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

interface IProps {
  show: boolean;
}

withDefaults(defineProps<IProps>(), {
  show: false
});
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="celebration-gesture">
      <div class="gesture-emoji">👏</div>
      <div class="gesture-text">
        <span class="char char-1">太</span>
        <span class="char char-2">棒</span>
        <span class="char char-3">了</span>
        <span class="char char-4">！</span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.celebration-gesture {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99998;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: scaleIn 0.3s ease-out, fadeOut 0.3s ease-in 1.7s forwards;

  .gesture-emoji {
    font-size: 144rem; // 120 * 1.2 = 144
    line-height: 1;
    animation: bounce 0.6s ease-in-out 0.3s;
  }

  .gesture-text {
    font-size: 58rem; // 48 * 1.2 = 57.6 ≈ 58
    font-weight: bold;
    margin-top: 24rem; // 20 * 1.2 = 24
    display: flex;
    align-items: center;
    animation: slideUp 0.5s ease-out 0.2s;

    .char {
      display: inline-block;
      font-weight: bold;

      &.char-1 {
        color: #ff6b6b; // 红色
        animation: glow1 1.5s ease-in-out infinite alternate;
      }

      &.char-2 {
        color: #4ecdc4; // 青色
        animation: glow2 1.5s ease-in-out infinite alternate;
      }

      &.char-3 {
        color: #f7dc6f; // 黄色
        animation: glow3 1.5s ease-in-out infinite alternate;
      }

      &.char-4 {
        color: #bb8fce; // 紫色
        animation: glow4 1.5s ease-in-out infinite alternate;
      }
    }
  }
}

@keyframes scaleIn {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30rem);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes glow1 {
  from {
    text-shadow: 
      0 0 10px #ff6b6b,
      0 0 20px #ff6b6b,
      0 0 30px #ff6b6b,
      0 0 40px #ff6b6b;
  }
  to {
    text-shadow: 
      0 0 15px #ff6b6b,
      0 0 30px #ff6b6b,
      0 0 45px #ff6b6b,
      0 0 60px #ff6b6b,
      0 0 80px #ff6b6b;
  }
}

@keyframes glow2 {
  from {
    text-shadow: 
      0 0 10px #4ecdc4,
      0 0 20px #4ecdc4,
      0 0 30px #4ecdc4,
      0 0 40px #4ecdc4;
  }
  to {
    text-shadow: 
      0 0 15px #4ecdc4,
      0 0 30px #4ecdc4,
      0 0 45px #4ecdc4,
      0 0 60px #4ecdc4,
      0 0 80px #4ecdc4;
  }
}

@keyframes glow3 {
  from {
    text-shadow: 
      0 0 10px #f7dc6f,
      0 0 20px #f7dc6f,
      0 0 30px #f7dc6f,
      0 0 40px #f7dc6f;
  }
  to {
    text-shadow: 
      0 0 15px #f7dc6f,
      0 0 30px #f7dc6f,
      0 0 45px #f7dc6f,
      0 0 60px #f7dc6f,
      0 0 80px #f7dc6f;
  }
}

@keyframes glow4 {
  from {
    text-shadow: 
      0 0 10px #bb8fce,
      0 0 20px #bb8fce,
      0 0 30px #bb8fce,
      0 0 40px #bb8fce;
  }
  to {
    text-shadow: 
      0 0 15px #bb8fce,
      0 0 30px #bb8fce,
      0 0 45px #bb8fce,
      0 0 60px #bb8fce,
      0 0 80px #bb8fce;
  }
}
</style>
