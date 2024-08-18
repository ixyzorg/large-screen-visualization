<template>
  <div class="h-screen bg-[url('./assets/imgs/bg.jpg')] bg-cover bg-center text-white">
    <div class="flex p-6" ref="screenRef">
      <div v-if="data" class="flex flex-[3] flex-col bg-slate-800 bg-opacity-50">
        <!-- 横向柱状图 -->
        <HorizontalBar class="mb-4 flex-1" :data="data.regionData" />
        <!-- 雷达图 -->
        <RadarMap class="mb-4 flex-1" :data="data.riskData" />
        <!-- 关系图 -->
        <RelationMap class="flex-1" />
      </div>

      <div class="mx-6 flex flex-[4] flex-col">
        <div class="mb-6 bg-slate-800 bg-opacity-50 text-[2rem]">大屏可视化</div>
        <!-- 数据总览 -->
        <DataTotal class="mb-6 flex-1 bg-slate-800 bg-opacity-50" />
        <!-- 地图 -->
        <MapChart class="flex-[2] bg-slate-800 bg-opacity-50" />
      </div>

      <div v-if="data" class="flex flex-[3] flex-col bg-slate-800 bg-opacity-50">
        <!-- 纵向柱状图 -->
        <VerticalBar class="mb-4 flex-1" :data="data.serverData" />
        <!-- 环形图 -->
        <RingBar class="mb-4 flex-1" />
        <!-- 文档云图 -->
        <WorldCloud class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataTotal from '@/components/DataTotal.vue'
import HorizontalBar from '@/components/HorizontalBar.vue'
import MapChart from '@/components/MapChart.vue'
import RadarMap from '@/components/RadarMap.vue'
import RelationMap from '@/components/RelationMap.vue'
import RingBar from '@/components/RingBar.vue'
import VerticalBar from '@/components/VerticalBar.vue'
import WorldCloud from '@/components/WorldCloud.vue'

import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { getDataService } from '@/api/data'
import type { IRequestResultData } from '@/types/requestResult'
const screenRef = ref<HTMLDivElement>()
const { width, height } = useWindowSize()

const handleScreenAuto = (designWidth: number = 1920, designHeight: number = 1080) => {
  const deviceWidth = window.innerWidth
  const deviceHeight = window.innerHeight
  const scaleX = deviceWidth / designWidth
  const scaleY = deviceHeight / designHeight
  const scale = Math.min(scaleX, scaleY)
  screenRef.value!.parentElement!.style.position = 'relative'
  screenRef.value!.style.width = `${designWidth}px`
  screenRef.value!.style.height = `${designHeight}px`
  screenRef.value!.style.position = 'absolute'
  screenRef.value!.style.top = '50%'
  screenRef.value!.style.left = '50%'
  screenRef.value!.style.transformOrigin = '0 0'
  screenRef.value!.style.transform = `scale(${scale}) translate(-50%, -50%)`
}

onMounted(() => {
  handleScreenAuto()
})
watch([width, height], () => {
  handleScreenAuto()
})

const data = ref<IRequestResultData>()
const getData = async () => {
  const {
    data: { data: res }
  } = await getDataService()
  data.value = res
}
getData()
const timer = setInterval(() => {
  getData()
}, 2000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped></style>
