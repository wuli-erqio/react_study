import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isCheck: false
  }
  // 文本框改变事件
  handleTxt = e => {
    this.setState({
      txt: e.target.value
    })
  }
  // 富文本框改变事件
  handleContent = e => {
    this.setState({
      content: e.target.value
    })
  }
  // 下拉框改变事件
  handleCity = e => {
    this.setState({
      city: e.target.value
    })
  }
  // 复选框改变事件
  handleCheck = e => {
    this.setState({
      isCheck: e.target.checked
    })
  }
  render() {
    return (
      <div>
        {/* 文本框 */}
        <input type="text" value={this.state.txt} onChange={this.handleTxt}></input>
        {/* 富文本框 */}
        <textarea value={this.state.content} onChange={this.handleContent}></textarea>
        {/* 下拉框 */}
        <select value={this.city} onChange={this.handleCity}>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="gd">广东</option>
        </select>
        {/* 复选框 */}
        <input type="checkbox" checked={this.state.isCheck} onChange={this.handleCheck}></input>
      </div>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))