import React from 'react'
import ReactDOM from 'react-dom'

// 接收数据
const Hello = (props) => {
  props.fn()
  // props是一个对象

  // 修改props的值:
  // props.name = 'tom'
  return (
    <div>
      <h1>props:{props.name}</h1>
      {props.tag}
    </div>
  )
}


// 1.传递参数
ReactDOM.render(
  <Hello name="jack"
  age={19}
  colors={['red', 'green', 'blue']}
  fn={() => console.log('这是一个函数')}
  tag={<p></p>}
  />, document.getElementById('root'))