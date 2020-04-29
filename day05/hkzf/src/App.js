import React, { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import AuthRoute from './components/AuthRoute'

// 使用动态组件导入页面组件
import Home from './pages/Home'
const CityList = lazy(() => import('./pages/CityList'))
const Map = lazy(() => import('./pages/Map'))
const HouseDetail = lazy(() => import('./pages/HouseDetail'))
const Login = lazy(() => import('./pages/Login'))
const Registe = lazy(() => import('./pages/Registe'))
// 房源发布
const Rent = lazy(() => import('./pages/Rent'))
const RentAdd = lazy(() => import('./pages/Rent/Add'))
const RentSearch = lazy(() => import('./pages/Rent/Search'))
const Favorate = lazy(() => import('./pages/Favorate'))
const HouseList = lazy(() => import('./pages/HouseList'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="route-loading">Loading...</div>}>
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
      </Suspense>
    </Router>
  )
}

export default App;
