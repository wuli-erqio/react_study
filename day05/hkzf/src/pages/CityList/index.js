import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile';
import './index.css'
import axios from 'axios'
import { getCurrentCity } from '../../utils/index'
import { List, AutoSizer } from 'react-virtualized'


// 索引标题高度
const TITLE_HEIGHT = 36
const NAME_HEIGHT = 50
// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '深圳', '广东']
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
// const list = Array(100).fill('OOOO')

// 封装处理字母的索引方法
const formatCityIndex = (letter) => {
  switch(letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default :
      return letter.toUpperCase()
      break;
  }
}
export default class CityList extends React.Component {
  // 在constructor中, 调用React.createRef() 创建ref对象
  constructor(props) {
    super()
    this.state = {
      cityList: {},
      cityIndex: [],
      // 指定当前高亮的索引
      activeIndex: 0
    }
    // 创建Ref对象
    this.cityListComponent = React.createRef()
  }
  
  async componentDidMount() {
    await this.getCityList()
    // 对于点击索引无法正确定位的问题,调用List组件measureAllRows方法,提前计算高度来解决
    // 注意: 此方法,需要保证list组件中有数据
    this.cityListComponent.current.measureAllRows()
  }
  async getCityList() {
    const res = await axios.get(`http://localhost:8080/area/city?level=1`)
    const { cityList, cityIndex } = formatCityData(res.data.body)
    // 1. 获取热门城市数据
    // 2. 将数据添加到cityList中
    // 3. 将索引添加到cityIndex中
    const hotRes = await axios.get(`http://localhost:8080/area/hot`)
    cityIndex.unshift('hot')
    cityList['hot'] = hotRes.data.body

    // 获取当前定位城市
    const curCtiy = await getCurrentCity()
    this.setState(() => {
      return {
        cityList,
        cityIndex
      }
    })

    /*
      1.将当前定位城市数据添加到cityList中
      2.将当前定位城市的索引添加到cityIndex中
    */
    cityList['#'] = [curCtiy]
    cityIndex.unshift('#')
    console.log(curCtiy)

  }

  changeCity({label, value}) {
    console.log(label, value)
    if(HOUSE_CITY.indexOf(label) > -1) {
      // 有房源
      localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
      this.props.history.go(-1)
    }else {
      // 无房源
      Toast.info('该城市暂无房源数据', 2, null, false)
    }
  }
  // 渲染每一行的内容函数rowRenderer
  rowRenderer = ({
    key,          // 唯一key
    index,        // 列表每一行的索引号
    isScrolling,  // 当前项是否正在滚动中
    isVisible,    // 这一行在类型中是可见的
    style         // 样式对象,一定应用到每一行, 没有的话,滚动可能会有卡白屏的情况 作用: 指定每一行的位置
  }) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    // 最终返回渲染到页面中的内容
    return (
      <div key={key} style={style} className="city">
        <div className="title">{formatCityIndex(letter)}</div>
        {/* 获取对应索引下的城市列表 */}
        {/* 给城市列表顶绑定点击事件 */}
        { 
        cityList[letter].map(item => <div key={item.value} className="name" onClick={() => this.changeCity(item)}>{item.label}</div>)
        }
      </div>
    )
  }

  // 创建动态计算没有行高度的方法
  getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 索引标题高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    const { cityIndex, cityList } = this.state
    const height = TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    return height
  }
  // 封装renderCityIndex方法, 用来渲染城市索引列表
  renderCityIndex () {
    const { cityIndex, activeIndex } = this.state
    console.log(cityIndex)
    // 获取索引数组cityIndex, 遍历cityIndex, 渲染索引列表
    return cityIndex.map((item, index) => <li onClick={() => {
      // 通过ref  的curren属性,获取组件实例, 在调用组件的scrollToRow方法
      this.cityListComponent.current.scrollToRow(index)
    }} key={item} className="city-index-item">
    <span className={activeIndex === index ? "index-active" : ''}>{item === 'hot' ? '热' : item.toUpperCase()}</span>
  </li>
  )}
  // 用于获取当前列表渲染的信息
  onRowsRendered = ({ startIndex }) => {
    if(this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }
  render() {
    return (
      <div className="citylist">
        <NavBar mode="light" icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
        {/* 城市列表 */}
        {/* 将创建好的ref对象,添加到list组件的ref上 */}
        {/* 设置list组件的scrollToAlignment方法,让list组件滚动到指定行 */}
        <AutoSizer>
          {
            ({ width, height }) =>  <List
              width={width}
              ref={this.cityListComponent}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.onRowsRendered}
              scrollToAlignment="start"
          />
          }
        </AutoSizer>
        {/* 右侧索引 */}
        <ul className="city-index">{this.renderCityIndex()}</ul>
      </div>
    )
  }
}