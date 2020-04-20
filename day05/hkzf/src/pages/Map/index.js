import React from 'react'

// 导入封装好的NavHeader组件
import NavHeader from '../../components/NavHeader/index'
import axios from 'axios'
// 导入样式
import styles from './imdex.module.css'

const BMap = window.BMap
const labelStryle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
export default class Map extends React.Component {
  componentDidMount() {
    // 1. 获取当前定位城市
    // 2. 使用地址解析器解析当前城市坐标
    // 3. 调用centerAndZoon()方法在地图中展示当前城市，并设置缩放级别为11
    // 4. 在地图中添加比例尺和平移缩放控件
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    // 创建地图实例
    // 在React全局对象使用window
    const map = new BMap.Map("container")
    // 创建地址解析器实例     
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label, async point => {      
      if (point) {      
        map.centerAndZoom(point, 11);
        map.addControl(new BMap.NavigationControl());    
        map.addControl(new BMap.ScaleControl())

        /*
          1. 获取数据
          2. 遍历数据，创建覆盖类，给每个覆盖物添加唯一标识
          3. 给覆盖物添加点击事件
          4. 在单击事件中，获取到当前单击项的唯一标识
          5. 放大地图(级别为13)，调用clearOverlays()方法清除当前覆盖物
        */
        const res = await axios.get(`http://localhost:8080/area/map?id=${value}`)
        res.data.body.forEach(item => {
          // 为每一个数据创建覆盖物
          /*
            1. 调用Label的setContent()方法，传入HTML结构，修改HTML内容样式
            2. 调用setStyle()修改覆盖物样式
            3. 给文本覆盖物添加单击事件
          */
          const { count, label: areaName, coord: { longitude, latitude}, value}  = item
          const areaPoint = new BMap.Point(longitude, latitude)
          // 设置setContent之后，第一个参数失效，给空就行
          const label = new BMap.Label('', {
            position: areaPoint,
            offset: new BMap.Size(-30, -30)
          }) 
          label.id = value
          label.setContent(`
            <div class="${styles.bubble}">
              <p class="${styles.name}">${areaName}</p>
              <p>${count}套</p>
            </div>
          `)
          label.setStyle(labelStryle)
          // 单击事件
          label.addEventListener('click', () => {
            map.centerAndZoom(areaPoint, 13); // (坐标对象， 地图级别)
            // 除当前覆盖物, 百度地图自身报错解决，加定时器
            setTimeout(() => {
              map.clearOverlays()
            }, 0);
          })
          map.addOverlay(label)
        })
      }
    }, 
    label);
    // 设置中心点坐标
    // var point = new BMap.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    // map.centerAndZoom(point, 15); 
  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container" className={styles.container}>
        </div>
      </div>
    )
  }
}