import type { MonitoringObject } from "../types/monitoring"

import { Feature } from "ol"
import { Point } from "ol/geom"
import { fromLonLat } from "ol/proj"

import { createMarkerStyle } from "./map-styles"

export function createMapFeatures(
  objects: MonitoringObject[],
  selectedObjectId?: number,
) {
  return objects.map((obj) => {
    const isSelected = selectedObjectId === obj.id
    const isConnected = obj.connection_status

    const feature = new Feature({
      geometry: new Point(
        fromLonLat([obj.location.longitude, obj.location.latitude]),
      ),
      name: obj.name,
    })

    feature.set("id", obj.id)

    feature.setStyle(createMarkerStyle(isConnected, isSelected))
    return feature
  })
}
