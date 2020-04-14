import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const First = () => <p> 页面一的内容 </p>
const Home = () => <p> 页面home的内容 </p>

const App = () => (
  <Router>
    <div>
      <h1>React路由基础</h1>
      <Link to="/first">页面一</Link>
      <Link to="/home">页面二</Link>
      <Route path="/first" component={First}></Route>
      
      <Route path="/home" component={Home}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))