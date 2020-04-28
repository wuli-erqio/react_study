import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'
import { API, BASE_URL } from '../../utils'
export default class Favorate extends Component {
  state = {
    // 我的收藏列表
    list: []
  }

  componentDidMount() {
    this.getHouseList()
  }
  async getHouseList() {
    const res = await API.get('/user/favorites')
    console.log(res)
    const { status, body } = res.data
    if(status === 200) {
      this.setState({
        list: body
      })
    }
  }
  renderRentList = () => {
    const { list } = this.state
    const { history } = this.props
    return list[0] ? (
      list.map(item => {
        return (
          <HouseItem
            key={item.houseCode}
            onClick={() => history.push(`/detail/${item.houseCode}`)}
            src={BASE_URL + item.houseImg}
            title={item.title}
            desc={item.desc}
            tags={item.tags}
            price={item.price}
          />
        )
      })
    ) : null
  }
  render() {
    const { history } = this.props
    return (
      <div>
        <NavHeader onLeftClick={() => history.go(-1)}>我的收藏</NavHeader>
        {this.renderRentList()}
      </div>
    )
  }
}