<script setup lang="ts">
import MonitoringSidebar from "./components/sidebar/MonitoringSidebar.vue"

import { onMounted } from "vue"
import { useMonitoringStore } from "./stores/monitoring.store"

const monitoringStore = useMonitoringStore()
onMounted(async () => {
  console.log("Loading...")
  await monitoringStore.fetchObjects()
})
</script>

<template>
  <div class="flex h-screen p-4 gap-4 bg-gray-50">
    <aside
      class="w-75 border bg-white border-gray-300 rounded-lg overflow-hidden"
    >
      <MonitoringSidebar />
    </aside>
    <main class="flex-1 border bg-white border-gray-300 rounded-lg">
      <!-- Map -->
    </main>
  </div>
</template>
