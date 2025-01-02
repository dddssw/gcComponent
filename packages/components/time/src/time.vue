<template>
    <el-date-picker v-model="model as [Date, Date]" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
        start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" type="datetimerange" :shortcuts="shortcuts"
        :style="{ width: `${props.width}px` }" range-separator="~"
        :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]" />
</template>

<script lang="ts" setup>
import {ElDatePicker} from 'element-plus'
// 时间处理工具
const COMPONENT_NAME = 'GcTime'
defineOptions({
    name: COMPONENT_NAME,
})
const timeUtils = {
  // 格式化时间为 "yyyy-MM-dd HH:mm:ss" 格式
  formatTime: function (date: Date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份需补零
    const day = date.getDate().toString().padStart(2, '0') // 天数需补零
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  },

  // 获取今天的时间区间
  getTodayRange: function () {
    const today = new Date()
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
    return { start: this.formatTime(start), end: this.formatTime(end) }
  },

  // 获取昨天的时间区间
  getYesterdayRange: function () {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const start = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
      0,
      0,
      0
    )
    const end = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
      23,
      59,
      59
    )
    return { start: this.formatTime(start), end: this.formatTime(end) }
  },

  // 获取近7天的时间区间
  getLast7DaysRange: function () {
    const end = new Date()
    end.setHours(23, 59, 59, 999) // 设置时分秒为23:59:59.999
    const start = new Date(end)
    start.setDate(start.getDate() - 6)
    start.setHours(0, 0, 0, 0)
    return { start: this.formatTime(start), end: this.formatTime(end) }
  },

  // 获取近30天的时间区间
  getLast30DaysRange: function () {
    const end = new Date()
    end.setHours(23, 59, 59, 999) // 设置时分秒为23:59:59.999
    const start = new Date(end)
    start.setDate(start.getDate() - 29)
    start.setHours(0, 0, 0, 0)
    return { start: this.formatTime(start), end: this.formatTime(end) }
  },

  // 获取近7天的时间区间
  getLastXDaysRange: function (day: number) {
    const end = new Date()
    end.setHours(23, 59, 59, 999) // 设置时分秒为23:59:59.999
    const start = new Date(end)
    start.setDate(start.getDate() - day)
    start.setHours(0, 0, 0, 0)
    return { start: this.formatTime(start), end: this.formatTime(end) }
  },

  getModifyTime: function (text: string) {
    let modifyTimeBegin
    let modifyTimeEnd

    switch (text) {
      case '今':
        modifyTimeBegin = timeUtils.getTodayRange().start
        modifyTimeEnd = timeUtils.getTodayRange().end
        break
      case '近3天':
        // 处理“近7天”按钮点击逻辑
        modifyTimeBegin = timeUtils.getLastXDaysRange(2).start
        modifyTimeEnd = timeUtils.getLastXDaysRange(2).end
        break
      case '近7天':
        // 处理“近7天”按钮点击逻辑
        modifyTimeBegin = timeUtils.getLastXDaysRange(6).start
        modifyTimeEnd = timeUtils.getLastXDaysRange(6).end
        break
      case '近30天':
        // 处理“近30天”按钮点击逻辑
        modifyTimeBegin = timeUtils.getLastXDaysRange(29).start
        modifyTimeEnd = timeUtils.getLastXDaysRange(29).end
        break
      default:
        break
    }
    return { modifyTimeBegin, modifyTimeEnd }
  },

  // 传入日期字符串和需要返回的格式，默认只返回年月日。也可以传入yyyy-mm-dd HH:mm:ss
  getDateStringWithFormat: function (dateString: any, format = 'yyyy-mm-dd') {
    // 检查日期字符串是否有效
    if (!dateString || isNaN(Date.parse(dateString))) {
      return '' // 如果日期字符串无效，直接返回空字符串
    }

    const dateObj = new Date(dateString)
    const year = dateObj.getFullYear()
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const day = dateObj.getDate().toString().padStart(2, '0')
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    const seconds = dateObj.getSeconds().toString().padStart(2, '0')

    // 根据 format 的内容来判断如何格式化日期时间字符串
    let formattedDate
    if (format == 'yyyy') {
      formattedDate = `${year}`
    } else if (format == 'yyyy-mm') {
      // 如果 format 包含年月日相关的占位符，则返回年月日格式
      formattedDate = `${year}-${month}`
    } else if (format == 'yyyy-mm-dd') {
      // 如果 format 包含年月日相关的占位符，则返回年月日格式
      formattedDate = `${year}-${month}-${day}`
    } else if (format.includes('HH:mm:ss')) {
      // 如果 format 包含时分秒相关的占位符，则返回年月日时分秒格式
      formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    } else {
      // 其他情况，直接返回空字符串
      formattedDate = ''
    }

    return formattedDate
  }
}


const model = defineModel()
const props = defineProps({
    width: {
        type: Number,
        default: 450
    }
})

const createShortcut = (text: string, days: number | '今') => ({
    text,
    value: () => {
        const result = timeUtils.getModifyTime(days === '今' ? '今' : `近${days}天`)
        return [result.modifyTimeBegin || '', result.modifyTimeEnd || '']
    }
})

const shortcuts = [
    createShortcut('今', '今'),
    createShortcut('近3天', 3),
    createShortcut('近7天', 7),
    createShortcut('近30天', 30)
]
</script>

<style scoped></style>
