import React, {Component} from 'react'
import FilterFooter from '../../../../components/FilterFooter'
import styles from './index.module'
export default class FilterMore extends Component {
  renderFilter() {
    return (
      <span className={[styles.tag, styles.tagActive].join(' ')}>东北</span>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        <div className={styles.mask}></div>
        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl  className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilter()}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilter()}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilter()}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilter()}</dd>
          </dl>
        </div>
        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} />
      </div>
    )
  }
}