import React from 'react'
import ReactDOM from 'react-dom'

import Img from './images/11.jpg'

// 创建高阶组件
function withMouse(WrappedComponent) {

  class Mouse extends React.Component {
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
    render() {
      return <WrappedComponent {...this.state} {...this.props}/>
    }
  }
  // 设置displayName
  Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
  return Mouse
}
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const Position = props => (<p>鼠标当前位置：(x: {props.x}, y: {props.y})</p>)

const MousePosition = withMouse(Position)

class App extends React.Component {
  render() {
    return (
      <div>
        <MousePosition a="1"/>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))