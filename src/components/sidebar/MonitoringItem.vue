<template>
  <div
    class="p-4 border-b border-gray-100 bg-white hover:bg-gray-50 cursor-pointer"
  >
    <h3 class="font-semibold text-gray-800">{{ object.name }}</h3>
    <p class="text-sm text-gray-600">
      {{ object.license_plate }} - {{ object.type }}
    </p>
    <!-- More data later -->
  </div>
</template>

<script setup lang="ts">
import type { MonitoringObject } from "../../types/monitoring"

defineProps<{
  object: MonitoringObject
}>()
</script>
