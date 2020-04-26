import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex, Toast } from 'antd-mobile'
import Filter from './components/Filter'
import { API } from '../../utils/api'
import { getCurrentCity } from '../../utils/index'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL} from '../../utils/url'

import Sticky from '../../components/Sticky'
import styles from './index.module.css'
import NoHouse from '../../components/NoHouse'

/*
  切换城市显示房源
  原因： 在组件外部的代码只会在项目加载时执行一次。在路由切换时，不会重新执行
        组件内部的 componentDidMount() 会在组件展示时执行，进入页面一次，执行一次
  1. 注释获取当前定位城市的代码
  2. 导入utils中的getCurrentCity方法
  3. 在componentDidMount中调用，getCurrentCity() 方法来获取当前定位城市的信息
  4. 将label和value保存到this中
  5. 用到label和value的地方，使用this.label或this.value来访问
*/
// 获取当前定位城市信息
// const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component {
  state = {
    // 列表数据
    list: [],
    // 总条数
    count: 0,
    // 判断是否在加载中
    isLoading: false
  }
  // 初始化默认值
  value = ''
  label = ''
  // 初始化实例属性
  filters = {}
  async componentDidMount() {
    const { label, value } = await getCurrentCity()
    this.label = label
    this.value = value
    this.searchHouseList()
  }
  // 获取房屋列表数据
  async searchHouseList() {
    this.setState({
      // 数据加载中
      isLoading: true
    })
    // 开启Loading
    Toast.loading('加载中...', 0, null, false)
    const res = await API.get('/houses', {
      params: {
        cityId: this.value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    const { list, count } = res.data.body
    // 关闭loading
    Toast.hide()
    // 提示房源数据
    if(count !== 0) {
      Toast.info(`共找到${count}套房源`, 2, null, false)
    }

    this.setState({
      list,
      count,
      // 数据加载完成
      isLoading: false
    })
  }
  // 接收Filter组件中筛选条件数据
  onFilter = (filters) => {
    // 返回页面顶部
    window.scrollTo(0, 0)
    this.filters = filters
    this.searchHouseList()
  }

   // 渲染每一行的内容函数rowRenderer
  renderHouseList = ({ key, index, style }) => {
    // 根据索引号来获取当前这一行的房屋数据
    const { list } = this.state
    const house = list[index]
    // 判断house是否存在
    // 如果不存在，渲染loading元素占位
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className={styles.loading} />
        </div>
      )
    }

    return (
      <HouseItem
        key={key}
        style={style}
        src={BASE_URL + house.houseImg}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}></HouseItem>
    )
  }
  // 房屋列表
  renderList() {
    const { count, isLoading } = this.state
    // 关键点：在数据加载完成后，在进行count判断
    // 解决办法：如果数据加载中，则不展示NoHouse组件，加载完成后，在展示组件
    if(count === 0 && !isLoading) {
      return <NoHouse>没有找到房源，请您换个搜索条件吧~~</NoHouse>
    }
    return (
      <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            rowCount={count}>

            {({ onRowsRendered, registerChild}) => (
                <WindowScroller>
                {
                  ({ height, isScrolling, scrollTop}) => (
                    <AutoSizer>
                      {({ width }) => (
                        <List
                          onRowsRendered={onRowsRendered}
                          ref={registerChild}
                          autoHeight // 最终列表高度
                          width={width} // 视口宽度
                          height={height} // 视口高度
                          rowCount={count} // 列表行数
                          rowHeight={120} // 每行高度
                          rowRenderer={this.renderHouseList} // 渲染列表项中的每一行
                          isScrolling={isScrolling}
                          scrollTop={scrollTop}
                        />)}
                    </AutoSizer>
                  )
                }
              </WindowScroller>
              )
            }
          </InfiniteLoader>
    )
  }
  // 判断列表中每一行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }
  // 用来获取更多房屋列表数据
  // 注意，该方法返回的值是一个Promise对象，并且，这个对象应该在数据加载完成时来调用resolve让Promise对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex}) => {
    return new Promise(resolve => { API.get('/houses', {
        params: {
          cityId: this.value,
          ...this.filters,
          start: startIndex,
          end: stopIndex
        }
      }).then(res => {
        this.setState({
          list: [...this.state.list, ...res.data.body.list]
        })

        // 数据加载完成时，调用 resolve 即可
        resolve()
      })
    })
  }
  render() {
    return (
      <div>
        {/* 顶部搜索栏 */}
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader cityName={this.label} className={styles.searchHeader}></SearchHeader>
        </Flex>
        {/* 条件筛选菜单 */}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter}/>
        </Sticky>
        {/* 房屋列表 */}
        <div className={styles.houseItem}>
          {this.renderList()}
        </div>
      </div>
    )
  }
}