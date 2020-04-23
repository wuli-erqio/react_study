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
  render() {
    const { onCancel, onSave } = this.props
    return (
      <>
        <PickerView value={null} data={province} col={3} />
        <FilterFooter onCancel={() => onCancel()} onOk = {() => onSave()}></FilterFooter>
      </>
    );
  }
}