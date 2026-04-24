import { watch } from "vue"

import { Map } from "ol"
import { fromLonLat } from "ol/proj"
import VectorSource from "ol/source/Vector"

import { useMonitoringStore } from "../stores/monitoring.store"
import { createMapFeatures } from "../utils/map-features"

export function useMapFeatures(map: Map, vectorSource: VectorSource) {
  const monitoringStore = useMonitoringStore()

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
  )
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
        map.getView().animate({
          center: fromLonLat([
            selectedObject.location.longitude,
            selectedObject.location.latitude,
          ]),
          duration: 500,
          zoom: 12,
        })
      }
    },
    { immediate: true },
  )
}
