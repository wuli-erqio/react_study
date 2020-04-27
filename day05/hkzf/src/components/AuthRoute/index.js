import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../../utils'


/* 在components目录中创建AuthRoute/index.js文件
* 创建组件AnthRoute并导出
* 在AuthRoute组件中返回Route组件(在Route的基础上做了一层包装，用于实现自定义功能)
* 在Route组件，添加render方法，指定该组件要渲染的内容(类似component属性)
* 在render方法中，调用isAuth()判断是否登录
* 如果登录了，就渲染当前组件(通过参数component获取到要渲染的组件，需要重命名)
* 如果没有登陆，就重定向到登录页面，并指定登录成功后要跳转到的页面路径
* 将AuthRoute组件接收到的props原样传递给Route组件(保证Route组件使用方式相同)
* 使用AuthRoute组件配置路由规则，验证能否实现页面的登录访问控制
*/

const AnthRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={props => {
    const isLogin = isAuth()
    if(isLogin) {
      // 已登录
      // 将props传递给组件， 组件中才能获取到路由相关信息
      return <Component {...props}/>
    } else {
      // 未登录
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }}/>
    }
  }}>

  </Route>
}

export default AnthRoute