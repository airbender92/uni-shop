import { useMemberStore } from '@/stores'

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    options.timeout = 10000
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  message: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // success 只是代表有响应
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 表示请求已成功处理。
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401 Unauthorized：需要身份验证或认证失败。
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        //网络错误
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {},
          fail: () => {},
          complete: () => {},
        })
        reject(err)
      },
    })
  })
}
