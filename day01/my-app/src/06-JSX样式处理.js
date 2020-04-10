import React from 'react'
import ReactDOM from 'react-dom'

// 引入css文件
import './css/index.css'

const title = (
  <h1 className="list1" style={{color: 'red', background: 'skyblue'}}>
    JSX样式处理
  </h1>
)

ReactDOM.render(title, document.getElementById('root'))
