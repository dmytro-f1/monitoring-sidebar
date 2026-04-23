<script setup lang="ts">
import { useI18n } from "vue-i18n"
import type { MonitoringObject } from "../../../types/monitoring"
import StatusBar from "./StatusBar.vue"
import ActivityTime from "./ActivityTime.vue"
defineProps<{
  object: MonitoringObject
}>()

const { t } = useI18n()
</script>

<template>
  <div
    class="p-4 border-b border-gray-100 bg-white hover:bg-gray-50 cursor-pointer"
  >
    <h3 class="font-semibold text-gray-800">{{ object.name }}</h3>
    <p class="text-sm text-gray-600">
      {{ object.license_plate }} - {{ t(`transport.${object.type}`) }}
    </p>

    <StatusBar
      :battery_level="object.battery_level"
      :signal_strength="object.signal_strength"
      :movement_state="object.movement_state"
      :connection_status="object.connection_status"
    />
    <ActivityTime :iso-time="object.last_message_device_datetime" />
  </div>
</template>
