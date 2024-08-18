<template>
  <BorderPanel>
    <div class="p-6">
      <div class="text-center text-slate-300">
        数据总量：
        <span
          ref="totalCountTarget"
          class="text-gradient ml-2 mr-2 font-[LedFont] text-7xl font-bold"
        >
          679,473,929
        </span>
        条记录
      </div>
      <div class="mt-3 flex flex-wrap">
        <div class="w-1/3 text-center text-sm text-slate-400">
          华北：
          <span ref="city1" class="font-[LedFont] text-3xl text-[#5DC5EF]"> 8,778,988 </span>
        </div>
        <div class="w-1/3 text-center text-sm text-slate-400">
          东北：<span ref="city2" class="font-[LedFont] text-3xl text-[#5DC5EF]">8,778,988</span>
        </div>
        <div class="w-1/3 text-center text-sm text-slate-400">
          华东：<span ref="city3" class="font-[LedFont] text-3xl text-[#5DC5EF]">8,778,988</span>
        </div>
        <div class="w-1/3 text-center text-sm text-slate-400">
          中南：<span ref="city4" class="font-[LedFont] text-3xl text-[#5DC5EF]">8,778,988</span>
        </div>
        <div class="w-1/3 text-center text-sm text-slate-400">
          西南：<span ref="city5" class="font-[LedFont] text-3xl text-[#5DC5EF]">8,778,988</span>
        </div>
        <div class="w-1/3 text-center text-sm text-slate-400">
          西北：<span ref="city6" class="font-[LedFont] text-3xl text-[#5DC5EF]">8,778,988</span>
        </div>
      </div>
    </div>
  </BorderPanel>
</template>

<script setup lang="ts">
import type { ITotalData } from '@/types/requestResult'
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'
const props = defineProps<{
  data: ITotalData
}>()
const totalCountTarget = ref<HTMLDivElement>()
const city1 = ref<HTMLDivElement>()
const city2 = ref<HTMLDivElement>()
const city3 = ref<HTMLDivElement>()
const city4 = ref<HTMLDivElement>()
const city5 = ref<HTMLDivElement>()
const city6 = ref<HTMLDivElement>()

onMounted(() => {
  new CountUp(totalCountTarget.value!, +props.data.total).start()
  new CountUp(city1.value!, +props.data.hb).start()
  new CountUp(city2.value!, +props.data.db).start()
  new CountUp(city3.value!, +props.data.hd).start()
  new CountUp(city4.value!, +props.data.zn).start()
  new CountUp(city5.value!, +props.data.xn).start()
  new CountUp(city6.value!, +props.data.xb).start()
})
</script>

<style scoped></style>
