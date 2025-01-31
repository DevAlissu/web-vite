import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    label: (
      <Link to="/"> Home</Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/resume"> Medições</Link>
    ),
  },
];

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);

  const handleMenuOpen = (flag) => {
    setOpen(flag);
    document.body.style.overflow = flag ? 'hidden' : 'auto';
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = 'auto'; // Libera a rolagem ao fechar
  };

  return (
    <>
      {/* Camada de fundo que fecha o menu ao clicar */}
      {open && (
        <div
          onClick={handleClose}  // Fecha ao clicar na área transparente
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo escuro transparente
            zIndex: 999, // Atrás do dropdown
          }}
        />
      )}

      <Dropdown
        menu={{ items }}
        overlayStyle={{
          position: 'fixed',
          top: 60,   // Ajusta o topo do dropdown
          left: 0,
          width: '80%',
        
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo branco semi-transparente
          zIndex: 1000,  // Na frente da camada de fundo
        }}
        trigger={['click']}
        open={open}
        onOpenChange={handleMenuOpen}  // Controla abertura e fechamento
      >
        <a 
          onClick={(e) => e.preventDefault()} 
          style={{ display: 'block', width: '100%' }}
        >
          <Space style={{ justifyContent: 'space-between', width: '100%', height: '50%' }}>
            <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default DropDownMenu;
