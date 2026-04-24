<script setup lang="ts">
import SearchBar from "./SearchBar.vue"
import SortDropdown from "./SortDropdown.vue"
import FiltersPopover from "./FiltersPopover.vue"
import ItemsCounter from "./ItemsCounter.vue"

import { useMonitoringStore } from "../../../stores/monitoring.store"

const monitoringStore = useMonitoringStore()
</script>

<template>
  <div
    class="pt-4 px-3 pb-2 border-b border-gray-200 bg-white relative z-10 flex flex-col gap-3"
  >
    <div class="flex flex-col w-full items-center gap-2">
      <div class="flex w-full items-center gap-2">
        <SearchBar
          v-model="monitoringStore.searchQuery"
          :debounce-ms="300"
          class="flex-1 w-full"
        />
        <div class="flex items-between gap-1.5">
          <SortDropdown />
          <FiltersPopover />
        </div>
      </div>
      <ItemsCounter
        :shown="monitoringStore.filteredObjects.length"
        :total="monitoringStore.objects.length"
      />
    </div>
  </div>
</template>
