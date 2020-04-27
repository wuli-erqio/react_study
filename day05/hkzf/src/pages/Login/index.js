import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'

import { API } from '../../utils'
// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import styles from './index.module.css'

class Login extends Component {
  render() {
    // 通过props获取到values
    const { values, handleSubmit, handleChange } = this.props
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
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 密码 */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
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
  }
})(Login)
// 注意：此处返回的是 高阶组件 包装后的组件
export default Login
