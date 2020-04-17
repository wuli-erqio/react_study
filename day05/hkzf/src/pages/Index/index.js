import React from 'react'
import { Carousel, Flex, Grid, List } from 'antd-mobile'
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

const Item = List.Item;
const Brief = Item.Brief;
export default class Index extends React.Component {
  state = {
    swipers: [],
    isSwipersLoaded: false,
    groups: [],
    news: []
  }
  // 获取轮播图
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    this.setState(() => {
      return {
        swipers: res.data.body,
        isSwipersLoaded: true
      }
    })
  }
  // 获取合租小组
  async getGroups() {
    const res = await axios.get(`http://localhost:8080/home/groups`, {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    this.setState(() => {
      return {
        groups: res.data.body,
      }
    })
  }
  // 最新资讯
  async getnews() {
    const res = await axios.get(`http://localhost:8080/home/news`, {
      params: {
        area: 'AREA%7C88cff55c-aaa4-e2e0'
      }
    })
    this.setState(() => {
      return {
        news: res.data.body,
      }
    })
  } 
  // 调用方法
  componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getnews()
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
  // 遍历最新资讯
  renderNews() {
    return  this.state.news.map(item => <Item key={item.id} align="top" thumb={`http://localhost:8080${item.imgSrc}`} multipleLine>
              <div>{item.title}</div>
              <div className="info">
                <Brief>{item.from}</Brief><Brief>{item.date}</Brief>
              </div>
            </Item>
          )
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
        {/* 租房小组 */}
        <div className="groups">
          <div className="groups-title">
            <h3>租房小组</h3><span>更多</span>
          </div>
          <Grid square={false} hasLine={false} columnNum={2} data={this.state.groups} renderItem={(item) => (
            <Flex className="group-item" justify="around" key={item.id}>
              <div className="desc">
                <p className="title">{item.title}</p>
                <span className="info">{item.desc}</span>
              </div>
              <img 
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
              />
            </Flex>
          )} />
        </div>
        {/* 最新资讯 */}
        <div className="news" style={{height: '200px'}}>
          <h3>最新资讯</h3>
          <List>{this.renderNews()}</List>
        </div>
      </div>
      )}
}