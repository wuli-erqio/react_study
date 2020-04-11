import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.txtRef = React.createRef()
  }

  // 获取文本框的值
  getTxt = () => {
    console.log(this.txtRef.current.value)
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.txtRef}></input>
        <button onClick={this.getTxt}>获取文本框的值</button>
      </div>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))