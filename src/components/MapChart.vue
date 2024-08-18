<template>
  <BorderPanel>
    <div ref="chartRef" class="h-full"></div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { IMapData } from '@/types/requestResult'
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import mapJson from '@/assets/MapData/china.json'

const props = defineProps<{
  data: IMapData
}>()
const chartRef = ref<HTMLDivElement>()
let myChart: echarts.ECharts | undefined
const renderEcharts = () => {
  // echarts 渲染
  //@ts-ignore
  echarts.registerMap('china', mapJson)

  let options = {
    // 时间线，提供了在多个 ECharts option 间进行切换
    timeline: {
      // 数据
      data: props.data.voltageLevel,
      // 类目轴
      axisType: 'category',
      // 自动切换
      autoPlay: true,
      // 间隔时间
      playInterval: 3000,
      // 位置
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      // 轴的文本标签
      label: {
        // 默认状态
        color: '#ddd'
      },
      // 文字大小
      symbolSize: 10,
      // 线的样式
      lineStyle: {
        color: '#555'
      },
      // 选中点的样式
      checkpointStyle: {
        borderColor: '#888',
        borderWidth: 2
      },
      // 控件样式
      controlStyle: {
        // 上一步按钮
        showNextBtn: true,
        // 下一步按钮
        showPrevBtn: true,
        // 默认样式
        color: '#666',
        borderColor: '#666'
      }
    },
    // 柱形图右侧展示
    baseOption: {
      grid: {
        right: '2%',
        top: '15%',
        bottom: '10%',
        width: '20%'
      },
      // 中国地图
      geo: {
        // 展示
        show: true,
        // 中国地图
        map: 'china',
        // 开启缩放
        roam: false,
        // 初始缩放
        zoom: 0.9,
        // 中心点
        center: [113.83531246, 34.0267395887],
        // 默认状态的省份样式
        itemStyle: {
          // 边框色值
          borderColor: 'rgba(147, 235, 248, 1)',
          // 边框宽度
          borderWidth: 1,
          // 区域颜色
          areaColor: {
            // 经向色值
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              // 0% 处的颜色
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)'
              },
              // 100% 处的颜色
              {
                offset: 1,
                color: 'rgba(147, 235, 248, .2)'
              }
            ],
            // 缺省为 false
            globalCoord: false
          }
        }
      }
    },
    // 绑定时间轴的多个图表
    options: []
  }
  // 为每一年度的图表添加数据
  props.data.voltageLevel.forEach((item, index) => {
    //@ts-ignore
    options.options.push({
      title: [
        // 主标题，对应地图
        {
          text: '2019-2023 年度数据统计',
          left: '0%',
          top: '0',
          textStyle: {
            color: '#fff' // 设置标题颜色
          },
          fontSize: 30
        },
        // 副标题，对应柱形图
        {
          id: 'statistic',
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#fff' // 设置标题颜色
          },
          fontSize: 20
        }
      ],
      // X 轴配置
      xAxis: {
        // 数据轴
        type: 'value',
        // 脱离 0 值比例
        scale: true,
        // 位置
        position: 'top',
        // 不显示分割线
        splitLine: {
          show: false
        },
        // 不显示轴线
        axisLine: {
          show: false
        },
        // 不显示刻度尺
        axisTick: {
          show: false
        },
        // 类别文字
        axisLabel: {
          margin: 2,
          color: '#aaa'
        }
      },
      // Y 轴
      yAxis: {
        // 选项轴
        type: 'category',
        // 轴线
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        // 轴刻度
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        // 轴标签
        axisLabel: {
          interval: 0,
          color: '#ddd'
        },
        // 根据年份，获取对应数据
        data: props.data.categoryData[item].map((item) => item.name)
      },
      // 核心配置
      series: [
        // 柱形图
        {
          zlevel: 1.5,
          // 柱形图
          type: 'bar',
          // 每个柱子的色值
          itemStyle: {
            color: props.data.colors[index]
          },
          // 根据年份，获取对应数据
          data: props.data.categoryData[item].map((item) => item.value)
        },
        // 散点图
        {
          // 散点（气泡）图
          type: 'effectScatter',
          // 使用地理坐标系
          coordinateSystem: 'geo',
          // 数据
          data: props.data.topData[item],
          // 标记大小
          symbolSize: function (val: any) {
            return val[2] / 4
          },
          // 绘制完成后显示特效
          showEffectOn: 'render',
          // 展示涟漪特效
          rippleEffect: {
            brushType: 'stroke'
          },
          // 文字
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          // 每一项的配置
          itemStyle: {
            color: props.data.colors[index],
            // 阴影配置
            shadowBlur: 5,
            shadowColor: props.data.colors[index]
          },
          zlevel: 1
        }
      ]
    })
  })
  //@ts-ignore
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
