import React, {Component} from 'react'
import FilterTitle from '../FilterTitle'
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
// 导入自定义的axios
import { API } from '../../../../utils/api'

import styles from './index.module.css'

const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}

const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}
export default class Filter extends Component {
  state = {
    titleSelectedStatus,
    // 提供组件展示或隐藏状态
    openType: '',
    filterData: {
      // FilterMore
      roomType: [],
      oriented: [],
      floor: [],
      characteristic: [],
      // FilterPicker
      area: {},
      subway: {},
      rentType: [],
      price: []
    },
    // 提供选中值状态
    selectedValues
  }
  componentDidMount() {
    this.getFilterData()
  }

  // 封装获取所有筛选条件的方法
  async getFilterData() {
    // 获取当前定位城市
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))
    const res = await API.get(`/houses/condition?id=${value}`)
    this.setState({
      filterData: res.data.body
    })
  }

  // 点击标题高亮事件
  // this指向问题
  onTitleClick = (type) => {
    const {titleSelectedStatus, selectedValues } = this.state
    // 创建新的标题选中状态
    const newTitleSelectedStatus = {...titleSelectedStatus}
    // 遍历标题选中状态
    // 返回值是个数组
    Object.keys(titleSelectedStatus).forEach( key => {
      // key 表示数组中的每一项，此处，就是每个标题的type值
      if(key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
        return
      }
      // 其他标题
      const selectedVal = selectedValues[key]
      if (key === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if(key === 'price' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'more' && selectedVal.length !== 0) {
        // 更多选择项
        newTitleSelectedStatus[key] = true
      } else {
        newTitleSelectedStatus[key] = false
      }
    })
    this.setState({
      openType: type,
      titleSelectedStatus: newTitleSelectedStatus
    })
    // this.setState(prevState => {
    //   return {
    //     titleSelectedStatus: {
    //       // 获取当前的对象所有属性值
    //       ...prevState.titleSelectedStatus,
    //       [type]: true
    //     },
    //     // 展示对话框
    //     openType: type,
    //   }
    // })
  }

  // 取消隐藏对话框
  onCancel = (type) => {
    const { titleSelectedStatus, selectedValues } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 菜单高亮逻辑处理
    const selectedVal = selectedValues[type]
    if (
      type === 'area' &&
      (selectedVal.length !== 2 || selectedVal[0] !== 'area')
    ) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0 && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }
    this.setState({
      // 隐藏对话框
      openType: '',
      titleSelectedStatus: newTitleSelectedStatus
    })
  }
  // 确定
  onSave = (type, value) => {
    const { titleSelectedStatus } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 菜单高亮逻辑处理
    const selectedVal = value
    if (
      type === 'area' &&
      (selectedVal.length !== 2 || selectedVal[0] !== 'area')
    ) {
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0 && selectedVal[0] !== 'null') {
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }
    const newSelectedValues = {
      ...this.state.selectedValues,
      // 只更新当前type 对应的选中值
      [type]: value
    }
    const { area, mode, price, more } = newSelectedValues
    // 筛选条件数据
    const filters = {}
    // 区域
    const areaKey = area[0]
    let areaValue = 'null'
    if(area.length === 3) {
      areaValue = area[2] !== 'null' ? area[2] : area[1]
    }
    filters[areaKey] = areaValue
    // 方式和组件
    filters[mode] = mode[0]
    filters[price] = price[0]

    // 更多筛选条件 more
    filters[more] = more.join(',')
    // 隐藏对话框
    this.setState({
      openType: '',

      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValues: newSelectedValues
    })
  }

  // 渲染FilterPicker组件的方法
  renderFilterPicker() {
    const {
      openType,
      filterData: {area, subway, rentType, price},
      selectedValues
    } = this.state
    if(openType !== 'area' && openType !== 'mode' && openType !== 'price') {
      return null
    }

    // 根据openType来拿到当前筛选条件数据
    let data = []
    let cols = 3
    let defaultValue = selectedValues[openType]
    switch(openType) {
      case 'area':
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        data = rentType
        cols = 1
        break;
      case 'price':
        data = price
        cols = 1
        break;
      default:
        break;
    }
    return <FilterPicker
      key={openType}
      onCancel={this.onCancel}
      onSave={this.onSave}
      data={data}
      cols={cols}
      type={openType}
      defaultValue={defaultValue}/>
  }

  renderFilterMore() {
    const { 
      selectedValues, 
      openType, 
      filterData:{roomType, oriented, floor, characteristic}
    } = this.state
    if(openType !== 'more') {
      return null
    }
    const data = {
      roomType,
      oriented,
      floor,
      characteristic
    }
    const defaultValue = selectedValues.more
    return <FilterMore
      data={data}
      type={openType}
      onSave={this.onSave}
      onCancel={this.onCancel}
      defaultValue={defaultValue}/>
  }

  render() {
    const { titleSelectedStatus, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          (openType === 'area' || openType === 'mode' || openType === 'price')
          ? (<div className={styles.mask} onClick={() => this.onCancel(openType)} />) : null
        }
        <div className={styles.content}>
          {/* 标题 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onClick={this.onTitleClick} />
          {/* 前三个菜单的对应内容 */}
          { this.renderFilterPicker() }
          {/* 最后一个菜单的对应内容 */}
          { this.renderFilterMore() }
        </div>
      </div>
    )
  }
}