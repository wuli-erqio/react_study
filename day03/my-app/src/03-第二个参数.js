import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    this.setState((state, props) => {
      return {
        count: state.count + 1
      }
    },
    // 状态更新后并且重新渲染后，立即执行
    () => {
      console.log('状态更新完成：', this.state.count) // 1
      console.log(document.getElementById('title').innerText) // 1
      document.title = '更新state后的标题' + this.state.count
    })
    console.log('状态更新完成：', this.state.count) // 1
  }
  render() {
    return (
      <div>
        <h1 id="title">计数器： {this.state.count}</h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))