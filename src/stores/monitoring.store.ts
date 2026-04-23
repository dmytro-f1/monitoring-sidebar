import { defineStore } from "pinia"
import { ref } from "vue"
import { getObjects } from "../services/monitoring.service"

export const useMonitoringStore = defineStore("monitoring", () => {
  const objects = ref([])
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

  return { objects, isLoading, error, fetchObjects }
})
