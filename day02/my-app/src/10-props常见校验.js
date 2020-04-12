import React from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

const App = (props) => {
  return <div>
    <h1>props校验:</h1>
  </div>
}

// 添加props校验
// 属性 a 的类型:         数值(number)
// 属性 fn 的类型:        函数(func)并且为必填
// 属性 tag 的类型:       React元素(element)
// 属性 filter 的类型:    对象({area: '上海', price: 1999})
App.propTpes = {
  a: PropTypes.number,
  fn: PropTypes.func.isRequired,
  tag: PropTypes.element,
  filter: PropTypes.shape({
    area: PropTypes.string,
    price: PropTypes.number
  })
}

ReactDOM.render(<App fn={() => {}}/>, document.getElementById('root'))