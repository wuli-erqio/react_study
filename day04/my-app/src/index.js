import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Login extends React.Component {
  handleLogin = () => {
    // 使用编程式导航实现路由跳转
    this.props.history.push('/home')
  }
  render() {
    return (
      <div>
        <p>登录页面: </p>
        <button onClick={this.handleLogin}>登录</button>
      </div>
    )
  }
}

const Home = (props) => {
  const handleBack = () =>  {
    // 返回上一页
    props.history.go(-1)
  }
  return (
    <div>
      <h2>我是后台首页</h2>
      <button onClick={handleBack}>返回登陆页面</button>
    </div>
  )
}

const App = () => (
  <Router>
    <div>
      <h2>编程式导航:</h2>
      <Link to="/login">去登陆页面</Link>
      <Route path="/login" component={Login}></Route>
      <Route path="/home" component={Home}></Route>
    </div>
  </Router>
)
ReactDOM.render(<App />, document.getElementById('root'))