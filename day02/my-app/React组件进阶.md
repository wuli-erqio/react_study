# React进阶
## 1.组件通讯介绍
> 组件是独立且封闭的单元,默认情况下,只能使用组件自己的数据,在组件化过程中,我们将一个完整的功能拆分成多个组件,以更好的完成整个应用的功能,而在这个过程中,多个组件之间不可避免的要共享某些数据.为了实现这些功能,就需要打破组件的独立封闭性,让其与外界沟通,这个过程就是组件通讯

## 2.组件的props
<font color=pink>例子1：02-函数组件props.js</font>
<font color=pink>例子2：03-类组件props.js</font>
* 组件是封闭的,要接收外部的数据应该通过props来实现
* <font color=red>props的作用:接收传递给组件的数据</font>
* 传递数据:<font color=red>给组件标签添加属性</font>
* 接收参数: 函数组件通过<font color=red>参数props</font>接收数据,类组件通过<font color=red>this.props</font>接收数据

### 组件的props特点
1. 可以给组件传递任意类型的数据
2. <font color=red>props是只读的对象</font>,只能读取属性的值,无法修改对象
3. 注意: 使用类组件时,如果写了构造函数,<font color=skyblue>应改props传递给super()</font>, 否则,无法在构造函数中获取到props!

## 3.组件通讯的三种方式
### 3.1 父组件传递数据给子组件
<font color=pink>例子：04-父传子.js</font>

1. 父组件提供要传递的state数据
2. 给子组件标签添加属性,值为state
3. 子组件中通过props接收父组件传递的数据
### 3.2 子组件传递数据给父组件
<font color=pink>例子：05-子传父.js</font>

> 思路1: 利用回调函数,父组件提供回调,子组件调用,将要传递的数据作为回调函数的参数
1. 父组件提供一个回调函数(用于接收数据)
2. 将该函数作为属性的值,传递给子组件
3. 子组件通过props调用回调函数
4. 将子组件的数据作为参数传递给回调函数
> 注意: 回调函数中this的指向问题
### 3.3 兄弟组件
<font color=pink>例子：06-兄弟组件.js</font>

* 将<font color=skyblue>共享状态</font>提升到最近的公共父组件中,由<font color=skyblue>公共父组件</font>管理这个状态</font>
* 思想: <font color=red>状态提升</font>
* 公共父组件职责: 1. 提供共享状态 2. 提供操纵共享状态的方法
* 要通讯的子组件只需要通过<font color=red>props</font>接收状态或操作状态的方式

## 4.Context
<font color=pink>例子：07-context基本使用.js</font>
> 思考: App组件要传递数据给Child组件,如何如理
* 处理方式: 使用props一层层往下传递(繁琐)
* 更好的方法: 使用Context
* <font color=red>作用: 跨组件传递数据</font>(比如:主题,语言等)
#### 使用步骤
1. 调用React.createContext()创建Provider(提供数据)和Consumer(消费数据)两个组件
2. 使用Provider组件作为父节点
3. 设置value属性,表示要传递的数据
4. 调用Consumer组件接收数据
#### 总结
1. 如果两个组件时远方亲戚(比如:嵌套多层)可以使用Context实现组件通讯
2. Context提供了两个组件: Provider和Consumer
3. Provider组件: 用来提供数据
4. Consumer组件: 用来消费数据

## 5.props深入
### 5.1 children属性
<font color=pink>例子：08-children属性.js</font>

* children属性: 表示组件标签的子节点,当组件标签有了节点时, props就会有改属性
* children属性与普通的props一样,值可以是任意值(文本.React元素.组件.甚至是函数)

### 5.2 props校验
* 对于组件来说, props是外来的,无法保证组件使用者传入什么格式的数据
* 如果传入的数据格式不对,可能会导致组件内部报错
* 关键问题: 组件的使用者不知道明确的错误原因
* 解决: props校验: 允许在创建组件的时候,指定props的类型,格式
* 作用: 捕获使用组件时因为props导致的错误,给组件明确的错误提示,增加组件的健壮性
#### 使用步骤
<font color=pink>例子：09-props校验基础.js</font>

1. 安装prop-types(yarn add prop-types / npm i prop-types)
2. 导入prop-types包
3. 使用<font color=red>组件名propTypes = {}</font> 来给组件的propt添加校验规则
4. 校验规则通过propTypes对象来指定
#### 约束规则
<font color=pink>例子：10-props常见校验.js</font>
1. 常见类型: array, bool, func, number, object, string
2. React元素类型: element
3. 必填项: isRequired
4. 特定结构的对象: shape({})

### 5.2 props的默认值
<font color=pink>例子：11-props的默认值.js</font>

* 场景: 分页组件 -> 每页显示条数
* 作用: 给props设置默认值,在未传入props时生效
## 6.组件的生命周期
### 6.1 组件的生命周期的概述
* 意义：组件的生命周期有助于理解组件的运行方式，完成更复杂的组件功能，分析组件错误原因
* <font color=red>组件生命周期</font>： 组件从创建到挂载到页面中运行，再到组件不用时卸载的过程
* 生命周期的每个阶段总伴随者一些方法调用，这些方法就是生命周期的<font color=red>钩子函数</font>
* 钩子函数的作用：为开发人员在不同阶段操作组件提供了时机
* <font color=red>只有类组件才有生命周期</font>
### 6.2 生命周期的三个阶段
1. 创建时(挂载阶段)
<font color=pink>例子：12-生命周期创建阶段.js</font>

* 执行时机： 组件创建时(页面加载时)
* 执行顺序
> constructor()  ---->   render()   ---->   componentDidMount()
1. constructor: 创建组件时最先触发，作用：1.初始化state  2.为事件处理程序绑定this
2. render: 每次组件渲染都会触发， 作用：渲染UI(注意：不能调用setState)
3. componentDidMount:组件挂在(完成DOM渲染)后，1.发送网络请求  2.DOM操作

2. 更新时(更新阶段)
<font color=pink>例子：13-生命周期更新阶段.js</font>

* 执行顺序
> render()   ---->   componentDidMount()
1. render: 每次组件渲染都会触发， 作用：渲染UI(注意：不能调用setState)
2. componentDidUpdate: 组件更新(完成DOM渲染)后， 作用： 1.发送网络请求  2.DOM操作 注意：如果要setState()必须放在一个if条件中
* 执行时机： 1. setState() 2. forceUpdate() 3. 组件接收到新的props
* 说明： 以上三种任意一种变化，组件就会重新渲染
3. 卸载时(卸载阶段)
<font color=pink>例子：14-生命周期卸载阶段.js</font>

* 执行时机： 组件从页面中消失
1. componentWillUnmount 触发时机：组件卸载(从页面中消失)， 作用： 执行清理工作(比如：清理定时器等)
