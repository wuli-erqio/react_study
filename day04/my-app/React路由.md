# React路由
## 1. React路由介绍
> 现代的前端应用大多都是**SPA**(单页面应用)，也就是只有一个HTML页面的应用程序，因为它的用户体验更好、对服务器的压力更小，所以更受欢迎，为了有效发使用单个页面来管理多个页面的功能，前端路由应运而生

* 前端路由的功能： 让用户从一个视图(页面)导航到另一个视图(页面)
* 前端路由是一套映射规则，在React中，是**URL路径**与**组件**的对应关系
* 使用React路由简单来说，就是配置**路径**和**组件**(配对)
## 2.路由的基本使用
### 2.1 使用步骤
<font color=pink>例子：01-路由的基本使用.js</font>

1. 安装： yarn add react-router-dom || npm i react-router-dom
2. 导入路由的三个核心组件： Router/Route/Link
`import { BrowserRouter as Router, Route, Link } from 'react-router-dom'`
3. 使用**Router组件**包裹整个应用(重要)
```
<Router>
  <div className="App">
  // ...省略页面内容
  </div>
</Router>
```
4. 使用**Link组件**作为导航菜单(路由入口)
```
<Link to="/first">页面一</Link>
```
5. 使用**Router组件**配置路由规则和要展示的组件(路由出口)
```
const First = () => <p> 页面一的内容 </p>
<Router>
  <div className="App">
    <Link to="/first">页面一</Link>
    <Route path="/first" component={First}>
  </div>
</Router>
```

### 2.2 常用组件说明
* Router组件: 包裹整个应用,一个React应用只需要<font color=red>BrowserRouter</font>使用一次</font>
* 两种常用Router: HashRouter和<font color=red>BrowserRouter</font>BrowserRouter</font>
* HashRouter: 使用URL的哈希值实现(localhost:3000/#/first)
```
import { HashRouter as Router, Route, Link } from 'react-router-dom'
```
* (推荐)<font color=red>BrowserRouter</font>: 使用H5的history API实现(localhost:3000/first)
* Link作用: 用于指定导航链接(a标签)
```
// to属性: 浏览器地址栏中的pathname(location, pathname)
<Link to="/first">页面一</Link>
```
* Route组件: 指定路由展示组件相关信息
```
// path属性: 路由规则
// component属性: 展示的组件
// Route组件写在哪,渲染出来的组件就展示在那
<Route path="/first" component={First}></Route>
```
## 3.路由的执行过程
<font color=pink>例子：02-路由的执行过程.js</font>

1. 点击Link组件(a标签), 修改了浏览器地址栏中的url
2. React路由监听到地址栏中url的变化
3. React路由内部遍历的所有Route组件,使用路由规则(path) 与pathname进行匹配
4. 当路由规则(path) 能够匹配地址栏中的pathname时,就展示Route组件的内容
## 4.编程式导航
<font color=pink>例子：03-编程式导航.js</font>

* 场景: 点击登录按钮,登录成功后,通过代码跳转到后台首页,如何实现?
* 编程式导航: 通过JS代码来实现页面的跳转
* history是React路由提供的,用于获取浏览器历史记录的相关信息
* push(path): 跳转到某个页面,参数path表示要跳转的路径
* go(n): 前进或者后退到某个页面, 参数n表示前进或者后退页面数量(比如: -1表示后退到上一页)
```
class Login extends Compontent {
  handleLogin = () => {
    // ..
    this.props.history.push('/home')
  }
  render() {
    // ... 省略代码
  }
}
```
## 5.默认路由
<font color=pink>例子：04-默认路由.js</font>

* 问题: 现在的路由都是点击导航菜单后展示的,如何在进入页面的时候就展示呢?
* 默认路由: 表示进入页面时就会匹配的路由
* 默认路由path: /
```
<Route path="/" component={Home} />
```
## 6.匹配路由
### 6.1 模糊匹配模式
<font color=pink>例子：05-模糊匹配模式.js</font>

* 问题: 当Link组件的to属性为'/login'时,为什么默认路由也被匹配成功?
* 默认情况下,Route路由是**模糊匹配模式**
* 模糊匹配规则: 只要pathname**以path开头**就会匹配成功
```
<Link to="/login">登录页面</Link>
<Route path="/" component={Home}></Route> // 匹配成功
// path 代表Route组件的path属性
// pathname 代表Link组件的to属性(也就是location.pathname)
```
### 6.2 精确匹配模式
* 问题: 默认路由任何情况下都会展示,如何避免这种问题?
* 给Route组件添加`exact`属性,让其变成`精确匹配模式`
* 精确匹配模式: 只有当`path`和`pathname`完全匹配的时候才会展示该路由
```
// 此时,该组件只能匹配pathname"/"这一种情况
<Route exact path='/' component=... />
```
推荐: 给默认路由添加`exact`属性

## 总结
1. React路由可以有管理多个视图实现SPA
2. Router 组件包裹整个应用,只需要使用一次
3. Link组件入口,Route组件出口
4. 通过props.history实现编程式导航
5. 默认模糊匹配,添加exact变精确匹配
6. React路由的一切都是组件,可以想思考组件一样思考路由