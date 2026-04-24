import { Style, Icon, Circle, Fill } from "ol/style"

import locationPin from "../assets/icons/location_pin.svg"

import type { ConnectionStatus } from "../types/monitoring"

const getStatusColor = (connection: ConnectionStatus) => {
  if (connection === "online") {
    return "#00c951"
  } else if (connection === "offline") {
    return "#efb100"
  }

  return "#fb2c36"
}

export const createMarkerStyle = (
  connection: ConnectionStatus,
  isSelected: boolean,
) => {
  const scale = isSelected ? 1 : 0.9
  const color = isSelected ? "#2b7fff" : "#4a5565"

  const baseStyle = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: locationPin,
      scale,
      color,
    }),
  })

  const statusStyle = new Style({
    image: new Circle({
      radius: 6 * scale,
      displacement: [12 * scale, 40 * scale],
      fill: new Fill({
        color: getStatusColor(connection),
      }),
    }),
  })

  return [baseStyle, statusStyle]
}
