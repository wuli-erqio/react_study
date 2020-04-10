# 1.JSX的基本使用
### 1.1JSX的简介
> <font color=red>JSX</font>是<font color=red>javaScript XML</font>的简写，表示在javaScript代码中写XML(HTML)格式的代码
### 1.2使用步骤
> 1.使用JSX语法创建react元素<br><font color=pink>例子：01-JSX的基本使用</font>
```
const title = <h1>Hello JSX</h1>
``` 
> 2.使用ReactDOM.render()方法渲染react元素到页面中
```
ReactDOM.render(title, document.getElementById('root'))
```
> 注意:<br>1.JSX不是标准的ECMAScript语法<br>2.需要babel编译后，才能在浏览器环境中使用<br>3.create-react-app脚手架中已经有该配置
### 1.3注意点
<font color=pink>例子：02-JSX的注意点</font>

> 1.React元素的属性名使用驼峰命名法<br>2.特殊属性名：class -> <font color=red>className</font> 、 for -> htmlFor 、 tabindex -> tabIndex<br>3.没有子节点的React元素可以用/>结束<br>4.推荐：使用小括号包裹JSX,从而避免JS中自动插入分号陷阱

`const title = (<h1 className="title">Hello JSX</h1>)`
# 2.JSX中使用JavaScript表达式
<font color=pink>例子：03-JSX表达式</font>
## 嵌入JS表达式
* 数据存储在JS中
* 语法：<font color=red>{JavaScript表达式}</font>
* 注意：使用{}单花括号
```
const name = 'Jack'
const dv = (
  <div>你好，我叫？？</div>
)
```
```
const name = 'Jack'
const dv = (
  <div>你好，我叫{name}</div>
)
```
## 注意点
* <font class=red>单花括号</font>中可以使用任意的JavaScript表达式
* JSX自身也是JS表达式
```
const h1 = <h1>我是JSX</h1>
const dv = (
  <div>嵌入表达式: {h1}</div>
)
```
* 注意：JS中的对象也是一个例外，一般只会出现在style属性中
* 注意： <font color=red>不能在{}中出现语句</font>{比如：if/for等}

# 3.JSX的条件渲染
<font color=pink>例子：04-JSX条件渲染</font>
* 场景： loading效果
* 条件渲染：根据条件渲染特定的JSX结构
* 可以使用<font color=red>if/else</font>或<font color=red>三元运算符</font>或<font color=red>逻辑与运算符来实现</font>

# JSX的列表渲染
<font color=pink>例子：05-JSX列表渲染</font>
* 如果要渲染一组数据，应该使用数组<font color=red>map()</font>方法
* 注意：渲染列表时应该添加key属性，key属性的值要保证唯一
* 原则：map()遍历谁，就给谁添加key属性
* 注意：<font color=red>尽量避免使用索引号作为key</font>
```
const songs = [
  {id: 1, name: '痴心绝对'}，
  {id: 2, name: '向我这样的人'}，
  {id: 3, name: '南山南'}
]

const list = (
  <ul>
    { songs.map(item => <li key={item.id}>{item.name}</li>) }
  </ul>
)
```

# JSX的样式处理
<font color=pink>例子：06-JSX样式处理</font>
### 1.行内样式----style
```
  <h1 style={{color: 'red', background: 'skyblue'}}>
    JSX样式处理
  </h1>
```
### 2.类名 ----- className(推荐)
```
  <h1 className="title">
    JSX样式处理
  </h1>
```