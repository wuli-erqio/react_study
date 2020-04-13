import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    console.warn('生命周期钩子函数： constructor')
  }
  // 1.发送ajax请求，获取远程数据
  // 2.进性DOM操作
  componentDidMount() {
    const title = document.getElementById('title')
    console.log(title)
    console.warn('生命周期钩子函数： componentDidMount')
  }
  render() {
    // 错误演示 不要再render中调用setState
    // this.setState({
    //   count: 1
    // })
    return (
      <div>
        <h1 id="title">统计豆豆被打的次数</h1>
        <button id="btn">打豆豆</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))