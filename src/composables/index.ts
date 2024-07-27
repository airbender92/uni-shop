import type { PublicGuessInstance } from '@/types/components'
import { ref } from 'vue'

/**
 * 猜你喜欢组合函数
 */
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<PublicGuessInstance>()

  // 滚动触底事件
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  return {
    guessRef,
    onScrolltolower,
  }
}
