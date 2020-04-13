import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
  state = {
    count: 0,
  }

  handleClick = () => {
    this.setState((count) => {
      return {
        count: this.state.count + 1
      }
    })
  }

shouldComponentUpdate(nextProps, nextState) {
  // 返回false, 阻止render渲染
  // return false
  // 最新的状态
  console.log('最新的state', nextState)
  // 更新前的值
  console.log('this.state', this.state)

  return true
}

  render () {
    console.log('组件更新')
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))