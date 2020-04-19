import React from 'react'

// 导入封装好的NavHeader组件
import NavHeader from '../../components/NavHeader/index'

// 导入样式
import styles from './imdex.module.css'

export default class Map extends React.Component {
  componentDidMount() {
    // 创建地图实例
    // 在React全局对象使用window
    var map = new window.BMap.Map("container")
    // 设置中心点坐标
    var point = new window.BMap.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    map.centerAndZoom(point, 15); 
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