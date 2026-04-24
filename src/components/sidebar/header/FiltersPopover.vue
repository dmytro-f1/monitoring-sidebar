<script setup lang="ts">
import { useMonitoringStore } from "../../../stores/monitoring.store"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { useI18n } from "vue-i18n"
import type { ConnectionStatus } from "../../../types/monitoring"

const monitoringStore = useMonitoringStore()
const { t } = useI18n()

type ConnectionOption = { id: ConnectionStatus; label: string; icon: string }

const connectionOptions: ConnectionOption[] = [
  { id: "online", label: "filters.online", icon: "bigtop_updates" },
  { id: "offline", label: "filters.offline", icon: "signal_disconnected" },
  { id: "unknown", label: "filters.unknown", icon: "help" },
] as const

type MovementOption = { id: boolean; label: string; icon: string }

const movementOptions: MovementOption[] = [
  { id: true, label: "filters.moving", icon: "moving" },
  { id: false, label: "filters.stopped", icon: "local_parking" },
] as const
</script>

<template>
  <Popover as="div" class="relative inline-block text-left">
    <div>
      <PopoverButton
        class="relative w-10 h-10 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
      >
        <span class="material-symbols-outlined text-xl!"> filter_list </span>

        <!-- Active Filters Badge -->
        <span
          v-if="
            monitoringStore.filters.connection.length > 0 ||
            monitoringStore.filters.movement.length > 0
          "
          class="absolute bottom-0 right-0 flex justify-center items-center bg-blue-100 text-blue-700 text-[9px] font-bold h-4 w-4 rounded-full ml-1"
        >
          {{
            monitoringStore.filters.connection.length +
            monitoringStore.filters.movement.length
          }}
        </span>
      </PopoverButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <PopoverPanel
        class="absolute right-0 z-50 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden overflow-hidden"
      >
        <div class="p-4 flex flex-col gap-4">
          <!-- Connection Filters -->
          <div class="flex flex-col gap-2">
            <div
              class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {{ t("filters.connection") }}
            </div>
            <label
              v-for="option in connectionOptions"
              :key="option.id"
              class="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="checkbox"
                :value="option.id"
                v-model="monitoringStore.filters.connection"
                class="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div class="flex items-center gap-1">
                {{ t(option.label) }}
                <span class="material-symbols-outlined text-base!">{{
                  option.icon
                }}</span>
              </div>
            </label>
          </div>

          <!-- Movement Filters -->
          <div class="flex flex-col gap-2">
            <div
              class="text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-100 pt-3"
            >
              {{ t("filters.movement") }}
            </div>
            <label
              v-for="option in movementOptions"
              :key="String(option.id)"
              class="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                type="checkbox"
                :value="option.id"
                v-model="monitoringStore.filters.movement"
                class="rounded-sm border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <div class="flex items-center gap-1">
                {{ t(option.label) }}
                <span class="material-symbols-outlined text-base!">{{
                  option.icon
                }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Clear Actions -->
        <div
          class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end"
        >
          <button
            @click="monitoringStore.clearFilters()"
            :disabled="!monitoringStore.hasActiveFilters"
            class="text-sm text-red-600 disabled:opacity-50 not-disabled:hover:text-red-800 not-disabled:cursor-pointer font-medium transition-opacity"
          >
            {{ t("filters.clear") }}
          </button>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
