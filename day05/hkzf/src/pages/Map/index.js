import React from 'react'

// 导入封装好的NavHeader组件
import NavHeader from '../../components/NavHeader/index'
import { Toast, Link } from 'antd-mobile'
import axios from 'axios'
// 导入样式
import styles from './imdex.module.css'
import { BASE_URL } from '../../utils/url'

// 解决脚手架中全局变量访问的问题
const BMap = window.BMap
// 覆盖物样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}

export default class Map extends React.Component {
  state = {
    // 小区下的房源列表
    housesList: [],
    // 表示是否展示房源列表
    isShowList: false
  }
  componentDidMount() {
    this.initMap()
  }
  // 初始化地图
  initMap() {
    // 获取当前定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    // 创建地图实例
    // 在React全局对象使用window
    const map = new BMap.Map("container")
    // 作用： 能够在其他方法中通过this来获取地图对象
    this.map = map
    // 创建地址解析器实例     
    const myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(
      label,
      async point => {
        if (point) {
          //  初始化地图
          map.centerAndZoom(point, 11)
          // 添加常用控件
          map.addControl(new BMap.NavigationControl())
          map.addControl(new BMap.ScaleControl())

          // 调用 renderOverlays 方法
          this.renderOverlays(value)
        }
      },
      label
    )
    // 绑定移动事件
    map.addEventListener('movestart', () => {
      if (this.state.isShowList) {
        this.setState({
          isShowList: false
        })
      }
    })
  }
  // renderOverlays()渲染覆盖物入口： 
  // (1)接收区域id参数，获取该区域下的房源 
  // (2) 获取覆盖率为i行以及下级地图缩放级别
  async renderOverlays(id) {
    try {
      // 开启loading
      Toast.loading('加载中...', 0, null, false)

      const res = await axios.get(`http://localhost:8080/area/map?id=${id}`)
      // 关闭 loading
      Toast.hide()
      const data = res.data.body
      // 调用 getTypeAndZoom 方法获取级别和类型
      const { nextZoom, type } = this.getTypeAndZoom()
      data.forEach(item => {
        // 创建覆盖物
        this.createOverlays(item, nextZoom, type)
      })
    } catch (e) {
      // 关闭 loading
      Toast.hide()
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  // 区   -> 11 ，范围：>=10 <12
  // 镇   -> 13 ，范围：>=12 <14
  // 小区 -> 15 ，范围：>=14 <16
  getTypeAndZoom() {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = this.map.getZoom()
    let nextZoom = ''
    let type = ''

    // console.log('当前地图缩放级别：', zoom)
    if (zoom >= 10 && zoom < 12) {
      // 区
      // 下一个缩放级别
      nextZoom = 13
      // circle 表示绘制圆形覆盖物（区、镇）
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) {
      // 镇
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) {
      // 小区
      type = 'rect'
    }

    return {
      nextZoom,
      type
    }
  }

  // 创建覆盖物
  createOverlays(data, zoom, type) {
    const {
      coord: { longitude, latitude },
      label: areaName,
      count,
      value
    } = data

    // 创建坐标对象
    const areaPoint = new BMap.Point(longitude, latitude)

    if (type === 'circle') {
      // 区或镇
      this.createCircle(areaPoint, areaName, count, value, zoom)
    } else if(type === 'rect'){
      // 小区
      this.createRect(areaPoint, areaName, count, value)
    }
  }

  // 创建区、镇覆盖物
  createCircle(point, name, count, id, zoom) {
    // 创建覆盖物
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
    label.setStyle(labelStyle)
    // 单击事件
    label.addEventListener('click', () => {
      // 调用renderOverlays方法，获取该区域下的房源信息
      this.renderOverlays(id)
      this.map.centerAndZoom(point, zoom) // (坐标对象， 地图级别)
      // 除当前覆盖物, 百度地图自身报错解决，加定时器
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)
    })
    this.map.addOverlay(label)
  }
  createRect(point, name, count, id) {
    // 创建覆盖物
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
    label.setStyle(labelStyle)
    // 单击事件
    label.addEventListener('click', e => {
      this.getHousesList(id)
      // 获取当前被点击项
      const target = e.changedTouches[0]
      this.map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      )
    })
    this.map.addOverlay(label)
  }
// 获取小区房源数据
async getHousesList(id) {
  try {
    Toast.loading('加载中...', 0, null, false)
    const res = await axios.get(`http://localhost:8080/houses?cityId=${id}`)
    Toast.hide()
    this.setState({
      houseList: res.data.body.list,
      isShowList: true
    })
  } catch (error) {
    Toast.hide()
  }

}
renderHousesList() {
  return this.state.houseList.map(item => (<div className={styles.house} key={item.houseCode}>
    <div className={styles.imgWrap}>
      <img className={styles.img} src={BASE_URL + item.houseImg} alt="" />
    </div>
    <div className={styles.content}>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.desc}>{item.desc}</div>
      <div>
        {/* ['近地铁', '随时看房'] */}
        {item.tags.map((tag, index) => {
          const tagClass = 'tag' + (index + 1)
          return (
            <span
              className={[styles.tag, styles[tagClass]].join(' ')}
              key={tag}
            >
              {tag}
            </span>
          )
        })}
      </div>
      <div className={styles.price}>
        <span className={styles.priceNum}>{item.price}</span> 元/月
      </div>
    </div>
  </div>))
}
render() {
  return (
    <div className={styles.map}>
      <NavHeader>地图找房</NavHeader>
      <div id="container" className={styles.container} />
      {/* 房源列表 */}
      {/* 添加 styles.show 展示房屋列表 */}
      <div className={[styles.houseList, this.state.isShowList ? styles.show : ''].join(' ')}>
        <div className={styles.titleWrap}>
          <h1 className={styles.listTitle}>房屋列表</h1>
          <Link className={styles.titleMore} to="/home/list">
            更多房源
          </Link>
        </div>
        <div className={styles.houseItems}>
          {/* 房屋结构 */}
          {/* {this.renderHousesList()} */}
          {this.renderHousesList()}
        </div>
      </div>
    </div>
    )
  }
}