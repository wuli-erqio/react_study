import React from 'react'
import ReactDOM from 'react-dom'

// 普通函数
function Hello() {
  return (
    <div>这是我的第一个函数组件</div>
  )
}

// 箭头函数
// const Hello = () => (<div>这是我的第一个函数组件</div>)

ReactDOM.render(<Hello />, document.getElementById('root'))