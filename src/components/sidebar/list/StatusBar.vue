<script setup lang="ts">
import { useI18n } from "vue-i18n"
import type { MonitoringObject } from "../../../types/monitoring"

defineProps<{
  object: MonitoringObject
}>()

const { t } = useI18n()

const getBatteryColor = (level: number) => {
  if (level < 30) return "text-red-500"
  if (level <= 70) return "text-yellow-500"
  return "text-green-500"
}
</script>

<template>
  <div class="mt-1 flex items-center space-x-3">
    <!-- Battery -->
    <div
      class="flex items-center space-x-1"
      :title="t('status.battery') + `: ${object.battery_level}%`"
    >
      <span
        class="text-xs font-medium"
        :class="getBatteryColor(object.battery_level)"
      >
        {{ object.battery_level }}%
      </span>
    </div>

    <!-- Signal -->
    <div
      class="flex items-center space-x-1"
      :title="t('status.signal') + `: ${object.signal_strength}`"
    >
      <span class="text-xs font-medium text-gray-600">
        {{ object.signal_strength }}/3
      </span>
    </div>

    <!-- Movement -->
    <div
      class="flex items-center space-x-1"
      :title="t(`movement.${object.movement_state}`)"
    >
      <span class="text-xs font-medium text-gray-600">
        {{ t(`movement.${object.movement_state}`) }}
      </span>
    </div>

    <!-- Connection -->
    <div
      class="flex items-center space-x-1.5"
      :title="t(`connection.${object.connection_status}`)"
    >
      <span class="text-xs font-medium text-gray-600">
        {{ t(`connection.${object.connection_status}`) }}
      </span>
    </div>
  </div>
</template>
