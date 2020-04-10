import React from 'react'
import ReactDOM from 'react-dom'

// 类组件
// class App extends React.Component {
//   handleClick() {
//     console.log('OK')
//   }
//   render() {
//     return (
//       <button onClick={this.handleClick}>点击</button>
//     )
//   }
// }

// 函数组件
function App() {
  function handleClick() {
    console.log('OK,函数组件')
  }
  return (
    <button onClick={handleClick}>点击</button>
  )
}


// 渲染
ReactDOM.render(<App />, document.getElementById('root'))