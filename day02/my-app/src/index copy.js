import React from 'react'
import ReactDOM from 'react-dom'
import './css/common.css'

// 1.创建context得到两个组件
const { Provider, Consumer } = React.createContext()

class App extends React.Component {
  render() {
    return (
      <Provider value="pink">
        <div className="app">
          <Node />
        </div>
      </Provider>
    )
  }
}

const Node = (props) => {
  return (
    <div className="node">
      <SubNode />
    </div>
  )
}

const SubNode = (props) => {
  return (
    <div className="subnode">
      <Child />
    </div>
  )
}

const Child = (props) => {
  return <div className="child">
    <Consumer>
      {
        data => <span>我是子节点 ---- {data}</span>
      }
    </Consumer>
  </div>
}

// 1.传递参数
ReactDOM.render(<App />, document.getElementById('root'))