import React from 'react'
import { Flex } from 'antd-mobile'
import './index.module.css'

import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
function SearchHeader({ ctiyName, history, className }) {
  return (
    <Flex className={["search-box", className || ''].join(' ')}>
    {/* 左侧白色区域 */}
    <Flex className="search">
      <div className="location" onClick={() => history.push('/citylist')}>
        <span className="name">{ctiyName}</span>
        <i className="iconfont icon-arrow"></i>
      </div>
      <div className="form"  onClick={() => history.push('/search')}>
        <i className="iconfont icon-seach"></i>
        <span className="text">请输入小区地址</span>
      </div>
    </Flex>
    {/* 右侧地图图标 */}
    <i className="iconfont icon-map" onClick={() => history.push('/map')}></i>
  </Flex>
  )
}
// 添加属性校验
SearchHeader.propTypes = {
  ctiyName: PropTypes.string.isRequired,
  className: PropTypes.string
}
// 组件函数中无法拿到路由，要使用高阶函数包裹
export default withRouter(SearchHeader)