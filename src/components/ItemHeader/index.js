import { Layout, Menu, Button, theme, Flex, Divider } from 'antd';
import { Link } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DropDownMenu from '../DropDownMenu';
import DrawMenu from '../DrawMenu';


const { Header } = Layout;



export default function ItemHeader(props) {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Header 
            
            style={{ padding: 0, background: 'rgb(0 66 129)', borderBottom: '3px solid #e8e8e8', padding:'10px' }} >
            <div className='header-app'>
                <div className="menu_hamburguer">
                    <DrawMenu></DrawMenu>
                </div>

                <div style={{
                    fontSize:'24px',
                    fontWeight:'bold',
                    color:'#FFF'
                }}>
                    
                </div>

                    

                <div>

                </div>
                

            </div>
        </Header>
    );

}