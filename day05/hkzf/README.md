## 1.项目准备
### 1.1 项目搭建
#### 初始化项目
1. 初始化项目： npx create-react-app hkzf
2. 启动项目，根目录下： npm start
3. 项目整合结构src下：
```
assets           资源(图片，字体图标等)
components       多次复用的组件
pages            页面
utils            工具
App.js           根组件
index.js         项目入口文件
index.css        全局样式
```
### 1.2 组件库antd-mobile
#### 介绍和使用
1. 打开antd-mobile
2. 安装： npm install antd-mobile --save
3. 在App.js根组件中导入要使用的组件
4. 渲染组件
5. 在index.js中导入组件库样式

### 1.3 配置基础路由
#### 步骤
1. 安装： npm i react-router-dom
2. 导入路由组件： Router/Route/Link
3. 在pages文件夹中创建Home/index.js和CityList/index.js两个组件
4. 使用Route组件配置首页和城市选择页面

### 1.4 外观和样式的修改
#### 步骤
1. 修改页面标题： 在index.html中修改
2. 基础样式调整：在index.css中修改

## 2.项目整体布局
### 2.1 两种布局页面
#### 分析
1. 有tabbar的页面： 首页、找房、资讯、我的
2. 无tabbar的页面： 城市选择(简单不需要额外处理)
3. tabbar的菜单也可以实现路由切换，也就是在路由内部切换路由(切换路由)

### 2.2 嵌套路由
#### 说明
* 嵌套路由： 路由内部包含路由
* 用Home组件表示父路由的内容
* 用News组件表示子路由的内容
#### 使用步骤
1. 在pages文件夹中创建News/index.js组件
2. 在Home组件中，添加一个Route作为子路由(嵌套路由)的出口
3. 设置嵌套路由的path,格式以父路由path开头(父组件展示，子组件才会展示)
4. 修改pathname为/home/news,News组件的内容就会展示在Home组件中
### 2.3 实现Tabbar
#### 1.基本使用
1. 打开antd-mobile组件库中Tabbar组件
2. 选择App选项卡菜单，点击(</>)显示源码
3. 拷贝核心代码到Home组件中
4. 分析调整代码，让其在项目中运行起来
#### 2.修改Tabbar外观样式
1. 删除前边路由演示代码
2. 修改Tabbar菜单文字标题
3. 修改Tabbar菜单文字标题颜色
4. 使用字体图标，修改Tabbar菜单的图标
5. 修改Tabbar菜单项的图标大小
6. 调整Tabbar擦弹位置，让其固定在页面底部
#### 3.Tabbar配合路由使用
1. 根据Tabbar组件文档设置不渲染内容部分(只保留菜单项，不显示内容)
2. 给Tabbar.Item绑定事件
3. 在点击事件中调用history.push()实现路由
4. 创建Taabbar组件菜单项对应的其他三个组件，并在Home组件中配置路由信息
5. 给菜单想添加selected属性，设置当前匹配的菜单项高亮

#### 4.Tabbar代码重构
1. 提供菜单数据(包含菜单项特有的信息)
2. 使用map方法，遍历数据，渲染Tabbar.Item
3. 
4. 