import React,{ Component } from 'react'
import { SearchBar } from 'antd-mobile'

export default class RentSearch extends Component {
  state = {
    value: '美食',
  }
  onChange= (value) => {
    this.setState({ value });
  }
  render() {
    return (
      <div>
        <SearchBar
        value={this.state.value}
        placeholder="Search"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={this.onChange}
      />
      </div>
    )
  }
}