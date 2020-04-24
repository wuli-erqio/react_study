import React, { Component } from 'react'
import styles from './index.module.css'

class Sticky extends Component {
  render() {
    return (
      <div>
        {/* 占位元素 */}
        <div />
        {/* 内容元素 */}
        <div>{ this.props.children } </div>
      </div>
    )
  }
}

export default Sticky