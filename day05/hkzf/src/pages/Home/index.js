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
import styles from './index.module.css'
/*
问题： 点击导航菜单，tabbar并没有高亮
原因： 原来我们实现该组件的时候，只考虑了点击以及第一次加载组件的情况，但是，我们为您没有考虑
不重新加载组件的时候的路由切换，因为这种情况下，我们的代码没有覆盖到

解决： 
  思路：路由切换时，也执行菜单高亮是逻辑代码
  1.添加componentDidUpdate钩子函数
  2.在钩子函数中判断路由地址是否切换
  3.在路由地址切换时，让菜单高亮
*/
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
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

  // 再此判断组件未重新加载，路由切换时更新state
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
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
      <div className={styles.home}>
      <Route exact path="/home" component={Index}></Route>
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