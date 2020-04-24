import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
import Filter from './components/Filter'
import { API } from '../../utils/api'
import { List, AutoSizer } from 'react-virtualized'
import HouseItem from '../../components/HouseItem'
import { BASE_URL} from '../../utils/url'

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
  renderHouseList = ({
    key,  
    index,
    style 
  }) => {
    // 根据索引号来获取当前这一行的房屋数据
    const { list } = this.state
    const house = list[index]
    return (
      <HouseItem
        title={house.title}
        key={key} style={style}
        src={BASE_URL + house.houseImg}
        desc={house.desc}
        tags={house.tags}
        price={house.price}></HouseItem>
    )
  }
  render() {
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
        <List
          width={300}
          height={300}
          rowCount={this.state.count} // 列表行数
          rowHeight={120} // 每行高度
          rowRenderer={this.renderHouseList} // 渲染列表项中的每一行
        />
      </div>
      </div>
    )
  }
}