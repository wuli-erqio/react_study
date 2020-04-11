import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.onIncrement = this.onIncrement.bind(this)
  }

  // 事件处理程序
  onIncrement () {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.onIncrement} >+1</button>
      </div>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))