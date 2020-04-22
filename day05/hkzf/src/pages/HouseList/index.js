import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
import Filter from './components/Filter'

// 获取当前定位城市信息
const { label } = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component {
  render() {
    return (
      <div>
      {/* 顶部搜索栏 */}
      <Flex className={styles.header}>
        <i className="iconfont icon-back" onClick={() => this.props.history.go(-1)}></i>
        <SearchHeader cityName={label} className={styles.searchHeader}></SearchHeader>
      </Flex>
      {/* 条件删选菜单 */}
      <Filter/>
      </div>
    )
  }
}