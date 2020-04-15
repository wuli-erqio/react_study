import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// 导入
import { Button } from 'antd-mobile';

// 导入页面组件
import Home from './pages/Home/index'
import CityList from './pages/CityList/index'


function App() {
  return (
    <Router>
      <div className="App">
        {/* 导航菜单 */}
        <ul>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/citylist">城市列表</Link></li>
        </ul>
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
      </div>
    </Router>
  )
}

export default App;
