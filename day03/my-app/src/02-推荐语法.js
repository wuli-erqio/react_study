import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    // 这种语法也是异步更新
    this.setState((state, props) => {
      return {
        count: state.count + 1
      }
    })
    console.log(this.state.count) // 1
    // 这种语法也是异步更新 依赖于上次调用的值
    this.setState((state, props) => {
      return {
        count: state.count + 1
      }
    })
    console.log(this.state.count) // 1
  }
  render() {
    console.log('render')
    return (
      <div>
        <h1>计数器： {this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))