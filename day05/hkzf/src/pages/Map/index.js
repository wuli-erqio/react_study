import React from 'react'
import './index.css'

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
      <div className="map">
        <div id="container"></div>
      </div>
    )
  }
}