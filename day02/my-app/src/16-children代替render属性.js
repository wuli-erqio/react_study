import React from 'react'
import ReactDOM from 'react-dom'

import Img from './images/11.jpg'
// 创建Mouse组件
class Mouse extends React.Component {
  // 鼠标初始位置
  state = {
    x: 0,
    y: 0
  }
  // 鼠标移动事件处理程序
  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }
  // 监听鼠标移动事件
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }
  render () {
    // 返回使用children代替render
    return this.props.children(this.state)
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
        {/* <Mouse render={mouse => {
          return (<p>鼠标位置：{mouse.x} {mouse.y}</p>)
        }}></Mouse> */}
        <Mouse>
          {
            mouse => {
              return (<p>鼠标位置：{mouse.x} {mouse.y}</p>)
            }
          }
        </Mouse>
        {/* <Mouse render={
          mouse => {
            return (
              <img src={Img} alt="猫" style={{
                position: 'absolute',
                width: 128,
                top: mouse.y - 64,
                left: mouse.x - 64
              }}/>
            )
          }
        }></Mouse> */}
        <Mouse>
          {
            mouse => {
              return (
                <img src={Img} alt="猫" style={{
                  position: 'absolute',
                  width: 128,
                  top: mouse.y - 64,
                  left: mouse.x - 64
                }}/>
              )
            }
          }
        </Mouse>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))