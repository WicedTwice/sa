<template>
  <div class="home-page">
    <h1>Калькулятор подсетей</h1>
    <SubnetCalculator />
  </div>
</template>

<script setup lang="ts">
import SubnetCalculator from '../components/SubnetCalculator.vue';
</script>

<style scoped lang="scss">
.home-page {
  padding: 24px;
}

h1 {
  text-align: center;
  margin-bottom: 32px;
  color: var(--color-black);
}
</style>
