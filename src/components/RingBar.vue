<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full">111</div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IAbnormalData } from '@/types/requestResult'
import * as echarts from 'echarts'
import { ref, onMounted, watch } from 'vue'
const props = defineProps<{
  data: IAbnormalData
}>()
const chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined
const getSeriesData = () => {
  const series: any = []

  props.data.abnormals.forEach((item, index) => {
    // 上层环形绘制
    series.push({
      name: item.name,
      // 使用饼图绘制，减少饼图宽度即为环形图
      type: 'pie',
      // 逆时针排布
      clockwise: false,
      // 不展示鼠标移入动画
      emphasis: {
        scale: false
      },
      // 半径位置，需要依次递减，否则会重复在一处进行展示
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      // 中心点
      center: ['55%', '55%'],
      // 不展示 label
      label: { show: false },
      // 数据配置
      data: [
        // 设置数据与名称
        { value: item.value, name: item.name },
        // 最大数据，展示比例
        {
          value: 1000,
          name: '',
          itemStyle: { color: 'rgba(0,0,0,0)', borderWidth: 0 },
          tooltip: { show: false },
          emphasis: {
            scale: false
          }
        }
      ]
    })

    // 底层图
    series.push({
      name: item.name,
      type: 'pie',
      // 图形不响应事件
      silent: true,
      // z-index: 置于底层
      z: 1,
      // 逆时针排布
      clockwise: false,
      // 不展示鼠标移入动画
      emphasis: {
        scale: false
      },
      // 半径位置，需要依次递减，否则会重复在一处进行展示
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      // 中心点
      center: ['55%', '55%'],
      // 不展示 label
      label: { show: false },
      // 数据
      data: [
        // 绘制底线 75%
        {
          value: 7.5,
          itemStyle: { color: 'rgb(3, 31, 62)', borderWidth: 0 },
          tooltip: { show: false },
          emphasis: {
            scale: false
          }
        },
        // 绘制底线 25% 透明区域
        {
          value: 2.5,
          name: '',
          itemStyle: { color: 'rgba(0,0,0,0)', borderWidth: 0 },
          tooltip: { show: false },
          emphasis: {
            scale: false
          }
        }
      ]
    })
  })
  return series
}

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
    // 图例配置
    legend: {
      show: true,
      // 图例色块
      icon: 'circle',
      // 位置
      top: '14%',
      left: '60%',
      // 展示数据
      data: props.data.abnormals.map((item) => item.name),
      // 总宽度（一列）
      width: -5,
      // 每个色块的宽
      itemWidth: 10,
      // 每个色块的高度
      itemHeight: 10,
      // item 间距
      itemGap: 6,
      // 展示内容
      formatter: function (name) {
        return '{title|' + name + '}'
      },
      // 字体配置
      textStyle: {
        rich: {
          title: {
            fontSize: 12,
            lineHeight: 5,
            color: 'rgba(255,255,255,0.8)'
          }
        }
      }
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a}<br>{b}:{c}({d}%)'
    },
    // Y 轴展示选项
    yAxis: [
      {
        type: 'category',
        // 反向展示
        inverse: true,
        // 不展示轴线
        axisLine: {
          show: false
        },
        // 不展示刻度
        axisTick: {
          show: false
        }
      }
    ],
    // X 轴不展示
    xAxis: [
      {
        show: false
      }
    ],
    // 每两个标记一条线
    series: getSeriesData()
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
