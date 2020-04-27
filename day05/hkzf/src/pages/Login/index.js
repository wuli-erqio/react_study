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
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$s/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$s/

class Login extends Component {
  render() {
    // 通过props获取到values
    const { values, handleSubmit, handleChange, handleBlur , errors, touched } = this.props
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登陆</NavHeader>
        <WhiteSpace size="xl" />
        <WingBlank>
          <form onSubmit={handleSubmit}>
            {/* 账号 */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {
              errors.username && touched.username && (<div className={styles.error}> {errors.username}</div>)
            }
            {/* 密码 */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            {
              errors.password && touched.password && (<div className={styles.error}> {errors.password} </div>)
            }
            </div>
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
        </WingBlank>
        <Flex className={styles.backHome}>
          <Flex.Item>
            <Link to="/registe">还没有账号，去注册~</Link>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}


// 使用withFormik包装login组件
Login = withFormik({
  // 提供状态
  mapPropsToValues: () => ({username: '', password: ''}),
  // 表单提交事件
  handleSubmit: async (values, { props }) => {
    const { username, password } = values
    const res = await API.post(`/user/login`, {
      username,
      password
    })
    const { status, body, description } = res.data
    if(status === 200) {
      // 登录成功
      localStorage.setItem('hkzf_token', body.token)
      // 无法在该方法中，通过this来获取到路由的信息
      // 所以，需要通过第二个对象参数中获取到props来使用props
      props.history.go(-1)
    } else {
      // 登陆失败
      Toast.info(description, 2, null, false)
    }
  },
  // 表单校验规则
  validationSchema: Yup.object().shape({
    username: Yup.string().required('账号为必填项').matches(REG_UNAME, '长度为5到8位,只能出现数字、字母、下划线'),
    password: Yup.string().required('密码为必填项').matches(REG_PWD, '长度为5到12位,只能出现数字、字母、下划线')
  })
})(Login)
// 注意：此处返回的是 高阶组件 包装后的组件
export default Login
