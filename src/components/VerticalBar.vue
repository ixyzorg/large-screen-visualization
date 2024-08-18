<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full"></div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IServerData } from '@/types/requestResult'
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
const props = defineProps<{
  data: IServerData
}>()

let myChart: echarts.ECharts | undefined
const chartRef = ref<HTMLDivElement>()
const renderEcharts = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: '服务资源占用比',
      textStyle: {
        color: '#fff' // 设置标题颜色
      }
    },
    xAxis: {
      type: 'category',
      data: props.data.servers.map((item) => item.name),
      axisLabel: {
        color: '#9eb1c8' // 设置 x 轴标签颜色
      },
      axisTick: {
        show: false // 隐藏 x 轴刻度线
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      max: function (value: any) {
        return parseInt((value.max * 1.2).toString())
      }
    },
    grid: {
      left: '0%',
      right: '5%',
      top: '5%',
      bottom: '2%',
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        data: props.data.servers.map((item) => item.value),
        barWidth: 20,
        itemStyle: {
          color: '#2f7ad6',
          borderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: (params) => {
            return params.value + '%'
          }
        }
      }
    ]
  }
  myChart?.setOption(options)
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
