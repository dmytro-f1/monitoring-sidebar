import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { getObjects } from "../services/monitoring.service"
import type { MonitoringObject } from "../types/monitoring"

export const useMonitoringStore = defineStore("monitoring", () => {
  const objects = ref<MonitoringObject[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchObjects = async () => {
    isLoading.value = true
    error.value = null
    try {
      objects.value = await getObjects()
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error"
    } finally {
      isLoading.value = false
    }
  }

  // TODO: filtering functionality
  const filteredObjects = computed(() => objects.value)

  return { objects, filteredObjects, isLoading, error, fetchObjects }
})
