import React from 'react'
import ReactDOM from 'react-dom'
import './css/common.css'

// 父组件
class Parent extends React.Component {
  state = {
    lastName: '王'
  }
  render() {
    return (
    <div className="parent">
      父组件:
      <Child name={this.state.lastName} />
    </div>
    )
  }
}

// 子组件
const Child = (props) => {
  return (
    <div className="child">
      <p>子组件,接收到父组件的数据:{props.name}</p>
    </div>
  )
}

// 1.传递参数
ReactDOM.render(<Parent />, document.getElementById('root'))