import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'

// 导入Yup
import * as Yup from 'yup'

import { API } from '../../utils'
// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import styles from './index.module.css'

// 验证规则
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Registe extends Component {
  render() {
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Form>
            {/* 账号 */}
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                name="username"
                placeholder="请输入账号"></Field>
            </div>
            <ErrorMessage className={styles.error} name="username" component="div"></ErrorMessage>
            {/* 密码 */}
            <div className={styles.formItem}>
            <Field
                className={styles.input}
                name="password"
                placeholder="请输入密码"
                type="password"></Field>
            <ErrorMessage className={styles.error} name="password" component="div"></ErrorMessage>
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </Form>
          <Flex className={styles.backHome} justify="between">
            <Link to="/home">点我回首页</Link>
            <Link to="/login">已有账号，去登录</Link>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}


// 使用withFormik包装Registe组件
Registe = withFormik({
  // 提供状态
  mapPropsToValues: () => ({username: '', password: ''}),
  // 表单提交事件
  handleSubmit: async (values, { props }) => {
    const { username, password } = values
    const res = await API.post(`/user/registered`, {
      username,
      password
    })
    console.log(res)
    const { status, body } = res.data
    if(status === 200) {
      Toast.info('注册成功，跳转至登录页', 3, () => {
        props.history.replace('/login')
      }, false)
    } else {
      Toast.info('注册失败，请重新注册', 2, null, false)
    }
  },
  // 表单校验规则
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('账号为必填项')
      .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string()
      .required('密码为必填项')
      .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
  })
})(Registe)
// 注意：此处返回的是 高阶组件 包装后的组件
export default Registe
