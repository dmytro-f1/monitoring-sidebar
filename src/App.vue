<script setup lang="ts">
import MonitoringSidebar from "./components/sidebar/MonitoringSidebar.vue"

import { onMounted } from "vue"
import { useMonitoringStore } from "./stores/monitoring.store"
import ObjectsMap from "./components/map/ObjectsMap.vue"

const monitoringStore = useMonitoringStore()
onMounted(async () => {
  await monitoringStore.fetchObjects()
})
</script>

<template>
  <div class="flex h-screen p-4 gap-4 bg-gray-50">
    <aside
      class="w-90 border bg-white border-gray-300 rounded-lg overflow-hidden"
    >
      <MonitoringSidebar />
    </aside>
    <main class="flex-1 border bg-white border-gray-300 rounded-lg">
      <ObjectsMap />
    </main>
  </div>
</template>
