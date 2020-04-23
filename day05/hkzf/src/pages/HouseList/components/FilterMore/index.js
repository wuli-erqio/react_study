import React, {Component} from 'react'
import FilterFooter from '../../../../components/FilterFooter'
import styles from './index.module.css'
export default class FilterMore extends Component {
  state = {
    selectedValues: this.props.defaultValue
  }
  // 清空按钮
  onCancel = () => {
    this.setState({
      selectedValues: []
    })
  }
  // 确定按钮是事件处理函数
  onOk = () => {
    const { type, onSave } = this.props
    // onSave是父组件的方法
    onSave(type, this.state.selectedValues)
  }
  renderFilter(data) {
    const { selectedValues } = this.state
    return (
      data.map(item => {
        // 实现高亮
        const isSelected = selectedValues.indexOf(item.value) > -1
        return (<span
          onClick={() =>  this.onTagClick(item.value)}
          key={item.value}
          className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}>{item.label}</span>
      )})
    )
  }


  onTagClick (value) {
    const { selectedValues } = this.state
    const newSelectedValues = [...selectedValues]
    if(selectedValues.indexOf(value) <= -1) {
      // 没有当前项是情况
      newSelectedValues.push(value)
    } else {
      // 有当前项是情况
      const index = newSelectedValues.findIndex(item => item === value)
      newSelectedValues.splice(index, 1)
    }
    this.setState({
      selectedValues: newSelectedValues
    })
  }
  render() {
    const { data: {roomType,oriented,floor,characteristic} } = this.props
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        <div className={styles.mask} onClick={this.props.onCancel}></div>
        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl  className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilter(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilter(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilter(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilter(characteristic)}</dd>
          </dl>
        </div>
        {/* 底部按钮 */}
        <FilterFooter
          className={styles.footer}
          cancelText="清除"
          onCancel={this.onCancel}
          onOk={this.onOk}
          />
      </div>
    )
  }
}