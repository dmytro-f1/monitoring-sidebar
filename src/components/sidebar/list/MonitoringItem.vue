<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import type { MonitoringObject } from "../../../types/monitoring"
import StatusBar from "./StatusBar.vue"
import ActivityTime from "./ActivityTime.vue"
import ItemDevices from "./ItemDevices.vue"
import ItemContracts from "./ItemContracts.vue"

defineProps<{
  object: MonitoringObject
}>()

const { t } = useI18n()

const isExpanded = ref(false)
</script>

<template>
  <div
    class="border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors"
  >
    <div class="p-4">
      <div class="flex justify-between items-start">
        <!-- Left side (object info) -->
        <div class="flex-1">
          <h3
            class="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors"
          >
            {{ object.name }}
          </h3>
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

        <!-- Show more button -->
        <button
          @click.stop="isExpanded = !isExpanded"
          class="w-8 h-8 flex items-center justify-center ml-2 text-gray-400 cursor-pointer hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors focus:outline-hidden"
        >
          <span class="material-symbols-outlined text-md!">
            {{ isExpanded ? "expand_less" : "expand_more" }}
          </span>
        </button>
      </div>

      <div v-show="isExpanded" class="mt-2">
        <ItemDevices :devices="object.devices ?? []" />
        <ItemContracts :contracts="object.contracts ?? []" />
      </div>
    </div>
  </div>
</template>
