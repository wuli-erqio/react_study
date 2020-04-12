import React from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

const App = (props) => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item}</li>)
  
  return <ul>{lis}</ul>
}

// 添加props校验
App.propTypes = {
  colors: PropTypes.array
}
ReactDOM.render(<App colors={['red', 'blue']}/>, document.getElementById('root'))