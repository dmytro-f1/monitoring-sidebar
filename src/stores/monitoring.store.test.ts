import { describe, it, expect, vi, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useMonitoringStore } from "./monitoring.store"
import * as monitoringService from "../services/monitoring.service"
import type { MonitoringObject } from "../types/monitoring"

const createMockObject = (
  overrides: Partial<MonitoringObject>,
): MonitoringObject => ({
  id: 1,
  name: "Test Object",
  license_plate: "TEST1234",
  type: "car",
  model: "Model X",
  connection_status: "online",
  battery_level: 100,
  signal_strength: 5,
  movement_state: false,
  location: { latitude: 0, longitude: 0 },
  last_message_device_datetime: "2023-01-01T00:00:00Z",
  devices: [],
  contracts: [],
  ...overrides,
})

describe("monitoring.store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it("should initialize with empty objects, not loading, and no error", () => {
    const store = useMonitoringStore()
    expect(store.objects).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it("should fetch objects successfully and update the store", async () => {
    const store = useMonitoringStore()
    const mockObjects = [createMockObject({ id: 1, name: "Test Object" })]

    vi.spyOn(monitoringService, "getObjects").mockResolvedValue(mockObjects)

    const fetchPromise = store.fetchObjects()

    expect(store.isLoading).toBe(true)
    expect(store.error).toBeNull()

    await fetchPromise

    expect(store.objects).toEqual(mockObjects)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(monitoringService.getObjects).toHaveBeenCalledTimes(1)
  })

  it("should handle fetch error and update the store", async () => {
    const store = useMonitoringStore()
    const errorMessage = "Network error"

    vi.spyOn(monitoringService, "getObjects").mockRejectedValue(
      new Error(errorMessage),
    )

    const fetchPromise = store.fetchObjects()

    expect(store.isLoading).toBe(true)
    expect(store.error).toBeNull()

    await fetchPromise

    expect(store.objects).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(errorMessage)
    expect(monitoringService.getObjects).toHaveBeenCalledTimes(1)
  })

  describe("filtering and sorting", () => {
    it("should filter objects by search query", () => {
      const store = useMonitoringStore()
      store.objects = [
        createMockObject({ id: 1, name: "Truck A", license_plate: "AA1111AA" }),
        createMockObject({ id: 2, name: "Car B", license_plate: "BB2222BB" }),
      ]

      store.searchQuery = "truck"
      expect(store.filteredObjects).toHaveLength(1)
      expect(store.filteredObjects[0].id).toBe(1)

      store.searchQuery = "2222"
      expect(store.filteredObjects).toHaveLength(1)
      expect(store.filteredObjects[0].id).toBe(2)
    })

    it("should filter objects by connection status", () => {
      const store = useMonitoringStore()
      store.objects = [
        createMockObject({ id: 1, connection_status: "online" }),
        createMockObject({ id: 2, connection_status: "offline" }),
        createMockObject({ id: 3, connection_status: "unknown" }),
      ]

      store.filters.connection = ["online"]
      expect(store.filteredObjects).toHaveLength(1)
      expect(store.filteredObjects[0].id).toBe(1)

      store.filters.connection = ["online", "offline"]
      expect(store.filteredObjects).toHaveLength(2)
    })

    it("should filter objects by movement state", () => {
      const store = useMonitoringStore()
      store.objects = [
        createMockObject({ id: 1, movement_state: true }),
        createMockObject({ id: 2, movement_state: false }),
      ]

      store.filters.movement = [true]
      expect(store.filteredObjects).toHaveLength(1)
      expect(store.filteredObjects[0].id).toBe(1)
    })

    it("should clear all filters", () => {
      const store = useMonitoringStore()

      store.searchQuery = "test"
      store.filters.connection = ["online"]
      store.filters.movement = [true]

      store.clearFilters()

      expect(store.searchQuery).toBe("test")
      expect(store.filters.connection).toEqual([])
      expect(store.filters.movement).toEqual([])
    })

    it("should sort objects by name", () => {
      const store = useMonitoringStore()
      store.objects = [
        createMockObject({ id: 1, name: "Zebra" }),
        createMockObject({ id: 2, name: "Alpha" }),
      ]

      store.sortBy = "name"
      store.sortOrder = "asc"
      expect(store.filteredObjects[0].id).toBe(2)

      store.sortOrder = "desc"
      expect(store.filteredObjects[0].id).toBe(1)
    })

    it("should sort objects by last activity", () => {
      const store = useMonitoringStore()
      store.objects = [
        createMockObject({
          id: 1,
          last_message_device_datetime: "2023-01-02T00:00:00Z",
        }),
        createMockObject({
          id: 2,
          last_message_device_datetime: "2023-01-01T00:00:00Z",
        }),
      ]

      store.sortBy = "last_activity"
      store.sortOrder = "asc"
      expect(store.filteredObjects[0].id).toBe(1)

      store.sortOrder = "desc"
      expect(store.filteredObjects[0].id).toBe(2)
    })
  })
})
