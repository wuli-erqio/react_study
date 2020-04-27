import React from 'react';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

// 导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login';
import Registe from './pages/Registe';
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    <Router>
      <div className="App">
        {/* 默认路由跳转home */}
        <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
        {/* 配置路由 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <AuthRoute path="/map" component={Map}></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/registe" component={Registe}></Route>

        {/* 房屋详情的路由规则 */}
        <Route path="/detail/:id" component={HouseDetail} />
      </div>
    </Router>
  )
}

export default App;
