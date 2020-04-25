import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

class Sticky extends Component {
  // 创建ref对象
  placeholder = createRef()
  content = createRef()
  handleScroll = () => {
    const { height } = this.props
    const placeholderEl = this.placeholder.current
    const contentEl = this.content.current

    const { top } = placeholderEl.getBoundingClientRect()
    if(top < 0) {
      // 吸顶
      contentEl.classList.add(styles.fixed)
      placeholderEl.style.height= `${height}px`
    } else {
      // 不吸顶
      contentEl.classList.remove(styles.fixed)
      placeholderEl.style.height= '0px'
    }
  }
  // 监听scroll事件
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  // 解绑
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    return (
      <div>
        {/* 占位元素 */}
        <div ref={this.placeholder}/>
        {/* 内容元素 */}
        <div ref={this.content}>{ this.props.children } </div>
      </div>
    )
  }
}
Sticky.propTypes = {
  height: PropTypes.number.isRequired
}

export default Sticky