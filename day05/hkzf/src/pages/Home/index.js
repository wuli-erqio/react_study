import React from 'react'
// 导入路由
import { Route } from 'react-router-dom'
// 导入页面组件
import News from '../News'
import Index from '../Index'
import Profile from '../Profile'
import HouseList from '../HouseList'
// 导入tabbar
import { TabBar } from 'antd-mobile';
// 导入自己的样式
import './index.css'

const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home/index'
  },{
    title: '找房',
    icon: 'icon-infom',
    path: '/home/houselist'
  },{
    title: '资讯',
    icon: 'icon-findHouse',
    path: '/home/news'
  },{
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]
export default class Home extends React.Component {
  state = {
    // 默认选中的tabbar
    selectedTab: this.props.location.pathname,
  }

  // 渲染TabBar.Item 
  renderTabBarItem() {
    return tabItems.map(item =>  <TabBar.Item
      title={item.title}
      key={item.title}
      icon={<i className={`iconfont ${item.icon}`}></i>}
      selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
      selected={this.state.selectedTab === `${item.path}`}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        })
        // 路由切换
        this.props.history.push(item.path)
      }}
    >
    </TabBar.Item>)
  }

  render() {
    return (
      <div className="home">
      <Route path="/home/index" component={Index}></Route>
      <Route path="/home/houselist" component={HouseList}></Route>
      <Route path="/home/news" component={News}></Route>
      <Route path="/home/profile" component={Profile}></Route>
        <TabBar
          tintColor="#21b97a"
          noRenderContent
          barTintColor="white"
        >
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    )
  }
}