import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoInovaImage from '../../assets/inova_logo.png';


export default function LogoInova({collapsed}) {

   
        return (
            <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '95%'  }}>
                
                {!collapsed 
                ? <Link to="/"><img src={ LogoInovaImage} style={{ height: 40, width: 100, marginTop: 12, marginBottom:5, marginLeft: 20, marginRight:20 }} /></Link>
                :<Link to="/"><img src={ LogoInovaImage} style={{ height: 20, width: 50, marginTop:30, marginBottom:5, marginLeft: 20, marginRight:20 }} /></Link>
            
            }
                
            </div>
        );
  

    
}