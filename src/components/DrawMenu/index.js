import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const DrawMenu = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button  onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer 
        title="Acesso Rápido" 
        onClose={onClose} open={open}
        style={{display:'flex', flexDirection:'column'}}
      
      >
        <Link to="/" className='item_menu_draw'> Home</Link>
        <Link to="/resume" className='item_menu_draw'> Medições</Link>
      </Drawer>
    </>
  );
};
export default DrawMenu;