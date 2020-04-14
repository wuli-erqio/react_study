import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p> 默认路由,刚进入页面就能看见 </p>
const Login = () => <p> 我是Login组件的内容 </p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/login">登录页面</Link></li>
      </ul>
      
      {/* 添加exact变成精确匹配 */}
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))