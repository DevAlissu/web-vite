import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Link,
} from "react-router-dom";
import { Layout, Menu } from 'antd';



import Funcao from './pages/Funcao';
import ItemSideBar from './components/ItemSideBar';
import HomePage, { Home } from './pages/HomePage';




const { Header, Content } = Layout;

const App = () => {
  return (
    
    <>
          
          <BrowserRouter>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<Funcao />} />
              
            </Routes>
          </BrowserRouter>
    </>
          
       
    
  );
};

export default App;
