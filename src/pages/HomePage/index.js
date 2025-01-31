import React, { useEffect, useState } from 'react';
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

import axios from 'axios';

import { Progress, Layout, Menu, Button, theme, Flex, Divider, Alert, notification } from 'antd';
import { Link } from 'react-router-dom';

import ItemHeader from '../../components/ItemHeader';
import ItemSideBar from '../../components/ItemSideBar';


import '../../App.css'

import { Line } from 'recharts';
import { Flag, TimesOneMobiledata } from '@mui/icons-material';



const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [positionButton, setPositionButton] = useState('right');
  const [temperatura, setTemperatura] = useState(0)

  const [id, setId] = useState('');
  const [local, setLocal] = useState("");
  const [tanque, setTanque] = useState('');
  const [nivel, setNivel] = useState('');
  const [numeroRequisicao, setNumeroRequisicao] = useState(0);
  
  const [erroLloading, setErroLoading] = useState(false)
  const [textoSincronizacao, setTextoSincronizacao] = useState('Sincronizando dados com a embarcação....')

  const [data, setData] = useState('');

  const URL_API = "http://77.37.68.38:8000"

  

  useEffect(() => {
    
   
  }, [])


  

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

  const twoColors = {
    '0%': '#e2aa53',  // Vermelho claro no início
    '100%': '#cc0000',  // Vermelho escuro no final

  };
  const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Erro de conexão',
      description: 'Erro de conexão com a API.',
      type: 'warning',
      duration: 0,
      style: {
        background: twoColors.background,
        color: twoColors.text,
      },
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <ItemSideBar />
      <Layout  >

        <ItemHeader />

      


        <Flex className='panel'>
          <div className='panel-content'>

             AQUI

          </div>

          

        </Flex>



      </Layout>
    </Layout>
  );
};

export default HomePage;