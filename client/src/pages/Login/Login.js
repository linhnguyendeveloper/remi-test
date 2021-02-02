import '../../App.css'
import React from 'react'
import { Layout } from 'antd'
import ShareVideo from './ShareVideo'

function Login() {
  const { Content } = Layout
  return (
    <div className="Login">
      <Layout>
        <ShareVideo/>
        <Layout className="background-images">
          <Content>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Login
