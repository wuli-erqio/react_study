import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p> 默认路由,刚进入页面就能看见 </p>
const Login = () => <p> 我是Login组件的内容 </p>
const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Link to="/login">登录页面</Link>

      <Route path="/" component={Home}></Route>
      <Route path="/login/aaa" component={Login}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))