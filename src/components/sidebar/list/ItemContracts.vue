<script setup lang="ts">
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import type { Contract } from "../../../types/monitoring"

const props = defineProps<{
  contracts: Contract[]
}>()

const { t } = useI18n()

const isEmpty = computed(() => props.contracts.length === 0)
const isExpanded = ref(false)

const getDateString = (dateStr: string) => {
  if (!dateStr) return ""

  const date = new Date(dateStr)

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
      <span>{{ t("contracts") }} ({{ contracts.length }})</span>
    </button>

    <div v-show="!isEmpty && isExpanded" class="mt-2 text-sm text-gray-600">
      <div
        v-if="!contracts.length"
        class="text-center py-2 text-gray-400 italic"
      >
        {{ t("empty.contracts") }}
      </div>
      <ul v-else class="space-y-2">
        <li
          v-for="contract in contracts"
          :key="contract.id"
          class="bg-gray-50 p-2 rounded border border-gray-100"
        >
          <div class="font-medium text-gray-800">
            {{ contract.name }}
          </div>
          <div class="text-xs text-gray-500 mt-0.5">
            {{ t(`contract.type.${contract.type}`) }}
          </div>

          <div class="flex gap-x-1 mt-1">
            <div class="text-xs">
              {{ getDateString(contract.start_datetime) }} -
              {{ getDateString(contract.finish_datetime) }}
            </div>
          </div>

          <div
            v-if="contract.description"
            class="text-xs text-gray-500 mt-1 italic"
          >
            {{ contract.description }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
