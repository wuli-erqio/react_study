import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const First = () => <p> 默认路由,刚进入页面就能看见 </p>

const App = () => (
  <Router>
    <div>
      <h1>默认路由</h1>
      <Route path="/" component={First}></Route>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))