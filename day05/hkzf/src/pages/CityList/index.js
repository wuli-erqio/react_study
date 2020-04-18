import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import './index.css'
import axios from 'axios'
import { getCurrentCity } from '../../utils/index'
import { List } from 'react-virtualized'

// 数据格式化方法
const formatCityData = (list) => {
  const cityList = {}
  // 1.遍历数组
  list.forEach(item => {
    // 2. 获取每个城市的首字母
    const first = item.short.substr(0, 1)
    // 3.判断cityList中是否有该分类
    // 4如果有, push
    if(cityList[first]) {
      cityList[first].push(item)
    } else {
      // 5.如果没有,先创建在push
      cityList[first] = [item]
    }
  })
  // 获取索引
  const cityIndex = Object.keys(cityList).sort()
  return {
    cityList, cityIndex
  }
}
// 长列表
const list = Array(100).fill('OOOO')
// 渲染每一行的内容函数rowRenderer
function rowRenderer({
  key,          // 唯一key
  index,        // 列表每一行的索引号
  isScrolling,  // 当前项是否正在滚动中
  isVisible,    // 这一行在类型中是可见的
  style         // 样式对象,一定应用到每一行, 没有的话,滚动可能会有卡白屏的情况 作用: 指定每一行的位置
}){
  // 最终返回渲染到页面中的内容
  return (
    <div key={key} style={style}>
      {list[index]}
    </div>
  )
}
export default class CityList extends React.Component {
  componentDidMount() {
    this.getCityList()
  }
  async getCityList() {
    const res = await axios.get(`http://localhost:8080/area/city?level=1`)
    console.log(res)
    const { cityList, cityIndex } = formatCityData(res.data.body)
    // 1. 获取热门城市数据
    // 2. 将数据添加到cityList中
    // 3. 将索引添加到cityIndex中
    const hotRes = await axios.get(`http://localhost:8080/area/hot`)
    cityIndex.unshift('hot')
    cityList['hot'] = hotRes.data.body

    // 获取当前定位城市
    const curCtiy = await getCurrentCity()

    /*
      1.将当前定位城市数据添加到cityList中
      2.将当前定位城市的索引添加到cityIndex中
    */
    cityList['#'] = [curCtiy]
    cityIndex.unshift('#')
    console.log(curCtiy)

  }
  render() {
    return (
      <div className="citylist">
        <NavBar mode="light" icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>

        {/* 城市列表 */}
        <List
          width={300}
          height={300}
          rowCount={list.length}
          rowHeight={20}
          rowRenderer={rowRenderer}
        />
      </div>
    )
  }
}