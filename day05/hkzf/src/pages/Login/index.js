import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import styles from './index.module.css'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  getUsername = e => {
    this.setState({
      username: e.target.value
    })
  }
  getPassword = e => {
    this.setState({
      password: e.target.value
    })
  }
  // 表单提交数据
  handleSubmit = e => {
    // 阻止表单默认行为
    e.preventDefault()
  }
  render() {
    const { username, password } = this.state
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登陆</NavHeader>
        <WhiteSpace size="xl">
          <WingBlank>
            <form onSubmit={this.handleSubmit}>
              {/* 账号 */}
              <div className={styles.formItem}>
                <input
                  className={styles.input}
                  value={username}
                  onChange={this.getUsername}
                  name="username"
                  placeholder="请输入账号"
                />
              </div>
              {/* 密码 */}
              <div className={styles.formItem}>
                <input
                  className={styles.input}
                  value={password}
                  onChange={this.getPassword}
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
        </WhiteSpace>
        <Flex className={styles.backHome}>
          <Flex.Item>
            <Link to="/registe">还没有账号，去注册~</Link>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
// 注意：此处返回的是 高阶组件 包装后的组件
export default Login
