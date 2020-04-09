// 1.导入react react-dom
import React from 'react'
import ReactDOM from 'react-dom'

// 2.创建react元素
const title = React.createElement('h1', null, 'hello react')

// 3.渲染react元素
ReactDOM.render(title, document.getElementById('root'))
