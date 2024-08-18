<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full">111</div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IRlationData } from '@/types/requestResult'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
const props = defineProps<{
  data: IRlationData
}>()
const chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined

const renderEcharts = () => {
  const options: echarts.EChartsOption = {
    title: {
      text: '数据传递信息',
      textStyle: {
        color: '#fff' // 设置标题颜色
      }
    },
    grid: {
      left: '0%',
      right: '5%',
      top: '20%',
      bottom: '-20%',
      containLabel: true
    },
    // X 轴不需要展示
    xAxis: {
      show: false,
      type: 'value'
    },
    // X 轴不需要展示
    yAxis: {
      show: false,
      type: 'value'
    },
    // 核心数据配置
    //@ts-ignore
    series: [
      {
        // 用于展现节点以及节点之间的关系数据
        type: 'graph',
        // 不采用任何布局
        layout: 'none',
        // 使用二维的直角坐标系
        coordinateSystem: 'cartesian2d',
        // 节点标记的大小
        symbolSize: 26,
        // z-index
        z: 3,
        // 边界标签（线条文字）
        edgeLabel: {
          show: true,
          color: '#fff',
          formatter: function (params) {
            const data = params.data as { speed?: string }
            return data.speed || ''
          }
        },
        // 圆饼下文字
        label: {
          color: 'rgba(255,255,255,.5)',
          show: true,
          position: 'bottom'
        },
        // 边两端的标记类型
        edgeSymbol: ['none', 'arrow'],
        // 边两端的标记大小
        edgeSymbolSize: 8,
        // 圆数据
        data: props.data.relations.map((item) => {
          // id 为 0 ，表示数据中心，数据中心单独设置
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value
            }
          } else {
            return {
              name: item.name,
              // 位置
              value: item.value,
              // 数据中心圆的大小
              symbolSize: 100,
              // 圆的样式
              itemStyle: {
                // 渐变色
                color: {
                  colorStops: [
                    { offset: 0, color: '#157eff' },
                    { offset: 1, color: '#35c2ff' }
                  ]
                }
              },
              // 字体
              label: { fontSize: '14' }
            }
          }
        }),
        // 线
        links: props.data.relations.map((item) => ({
          // 方向
          source: item.source,
          target: item.target,
          // 线上的文字
          speed: `${item.speed}kb/s`,
          // 线的样式
          lineStyle: { color: '#12b5d0', curveness: 0.2 },
          // 文字位置
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0]
          }
        }))
      },
      {
        // 用于带有起点和终点信息的线数据的绘制
        type: 'lines',
        // 使用二维的直角坐标系
        coordinateSystem: 'cartesian2d',
        // z-index
        z: 1,
        // 线特效的配置
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55,155,255,0.5)',
          symbolSize: 12
        },
        // 线的样式
        lineStyle: {
          curveness: 0.2
        },
        // 线的数据级，前后线需要重合。数据固定
        data: [
          {
            coords: [
              [0, 300],
              [50, 200]
            ]
          },
          {
            coords: [
              [0, 100],
              [50, 200]
            ]
          },
          {
            coords: [
              [50, 200],
              [100, 100]
            ]
          },
          {
            coords: [
              [50, 200],
              [100, 300]
            ]
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
