import React from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

const App = (props) => {
  console.log(props)
  return <div>
    <h1>此处显示props的默认值:{props.pageSize}</h1>
  </div>
}

App.defaultProps = {
  pageSize: 10
}

ReactDOM.render(<App pageSize={20}/>, document.getElementById('root'))