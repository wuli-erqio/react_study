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
## 5.组件中的state和setState()
## 6.事件绑定this指向
## 7.表单处理

