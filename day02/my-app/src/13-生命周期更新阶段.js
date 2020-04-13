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
    // 3.强制更新
    // this.forceUpdate()
  }
  render() {
    console.warn('生命周期钩子函数：render')
    return (
      <div>
        <Counter conut={this.state.count}/>
        <button onClick={this.handleClick}>打豆豆</button>
      </div>
    )
  }
}
// 子组件接收props
class Counter extends React.Component {
  render() {
    console.warn('子组件----生命周期钩子函数：render')
    return <h1 id="title">统计豆豆被打的次数: {this.props.conut} </h1>
  }

  // 如果要调用setState()必须放在一个if条件中
  // 因为：如果直接调用setState() 更新状态，也会导致递归更新
  componentDidUpdate(prePops) {
    console.warn('子组件----生命周期钩子函数：componentDidUpdate')
    console.log('修改前的props：',  prePops.conut, '修改后的props：', this.props.conut)
    // 此处会调用两次， 第二次拿到第一次更改后的值对比父组件的值，停止调用
    if(prePops.conut !== this.props.conut) {
      this.setState({})
      // 发送ajax请求代码
    }
    // 错误做法
    // this.setState({})

    // 获取DOM
    // const title = document.getElementById('title').innerHTML
    // console.log(title)
  }
}


ReactDOM.render(<App />, document.getElementById('root'))