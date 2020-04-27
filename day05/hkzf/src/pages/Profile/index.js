import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'antd-mobile'

import { BASE_URL } from '../../utils'

import styles from './index.module.css'

const menus = [
  {id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate'},
  {id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent'},
  {id: 3, name: '看房记录', iconfont: 'icon-record'},
  {id: 4, name: '成为房主', iconfont: 'icon-identity'},
  {id: 5, name: '个人资料', iconfont: 'icon-myinfo'},
  {id: 6, name: '联系我们', iconfont: 'icon-cust'}
]

// 默认头像
const DEFAULT_AVATAR = BASE_URL + '/img/profile/avatar.png'
export default class Profile extends Component {
  render() {
    const { history } = this.props
    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_URL + '/img/profile/bg.png'}
            alt="背景图"/>
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={DEFAULT_AVATAR} alt="icon"></img>
            </div>
            <div className={styles.user}>
              <div className={styles.name}>游客</div>
              <div className={styles.edit}>
                <Button
                  type="primary"
                  size="small"
                  inline
                  onClick={() => history.push('/login')}>去登录</Button>
              </div>
            </div>
          </div>
        </div>
        {/* 九宫格 */}
        <Grid data={menus} columnNum={3} hasLine={false} renderItem={item => (
          item.to ? (
            <Link to={item.to}>
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`}></i>
                <span>{item.name}</span>
              </div>
            </Link>
          ) : (
            <div className={styles.menuItem}>
              <i className={`iconfont ${item.iconfont}`}></i>
              <span>{item.name}</span>
            </div>
          )
        )}/>
        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_URL + '/image/profile/join.png'} alt=""></img>
        </div>
      </div>
    )
  }
}