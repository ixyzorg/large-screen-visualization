<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full"></div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IRegionData } from '@/types/requestResult'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  data: IRegionData
}>()

const chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined
const renderEcharts = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: '大区数据信息',
      textStyle: {
        color: '#fff' // 设置标题颜色
      }
    },
    xAxis: {
      show: false,
      type: 'value',
      max: function (value) {
        return (value.max * 1.2).toString()
      }
    },
    yAxis: {
      type: 'category',
      data: props.data.regions.map((item) => item.name),
      inverse: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9eb1c8'
      },
      axisLine: {
        show: false // 隐藏 y 轴轴线
      }
    },
    grid: {
      left: '0%',
      right: '5%',
      top: '8%',
      bottom: '-5%',
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        data: props.data.regions.map((item) => item.value),
        barWidth: 20,
        itemStyle: {
          color: '#2f7ad6',
          borderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180,180,180)',
          borderRadius: 5
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff'
        }
      }
    ]
  }
  myChart!.setOption(options)
}
onMounted(() => {
  myChart = echarts.init(chartRef.value)
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
