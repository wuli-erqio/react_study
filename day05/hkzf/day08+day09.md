## 1. 地图找房模块
### 1.1 功能分析
业务： 使用百度地图API实现地图找房
功能： 
* 展示当前定位城市
* 展示该城市所有区的房源数据
* 展示某区下所有镇的房源数据
* 展示某镇下所有小区的房源数据
* 展示某小区下的的房源数据列表
### 1.2 顶部导航栏
#### 步骤： 
1. 封装NavHeader组件实现城市选择，地图找房页面的复用
2. 在components目录中创建组件NavHeader/index.js
3. 在该组件中封装and-mobile组件库中的NavBar组件
4. 在地图找房页面使用封装好的NavHeader组件实现顶部导航功能
5. 使用NavHeader组件，替换城市选择页面的NavBar组件
#### 添加props校验
1. 安装: npm i prop-types
2. 导入PropTypes
3. 给NavHeader组件的children和onLeftClick属性添加props校验
### 1.3 组件间样式覆盖问题
#### 1. 概述
* 问题: CityList组件的样式,会影响Map组件的样式
* 原因: 在配置路由时,CityList和Map组件都被导入到项目中,那么组件的样式也就被导入到项目中了,从而造成组件之间样式互相覆盖的问题
* 结论: 默认,只要导入了组件,不管组件有没有显示在页面中,组件的样式就会生效
* 如何解决
  * 手动处理(起不同的类名)
  * CSS IN JS
#### 2. CSS IN JS
* CSS IN JS: 是使用JavaScript编写CSS的同城,用来解决CSS样式冲突,覆盖等问题
* CSS IN JS的具体实现有50多种,比如CSS Modules,style-compontents等
* 推荐使用: CSS Modules(React脚手架已集成,可以直接使用)
#### 3. CSS Modules的说明
* CSS Modules通过对css类名重命名,保证每个类名的唯一性,从而避免样式冲突的问题
* 换句话说: 所有的类名都具有'局部作用域',只在当前组件内部生效
* 实现方式: webpack 的 css loader
* 命名采用: BEM(Block块, Element元素, Modifier三部分组成)命名规范, 比如: list_item_active
* 在React脚手架中演化成: 文件名,类名,hash(随机)三部分,只需要指定类名即可
#### 4. CSS Modules在项目中的使用
1. 创建名为[name].modile.css的样式文件(React脚手架中的约定,与普通css做区分)
2. 组件中导入该样式文件
3. 通过styles对象访问对象中的样式名设置样式
#### 5. CSS Modules修改NavHeader的样式
1. 在NavHeader目录中创建名为index.module.css的样式文件
2. 在样式文件中修改当前组件的样式(使用单个类名设置样式,不适用嵌套样式)
3. 对于组件库中已经有的全局样式(比如: am-navbar-title), 需要使用:glibal()来指定
```
:global(.am-navbar-title) { color: #333; }
.root :global(.am-navbar-title) { color: #333; }

```
### 1.4 根据定位展示当前城市
#### 步骤
1. 获取当前定位城市
2. 使用地址解析器解析当前城市坐标
3. 调用centerAndZoon()方法在地图中展示当前城市，并设置缩放级别为11
4. 在地图中添加比例尺和平移缩放控件
### 1.5 创建文本覆盖物
#### 1. 实现步骤
* 打开百度地图添加文字标签DEMO
* 创建label实例对象
* 调用setStyle()方法设置样式
* 在map对象上调用addOverlay()方法，将文本覆盖物添加到地图中
```
 const opts = {
          position: point,
          // offset: new BMap.Size(30, -30)
        }
        const label = new BMap.Label('覆盖物', opts)
        label.setStyle({
          color: 'green'
        })
        map.addOverlay(label)
```
#### 2. 绘制房源覆盖物
1. 调用Label的setContent()方法，传入HTML结构，修改HTML内容样式
2. 调用setStyle()修改覆盖物样式
3. 给文本覆盖物添加单击事件
```
label.setContent(`
  <div class="${styles.bubble}">
    <p class="${styles.name}">${areaName}</p>
    <p>${count}套</p>
   </div>
   `)
  label.setStyle(labelStryle)
   label.addEventListener('click', () => {
    // (坐标对象， 地图级别)
    map.centerAndZoom(areaPoint, 13);
    // 除当前覆盖物, 百度地图自身报错解决，加定时器
    setTimeout(() => {
       map.clearOverlays()
     }, 0);
   })
```
### 1.6 地图找房
#### 1. 功能分析
* 获取房源数据，渲染覆盖物
* 单击覆盖物后： 1 放大地图 2.获取数据，渲染下一级覆盖物(重复第一步)
* 区，镇：单击事件中，清除现有覆盖物，创建新的覆盖物
* 小区： 不清除覆盖物， 移动地图，展示该小区下面的房源列表
#### 2. 渲染所有区的房源覆盖物
1. 获取数据
2. 遍历数据，创建覆盖类，给每个覆盖物添加唯一标识
3. 给覆盖物添加点击事件
4. 在单击事件中，获取到当前单击项的唯一标识
5. 放大地图(级别为13)，调用clearOverlays()方法清除当前覆盖物
```
const res = await axios.get(`http://localhost:8080/area/map?id=${value}`)
res.data.body.forEach(item => {
  const { count, label: areaName, coord: { longitude, latitude }, value } = item
  const areaPoint = new BMap.Point(longitude, latitude)
  // 设置setContent之后，第一个参数失效，给空就行
  const label = new BMap.Label('', {
  position: areaPoint,
  offset: new BMap.Size(-30, -30)
  })
  label.id = value
  // ... (1.5 - 2)
})
```
#### 3. 封装流程
1. renderOverlays()作为入口： (1)接收区域id参数，获取该区域下的房源 (2) 获取覆盖率为i行以及下级地图缩放级别
2. createOverlays() 方法：根据传入的类型，调用对应的方法，创建覆盖物
3. createCircle() || createRect()方法： 根据传入的数据创建覆盖物，绑定事件(放大地图、清除覆盖物、渲染下一级房源数据)
#### 4. renderOverlays()
1. 接收区域id参数，根据该参数获取房源数据
2. 调用getTypeAndZoom方法获取地图缩放级别、覆盖物类别(根据缩放等级来得到)
#### 5. createOverlays()
* 根据传入的类型等数据，调用相应的常见覆盖物，并提供参数
#### 6. createCircle()
* 复用之前创建的覆盖物的代码逻辑
* 在覆盖之前的单击事件中，调用renderOverlays(id) 方法，重新渲染该区域的房屋数据
#### 7. createRect()
* 创建Label、设置样式、设置HTML内容，绑定单击事件
* 在单击事件中，渲染该小区的房屋数据
* 展示房源列表
* 渲染获取到的房源数据
* 调用地图panBy()方法， 移动到地图中间的位置
* 监听地图movestart事件， 在地图移动时隐藏房源列表
## 2. 列表找房模块
#### 2.1 功能分析
业务： 根据查询条件筛选房源列表
功能：
* 搜索导航栏组件封装
* 条件筛选栏组件封装
* 条件筛选栏筛选功能
* 房屋列表
## 3. 地图找房模块