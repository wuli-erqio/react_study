import React from 'react'
import ReactDOM from 'react-dom'
import './css/common.css'

// 父组件
class Parent extends React.Component {
  state = {
    parentMsg: ''
  }
  // 回调函数,用于接收函数
  getChildMsg = (data) => {
    console.log('接收到子组件中传递过来的数据: ', data)
    this.setState({
      parentMsg: data
    })
  }
  render() {
    return (
    <div className="parent">
      父组件: {this.state.parentMsg}
      <Child getMsg={this.getChildMsg}/>
    </div>
    )
  }
}

// 子组件
class Child extends React.Component {
  state = {
    msg: '喜刷刷'
  }
  handleClick = () => {
    // 子组件调用父组件中传递过来的回调函数
    this.props.getMsg(this.state.msg)
  }
  render() {
    return (
      <div className="child">
        子组件:<button onClick={this.handleClick}>接收到父组件的数据:</button>
      </div>
    )
  }
}

// 1.传递参数
ReactDOM.render(<Parent />, document.getElementById('root'))