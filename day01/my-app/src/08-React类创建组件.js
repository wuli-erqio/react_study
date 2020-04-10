import React from 'react'
import ReactDOM from 'react-dom'

// 创建
class Hello extends React.Component {
  render() {
    return (
      <div>这是我的第一个类组件</div>
    )
  }
}

// 渲染
ReactDOM.render(<Hello />, document.getElementById('root'))