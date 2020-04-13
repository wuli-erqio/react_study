import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.Component {
  state = {
    number: 0
  }
  handleClick = () => {
    this.setState(() => {
      return {
        number: Math.floor(Math.random() * 3)
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('更新前状态: ',  this.state.number)
    console.log('当前状态状态: ', nextState.number)
    return nextState.number !== this.state.number
  }
  render () {
    console.log('render')
    return (
      <div>
        <h1>随机数： {this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))