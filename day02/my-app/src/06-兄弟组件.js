import React from 'react'
import ReactDOM from 'react-dom'
// 父组件
class Counter extends React.Component {
  // 父组件提供状态
  state = {
    count: 0
  }
  // 提供修改状态方法
  onInCrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
    <div>
      {/* 父组件绑定属性 */}
      <Child1 count={this.state.count}/>
      {/* 父组件绑定函数 */}
      <Child2 addCount={this.onInCrement}/>
    </div>
    )
  }
}

// 子组件通过props接收
const Child1 = (props) => {
  return <h1>计算器:{props.count} </h1>
}

const Child2 = (props) => {
  // 子组件通过事件调用父组件的回调函数
  return <button onClick={ () => props.addCount() }>+1</button>
}

// 1.传递参数
ReactDOM.render(<Counter />, document.getElementById('root'))