// 1.导入react react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2.使用JSX创建react元素
const title = <h1>Hello JSX<span>我是span标签</span></h1>

// 3.渲染react元素
ReactDOM.render(title, document.getElementById('root'))
