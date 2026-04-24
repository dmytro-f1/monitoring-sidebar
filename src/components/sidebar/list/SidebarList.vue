<script setup lang="ts">
import MonitoringItem from "./MonitoringItem.vue"

import { useMonitoringStore } from "../../../stores/monitoring.store"

const monitoringStore = useMonitoringStore()
</script>

<template>
  <div
    class="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
  >
    <div v-if="monitoringStore.isLoading" class="p-4 text-center text-gray-500">
      Loading...
    </div>
    <div v-else-if="monitoringStore.error" class="p-4 text-center text-red-500">
      Error: {{ monitoringStore.error }}
    </div>
    <div
      v-else-if="monitoringStore.filteredObjects.length === 0"
      class="p-4 text-center text-gray-500"
    >
      No objects found.
    </div>
    <div v-else>
      <MonitoringItem
        v-for="object in monitoringStore.filteredObjects"
        :key="object.id"
        :object="object"
      />
    </div>
  </div>
</template>
