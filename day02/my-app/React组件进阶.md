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

## 7.render-props和高阶组件
### 7.1 React组件复用概述
* 思考：如果两个组件中部分功能相似或者相同，如何处理？
* 处理方式： <font color=red>复用</font>相似的功能(联想函数封装)
* 复用什么？ 1. <font color=red>state</font> 2.<font color=red>操作state方法</font>(组件状态逻辑)
* 两种方式： 1. <font color=red>**render prop模式**</font> 2. <font color=red>高阶组件(HOC)</font>
* 注意：这两种方式<font color=red>不是新的API</font>,而是利用React自身特点的编码技巧，演化而成的固定模式(写法)
### 7.2 render prop模式
#### 思路分析
* 思路：将要复用是state和操作state的方法封装到一个组件
* 问题1： 如何拿到该组件中复用的state?
* 在使用组件时，添加一个值为<font color=red>函数的prop</font>，通过函数<font color=red>参数</font>来获取(需要组件内部实现)
* 问题2： 如何渲染任意的UI?
* 使用<font color=red>该函数的返回值</font>作为要渲染的UI内容(需要组件内部实现)
#### 使用步骤
<font color=pink>例子：15-render prop模式使用.js</font>

1. 创建Mouse组件，在组件中提供复用<font color=red>状态逻辑</font>代码(1. 状态， 2.操作状态的方法)
2. 将要<font color=red>复用的状态</font>作为props.render(<font color=red>state</font>)方法的参数，暴露到组件外部
3. 使用props.render()的<font color=red>返回值</font>作为要渲染的内容
#### children代替render属性
<font color=pink>例子：16-children代替render属性.js</font>

* 注意：并不是该模式叫做render props 就必须使用render的prop,实际上可以使用任意名称的prop
* 把prop是一个函数并且告诉组件要渲染什么内容的技术叫做： render prop模式
* 推荐： 使用<font color=red>children</font>代替render属性
#### 代码优化
<font color=pink>例子：17-代码优化.js</font>
1. 推荐：给render props模式添加props校验
2. 应该在组件卸载时解除mousemove事件绑定

### 7.3 高阶组件
#### 概述
* 目的：<font color=red>实现状态逻辑复用</font>
* 采用<font color=red>包装(装饰)模式</font>，比如说：手机壳
* 手机： 获取保护功能
* 手机壳： 提供保护功能
* 高阶组件就相当于手机壳，通过包装组件，增加组件功能
#### 思路分析
* <font color=red>高阶组件(HOC，Height-OrderComponent)是一个函数</font>，接收要包装的组件，返回增强后的组件
* 高阶组件内部创建一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态传递给被包装组件WrappedComponent
#### 使用步骤
<font color=pink>例子：18-高阶组件使用步骤.js</font>

1. 创建一个函数，名称约定<font color=red>以with开头</font>
2. 指定函数参数，参数名应该以大写字母开头(作为要渲染的组件)
3. 在函数内部创建一个类组件，<font color=red>提供复用的状态逻辑代码</font>，并返回
4. 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
5. 调用该高阶组件，传入要增强的组件，通过返回值拿到的增强后的组件，并将其渲染你到页面中
#### 设置displayName
<font color=pink>例子：19-高阶组件设置displayName.js</font>

* 使用高阶组件存在问题：得到两个组件名称相同
* 原因： 默认情况下，React使用组件名称作为displayName
* 解决方式: 为高阶组件设置displayName便于调试区分不同的组件
* displayName作用： 用于设置调试信息(React Developer Tool信息)
#### 传递props
* 问题： props丢失
* 原因： 高阶组件没有往下传递props
* 解决方式： 渲染WrappedComponent时，将state和this.props一起传递给组件
* 传递方式： 
`<WrappedComponent {...this.state} {this.props}/>`