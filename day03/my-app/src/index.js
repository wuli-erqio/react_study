import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.PureComponent {
  state = {
    obj: {
      number: 0
    }

  }
  handleClick = () => {
    // 正确做法
    const newObj = {...this.state.obj, number: Math.floor(Math.random() * 3)}
    this.setState(() => {
      return {
        obj: newObj
      }
    })
    // 错误演示
    // const newObj = this.state.obj
    // newObj.number = Math.floor(Math.random() * 3)
    // this.setState(() => {
    //   return {
    //     obj: newObj
    //   }
    // })
  }
  render () {
    // console.log('render')
    return (
      <div>
        <h1>随机数： {this.state.obj.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))