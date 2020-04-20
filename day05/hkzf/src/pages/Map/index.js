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
    this.initMap()
  }
  // 初始化地图
  initMap() {
    // 1. 获取当前定位城市
    // 2. 使用地址解析器解析当前城市坐标
    // 3. 调用centerAndZoon()方法在地图中展示当前城市，并设置缩放级别为11
    // 4. 在地图中添加比例尺和平移缩放控件
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    // 创建地图实例
    // 在React全局对象使用window
    const map = new BMap.Map("container")
    // 作用： 能够在其他方法中通过this来获取地图对象
    this.map = map
    // 创建地址解析器实例     
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label, async point => {
      if (point) {
        map.centerAndZoom(point, 11);
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl())
        // 调用renderOverLays()
        this.renderOverlays(value)
        /*
          1. 获取数据
          2. 遍历数据，创建覆盖类，给每个覆盖物添加唯一标识
          3. 给覆盖物添加点击事件
          4. 在单击事件中，获取到当前单击项的唯一标识
          5. 放大地图(级别为13)，调用clearOverlays()方法清除当前覆盖物
        */
        // const res = await axios.get(`http://localhost:8080/area/map?id=${value}`)
        // res.data.body.forEach(item => {
          // 为每一个数据创建覆盖物
          /*
            1. 调用Label的setContent()方法，传入HTML结构，修改HTML内容样式
            2. 调用setStyle()修改覆盖物样式
            3. 给文本覆盖物添加单击事件
          */
          // const { count, label: areaName, coord: { longitude, latitude }, value } = item
          // const areaPoint = new BMap.Point(longitude, latitude)
          // 设置setContent之后，第一个参数失效，给空就行
          // const label = new BMap.Label('', {
          //   position: areaPoint,
          //   offset: new BMap.Size(-30, -30)
          // })
          // label.id = value
          // 创建覆盖物
          // label.setContent(`
          //   <div class="${styles.bubble}">
          //     <p class="${styles.name}">${areaName}</p>
          //     <p>${count}套</p>
          //   </div>
          // `)
          // label.setStyle(labelStryle)
          // 单击事件
          // label.addEventListener('click', () => {
            // map.centerAndZoom(areaPoint, 13); // (坐标对象， 地图级别)
            // 除当前覆盖物, 百度地图自身报错解决，加定时器
            // setTimeout(() => {
            //   map.clearOverlays()
            // }, 0);
          // })
          // map.addOverlay(label)
        // })
    //   }
    // },
    //   label);
    // 设置中心点坐标
    // var point = new BMap.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    // map.centerAndZoom(point, 15); 
  }
  // renderOverlays()渲染覆盖物入口： 
  // (1)接收区域id参数，获取该区域下的房源 
  // (2) 获取覆盖率为i行以及下级地图缩放级别
  async renderOverlays(id) {
    const res = await axios.get(`http://localhost:8080/area/map?id=${id}`)
    const data = res.data.body
    // 调用getTypeAndZoom方法获取级别和类型
    const { nextZoom, type } = this.getTypeAndZoom()
    data.forEach(item => {
      // 创建覆盖物
      this.createOverlays(item, nextZoom, type)
    })
  }
  getTypeAndZoom() {
    // 调用地图的getZoom()方法，来获取当前缩放等级
    // 区 => 11     范围： >=10 <12
    // 镇 => 13     范围： >=12 <14
    // 小区 => 15   范围： >=14 <16
    const zoom = this.map.getZoom()
    let type, nextZoom
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13
      // circle 表示绘制圆形覆盖物(区，镇)
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      // 下一个缩放级别
      nextZoom = 15
      // circle 表示绘制圆形覆盖物(区，镇)
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      type = 'rect'
    }
    return {
      nextZoom,
      type
    }
  }
  // 中转的方法
  createOverlays(data, zoom, type) {
    const {
      count,
      label: areaName,
      coord: { longitude, latitude },
      value
    } = data
    const areaPoint = new BMap.Point(longitude, latitude)
    if (type === 'circle') {
      // 区镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    } else {
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }
  }
  createCircle(point, name, count, id, zoom) {
    const label = new BMap.Label('', {
      position: point,
      offset: new BMap.Size(-30, -30)
    })
    label.id = id
    // 创建覆盖物
    label.setContent(`
              <div class="${styles.bubble}">
                <p class="${styles.name}">${name}</p>
                <p>${count}套</p>
              </div>
            `)
    label.setStyle(labelStryle)
    // 单击事件
    label.addEventListener('click', () => {
      // 调用renderOverlays方法，获取该区域下的房源信息
      this.renderOverlays(id)
      this.map.centerAndZoom(point, zoom); // (坐标对象， 地图级别)
      // 除当前覆盖物, 百度地图自身报错解决，加定时器
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0);
    })
    this.map.addOverlay(label)
  }
createRect(point, name, count, id) {
  const label = new BMap.Label('', {
    position: point,
    offset: new BMap.Size(-50, -28)
  })
  label.id = id
  // 创建覆盖物
  label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)
  label.setStyle(labelStryle)
  // 单击事件
  label.addEventListener('click', () => {
  
  })
  this.map.addOverlay(label)
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