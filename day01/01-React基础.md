# 1.React概述
### 1.1 React是什么
> 1.&nbsp;React是一个用于<font color=red>构建用户界面</font>的<font color=red>javascript库</font><br>2.&nbsp;React主要用来写前端HTML页面，或者<font color=red>构建Web页面</font><br>3.&nbsp;只负责视图层(V)
### 1.2 React的特点
> 1.&nbsp;**声明式**<br>react只负责渲染UI,并在数据变化时更新UI<br>2.&nbsp;**基于组件**<br>3.&nbsp;学习一次，随处使用

# 2.React的基本使用
### 2.1 React的安装
> 安装命令： <font color=red>npm i react react-dom</font><br>react提供创建元素。组件等功能<br>react-dom提供DOM相关功能等

### 2.1 React的使用
#### 1. 引用
```
<script src="./node_modules/react/umd/react.development.js"></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js"><script> 
```
#### 2.创建元素
> 第一个参数: 元素名称<br>第二个参数：元素属性,如果没有属性，写null,有属性写成对象，内部是键值对<br>第 3~N 个参数：元素内容 
```
const title = React.createElement('h2', null, '我是段落标签')
```
#### 3.渲染React元素到页面
>第一个参数: 要渲染的元素或者组件<br>第二个参数：BODM对象,指定渲染的到页面的位置
```
ReactDOM.render(title, document.querySelector('#root'))
```
#### 方法说明
```
React.createElement()方法繁琐
 const title = React.createElement('h2', {
      id: 'box',
      title: '标题'
    }, '我是段落标签', React.createElement('p', null, '我是p标签'))
ReactDOM.render()渲染
```
# 3.React脚手架的应用
### 3.1 使用React脚手架初始化项目
> 初始化项目，命令： <font color=red>npx create-react-app my-app</font>
### 在脚手架中使用React
> 1.导入react和react-dom两个包<br>import React from 'react'<br>import ReactDOM from 'react-dom'<br>2.调用<font color=skyblue>React.createElement()</font>方法创建react元素<br>3.调用<font color=red>ReactDOM.render()</font>方法渲染react元素到页面中
