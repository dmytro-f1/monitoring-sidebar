<script setup lang="ts">
import { ref, watch } from "vue"
import { debounce } from "../../../utils/debounce"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const queryModel = defineModel<string>()

const props = defineProps<{
  debounceMs: number
}>()

const query = ref("")
const updateQuery = debounce(
  () => (queryModel.value = query.value),
  props.debounceMs,
)
watch(query, updateQuery)
</script>

<template>
  <div class="relative">
    <span
      class="material-symbols-outlined text-lg! absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      search
    </span>
    <input
      v-model="query"
      type="text"
      :placeholder="t('search_placeholder')"
      class="w-full pl-10 pr-7 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
    />
    <button
      v-if="query"
      @click="query = ''"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center"
    >
      <span class="material-symbols-outlined text-lg!"> close </span>
    </button>
  </div>
</template>
