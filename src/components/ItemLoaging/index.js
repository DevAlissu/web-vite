import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const ItemLoading = () => (
  <Flex   
    gap="middle" 
    vertical
    style={{
      display:'flex',
      width:'100%',
      
    }}
  
  >
    
    <Spin tip="Carregando dados do gráfico...">
      <Alert
        
        
        type="info"
        style={{
           minHeight:'350px'
        }}
      />
    </Spin>
  </Flex>
);
export default ItemLoading;