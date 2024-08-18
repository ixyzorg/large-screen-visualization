<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full">111</div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IWordCloundData } from '@/types/requestResult'
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-wordcloud'

const props = defineProps<{
  data: IWordCloundData
}>()
let myChart: echarts.ECharts | undefined
const chartRef = ref<HTMLDivElement>()
const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r}, ${g}, ${b})`
}
const renderEcharts = () => {
  const options = {
    title: {
      text: '关键词条',
      textStyle: {
        color: '#fff' // 设置标题颜色
      }
    },
    series: [
      {
        // 类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [8, 46],
        // 文字旋转范围
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 随机色值
          color: randomRGB
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: props.data.datas
      }
    ]
  }
  myChart!.setOption(options)
}
onMounted(() => {
  myChart = echarts.init(chartRef.value!)
  renderEcharts()
})
watch(
  () => props.data,
  () => {
    renderEcharts()
  }
)
</script>

<style scoped></style>
