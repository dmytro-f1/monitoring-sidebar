<script setup lang="ts">
import StatusIcon from "./StatusIcon.vue"

import { ref, onMounted, onUnmounted, computed } from "vue"
import { useI18n } from "vue-i18n"

const props = defineProps<{
  isoTime: string
}>()

const { t } = useI18n()

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 10000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const activityTimeString = computed(() => {
  if (!props.isoTime) return ""

  const now = currentTime.value
  const date = new Date(props.isoTime)

  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 5) {
    return t("time.now")
  }

  if (diffSec < 60) {
    return t("time.seconds_ago", { n: diffSec })
  }

  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) {
    return t("time.minutes_ago", { n: diffMin })
  }

  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) {
    return t("time.hours_ago", { n: diffHours })
  }

  const diffDays = Math.floor(diffHours / 24)

  if (diffDays === 1) {
    return t("time.yesterday")
  }

  if (diffDays < 7) {
    return t("time.days_ago", { n: diffDays })
  }

  const diffWeeks = Math.floor(diffDays / 7)

  if (diffWeeks === 1) {
    return t("time.week_ago")
  }

  return t("time.weeks_ago", { n: diffWeeks })
})
</script>

<template>
  <div class="flex items-center space-x-1 text-xs text-gray-400">
    <StatusIcon icon="schedule" class="text-sm!" />
    <span>{{ $t("last_activity", { str: activityTimeString }) }}</span>
  </div>
</template>
