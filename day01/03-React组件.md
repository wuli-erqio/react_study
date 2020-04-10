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

### 2.1 使用类创建组件
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
## 3.React时间处理
## 4.有状态组件和无状态组件
## 5.组件中的state和setState()
## 6.事件绑定this指向
## 7.表单处理
