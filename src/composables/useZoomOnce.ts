import { Map } from "ol"
import VectorSource from "ol/source/Vector"

export function useSourceZoomOnce(map: Map, vectorSource: VectorSource) {
  const handler = () => {
    const features = vectorSource.getFeatures()
    const extent = vectorSource.getExtent()

    if (features.length > 0 && extent) {
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 14,
        duration: 1000,
      })
      vectorSource.un("change", handler)
    }
  }

  vectorSource.on("change", handler)

  return () => vectorSource.un("change", handler)
}
