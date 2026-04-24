<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { t } = useI18n()

defineProps<{
  shown: number
  total: number
}>()
</script>

<template>
  <div class="w-full flex justify-end text-sm text-gray-600">
    {{ t("showing_n_out_of_m_items", { n: shown, m: total }) }}
  </div>
</template>
