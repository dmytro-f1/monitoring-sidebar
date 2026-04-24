<script setup lang="ts">
import { useI18n } from "vue-i18n"

const { locale } = useI18n()
</script>

<template>
  <div
    class="bg-white rounded-md shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
  >
    <select
      v-model="locale"
      class="w-full h-full px-3 py-1.5 text-sm bg-transparent outline-none cursor-pointer text-gray-700 font-medium"
    >
      <option value="en">English</option>
      <option value="uk">Українська</option>
    </select>
  </div>
</template>
