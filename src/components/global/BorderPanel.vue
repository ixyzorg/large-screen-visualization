<template>
  <div class="borderCustom">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.borderCustom {
  border: 15px solid transparent;
  border-image-source: url('../../assets/imgs/border_1.png');
  border-image-slice: 20 20 30 20;
  border-image-repeat: no-repeat;
}
</style>
