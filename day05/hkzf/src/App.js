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

// 房源发布
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
import Favorate from './pages/Favorate'
import HouseList from './pages/HouseList';

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
        

        {/* 房屋详情的路由规则 */}
        <Route path="/detail/:id" component={HouseDetail} />
        <Route path="/login" component={Login}></Route>
        <Route path="/registe" component={Registe}></Route>
        <Route path="/search" component={HouseList}></Route>

        {/* 登陆后才能访问的页面 */}
        <AuthRoute exact path="/rent" component={Rent}></AuthRoute>
        <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute>
        <AuthRoute path="/rent/search" component={RentSearch}></AuthRoute>
        <AuthRoute path="/favorate" component={Favorate}></AuthRoute>
      </div>
    </Router>
  )
}

export default App;
