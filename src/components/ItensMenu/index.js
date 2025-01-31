import { Layout, Menu, Button, theme, Flex, Divider } from 'antd';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


import { Link } from 'react-router-dom';



import '../../App.css'

export default function ItensMenu() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Menu
            style={{ padding: 0, background: '#FFF', marginTop: 20 }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}



            items={[
                {
                    key: '1',
                    icon: <BarChartOutlinedIcon fontSize="large" className="menu-item" />,
                    label: <Link to="/" >Home</Link>,


                },

                {
                    key: '1',
                    icon: <AccountCircleIcon fontSize="large" />,
                    label: <Link to="/resume">Funcão</Link>,

                },

                

            ]}
        />
    );
}