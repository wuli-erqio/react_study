import React from 'react'
import ReactDOM from 'react-dom'

// 类组件
class App extends React.Component {
  handleClick(e) {
    console.log('OK')
    // 阻止默认事件
    e.preventDefault()
  }
  render() {
    return (
      <a href='http://www.baidu.com' onClick={this.handleClick}>百度</a>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))