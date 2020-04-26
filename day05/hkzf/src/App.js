import React from 'react';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由跳转home */}
        <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/login" component={Login}></Route>

        {/* 房屋详情的路由规则 */}
        <Route path="/detail/:id" component={HouseDetail} />
      </div>
    </Router>
  )
}

export default App;
