import { describe, it, expect, vi, beforeEach } from "vitest"
import { getObjects } from "./monitoring.service"

describe("monitoring.service", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("should fetch objects successfully", async () => {
    const mockData = [{ id: 1, name: "Object 1" }]
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response)

    const data = await getObjects()
    expect(data).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith("/mocks/objects.json")
  })

  it("should throw an error if fetching objects fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response)

    await expect(getObjects()).rejects.toThrow(
      "Failed to fetch monitoring data",
    )
    expect(fetch).toHaveBeenCalledWith("/mocks/objects.json")
  })
})
