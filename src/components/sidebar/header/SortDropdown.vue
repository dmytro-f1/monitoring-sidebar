<script setup lang="ts">
import { useMonitoringStore } from "../../../stores/monitoring.store"
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { useI18n } from "vue-i18n"

const monitoringStore = useMonitoringStore()
const { t } = useI18n()

const sortTypes = [
  { id: "name", label: "sort.by_name", icon: "sort_by_alpha" },
  { id: "last_activity", label: "sort.by_last_activity", icon: "schedule" },
] as const

const sortOrders = [
  { id: "asc", label: "sort.order_asc", icon: "arrow_upward" },
  { id: "desc", label: "sort.order_desc", icon: "arrow_downward" },
] as const

const setSortType = (sortBy: "name" | "last_activity") => {
  monitoringStore.sortBy = sortBy
}

const setSortOrder = (sortOrder: "asc" | "desc") => {
  monitoringStore.sortOrder = sortOrder
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="w-10 h-10 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
      >
        <span class="material-symbols-outlined text-xl!"> sort </span>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden overflow-hidden"
      >
        <!-- Sort Type Group -->
        <div
          class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50"
        >
          {{ t("sort.by") }}
        </div>
        <div class="py-1">
          <MenuItem
            v-for="option in sortTypes"
            :key="option.id"
            v-slot="{ active }"
          >
            <button
              @click="setSortType(option.id)"
              class="group flex w-full items-center px-4 py-2 text-sm transition-colors cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                monitoringStore.sortBy === option.id
                  ? 'font-semibold bg-blue-50 text-blue-700'
                  : '',
              ]"
            >
              <span
                class="material-symbols-outlined mr-2 text-[18px]"
                :class="
                  monitoringStore.sortBy === option.id
                    ? 'text-blue-700'
                    : 'text-gray-400'
                "
              >
                {{ option.icon }}
              </span>
              <span class="flex-1 text-left">{{ t(option.label) }}</span>
              <span
                v-if="monitoringStore.sortBy === option.id"
                class="material-symbols-outlined text-[18px] text-blue-700"
              >
                check
              </span>
            </button>
          </MenuItem>
        </div>

        <!-- Sort Order Group -->
        <div
          class="px-4 py-2 border-t border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50"
        >
          {{ t("sort.order") }}
        </div>
        <div class="py-1">
          <MenuItem
            v-for="option in sortOrders"
            :key="option.id"
            v-slot="{ active }"
          >
            <button
              @click="setSortOrder(option.id)"
              class="group flex w-full items-center px-4 py-2 text-sm transition-colors cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                monitoringStore.sortOrder === option.id
                  ? 'font-semibold bg-blue-50 text-blue-700'
                  : '',
              ]"
            >
              <span
                class="material-symbols-outlined mr-2 text-[18px]"
                :class="
                  monitoringStore.sortOrder === option.id
                    ? 'text-blue-700'
                    : 'text-gray-400'
                "
              >
                {{ option.icon }}
              </span>
              <span class="flex-1 text-left">{{ t(option.label) }}</span>
              <span
                v-if="monitoringStore.sortOrder === option.id"
                class="material-symbols-outlined text-[18px] text-blue-700"
              >
                check
              </span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
