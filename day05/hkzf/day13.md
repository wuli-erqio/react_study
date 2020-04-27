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
### 2. 登录功能
* 添加状态： username(账号)、password(密码)
* 使用受控组件方式获取表单元素值
* 给form表单添加onSubmit
* 创建方法handleSubmit, 实现表单提交
* 在方法中，通过username和password作为参数
* 使用API调用登录接口，将username和password作为参数
* 判断返回值status为200时，表示登录成功
* 登陆成功后，将token保存到本地存储中(hkzf_token)
* 返回登陆前的页面
### 3. 表单验证说明
* 表单提交前，需要先进行表单验证，验证通过后在提交表单
* 方式一：antd-mobile组件库的方式(需要inputItem文本输入组件)
* 推荐： 使用更通用的formik，React中专门用来进行表单处理和表单校验的库
```
handleSubmit = () => {
  // 手动处理表单验证
  // 1. 非空校验
  // 2. 账号格式校验
  // 3. 密码格式校验
  // 4. 表单校验失败样式处理
  // ...
}
```
## 1.3 formik表单处理
### 1. 介绍
* 场景：表单处理，表单验证(比如，登录功能)
* 优势：轻松处理React中的复杂表单，包括：获取表单元素的值，表单验证和错误信息、处理表单提交，并且将这些内容放在一起统一处理，有利于代码阅读、重构、测试等。
* 两种使用方式：
  * 高阶组件(withformik)
  * render-props(<Formik render={() => {}} />)
### 2. 使用formik重构登录功能
* 安装：npm install formik --save
* 导入withFormik,使用withFormik组件包裹Login组件
* 为withFormik提供配置对象: mapPropsToValues/ handleSubmit
* 在login组件中，通过props获取到values(表单元素值对象)、handleSubmit、handleChange
* 使用values提供的值，设置为表单元素的value,使用handleChange设置为表单元素的onChange
  * 注意： 在给表单元素设置handleChange的时候，为了让其生效，需要给表单元素添加name属性吗，并且name苏醒的值与当前value名称相同
* 使用handleSubmit设置为表单的onSubmit
* 在handleSubmit中，通过value获取到表单元素的值
* 在handleSubmit中，完成登录逻辑
```
Login = withFormik ({
  mapPropsToValues: (() => ({username: ''})), // 提供表单项的值
  handleSubmit: (value, { props }) => {} // 提供表单提交事件
})(Login)
```
### 3. 两种表单验证方式
* 两种方式
  1. 通过validate配置项手动校验
  2. 通过validationSchema配置项配合Yup来校验
* 推荐： validationSchema配合Yup的方法进行表单验证
```
const validate = (value, props) => {
  let errors = {}
  if(!values.username){ 
    errors.username = '账号必填项'
  }
  // ...
  return errors
}
```
```
Yup.object().shape({
  username: Yup.string().required('账号为必填项')
})
```
### 4. 给登录功能添加表单验证
* 安装： npm i  yup -S
* 在withFormik中添加配置项validationSchema, 使用Yup添加表单校验规则
* 在Login组件中，通过props获取到errors(错误信息)和touched(是否访问过，注意：需要给表单元素添加handleBlur处理失焦事件才生效)
* 在表单元素中通过这两个对象展示表单验证错误信息
```
validationSchema: Yup.object().shape({
  username: Yup.string().required('账号必填项')
  .matches(REG_UNAME, '长度为5到8位, 只能出现数字、字母、下划线')
})
```
```
errors.username && touched.username && (
  <div className={styles.error}> {errors.username}> </div>
)
```
### 5. 简化表单处理
* 导入Form组件，替换form元素，去掉onSubmit
```
<Form>...省略表单结构</Form>
```
* 导入Field组件，替换掉input表单元素，去掉onChange、onBlur、value
```
<Field type="text" name="username" placeholder="" className="" />
```
* 导入ErrorMessage组件，替换原来的错误逻辑代码
```
<ErrorMessage component="div" name="username" className="" />
```
* 去掉所有props
## 1.4 我的页面
### 1. 页面结构和样式
* Button按钮组件
* Grid宫格组件