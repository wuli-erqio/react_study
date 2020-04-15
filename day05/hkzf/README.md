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