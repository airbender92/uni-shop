import PublicSwiper from '@/components/PublicSwiper.vue'
import PublicGuess from '@/components/PublicGuess.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PublicSwiper: typeof PublicSwiper
    PublicGuess: typeof PublicGuess
  }
}

// 组件实例类型
export type PublicSwiperInstance = InstanceType<typeof PublicSwiper>
export type PublicGuessInstance = InstanceType<typeof PublicGuess>
