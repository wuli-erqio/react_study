import React, {Component} from 'react'
import FilterTitle from '../FilterTitle'
import FilterMore from '../FilterMore'
import FilterPicker from '../FilterPicker'
// 导入自定义的axios
import { API } from '../../../../utils/api'

import styles from './index.module.css'

const titleSelectStatus = {
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
    titleSelectStatus,
    // 提供组件展示或隐藏状态
    openType: '',
    filterData: {},
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
    const {titleSelectStatus, selectedValues } = this.state
    // 创建新的标题选中状态
    const newTitleSelectedStatus = {...titleSelectStatus}
    // 遍历标题选中状态
    // 返回值是个数组
    Object.keys(titleSelectStatus).forEach( item => {
      // item 表示数组中的每一项，此处，就是每个标题的type值
      if(item === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
        return
      }
      // 其他标题
      const selectedVal = selectedValues[item]
      if (item === 'area' && (selectedVal.length !== 2 || selectedVal[0] !== 'area')) {
        // 高亮
        newTitleSelectedStatus[item] = true
      } else if (item === 'mode' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[item] = true
      } else if(item === 'price' && selectedVal[0] !== 'null') {
        newTitleSelectedStatus[item] = true
      } else if (item === 'more') {
        // 更多选择项
      } else {
        newTitleSelectedStatus[item] = false
      }
    })
    this.setState({
      openType: type,
      titleSelectStatus: newTitleSelectedStatus
    })
    // this.setState(prevState => {
    //   return {
    //     titleSelectStatus: {
    //       // 获取当前的对象所有属性值
    //       ...prevState.titleSelectStatus,
    //       [type]: true
    //     },
    //     // 展示对话框
    //     openType: type,
    //   }
    // })
  }

  // 取消隐藏对话框
  onCancel = (type, value) => {
    this.setState({
      // 隐藏对话框
      openType: ''
    })
  }
  // 确定
  onSave = (type, value) => {
    console.log(type, value)
    this.setState({
      // 隐藏对话框
      openType: '',
      selectedValues: {
        ...this.state.selectedValues,
        // 只更新当前type对应的选中值
        [type]: value
      }
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
    const { openType, filterData:{roomType,oriented,floor,characteristic} } = this.state
    if(openType !== 'more') {
      return null
    }
    const data = {roomType, oriented, floor, characteristic}
    return <FilterMore data={data}/>
  }

  render() {
    const { titleSelectStatus, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {
          (openType === 'area' || openType === 'mode' || openType === 'price')
          ? (<div className={styles.mask} onCancel={this.onCancel} />) : null
        }
        <div className={styles.content}>
          {/* 标题 */}
          <FilterTitle
            titleSelectStatus={titleSelectStatus}
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