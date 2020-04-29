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
### 2. 功能分析
* 判断是否登录(本地缓存中是否有hkzf_token，直接调用isAuth()方法即可)
* 如果登录了，就发送请求获取个人资料，并在页面中展示个人资料
* 如果没有登录，则不获取个人资料，只在页面中展示位登录的信息
* 在页面中展示登录或者未登录信息，就要通过state变化体现，因此，需要一个表示是否登陆的状态
```
state = {
  isLogin: isAuth()
  userInfo: {...}
}
```
### 3. 功能实现
* 在state中添加两个状态： isLogin(是否登录)和userInfo(用户信息)
* 从utils中导入isLogin(登录状态)、getToken(获取token)
* 创建方法getUserInfo，用来获取个人资料
* 在方法中，通过isLogin判断用户是否登录
* 如果没有登陆，则不发送请求，渲染未登录信息
* 如果已登录，就根据接口发送请求，获取用户个人资料
* 渲染个人资料数据
### 4. 退出功能
* 给退出按钮绑定单击事件，创建方法logout作为事件处理程序
* 导入Modal对话框组件
* 在方法中，拷贝Model组件文档中确认对话框的示例代码
* 修改对话框的文字提示
* 在退出按钮的事件处理程序中，先调用退出接口(让服务器退出)， 在移除本地的token(本地退出)
* 将登录状态isLogin设置位false
* 清空用户状态对象

## 1.5 登录访问控制
### 1. 概述
项目中的两种类型的功能和两种类型的页面
两种功能： 
  * 登陆后才能进行操作(比如：获取个人资料)
  * 不需要登陆就能访问(比如：获取房屋列表)
两种页面
  * 需要登陆才能访问(比如：发布房源页)
  * 不需要登陆即可访问(比如：首页)
对于需要登陆才能操作的功能使用**axios拦截器**进行处理(比如：同统一添加请求头authorization)
对于需要登陆才能访问的页面使用**路由控制**

### 2. 使用axios拦截器统一处理token
* 在api.js中，添加请求拦截器
* 获取到当前请求的接口路径(url)
* 判断接口路径，是否是以/user开头，并且不是登陆或注册接口(只给需要的接口添加请求头)
* 如果是，就添加请求头Authorization 
* 添加相应拦截器
* 判断返回值中的状态码
* 如果是400，表示token超时或者异常，直接移除token

### 3. 分析AuthRoute鉴权路由组件
* 场景： 限制某个页面只能在登录的情况下访问
* 说明： 在React路由中并没有直接提供该组件，需要手动封装，来实现登陆访问控制(类似与Vue路由的导航守卫)
* 如何封装？ 参考react-ronte-dom文档中提供的鉴权示例
* 如何使用： 使用AuthRoute组件代替默认的Route组件，来配置路由规则
* AuthRoute组件实际上就是对原生的Route做了一次包装，来实现了一些额外的功能
* render方法：render props模式，指定该路由要渲染的组件内容(类似与component属性)
* Redirect组件： 重定向组件，通过to属性，指定要跳转到的路由信息
* state属性： 表示给路由符加一些额外信息，此外，用于指定登录成功后要进入的页面地址
```
// 使用方式
<AuthRoute path="/rent/add" component={Rent} />
```
### 4. 封装AuthRoute鉴权路由组件
* 在components目录中创建AuthRoute/index.js文件
* 创建组件AnthRoute并导出
* 在AuthRoute组件中返回Route组件(在Route的基础上做了一层包装，用于实现自定义功能)
* 在Route组件，添加render方法，指定该组件要渲染的内容(类似component属性)
* 在render方法中，调用isAuth()判断是否登录
* 如果登录了，就渲染当前组件(通过参数component获取到要渲染的组件，需要重命名)
* 如果没有登陆，就重定向到登录页面，并指定登录成功后要跳转到的页面路径
* 将AuthRoute组件接收到的props原样传递给Route组件(保证Route组件使用方式相同)
* 使用AuthRoute组件配置路由规则，验证能否实现页面的登录访问控制

### 5. 修改登录重新跳转
* 登录成功后，判断是否需要跳转到用户想要访问的页面(判断props.location.state是否有值)
* 如果不需要(没有值)，则直接调用history.go(-1)返回上一页
* 如果需要，就跳转到from.pathname指定的页面(推荐使用replace方法模式，而不是push)
# 2. 我的收藏模块
## 2.1 功能分析
业务：收藏房源
功能： 
* 检查房源是否收藏
* 收藏房源
## 2.2 检查房源是否收藏
* 在state中添加状态：isFavorite(表示是否收藏)，默认值为false
* 创建方法checkFavorite，在进入房源详情页面时调用该方法
* 先调用isAuth方法，来判断是否已登录
* 如果未登录，直接return，不在检查是否收藏
* 如果已登录，从路由参数中，获取到当前房屋id
* 使用API调用接口，查询该房源是否收藏
* 如果返回状态码为200，就更新isFavorite；否则，不做任何处理(token过期)
* 在页面结构中，通过状态isFavorite修改收藏按钮的文字和图片内容

