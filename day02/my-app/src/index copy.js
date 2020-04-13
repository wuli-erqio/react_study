import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    // 1.调用父组件中的state
    // this.setState({
    //   count: this.state.count + 1
    // })

    // 3.强制更新
    this.forceUpdate()
  }
  render() {
    console.warn('生命周期钩子函数：render')
    return (
      <div>
        <Counter conut={this.state.count}/>
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}
// 子组件接收props
class Counter extends React.Component {
  render() {
    console.warn('子组件----生命周期钩子函数：render')
    return <h1>统计豆豆被打的次数: {this.props.conut} </h1>
  }
  }


ReactDOM.render(<App />, document.getElementById('root'))