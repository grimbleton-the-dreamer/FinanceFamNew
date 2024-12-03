<template>
    <div class="spotlight" :style="spotlightStyle"></div>
  </template>
  
  <script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue';
  
  const mousePosition = reactive({
    x: 0,
    y: 0
  });
  
  const updateMousePosition = (event: MouseEvent) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  };
  
  const spotlightStyle = computed(() => ({
    top: `${mousePosition.y - 250}px`,
    left: `${mousePosition.x - 250}px`
  }));
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });
  
  </script>
  
  <style scoped>
  .spotlight {
    width: 500px;
    height: 500px;
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(35, 35, 35, 0.5), transparent 50%);
    pointer-events: none; /* Ignore pointer events */
    transition: top 0.05s, left 0.05s; /* Smooth movement */
    z-index: -1; /* Move spotlight behind the content */
  }
  
  /* Ensure the spotlight is behind everything */
  html, body, #app {
    position: relative;
    overflow: hidden;
  }
  </style>
  