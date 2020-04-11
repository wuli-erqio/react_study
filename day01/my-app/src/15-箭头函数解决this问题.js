import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    count: 0
  }

  // 事件处理程序
  // 这里直接这样写会找不到this,是undefined
  // 可以将事件处理程序改成箭头函数
  onIncrement () {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={() => {this.onIncrement()}} >+1</button>
      </div>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))