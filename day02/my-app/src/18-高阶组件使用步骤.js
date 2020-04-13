import React from 'react'
import ReactDOM from 'react-dom'

import Img from './images/11.jpg'

// 创建高阶组件
function withMouse(WrappedComponent) {
  // 该组件提供复用的状态逻辑
  class Mouse extends React.Component {
    // 鼠标状态
    state = {
      x: 0,
      y: 0
    }
    handleClick = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }
    componentDidMount() {
      window.addEventListener('mousemove', this.handleClick)
    }
    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleClick)
    }
    // 通过render
    render() {
      return <WrappedComponent {...this.state} />
    }
  }
  return Mouse
}
// 用来测试高阶组件
const Position = props => (<p>鼠标当前位置：(x: {props.x}, y: {props.y})</p>)
// 图片
const Cat = props => (<img src={Img} alt="猫" style={{
  width: 128,
  position: "absolute",
  top: props.y,
  left: props.x
}}></img>)

// 获取增强后的组件
const MousePosition = withMouse(Position)

// 获取增强后的组件 图片
const MouseCat = withMouse(Cat)

class App extends React.Component {
  render() {
    return (
      <div>
        {/* 渲染增前后的组件 */}
        <MousePosition/>
        <MouseCat/>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))