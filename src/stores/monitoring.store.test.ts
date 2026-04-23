import { describe, it, expect, vi, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useMonitoringStore } from "./monitoring.store"
import * as monitoringService from "../services/monitoring.service"

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
    const mockObjects = [{ id: 1, name: "Test Object" }]

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
})
