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
  render () {
    // console.log('render')
    return (
      <div>
        <NumberBox number={this.state.number} />
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('更新前props: ',  this.props.number)
    console.log('当前props: ', nextProps.number)
    return nextProps.number !== this.props.number
  }
  render() {
    console.log('子组件render')
    return (
      <h1>随机数： {this.props.number}</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))