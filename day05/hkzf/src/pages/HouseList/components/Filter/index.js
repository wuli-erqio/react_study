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
  }
  render() {
    const { titleSelectStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask}></div> */}
        <div className={styles.content}>
          {/* 标题 */}
          <FilterTitle titleSelectStatus={titleSelectStatus} ></FilterTitle>
          {/* 前三个菜单的对应内容 */}
          {/* <FilterPicker></FilterPicker> */}
          {/* 最后一个菜单的对应内容 */}
          {/* <FilterMore></FilterMore> */}
        </div>
      </div>
    )
  }
}