import React from 'react'

// 导入路由
import { Route } from 'react-router-dom'

// 导入newszu组件
import News from '../News'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        首页
      {/* 渲染子路由 */}
      <Route path="/home/news" component={News}></Route>
      </div>
    )
  }
}