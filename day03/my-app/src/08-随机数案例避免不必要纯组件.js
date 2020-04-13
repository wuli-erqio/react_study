import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// class App extends React.PureComponent {
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
        {/* <h1>随机数： {this.state.number}</h1> */}
        <NumberBox number={this.state.number}/>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}

class NumberBox extends React.PureComponent {
  render() {
    console.log('子组件render')
    return <h1>随机数：{this.props.number}</h1>
  }
}
ReactDOM.render(<App />, document.getElementById('root'))