import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    // 此处更新state
    this.setState({
      count: this.state.count + 1
    })
    // 页面状态+1之后，打印出来的是更新前的数据 异步更新
    console.log(this.state.count) // 1

    this.setState({
      count: this.state.count + 1 // 1+1
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