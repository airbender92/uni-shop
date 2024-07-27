<script lang="ts" setup>
import type { CategoryItem } from '@/types/home'

//定义 props 接收的数据
defineProps<{
  list: CategoryItem[]
}>()
</script>
<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in list"
      :key="item.id"
    >
      <image class="icon" :src="item.icon" />
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<style lang="scss">
@import '../styles/category.scss';
</style>
