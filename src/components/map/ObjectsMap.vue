<script setup lang="ts">
import "ol/ol.css"

import { onMounted } from "vue"

import { Map, View } from "ol"
import { OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"

onMounted(() => {
  new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  })
})
</script>

<template>
  <div id="map" class="w-full h-full rounded-md overflow-clip"></div>
</template>
