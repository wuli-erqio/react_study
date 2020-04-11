## 1.React组件介绍
> 特点：可复用， 独立， 可组合
## 2.React组件两种创建方式
### 2.1 使用函数创建组件
<font color=pink>例子：07-React函数创建组件</font>

* 函数组件：使用JS的函数(或箭头函数)创建的组件
* yue约定一： 函数名必须以<font color=red>大写字母开头</font>
* 约定二：函数组件<font color=red>必须有返回值</font>，表示该组件的结构
* 如果返回值为null,则不会渲染但必须有return
* 渲染函数组件：<font color=red>用函数名作为组件标签名</font>

```
function Hello() {
  return (
    <div>这是我的第一个函数组件</div>
  )
}
ReactDOM.render(<Hello />, root)
```

### 2.2 使用类创建组件
<font color=pink>例子：08-React类创建组件</font>

* 类组件：使用ES6的class创建的组件
* 约定一： 类名必须以<font color=red>大写字母开头</font>
* 约定二： 类组件应该继承<font color=red>React.Component</font>父类，从而可以使用父类中提供的方法或属性
* 约定三： 类组件必须提供<font color=red>render()</font>方法
* 约定四： render()方法<font color=red>必须有返回值</font>，表示该组件的结构

```
// 创建
class Hello extends React.Component {
  render() {
    return (
      <div>这是我的第一个类组件</div>
    )
  }
}
// 渲染
ReactDOM.render(<Hello />, document.getElementById('root'))
```

### 2.3 抽离为独立的JS文件
<font color=pink>例子：Hello.js + 09-抽离组件</font>

> 组件作为一个独立的个体，一般都会放到一个<font color=red>单独的JS文件中</font>

1. 创建Hello.js
2. 在Hello.js中导入React
3. 创建组件(函数 或 类)
4. 在hello.js中导出该组件
5. 在index.js中导入Hello组件
6. 渲染组件

## 3.React时事件处理
### 3.1 事件绑定
<font color=pink>例子：10-事件绑定</font>

* React事件绑定语法与DOM事件语法相似
* 语法：<font color=red>on+事件名称=(事件处理程序)</font>，比如：onClick={()=>{}}
* 注意：<font color=red>React事件采用**驼峰命名法**</font>，比如：onMouseEnter,onFocus

### 3.2 事件对象
<font color=pink>例子：11-事件对象</font>

* 可以通过<font color=red>事件处理程序的参数</font>获取事件对象
* React中的事件对象叫做：<font color=skyblue>合成事件</font>（对象）
* 合成事件：兼容所有浏览器，无需担心跨浏览器兼容性问题

## 4.有状态组件和无状态组件
* 函数组件又叫做<font color=red>无状态组件</font>，类组件又叫做<font color=red>有状态组件</font>
* 状态(state)即<font color=red>数据</font>
* 类组件有自己的状态，<font color=red>负责更新UI</font>,让页面动起来
## 5.组件中的state和setState()
### 5.1 state的基本使用
<font color=pink>例子：12-state的基本使用</font>

* 状态(state)即数据， 是组件内部的私有数据，只能在组件每部使用
* state的值是对象，表示一个组件可以有多个数据
* 获取状态值：<font color=red>this.state</font>

### 5.2 setState()修改状态
<font color=pink>例子：13-setState()修改状态</font>

* 状态是可变的
* 语法： this.setState({要修改的数据})
* 注意：<font color=red>不要直接修改state中的值，这是错误的</font>
* setState()作用： 1.<font color=red>修改state</font> 2.<font color=red>更新UI</font>
* 思想：<font color=red>数据驱动视图</font>

### 5.2 从JSX中抽离事件处理程序
<font color=pink>例子：14-从JSX中抽离事件处理程序</font>

* JSX中参杂过多js逻辑代码，会显得非常混乱
* 推荐：<font color=red>将逻辑抽离到单独的方法中</font> ，保证JSX结构清晰
* 存在this找不到问题

## 6.事件绑定this指向
* 事件处理函数直接使用普通函数会导致this为undefined
1. 箭头函数
<font color=pink>例子：15-箭头函数解决this问题</font>

* 利用箭头函数自身不绑定this的特点
* render()方法中this为组件实例可以获取setState()
2. Function.prototype.bind()
<font color=pink>例子：16-ES5绑定bind解决this问题</font>

* 利用ES5中的bind方法，将事件处理程序中的this与组件实例绑定到一起
3. <font color=red>class的实例方法</font> 
<font color=pink>例子：17-class的实例方法解决this问题</font>

* 利用箭头函数形式的class实例方法
* 注意：改语法是实验行语法，但是，由于babel的存在可以直接使用
### 总结
1. 推荐：<font color=red>使用class的实例方法</font>
## 7.表单处理
