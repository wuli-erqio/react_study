import axios from 'axios'
// 1. 在utils目录中,新建index.js,在该文件中封装
// 2. 创建并导出获取定位城市的函数getCurrentCity
export const getCurrentCity = () => {
  // 3. 判断localStorage中是否有定位城市
  const localCity= JSON.parse(localStorage.getItem('hkzf_city'))
  if (!localCity) {
    // 4. 如果没有,就使用首页中获取定位城市的代码来获取,并存储到本地存储中,然后返回该城市数据
    // 通过IP定位
  return new Promise((resolve, reject) => {
    const curCity = new window.BMap.LocalCity()
      curCity.get(async res => {
        try{
          // 获取城市失败
          const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
          localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
          resolve(result.data.body)

        }catch(e) {
          // 获取城市失败
          reject(e)
        }
      })
    })
  }
  // 5. 如果有, 直接返回本地存储中的城市数据
  // 上边为了处理异步函数使用Promise,因此,下边也要使用Promise,因为此处Promise不会有错误情况,可以直接简写成功的方式
  return Promise.resolve(localCity)
}


export { API } from './api'
export { BASE_URL } from './url'