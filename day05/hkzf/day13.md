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