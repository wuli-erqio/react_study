import React from 'react'
import ReactDOM from 'react-dom'
import './css/common.css'

class App extends React.Component {
  state = {
    comments: [
      { id: 1, name: 'Jack', content: '沙发！！' },
      { id: 2, name: 'rose', content: '板凳~~' },
      { id: 3, name: 'Tom', content: '楼主好人' }
    ],
    username: '',
    userContent: ''
  }
  // 处理事件
  handleForm = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  // 提交数据
  addComment = () => {
    const { comments, username, userContent } = this.state
    if(username.trim() === '' || userContent.trim() === '') {
      alert('请输入用户名或评论内容')
      return
    }
    // 将数据添加到数组
    const newComments = [{
      id: Math.random(),
      name: username,
      content: userContent
    }, ...comments]

    // 更新状态与清空我文本框
    this.setState({
      comments: newComments,
      username: '',
      userContent: ''
    })
  }
  // 渲染评论列表
  rebderList() {
    const { comments } = this.state
    if (comments.length === 0) {
      return <div className="box1-3">暂无评论，快去评论吧~</div>
    }
    return (<ul>
      {
        comments.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.content}</p>
          </li>
        ))
      }
    </ul>)
  }
  render() {
    const { username, userContent } = this.state
    return (
      <div className="box">
        <div className="box1">
          <input type="text" className="box1-1" name="username" value={username} onChange={this.handleForm}></input>
          <textarea className="box1-2" name="userContent" value={userContent} onChange={this.handleForm}></textarea>
          <button onClick={this.addComment}>发表评论</button>
        </div>

        {/* 通过条件渲染判断显示内容 */}
        {this.rebderList()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))