## 3. 房屋详情模块
### 3.1 目标
- 看懂模板HouseDetail的结构
- 能够获取到数据，渲染到组件上
- 能够配置通用路由规则，并且获取路由参数
### 3.2 页面模板说明
  1. 创建房屋详情页面HouseDetail
  2. 修改NavHeader组件(添加了className和rightCount两个props)
  3. 创建了housePackage组件(房屋配套)
### 3.3 路由参数
#### 1. 概述
* 问题：房源有多个，那么URL路径也就有多个，那么需要多少个路由规则来匹配呢？一个还是多个？
* 答案： 一个
* 如何使用 一个 路由规则匹配不同的URL路径，同时I获取到URL中不同的内容呢
* 解决方式：路由参数
* 作用：让一个路由规则，同时匹配多个符合该规则的URL路径
```
<Link to="/detail/1">房源1</Link>
<Link to="/detail/2">房源2</Link>

// 能够匹配/detail/1或/detail/2等符合该规则的pathname
<Route path="/detail/:id" component=.../>
```
#### 2. 获取路由参数
* 如何获取路由参数
* 获取路由参数： `props.match.params`
```
class HouseDetail extends Component {
  componentDidMount () {
    // 获取路由参数
    const { params } = this.props.match
    // <Route path="/detail/:id" component=.../>
    const { id } = params
  }
}
```
### 3.4 展示房屋详情
#### 步骤
  1. 在找房页面中，给每个房源列表项添加单击事件，再点击时转到房屋详情页
  2. 在单击事件中，获取到当前房屋id
  3. 根据房屋详情的路由地址，调用history.push()实现路由跳转
  4. 封装getHouseDetail方法，在componentDidMount中调试该方法
  5. 在方法中，通过路由参数获取到当前房屋id
  6. 使用API发送请求，获取房屋数据，保存到state中
  7. 使用房屋数据，渲染房屋详情

# 1. 登录模块
## 1.1 功能分析
业务： 通过账号和密码完成登录，实现登录访问控制等
功能： 
* 用户登录
* 我的页面
* 封装路由访问控制组件
**难点：登录访问控制、表单验证**
## 1.2 用户登录
### 1. 分析页面结构和样式
* 复用NavHeader组件设置顶部导航栏
* WingBlank两翼留白组件
* WhiteSpace上下留白组件