import React from 'react';
import ReactDOM from 'react-dom';
// 1. 下载安装react-router-dom
// 2.导入路由依赖组件
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// 组件页面一的内容
const First = () => <p> 页面一的内容 </p>

const App = () => (
  // 3.使用Router进行包裹
  <Router>
    <div>
      <h1>React路由基础</h1>
      {/* 4.指定路由入口 */}
      <Link to="/first">页面一</Link>
      {/* 5.指定路由出口 */}
      <Route path="/first" component={First}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))