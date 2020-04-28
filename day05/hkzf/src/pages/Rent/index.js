import React, { Component } from 'react'

export default class Rent extends Component {
  state = {
    // 出租房屋列表
    list: []
  }

  componentDidMount() {
    this.getHouseList()
  }

  // 获取已发布房源的列表信息
  getHouseList() {}

  renderHouseItem () {

  }
  renderRentList () {

  }
  render() {
    return (
      <div>
        111
      </div>
    )
  }
}
