
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoLarge from '../../assets/logo_nansen.png';
import LogoMini from '../../assets/logo_nansen.png';

export default function Logo({collapsed}) {

   
        return (
            <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0, background:'rgb(0 66 129)' }}>
                
                {!collapsed 
                ? <Link to="/"><img src={ LogoLarge} style={{ height: 40, width: 100, marginTop: 12, marginBottom:5, marginLeft: 20, marginRight:20 }} /></Link>
                :<></>
            
            }
                
            </div>
        );
  

    
}