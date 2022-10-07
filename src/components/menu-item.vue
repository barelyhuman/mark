<template>
  <a v-bind:href="href" class="item-wrapper">
    <span class="item-content">
      <span>{{ label }} </span>
      <span class="menu-modifier" v-if="modifier"> {{ modifier }}</span>
    </span>
  </a>
</template>

<script setup>
defineProps({
  label: String,
  modifier: String,
  href: String,
});
</script>

<style scoped>
.item-wrapper {
  display: block;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;
  color: #333;
}

.item-wrapper:hover {
  background: #f3f3f3;
}

.item-content {
  display: flex;
  justify-content: space-between;
}

.menu-modifier {
  font-size: 10px;
  background: #f3f3f3;
  border-radius: 6px;
  padding: 4px;
}
</style>
