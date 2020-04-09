import React from 'react'
import ReactDOM from 'react-dom'

const isLoading = true
// if判断
// const loadData = () => {
//   if(isLoading) {
//     return <div>loading...</div>
//   }
//   return <div>数据加载完成,此处显示加载后的数据</div>
// }

// 三元表达式
const loadData = () => {
  return isLoading ? (<div>loading...</div>) : (<div>数据加载完成,此处显示加载后的数据</div>)
}

// 逻辑与运算符 逻辑中断，只能要么显示或者隐藏
// const loadData = () =>  {
//   return isLoading && (<div>loading...</div>)
// }
const title = (
<div>{ loadData() }</div>
)

ReactDOM.render(title, document.getElementById('root'))
