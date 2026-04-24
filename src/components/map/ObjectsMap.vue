<script setup lang="ts">
import "ol/ol.css"

import { onMounted } from "vue"

import { Map, View } from "ol"
import { OSM } from "ol/source"
import TileLayer from "ol/layer/Tile"
import { Vector as VectorLayer } from "ol/layer"
import { Vector as VectorSource } from "ol/source"
import { useMapFeatures } from "../../composables/useMapFeatures"
import { useSourceZoomOnce } from "../../composables/useZoomOnce"

const vectorSource = new VectorSource()
const vectorLayer = new VectorLayer({
  source: vectorSource,
})

onMounted(() => {
  const map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  })

  useMapFeatures(map, vectorSource, vectorLayer)
  useSourceZoomOnce(map, vectorSource)
})
</script>

<template>
  <div id="map" class="w-full h-full rounded-md overflow-clip"></div>
</template>
