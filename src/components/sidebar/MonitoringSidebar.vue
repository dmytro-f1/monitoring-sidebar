<script setup lang="ts">
import SidebarHeader from "./SidebarHeader.vue"
import SidebarList from "./list/SidebarList.vue"
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <SidebarHeader></SidebarHeader>
    <SidebarList></SidebarList>
  </div>
</template>
