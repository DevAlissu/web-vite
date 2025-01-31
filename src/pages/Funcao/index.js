import React, { useEffect, useState, useMemo } from 'react';






import axios, { isAxiosError } from 'axios';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { DotChartOutlined, LineChartOutlined, LoadingOutlined } from '@ant-design/icons';
import { WarningOutlined, } from '@ant-design/icons';
import { ExperimentTwoTone } from '@ant-design/icons'




import { Layout, Menu, Button, theme, Flex, Divider, Modal, Table, Space, message, Alert, Spin, notification } from 'antd';
import { Link } from 'react-router-dom';


import '../../App.css'
import ItensMenu from '../../components/ItensMenu';

import ItemHeader from '../../components/ItemHeader';
import ItemSideBar from '../../components/ItemSideBar';

import EditOutlined from '@mui/icons-material/EditOutlined';
import { PieChartOutline, PieChartOutlineOutlined, SmsFailedOutlined } from '@mui/icons-material';
import { Progress } from 'antd';

import ItemLoading from '../../components/ItemLoaging';


const { Header, Sider, Content } = Layout;

const Context = React.createContext({
  name: 'Default',
});

//const URL_API = "http://localhost:8000";
const URL_API = "http://77.37.68.38:8000"

const Funcao = () => {

  const [collapsed, setCollapsed] = useState(false);

  const [data, setData] = useState([]);
  const [gerenciando, setGerenciando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numeroMedicaoDiaria, setNumeroMedicaoDiaria] = useState(null)


  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );


  useEffect(() => {
   
  }, []);

  const openNotification = (erro) => {
    notification.open({
      message: 'Aviso',
      icon: <WarningOutlined style={{ color: 'red' }} />,
      description:
        'Não foi possível realizar a operação! ' + erro,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };


  



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ItemSideBar />

      <Layout >

        <ItemHeader/>

        <Flex className='panel'>
                  <div className='panel-content'>
        
                     FUNÇÃO PAGE
        
                  </div>
        
               
        
                </Flex>


      </Layout>
    </Layout>
  );



};

export default Funcao;