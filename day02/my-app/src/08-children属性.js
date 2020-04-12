import React from 'react'
import ReactDOM from 'react-dom'
import './css/common.css'


const App = (props) => {
  props.children()
  return (
    <div>
      <h1>组件标签的子节点:</h1>
      {/* {props.children} */}
    </div>
  )
}

const Test = () => <button>我是button组件</button>

// 文本节点
// ReactDOM.render(<App>我是子节点</App>, document.getElementById('root'))

// 标签节点
// ReactDOM.render(<App><p>我是子节点,是一个P标签</p></App>, document.getElementById('root'))

// children为: jsx或组件
// ReactDOM.render(<App><Test /></App>, document.getElementById('root'))

// 函数
ReactDOM.render(<App>
  {
    () => console.log('这是一个函数子节点')
  }
</App>, document.getElementById('root'))