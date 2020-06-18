import React from 'react'
import { connect } from 'react-redux'

import { Layout, Icon, Dropdown, Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './style.less'

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="smile" />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        <Icon type="logout" />
        退出登录
      </Link>
    </Menu.Item>
  </Menu>
)

const MainHeader = () => {
  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <Icon className="main-header__trigger" type="menu-unfold" />
        </Col>
        <Col>
          <Dropdown
            overlay={menu}
            trigger={['click', 'hover']}
            placement="bottomCenter"
          >
            <div className="main-header__user">
              <span className="main-header__user-img" />
              <span className="main-header__user-name">姓名</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default MainHeader
