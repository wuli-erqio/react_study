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
## 4.
## 5.
## 5.