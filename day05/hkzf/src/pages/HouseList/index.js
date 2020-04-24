import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import Filter from './components/Filter'
import { API } from '../../utils/api'
import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL} from '../../utils/url'
import styles from './index.module.css'

// 获取当前定位城市信息
const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component {
  state = {
    // 列表数据
    list: [],
    // 总条数
    count: 0
  }
  // 初始化实例属性
  filters = {}
  componentDidMount() {
    this.searchHouseList()
  }
  // 获取房屋列表数据
  async searchHouseList() {
    const res = await API.get('/houses', {
      params: {
        cityId: value,
        ...this.filters,
        start: 1,
        end: 20
      }
    })
    const { list, count } = res.data.body
    console.log(res)
    this.setState({
      list,
      count
    })
  }
  // 接收Filter组件中筛选条件数据
  onFilter = (filters) => {
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
  // 判断列表中每一行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }
  // 用来获取更多房屋列表数据
  // 注意，该方法返回的值是一个Promise对象，并且，这个对象应该在数据加载完成时来调用resolve让Promise对象的状态变为已完成
  loadMoreRows = ({ startIndex, stopIndex}) => {
    return new Promise(resolve => { API.get('/houses', {
        params: {
          cityId: value,
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
    const { count } = this.state
    return (
      <div>
        {/* 顶部搜索栏 */}
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
          <SearchHeader cityName={label} className={styles.searchHeader}></SearchHeader>
        </Flex>
        {/* 条件筛选菜单 */}
        <Filter onFilter={this.onFilter}/>
        {/* 房屋列表 */}
        <div className={styles.houseItem}>
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
        </div>
      </div>
    )
  }
}