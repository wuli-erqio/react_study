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
## 2. 地图找房模块
## 3. 地图找房模块