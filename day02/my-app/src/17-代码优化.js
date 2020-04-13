import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

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

  // 优化2： 在组件卸载时移除事件绑定
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }
  render () {
    // 返回使用children代替render
    return this.props.children(this.state)
  }
}
  // 优化1：添加校验
  Mouse.propTypes = {
    children: PropTypes.func.isRequired
  }

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>render props模式</h1>
        <Mouse>
          {
            mouse => {
              return (<p>鼠标位置：{mouse.x} {mouse.y}</p>)
            }
          }
        </Mouse>
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