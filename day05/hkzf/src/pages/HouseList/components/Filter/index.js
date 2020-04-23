import React, {Component} from 'react'
import FilterTitle from '../FilterTitle'
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
import styles from './index.module.css'

const titleSelectStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
export default class Filter extends Component {
  state = {
    titleSelectStatus,
    // 提供组件展示或隐藏状态
    openType: ''
  }

  // 点击标题高亮事件
  // this指向问题
  onTitleClick = (type) => {
    this.setState(prevState => {
      return {
        titleSelectStatus: {
          // 获取当前的对象所有属性值
          ...prevState.titleSelectStatus,
          [type]: true
        },
        // 展示对话框
        openType: type,
      }
    })
  }

  // 取消隐藏对话框
  onCancel = () => {
    this.setState({
      // 隐藏对话框
      openType: ''
    })
  }
  // 确定
  onSave = () => {
    this.setState({
      // 隐藏对话框
      openType: ''
    })
  }
  render() {
    const { titleSelectStatus, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          (openType === 'area' || openType === 'mode' || openType === 'price')
          ? (<div className={styles.mask} onCancel={this.onCancel} />) : null
        }
        <div className={styles.content}>
          {/* 标题 */}
          <FilterTitle titleSelectStatus={titleSelectStatus} onClick={this.onTitleClick} />
          {
            (openType === 'area' || openType === 'mode' || openType === 'price')
            ? (<FilterPicker onCancel={this.onCancel} onSave={this.onSave} />) : null
          }
          {/* 前三个菜单的对应内容 */}
          {/* <FilterPicker></FilterPicker> */}
          {/* 最后一个菜单的对应内容 */}
          {/* <FilterMore></FilterMore> */}
        </div>
      </div>
    )
  }
}