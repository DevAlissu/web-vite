
import { Divider } from "antd";
import React from "react";

export default function ItemHeaderCabecalho(props) {
    return (
        <div className='form-cadastro-header'>
            <h2>{props.title}</h2>

            {props.subTitle ?<span>{props.subTitle}</span> : <div style={{marginBottom:'5px'}}/>}

            

        </div>
    );
}