import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import LogoMini from '../../assets/logo_mini.png'

import '../../App.css'

const { Header, Sider, Content } = Layout;

const MenuSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  

  return (
    <Layout style={{ height: '100vh' }} >
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: '#FFF' }} >

        {!collapsed && (
          <div className="demo-logo-vertical" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

            <img src={Logo} style={{ height: 70, marginTop: 30, marginLeft: 20 }} />
          </div>
        )}

        {collapsed && (
          <div className="demo-logo-vertical" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>


            <img src={LogoMini} />
          </div>
        )}

        <Menu
          style={{ padding: 0, background: '#FFF', marginTop: 20 }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}



          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to="/" >Home</Link>,


            },

            {
              key: '1',
              icon: <UserOutlined />,
              label: <Link to="/create">Create</Link>,

            },

          ]}
        />
      </Sider>
      
    </Layout>
  );
};

export default MenuSideBar;