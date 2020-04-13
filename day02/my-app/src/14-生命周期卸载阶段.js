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
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        {
          this.state.count > 3 ? <p>豆豆被打死了</p> : <Counter conut={this.state.count}/>
        }
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}
class Counter extends React.Component {
  componentDidMount() {
    // 定时器
    this.timer = setInterval(() => {
      console.log('定时器正在执行。。。')
    }, 1000)
  }
  render() {
    return <h1 id="title">统计豆豆被打的次数: {this.props.conut} </h1>
  }

  componentWillUnmount() {
    console.warn('生命周期钩子函数： componentWillMount')
    // 清理定时器
    clearInterval(this.timer)
  }
}


ReactDOM.render(<App />, document.getElementById('root'))