<script setup lang="ts">
import { useI18n } from "vue-i18n"
import type { ConnectionStatus } from "../../../types/monitoring"
import StatusIcon from "./StatusIcon.vue"

defineProps<{
  battery_level: number
  signal_strength: number
  movement_state: boolean
  connection_status: ConnectionStatus
}>()

const { t } = useI18n()

const getBatteryColor = (level: number) => {
  if (level < 30) return "text-red-500"
  if (level <= 70) return "text-yellow-500"
  return "text-green-500"
}

const getBatteryIcon = (level: number) => {
  if (level < 15) return "battery_0_bar"
  if (level < 30) return "battery_1_bar"
  if (level < 50) return "battery_2_bar"
  if (level < 70) return "battery_3_bar"
  if (level < 90) return "battery_4_bar"
  if (level < 100) return "battery_5_bar"
  return "battery_full"
}

const getSignalIcon = (strength: number) => {
  if (strength <= 0) return "signal_cellular_nodata"
  if (strength === 1) return "signal_cellular_2_bar"
  if (strength === 2) return "signal_cellular_3_bar"
  return "signal_cellular_4_bar"
}

const getMovementIcon = (state: boolean) => {
  if (state) return "moving"
  return "local_parking"
}

const getConnectionIcon = (status: ConnectionStatus) => {
  if (status === "online") return "bigtop_updates"
  else if (status === "offline") return "signal_disconnected"
  return "help"
}
</script>

<template>
  <div class="mt-1 flex items-center space-x-2 text-gray-500">
    <div
      class="flex items-center space-x-0.5"
      :class="getBatteryColor(battery_level)"
    >
      <StatusIcon :icon="getBatteryIcon(battery_level)" />
      <span class="text-xs font-medium"> {{ battery_level }}% </span>
    </div>

    <StatusIcon :icon="getSignalIcon(signal_strength)" />

    <StatusIcon
      :icon="getMovementIcon(movement_state)"
      :title="t(`status.movement.${movement_state}`)"
    />

    <StatusIcon
      :icon="getConnectionIcon(connection_status)"
      :title="t(`status.connection.${connection_status}`)"
    />
  </div>
</template>
