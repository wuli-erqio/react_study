import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
import Filter from './components/Filter'
import { API } from '../../utils/api'

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
  render() {
    return (
      <div>
      {/* 顶部搜索栏 */}
      <Flex className={styles.header}>
        <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
        <SearchHeader cityName={label} className={styles.searchHeader}></SearchHeader>
      </Flex>
      {/* 条件删选菜单 */}
      <Filter onFilter={this.onFilter}/>
      </div>
    )
  }
}