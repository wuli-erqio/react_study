import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class App extends React.PureComponent {
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
  // render 方法的调用并不意味这浏览器是重新渲染
  // render 方法调用仅仅说明要进行diff
  render () {
    const el = (
      <div>
        <h1>随机数：</h1>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
    console.log(el)
    return el
  }
}
ReactDOM.render(<App />, document.getElementById('root'))