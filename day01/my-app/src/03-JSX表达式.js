import React from 'react'
import ReactDOM from 'react-dom'

const name = 'Jack'
const age = 19
const sayHi = () => 'Hi~'
const dv = <div>我是div</div>
const title = (
  <h1 className="title">Hello, {name}, 年龄: {age}
    <div>
      <p>{1}</p>
      <p>{1 + 8}</p>
      <p>{ 'a' }</p>
      <p>{ 3 > 5 ? '大于' : '小于等于'}</p>
      <p>{ sayHi() }</p>
      <span>{ dv }</span>
      {/* 错误演示 */}
      {/* <p>{ { a: '6' } }</p> */}
      {/* { if (true) {} } */}
      {/* { for (var i; i<=3; i++) {} } */}
    </div>
  </h1>
)

ReactDOM.render(title, document.getElementById('root'))
