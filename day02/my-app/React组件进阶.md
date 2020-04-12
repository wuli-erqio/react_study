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
* 将<font color=skyblue>共享状态</font>提升到最近的公共父组件中,由<font color=skyblue>公共父组件</font>管理这个状态</font>
* 思想: <font color=red>状态提升
* 公共父组件职责: 1. 提供共享状态 2. 提供操纵共享状态的方法
* 要通讯的子组件只需要通过<font color=red>props</font>接收状态或操作状态的方式
## 4.
## 5.
## 5.