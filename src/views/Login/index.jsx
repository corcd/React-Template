import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './style.less'

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}

const Login = () => {
  const history = useHistory()

  const onFinish = (values) => {
    console.log('Finish:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="page-login">
      <Form
        {...layout}
        className="page-login__form"
        name="basic"
        initialValues={{
          remember: true,
        }}
        scrollToFirstError
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="page-login__form-title">欢迎登录</div>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input
            
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            }
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input.Password
            
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            }
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item valuePropName="checked" initialValue={true}>
          <Checkbox>记住我</Checkbox>
          <a className="page-login__form-forgot" href="">
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="page-login__form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
