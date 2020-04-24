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

### 1.6 axios优化和环境变量
#### 问题分析
1. 在使用axios发送请求的时候，接口地址每次都要写http://localhost:8080,太频繁了。
2. 接口域名、图片域名，分开为开发环境和生产环境，直接卸载代码中，项目发布时，很难替换。
#### 1. 使用环境变量
1. 在项目的根目录创建文件 .env.development
2. 在该文件中添加环境变量RAECT_APP_URL(注意：环境变量约定以RAECT_APP_开头)
3. 设置RAECT_APP_URL的值为： http://localhost:8008
4. 重启脚手架
5. 在utils/url.js文件中，创建BASE_URL变量，设置其值为process.env.RAECT_APP_URL
6. 导出BASE_URL
7. 使用BASE_URL修改图片
#### 2. axios优化和环境变量
1. 在utils/api.js文件中，导入axios和BASE_URL
2. 调用axios.create()方法创建一个axios实例
3. 给create() 方法，添加配置baseURL,值为：BASE_URL
4. 导出API对象
5. 导入API,使用API代替axios,去掉接口地址的http://localhost:8080
## 2. 列表找房模块
#### 2.1 功能分析
业务： 根据查询条件筛选房源列表 
功能：
* 搜索导航栏组件封装
* 条件筛选栏组件封装
* 条件筛选栏筛选功能
* 房屋列表
#### 2.2 顶部搜索导航栏
1. 封装首页搜索导航栏
  1. 在components目录中创建SearchHeader/index.js
  2. 在该组件中，复用首页中已经实现的结构、样式来封装组件
2. 实现找房页面搜索导航栏
  1. 在找房页面SearchHeader组件基础上，调整结构(添加返回值icon等)
  2. 给SerachHeader组件传递className属性，来调整组件样式，让其适应找房页面效果
#### 2.3 条件筛选栏组件
##### 1. 组件结构分析
* 父组件： Filter
* 子组件： FilterTitle标题菜单组件
* 子组件： FilterPicker前三个菜单对应的内容组件
* 子组件： FilterMore最后一个菜单对应的内容组件
* FilterPicker内容组件， 使用antd-mobile组件库的PickerView选择器组件
* <></> 语法是`<React.Fragment>`的简化语法，作用：不添加额外元素的情况下，返回多个节点
```
<React.Fragment>
  <span>111</span><h1>标题</h1>
</React.Fragment>
// 简化语法
<>
  <span>111</span><h1>标题</h1>
</>
```
##### 2. 功能分析
  * 点击FilterTitle组件菜单， 展开该条件晒寻对话框，被点击的标题高亮
  * 点击取消按钮或者空白区域，隐藏对话框，取消标题高亮
  * 选择筛选条件后，点击确定按钮，隐藏对话框，当前标题高亮
  * 打开对话框时，如果已经选择了筛选条件，就默认选中已选择的条件
  * 对话框的展示与隐藏都有动画效果
  * 吸顶功能
  * 注意： Filter组件不仅要实现自身功能，还要提供获取房源列表数据是筛选条件
#### 2.4 Filter 组件
##### 实现思路
* 功能一：根据标题菜单数据，渲染标题列表
* 功能二：标题可以点击(绑定事件)
* 功能三：标题高亮
* 标题高亮：
  1. 点击时
  2. 有筛选条件时
