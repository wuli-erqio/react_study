## 1.setState()说明
### 1.1 更新数据
<font color=pink>例子：01-异步更新.js</font>

* setState()是异步更新数据的
* 注意： 使用改语法时， 后面的setState()不要依赖于前面的setState()
* 可以多次调用setState(), 只会触发一次重新渲染
### 1.2 推荐语法
<font color=pink>例子：02-推荐语法.js</font>

* 推荐： 使用setState((state, props) => {})
* 参数state: 表示最新的state
* 参数props: 表示最新的props
### 1.3 第二个参数
<font color=pink>例子：03-第二个参数.js</font>

* 场景： 在状态更新(页面完成重新渲染)后立即执行某个操作
* 语法： setState(updater[,callback])
## 2.JSX语法转换
<font color=pink>例子：04-JSX语法转换.js</font>

* JSX仅仅是createElement()方法的语法糖(简化语法)
* JSX语法或被@babel/preset-react插件编译为createElement()方式
* React元素： 是一个对象，用来描述你希望在屏幕上看到的内容

## 3.组件更新机制
* setState()的两个作用： 1.修改state 2.更新组件(UI)
* 过程： 父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树(当前组件及其所有子组件)
## 4.组件性能优化
### 4.1 减轻state
* 减轻state: 只存储跟组件渲染相关的数据(比如：count/列表数据/loading等)
* 注意： 不用做渲染的数据不要放在state中， 比如定时器id等
* 对于这种需要在多个方法中用到的数据，应该放在this中
### 4.2 避免不必要的重新渲染
<font color=pink>例子：05-避免不必要的重新渲染.js</font>
* 组件更新机制： 父组件更新会引起子组件也被更新
* 问题： 子组件没有任何变化也会重新渲染
* 如何避免不必要的重新渲染？
* 解决方式： 使用钩子函数shouldComponentUpdate(nextProp, nextState)
* 作用： 通过返回值决定该组件是否重新渲染，返回true表示重新渲染，false表示不重新渲染
* 触发时机：更新阶段的钩子函数，组件重新渲染前执行(shouldComponentUpdate->render)
```
class Hello extends Component {
  shouldCompontentUpdate() {
    // 根据条件，决定是否重新渲染组件
    return false
  }
  render() {...}
}
```

### 4.3 避免不必要的重新渲染
<font color=pink>例子：06-随机数案例避免不必要的重新渲染(state).js</font>
<font color=pink>例子：07-随机数案例避免不必要的重新渲染(props).js</font>
* 案例： 随机数

### 4.4 纯组件
<font color=pink>例子：08-随机数案例避免不必要纯组件.js</font>

* 纯组件： PureComponent与React.Component功能相似
* 区别：PureComponent内部自动实现了shuldComponentUpdate钩子， 不需要手动比较
* 原理：纯组件内部通过区别对比，前后两次prop和state的值，来决定是否重新渲染组件
* 说明： 纯组件内部的对比是shallow compare(浅层对比)
* 对于值类型来说：比较两个值是否相同(直接赋值即可，没有坑)
* 对于引用类型：只比较对象的引用(地址)是否相同
* 注意：state或props中属性值为引用类型，应该创建新数据，不应该修改原数据
<font color=pink>例子：09-随机数案例避免不必要纯组件(引用类型).js</font>
```
// 正确创建引用类型数据
// 不要使用数组的push/unshift等直接修改当前数组的方法
// 而应该用concat或slice等这些返回新数组的方法
```

## 5.虚拟DOM和Diff算法
* React更新视图的思想：只要state变化就重新渲染视图
* 特点： 思路非常清晰
* 问题：组件中只有一个DOM元素需要更新时，也得把整个组件内容重新渲染到页面中？(不是)
* 理想状态：<font color=pink>部分更新</font>，只更新变化的地方
* 问题：React是如何做到部分更新的？ <font color=pink>虚拟DOM配合Diff算法</font>
> 虚拟DOM: 本质上就是一个JS对象，用来描述你希望在屏幕上看到的内容(UI)
```
// 虚拟DOM                                     // HTML结构
const elelment = {                             <h1 class="greeting">
  type: 'h1',                                    Hello JSX!
  props: {                        ====>>        </h1>
    className: 'greeting',
    children: 'Hello JSX!'
  }
}
```
#### 执行过程
1. 初次渲染时，React会根据初始state(Model),创建一个虚拟DOM对象(树)
2. 根据虚拟DOM生成真正的DOM，渲染到页面
3. 当数据变化后(setState()), 重新根据新的数据，创建新的虚拟DOM对象(树)
4. 与上次得到的虚拟DOM对象，使用Diff算法对比(找不同)，得到需要更新的内容。
5. 最终，React只将变化的内容更新(patch)到DOM中，重新渲染到页面。
#### 代码演示
* 组件render()调用后，根据状态和JSX结构生成虚拟DOM对象
* 实例中，只更新p元素的文本节点内容
```
{
  type: 'div',
  props: {
    children: [
      {type: "p", props: {children: '随机数'}}
      {type: "button", props: {children: 0}}
    ]
  }
}
// ...省略其他结构
      {type: "button", props: {children: 2}}
```
## 总结
1. 工作角度： 应用第一，原理第二
2. 原理有助于更好的理解React的自身运行机制
3. setstate()异步更新数据
4. 父组件更新导致子组件更新，纯组件提升性能
5. 思路清晰简单为前提，虚拟DOM和Diff保证效率
6. 虚拟DOM->state + JSX
7. 虚拟DOM的真正价值从来都不是性能