## 2.3 收藏房源
1. 给收藏按钮绑定单击事件，创建方法handleFavorite作为事件处理程序
2. 调用isAuth方法，判断是否登录
3. 如果未登录，则使用Modal.alert提示用户是否去登录
4. 如果点击取消，则不做任何操作
5. 根据点击去登录，就去跳转到登录页面，同时传递state(登录后，在回到房源收藏页面)
6. 根据isFavorite判断，当前房源是否收藏
7. 如果未收藏，就调用添加收藏接口，添加收藏
8. 如果已收藏，就调用删除收藏接口，删除收藏
```
// push方法第二个参数未： state, 用于指定登录后要返回的页面
props.history.push('/login', {
  from: props.location
})
```
# 3. 发布房源模块
## 3.1 功能演示和介绍
* 功能： 获取房源的小区信息、房源图片的上传、房源发布等
## 3.2 模板改动说明
1. 修改首页(index) 去出租连接为： /rent/add
2. 修改公共组件NoHouse的children属性校验为：node(任何可以渲染的内容)
3. 修改公共组件HousePackage,添加onSelect属性的默认值
4. 添加utils/city.js，封装当前定位城市localStorage的操作
5. 创建了三个页面组件：Rent(已发布房源列表)、Rent/Add(发布房源)、Rent/Search(关键词搜索小区信息)
## 3.3 配置三个页面的路由规则
### 实现步骤
1. 在App.js中导入Rent已发布房源列表页面
2. 在App.js中导入AuthRoute组件
3. 使用AuthRoute组件，配置路由规则
4. 使用同样的方式，配置Rent/Add房源发布页面，Rent/Search关键词搜索小区信息页面
5. 给Rent组件的路由规则，添加exact属性(表示精确匹配模式)
## 3.4 关键词搜索小区信息
### 1. 实现思路
* 获取SearchBar搜索栏组件的值(searchTxt)
* 在搜索栏的change事件中，判断当前值是为空
* 如果为空，直接return，不做任何处理
* 如果不为空，就根据当前输入值以及当前的城市id,获取该关键词对应的小区信息
* 问题： 搜索栏中每输入一个值，就发送一次请求，如何解决？ (对服务器压力大、用户体验不好)
* 解决方式：使用定时器(setTimeout)延迟执行(关键词：JS文本框输入**防抖**)
```
// 先清除定时器
clearTimerout(this.timerId)
// 开启定时器，延迟500毫秒发送请求，如果输入间隔小于500毫秒，就不会发送请求
this.timerId = setTimeout(async () => {
  await API.get('url...')
}, 500)
```
### 2. 实现步骤
* 给SearchBar组件，添加onChange配置项，获取文本框的值
* 判断当前文本框的值是否为空
* 如果为空，清空列表，然后return,不在发送请求
* 如果不为空，使用API发送请求，获取小区数据
* 使用定时器setTimeout来延迟搜索，提升性能

### 3. 传递小区信息给发布房源页面
* 给搜索列表项添加单击事件
* 在事件处理程序中，调用history.replace()方法跳转到发布房源页面
* 将被点击的小区信息作为数据一起传递过去
* 在发布房源页面，判断history.loaction.state是否为空
* 如果为空，不做任何出路
* 如果不为空，则将小区信息存储到发布房源页面的状态中
## 3.5 发布房源
### 1. 页面结构分析
* List列表组件
* InputItem文本输入组件
* TextareaItem多行输入组件
* Picker选择器
* ImagePicker图片选择器
### 2. 获取房源数据分析
* InputItem、 TextareaItem、Picker组件，都使用onChange配置项，来获取当前值
* 处理方式：封装一个事件处理程序getValue来统一获取三种组件的值
```
// name 表示要更新的状态
// value表示当前输入或选中值
getValue = (name, value) => {
  this.setState({
    [name]: value
  })
}
```
### 3. 获取房源数据步骤
* 创建方法getValue作为三个组件的事件处理程序
* 该方法接收两个参数：
  * name当前状态名
  * value 当前输入值或选中值
* 分别给InputItem/TextareaItem/Picker组件，添加onChange配置项
* 分别调用getValue并传递name和value两个参数(注意：Picker组件中选中值为数组，而接口需要字符串，所以，索引号为0的值即可)

### 4. 获取房屋配置数据
* 给HousePackge组件，添加onSelect属性
* 在onSelect处理方法中，通过参数获取到当前选中项的值
* 根据发布房源接口的参数说明，将获取到的数组类型的选中值，转化为字符串类型
* 调用setState()更新状态

### 5. 房屋图片上传分析
* 根据房源发布接口，最终需要的是：房屋图片路径
* 两个步骤：
  1. 获取房屋图片
  2. 上传图片获取到图片路径(接口返回值)
* 如何获取房屋图片？ImagePicker图片选择器组件，通过onChange配置项来获取
* 如何上传房屋图片？根据图片上传接口，将图片转化成FormData数据后在上传，由接口返回图片路径

### 6. 获取房屋图片
* 给ImagePicker组件添加onChange配置项
* 通过onChange的参数，获取到上传的图片，并存储到状态tempSlides中

### 7. 上传房屋图片
* 给提交按钮，绑定单击事件
* 在事件处理程序中，判断是否有房屋图片
* 如果没有，不做任何处理
* 如果有，就创建FormData的实例对象(form)
* 遍历tempSlides数组，分别将每一个图片对象，添加到form中(键：file, 根据接口文档获得)
* 调用图片上传接口，传递form参数，并设置请求头Content-Type为multipart/form-data
* 通过接口返回值获取到图片的路径

### 8. 发布房源
* 在addHouse方法中，从state里面获取到所有房屋数据
* 使用API调用发布房源接口，传递所有房屋数据
* 根据接口返回值中的状态码，判断是否发布成功
* 如果状态码是200，表示发布成功，并跳转带已发布房源页面
* 否则，就提示：服务器偷懒了，请稍后在试~

# 4. 项目打包和优化
## 4.1 项目打包
* 打开creat-react-app脚手架文档中的部署
* 在根目录创建`.env.production`文件，配置生产环境的接口基础路径
* 在项目根目录打开终端
* 输入命令：npm run build,进行项目打包，生成build文件夹(打包好的文件夹)
* 将bulid目录中的文件内容，部署到服务器中即可
* 可以通过终端中的提示，使用server -s build 来本地查看(需要全局安装工具serve)