* 标题高亮状态： 提升至父组件Filter中(状态提升), 有父组件提供高亮状态，子组件通过prop接受状态来实现高亮
* 原则： 单一数据源，也就是说，状态只应该有一个组件提供并提供操作状态的方法，其他组件直接使用该组件中的状态和操作的方法即可
##### 实现步骤
* 通过props接收，高亮状态对象titleSelectStatus.
* 遍历titleList数组，渲染标题列表
* 判断高亮对象中当前标题是否高亮，如果是，就添加高亮类
* 给标题项绑定单击事件，在事件中调用父组件传过来的方法onClick
* 将当前标题type，通过onClick的参数，传递给父组件
* 父组件中接收到当前type,修改该标题的选中状态为true
#### 2.5 FilterPicker 组件
##### 实现思路
* 功能一：点击前三个标题展示该组件， 点击取消按钮或者空白区域隐藏该组件
* 功能二：使用PickerView组件展示筛选条件的数据
* 功能三：获取到PickerView组件中，选中的套件值
* 功能四：点击确定按钮，隐藏该组件，将获取到筛选条件值传递给父组件
* 展示或隐藏对话框的状态：有父组件提供(状态提升)，通过props传递给子组件
* 筛选条件数据： 有父组件提供(因为所有筛选条件是通过一个接口来获取的)，通过props传递给子组件
##### 1. 控制组件的展示与隐藏
* 在Filter组件中，提供组件展示或隐藏状态：openType(表示展示的对话框类型)
* 在render中判断openType值为area/mode/price时，就展示FilterPicker组件，以及遮罩层。
* 在onTitleClick方法中，修改状态openType为当前type，展示对话框
* 在Filter组件中，提供onCancel方法(作为取消和遮罩层的事件处理程序)
* 在onCancel方法中，修改状态openType为空，隐藏对话框
* 将onCancel通过props传递给FilterPicker组件，在取消按钮的单击事件中调用该方法
* 在Filter组件中，提供onSave方法， 作为确定按钮的事件处理程序，逻辑同上
##### 2. 获取当前筛选条件的数据
* 在Filter组件中，发送请求，获取所有筛选条件数据
* 将数据保存为状态： filterData
* 封装方法renderFilterPicker来渲染FilterPicker组件
* 在方法中，根据openType的类型，从filtersData中获取到需要的数据
* 将数据通过props传递给FilterPicker组件
* FilterPicker组件接收到数据后，将其作为PickerView组件的data(数据源)
##### 3. 获取选中值
* 在FilterPicker组件中，添加状态value(用于PickerView 组件的选中值)
* 给PickerView组件添加配置项onChange，通过参数获取到选中值，并更新状态value
* 在确定按钮的事件处理程序中，将type和value作为参数传递给父组件
##### 4. 设置默认选中值
* 在Filter组件中，提供选中值状态： selectValues
* 根据openType获取当前类型的选中值(defaultValue),通过props传递FilterPicker组件
* 在FilterPicker组件中，将defaultValue设种子为状态value的默认值
* 在点击确定按钮后，在父组件中更新当前type对用的selectedValues状态值
##### 5. 设置默认选中值问题
* 问题： 在前面三个标题之间来回切换时，默认选中值不生效，当点击确定，重新打开FilterPicker组件时，才会生效
* 分析：两种操作方式区别在于有没有重新创建FilterPicker组件，重新创建FilterPicker组件时，会生效；不重新创建FilterPicker组件时，不会生效
* 原因： 不重新创建FilterPicker组件时，不会再次执行state初始化，也就那不到最新的props
* 解决方式： 给FilterPicker组件添加key值为openType，这样，在不同标题之间切换时，key值都不相同，React内部会在key不同时，重新创建该组件
#### 2.6 完善FilterTitle 高亮功能
##### 1. 实现思路
* 点击标题时，遍历标题高亮数据
* 如果是当前标题，直接设置为高亮
* 分别判断每个标题对应的筛选条件有没有选中值(判断每个筛选条件的选中值与默认值是否相同，相同表示没有选中值；不同，表示选中了值)
* 如果有，就让改标题保持高亮
* 如果没有，就让改标题去掉高亮
##### 2. 实现步骤
* 在标题点击事件onTitleClick方法中，获取到两个状态：标题选中状态对象和筛选条件的选中对象
* 根据当前标题选中状态对象，获取到一个新的标题选中状态对象(newTitleSelectedStatus)
* 使用Object.keys()方法，遍历标题选中状态对象
* 先判断是否为当前标题，如果是，直接让该标题选中状态为true(高亮)
* 否则，分别判断每个标题的选中值是否与默认值相同
* 如果不同，则设置该标题的选中状态为true
* 如果相同，则设置该标题的选中值状态为false
* 更新状态titleSelectedStatus的值为：newTitleSelectedStatus
#### 2.7 FilterMore组件
##### 1. 渲染组件数据
* 封装renderFilterMore方法，渲染FilterMore组件
* 从FilterData中，获取数据(roomType,oriented,floor,characteristic),通过props传递给FilterMore组件
* FilterMore组件中，通过props获取到数据，分别将数据传递给renderFilters方法
* 在renderFilters方法中，通过参数接受数据，遍历数据，渲染标签
##### 2. 获取选中值以及设置高度
* 在state中添加状态selectedValues(表示选中项的值)
* 给标签绑定单击事件，通过参数获取到当前项的value
* 判断selectedValues中是否包含当前项的value值
* 如果不包含，就将当前项的value添加到selectedValues数组中
* 如果包含，就从selectedValues数组中移除(使用数组的splice方法，根据索引号删除)
* 在渲染标签时，判断selectedValues数组中，是否包含当前项的value, 包含，就添加高亮类
##### 3. 清除和确定按钮的逻辑处理
* 设置FilterFooter组件的取消按钮文字为：清除
* 点击取消按钮时，清空所有选中的值(selectedValues[])
* 点击确定按钮时，将当前选中的值和type,传递给Filter父组件
* 在Filter组件中的onSave方法中，接收传递过来的选中值，更新状态selectedValues
##### 4. 设置默认选中值
* 在渲染FilterMore组件时，从selectedValues中，获取到当前选中值more
* 通过props将选中值传递给FilterMore组件
* 在FilterMore组件中，将后渠道的选中值，设置为子组件状态的selectedValues的默认值
* 给遮罩层绑定单击事件
* 在单击事件中，调用父组件的方法onCancel关闭FilterMore组件
#### 2.8 完成FilterTitle高亮功能
##### 步骤
* 在Filter组件的onTitleClick方法中，添加type为more的判断条件
* 当选中的数值长度不为0时，表示FilterMore组件中有选择项，此时，设置选中状态高亮
* 在点击确定按钮时，根据参数type和value，判断当前菜单是否高亮
* 在关闭对话框时(onCancel)，根据type和当前type的选中值，判断当前菜单是否高亮