export type ConnectionStatus = "online" | "offline" | "unknown"
export type ObjectType = "truck" | "car" | "motorcycle"
export type ContractType = "leasing" | "insurance"
export type DeviceType =
  | "tracker"
  | "fuel_sensor"
  | "door_sensor"
  | "temperature"

export interface Location {
  latitude: number
  longitude: number
}

export interface Device {
  id: number
  name: string
  model: string
  type: DeviceType
  is_monitored: boolean
  installed_at: string // "YYYY-MM-DD"
}

export interface Contract {
  id: number
  name: string
  type: ContractType
  start_datetime: string // "YYYY-MM-DD"
  finish_datetime: string // "YYYY-MM-DD"
  description?: string
}

export interface MonitoringObject {
  id: number
  name: string
  license_plate: string
  type: ObjectType
  model: string
  connection_status: ConnectionStatus
  battery_level: number
  signal_strength: number
  movement_state: boolean
  location: Location
  last_message_device_datetime: string // ISO 8601 date string
  devices: Device[]
  contracts: Contract[]
}
