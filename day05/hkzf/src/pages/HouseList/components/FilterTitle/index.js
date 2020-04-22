import React from 'react'

import { Flex } from 'antd-mobile';
import styles from './index.module.css'
const titleList = [
  { title: '区域', type: 'a1' },
  { title: '111', type: 'a2' },
  { title: '111', type: 'a3' },
  { title: '区1', type: 'a3' },
]
export default function FilterTitle() {
  return (
    <Flex align="center" className={styles.root}>
      <Flex.Item>
        <span className={[styles.dropdown, styles.selected].join(' ')}>
          <span>区域</span>
          <i className="iconfont icon-arrow"></i>
        </span>
      </Flex.Item>
    </Flex>
  );
}