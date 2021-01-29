import '../../App.css'
import React from 'react'
import { Layout, Row, Col, Input, Checkbox, Button } from 'antd'
import { Link } from 'react-router-dom'
import ShareVideo from './ShareVideo'

function Login() {
  const { Header, Footer, Content } = Layout
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
