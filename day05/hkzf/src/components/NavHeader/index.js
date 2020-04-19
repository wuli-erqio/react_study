import React from 'react'
import { NavBar } from 'antd-mobile'

// 从react-route-dom中导入withRouter高阶组件
import { withRouter } from 'react-router-dom'

// 导入props 校验的包
import PropTypes from 'prop-types'
// 导入样式
import styles from './index.module.css'
/*
  注意： 默认情况下，只要路由Route直接渲染的组件才能够获取到路由信息(比如： history.go()等)
  如果需要在其他组件中获取到路由信息可以通过withRouter高阶组件来获取

  1. 从react-route-dom中导入withRouter高阶组件
  2. 使用withRouter高阶组件包装NavHeader组件
    目的： 包装后，就可以在组件中获取到当前路由信息了
  3. 从props中解构出history对现象
  4. 调用history.go()实现返回上一页的功能
  5. 从props中解构出onLefClick函数，实现自定义 < 按钮的点击事件
*/
function NavHeader({ children, history, onLeftClick }) {
  // 默认点击行为
  const defaultHander = () => history.go(-1)

  return (
    <NavBar
      className={styles.navBar}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={ onLeftClick || defaultHander }
    >
      {children}
  </NavBar>
  )
}

// 添加校验
NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func
}
// withRouter(NavHeader)函数返回的是一个组件
export default withRouter(NavHeader)