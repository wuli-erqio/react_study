import React, {Component} from 'react'
import FilterFooter from '../../../../components/FilterFooter'
import { PickerView } from 'antd-mobile'

const province = [
  { label: '北京', value: '01', children: [
      { label: '东城区', value: '01-1' },
      { label: '西城区', value: '01-2' },
      { label: '崇文区', value: '01-3' },
      { label: '宣武区', value: '01-4' }
    ]
  }
]
export default class FilterPicker extends Component {
  state = {
    value: this.props.defaultValue
  }
  render() {
    const { onCancel, onSave, data, cols, type } = this.props
    const { value } = this.state
    return (
      <>
        {/* 选择器组件
            注意：一定要设置组件value属性的值，为当前选中状态的值，否则，无法实现切换选中项
         */}
        <PickerView data={data} value={value} cols={cols} onChange={val => {
          this.setState({
            value: val
          })
        }}/>
        <FilterFooter onCancel={() => onCancel(type)} onOk={() => onSave(type, value)}></FilterFooter>
      </>
    );
  }
}