import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  state = {
    txt: '',
    content: '',
    city: 'bj',
    isCheck: false
  }

  handleForm = e => {
    // 获取当前的DOM对象
    const target = e.target

    // 根据类型获取值
    const value = target.type === 'checkbox' ? target.checked : target.value

    // 获取name
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        {/* 文本框 */}
        <input name="txt" type="text" value={this.state.txt} onChange={this.handleForm}></input>
        {/* 富文本框 */}
        <textarea name="content" value={this.state.content} onChange={this.handleForm}></textarea>
        {/* 下拉框 */}
        <select name="city" value={this.city} onChange={this.handleForm}>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="gd">广东</option>
        </select>
        {/* 复选框 */}
        <input name="isCheck" type="checkbox" checked={this.state.isCheck} onChange={this.handleForm}></input>
      </div>
    )
  }
}

// 渲染
ReactDOM.render(<App />, document.getElementById('root'))