import React from 'react'
import ReactDOM from 'react-dom'

// 接收数据使用this
class Hello extends React.Component {
  // 推荐使用
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
    <div>
      props: {this.props.name}
    </div>
    )
  }
}


// 1.传递参数
ReactDOM.render(
  <Hello name="jack"
  age={19}
  colors={['red', 'green', 'blue']}
  fn={() => console.log('这是一个函数')}
  tag={<p></p>}
  />, document.getElementById('root'))