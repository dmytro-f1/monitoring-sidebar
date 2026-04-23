import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { getObjects } from "../services/monitoring.service"
import type { MonitoringObject, ConnectionStatus } from "../types/monitoring"

export interface MonitoringFilters {
  searchQuery: string
  connection: ConnectionStatus[]
  movement: boolean[]
}

export const useMonitoringStore = defineStore("monitoring", () => {
  const objects = ref<MonitoringObject[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const selectedObjectId = ref<number | null>(null)
  const selectedObject = computed(
    () => objects.value.find((o) => o.id === selectedObjectId.value) || null,
  )

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

  const sortBy = ref<"name" | "last_activity">("name")
  const sortOrder = ref<"asc" | "desc">("asc")

  const filters = ref<MonitoringFilters>({
    searchQuery: "",
    connection: [],
    movement: [],
  })

  const filteredObjects = computed(() => {
    let result = objects.value

    if (filters.value.searchQuery.trim()) {
      const lowerQuery = filters.value.searchQuery.toLowerCase()
      result = result.filter(
        (o) =>
          o.name.toLowerCase().includes(lowerQuery) ||
          o.license_plate.toLowerCase().includes(lowerQuery),
      )
    }

    if (filters.value.connection.length > 0) {
      result = result.filter((o) =>
        filters.value.connection.includes(o.connection_status),
      )
    }

    if (filters.value.movement.length > 0) {
      result = result.filter((o) =>
        filters.value.movement.includes(o.movement_state),
      )
    }

    result = [...result].sort((a, b) => {
      let comparison = 0

      if (sortBy.value === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy.value === "last_activity") {
        const timeA = new Date(a.last_message_device_datetime).getTime()
        const timeB = new Date(b.last_message_device_datetime).getTime()
        comparison = timeA - timeB
      }

      return sortOrder.value === "asc" ? comparison : -comparison
    })

    if (
      selectedObjectId.value &&
      !result.find((o) => o.id === selectedObjectId.value)
    ) {
      selectedObjectId.value = null
    }

    return result
  })

  const clearFilters = () => {
    filters.value = {
      searchQuery: "",
      connection: [],
      movement: [],
    }
  }

  return {
    objects,
    filteredObjects,
    isLoading,
    error,
    selectedObjectId,
    selectedObject,
    filters,
    sortBy,
    sortOrder,
    fetchObjects,
    clearFilters,
  }
})
