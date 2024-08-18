<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full">111</div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IRiskData } from '@/types/requestResult'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{
  data: IRiskData
}>()
console.log(props.data)
const chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined
const renderEcharts = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: '云端报警信息',
      textStyle: {
        color: '#fff' // 设置标题颜色
      }
    },
    grid: {
      left: '0%',
      right: '5%',
      top: '8%',
      bottom: '-5%',
      containLabel: true
    },
    radar: {
      axisName: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 12
      },
      shape: 'polygon',
      center: ['50%', '50%'],
      radius: '80%',
      startAngle: 120,
      axisLine: {
        lineStyle: {
          color: 'rgba(5, 213, 255, 0.8)'
        }
      },
      splitLine: {
        lineStyle: {
          width: 1,
          color: 'rgba(5, 213, 255, 0.8)'
        }
      },
      indicator: props.data.risks.map((item) => {
        return {
          name: item.name,
          max: 100
        }
      }),
      splitArea: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '0%'
    },
    angleAxis: {
      min: 0,
      interval: 50,
      clockwise: false
    },
    radiusAxis: {
      min: 0,
      interval: 20,
      splitArea: {
        show: true
      }
    },
    series: [
      {
        type: 'radar',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#05d5ff'
        },
        areaStyle: {
          color: '#05d5ff',
          opacity: 0.5
        },
        lineStyle: {
          width: 2,
          color: '#05d5ff'
        },
        label: {
          show: true,
          color: '#fff'
        },
        data: [
          {
            value: props.data.risks.map((item) => item.value),
            name: '云端报警信息'
          }
        ]
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
