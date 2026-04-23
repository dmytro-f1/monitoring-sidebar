<script setup lang="ts">
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import type { Device } from "../../../types/monitoring"

const props = defineProps<{
  devices: Device[]
}>()

const { t } = useI18n()

const isEmpty = computed(() => props.devices.length === 0)
const isExpanded = ref(false)

const getInstalledAtString = (installedAt: string) => {
  if (!installedAt) return ""

  const date = new Date(installedAt)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  return t("date", { year, month, day })
}
</script>

<template>
  <div class="">
    <button
      @click="isExpanded = !isExpanded"
      class="flex items-center space-x-1 text-xs font-semibold text-gray-500 transition-colors uppercase tracking-wider"
      :class="isEmpty ? '' : 'cursor-pointer hover:text-blue-600'"
    >
      <span
        class="material-symbols-outlined text-sm!"
        :class="{ invisible: isEmpty }"
      >
        {{ isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_right" }}
      </span>
      <span>{{ t("devices") }} ({{ devices.length }})</span>
    </button>

    <div v-show="!isEmpty && isExpanded" class="my-2 text-sm text-gray-600">
      <div v-if="!devices.length" class="text-center py-2 text-gray-400 italic">
        {{ t("empty.devices") }}
      </div>
      <ul v-else class="space-y-2">
        <li
          v-for="device in devices"
          :key="device.id"
          class="bg-gray-50 p-2 rounded border border-gray-100"
        >
          <div class="font-medium text-gray-800">
            {{ device.name }}
            <span class="font-normal text-gray-500">({{ device.model }})</span>
          </div>
          <div class="text-xs text-gray-500 mt-0.5">
            {{ t(`device.type.${device.type}`) }}
          </div>

          <div class="flex gap-x-1 mt-1">
            <div class="text-xs">
              {{
                t("device.installed_at", {
                  str: getInstalledAtString(device.installed_at),
                })
              }}
            </div>

            <div class="border-l border-gray-300 pl-1 text-xs"></div>

            <div class="text-xs">
              {{
                device.is_monitored
                  ? t("device.status.active")
                  : t("device.status.inactive")
              }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
