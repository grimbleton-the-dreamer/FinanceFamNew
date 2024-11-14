<template>
    <div class="btn">
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  withDefaults(
    defineProps<{
      bgColor?: string;
      textColor?: string;
    }>(),
    {
      bgColor: "#ff5500",
      textColor: "#fff"
    }
  );
  </script>
  
  <style scoped>
  .btn {
    background-color: v-bind(bgColor);
    color: v-bind(textColor);
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
  }
  </style>