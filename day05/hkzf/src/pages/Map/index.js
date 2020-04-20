import React from 'react'

// 导入封装好的NavHeader组件
import NavHeader from '../../components/NavHeader/index'

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
    myGeo.getPoint(label, function(point){      
      if (point) {      
        map.centerAndZoom(point, 11);
        map.addControl(new BMap.NavigationControl());    
        map.addControl(new BMap.ScaleControl())
        /*
          1. 调用Label的setContent()方法，传入HTML结构，修改HTML内容样式
          2. 调用setStyle()修改覆盖物样式
          3. 给文本覆盖物添加单击事件
        */
        const opts = {
          position: point,
          offset: new BMap.Size(-35, -35)
        }
        // 设置setContent之后，第一个参数失效，给空就行
        const label = new BMap.Label('', opts)
        label.setContent(`
          <div class="${styles.bubble}">
            <p class="${styles.name}">浦东</p>
            <p>1套</p>
          </div>
        `)
        label.setStyle(labelStryle)
        // 单击事件
        label.addEventListener('click', () => {
          console.log('11')
        })
        map.addOverlay(label)
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