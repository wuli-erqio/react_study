import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
// 导入withFormik
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import styles from './index.module.css'

class Login extends Component {
  state = {

  }
  render() {
    return (
      <div className={styles.root}>
        <NavHeader className={styles.navHeader}>账号登陆</NavHeader>
        <WhiteSpace size="xl">
          <WingBlank>
            <Form>
              {/* 账号 */}
              <div className={styles.formItem}>
                <Field
                  className={styles.input}
                  name="username"
                  placeholder="请输入账号"
                />
              </div>
              <ErrorMessage
                className={styles.error}
                name="username"
                component="div"
              />
              {/* 密码 */}
              <div className={styles.formItem}>
                <Field
                  className={styles.input}
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                />
              </div>
              <ErrorMessage
                className={styles.error}
                name="password"
                component="div"
              />
              <div className={styles.formSubmit}>
                <button className={styles.submit} type="submit">
                  登 录
                </button>
              </div>
            </Form>
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
