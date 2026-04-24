import { watch } from "vue"

import { Map } from "ol"
import { fromLonLat } from "ol/proj"
import VectorSource from "ol/source/Vector"

import { useMonitoringStore } from "../stores/monitoring.store"
import { createMapFeatures } from "../utils/map-features"
import type VectorLayer from "ol/layer/Vector"

export function useMapFeatures(
  map: Map,
  vectorSource: VectorSource,
  vectorLayer: VectorLayer,
) {
  const monitoringStore = useMonitoringStore()

  map.on("click", (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f, {
      layerFilter: (l) => l === vectorLayer,
      hitTolerance: 4,
    })

    if (feature) {
      const id = feature.get("id") as number
      if (!id) return
      monitoringStore.selectedObjectId =
        monitoringStore.selectedObjectId === id ? null : id
    }
  })

  map.on("pointermove", (e) => {
    const hit = map.hasFeatureAtPixel(e.pixel, {
      layerFilter: (l) => l === vectorLayer,
      hitTolerance: 4,
    })

    map.getTargetElement().style.cursor = hit ? "pointer" : ""
  })

  const watchers = [
    watch(
      () => monitoringStore.filteredObjects,
      () => {
        vectorSource.clear()

        const selectedObject = monitoringStore.selectedObject

        const features = createMapFeatures(
          monitoringStore.filteredObjects,
          selectedObject?.id,
        )

        vectorSource.addFeatures(features)
      },
      { immediate: true },
    ),
    watch(
      () => monitoringStore.selectedObject,
      () => {
        const selectedObject = monitoringStore.selectedObject
        vectorSource.clear()

        const features = createMapFeatures(
          monitoringStore.filteredObjects,
          selectedObject?.id,
        )

        vectorSource.addFeatures(features)

        map.renderSync()

        if (selectedObject) {
          const currentZoom = map.getView().getZoom() ?? 0

          map.getView().animate({
            center: fromLonLat([
              selectedObject.location.longitude,
              selectedObject.location.latitude,
            ]),
            duration: 500,
            zoom: Math.max(12, currentZoom),
          })
        }
      },
      { immediate: true },
    ),
  ]

  return () => {
    watchers.forEach((w) => w.stop())
  }
}
