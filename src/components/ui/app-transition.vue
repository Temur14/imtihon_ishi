<template>
  <transition name="app-transition">
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>
.app-transition-enter-active,
.app-transition-leave-active {
  transition: opacity 0.5s ease;
}

.app-transition-enter-from,
.app-transition-leave-to {
  opacity: 0;
}
</style>

<script setup></script>
