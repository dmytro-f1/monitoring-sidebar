<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>

<template>
  <span class="material-symbols-outlined status-icon">
    {{ icon }}
  </span>
</template>
