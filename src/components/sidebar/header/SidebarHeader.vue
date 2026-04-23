<script setup lang="ts">
import { useMonitoringStore } from "../../../stores/monitoring.store"
import SearchBar from "./SearchBar.vue"

const monitoringStore = useMonitoringStore()
</script>

<template>
  <div class="p-4 border-b border-gray-200 bg-white">
    <SearchBar
      v-model="monitoringStore.filters.searchQuery"
      :debounce-ms="300"
    />
  </div>
</template>
