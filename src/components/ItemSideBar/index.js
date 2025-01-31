
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UserAddOutlined,
    AreaChartOutlined,
    BarChartOutlined
} from '@ant-design/icons';






import { Layout, Menu, Button, theme, Flex, Divider } from 'antd';
import { Link } from 'react-router-dom';


import Logo from '../../components/Logo';

import '../../App.css'
import ItensMenu from '../../components/ItensMenu';
import ItemHeader from '../../components/ItemHeader';
import LogoInova from '../LogoInova';

const { Header, Sider, Content } = Layout;

export default function ItemSideBar() {

    const [collapsed, setCollapsed] = useState(false);
    const [positionButton, setPositionButton] = useState('right');

    const [selectedKey, setSelectedKey] = useState('1'); // estado para armazenar a chave do item selecionado

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Sider className='menu' trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: '#FFF', borderRight: '2px solid #e8e8e8' }}>


            <Logo collapsed={collapsed} />


            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh'}}>
                <div>
                    <div style={{ textAlign: positionButton }} className=''>
                        <Button
                            className='position-btn'
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined className='position-btn' /> : <MenuFoldOutlined className='position-btn' />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '30px',

                                height: 100,

                                color: '#000',
                                width: '100%',

                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'



                            }}
                        />
                    </div>

                    <ItensMenu />
                </div>
                <LogoInova collapsed={collapsed} />
            </div>

           


        </Sider>
    );
}