import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'

  // 获取当前定位城市信息
  const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component {
  render() {
    return (
      <Flex className={styles.header}>
        <i className="iconfont icon-back"></i>
        <SearchHeader ctiyName={label} className={styles.searchHeader}></SearchHeader>
      </Flex>
    )
  }
}