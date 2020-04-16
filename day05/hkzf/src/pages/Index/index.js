import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'
// 导入图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import './index.css'
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: 'home/houselist'
  },{
    id: 2,
    img: Nav2,
    title: '合租',
    path: 'home/houselist'
  },{
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: 'home/houselist'
  },{
    id: 4,
    img: Nav4,
    title: '出租',
    path: 'home/houselist'
  }
]
export default class Index extends React.Component {
  state = {
    swipers: [],
    isSwipersLoaded: false
  }
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    this.setState(() => {
      return {
        swipers: res.data.body,
        isSwipersLoaded: true
      }
    })
  }
  // 调用方法
  componentDidMount() {
    this.getSwipers()
  }

  // 遍历swipers
  renderSwipers() {
    return this.state.swipers.map(item => (
      <a
        key={item.id}
        href="https://github.com/wuli-erqio/react_study"
        style={{ display: 'inline-block', width: '100%', height: 212 }}
      >
        <img
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
          style={{ width: '100%', height: 212, verticalAlign: 'top' }}
        />
      </a>
    ))
  }
  // 遍历菜单导航
  renderNavs() {
    return navs.map(item => <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
      <img src={item.img} alt=""></img>
      <h2>{item.title}</h2>
    </Flex.Item>)
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {
            this.state.isSwipersLoaded ?
            (<Carousel autoplay infinite autoplayInterval={5000}>
              {this.renderSwipers()} </Carousel>): ('')
          }
        </div>
        
        {/* 首页导航 */}
        <Flex className="nav">
          {this.renderNavs()}
        </Flex>
      </div>
    )
  }
}