import React from 'react'
import {Button,Icon} from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';
import "./GoToHome.scss";

export  function GoToHome() {
    const navigate=useNavigate();
    const onGoToHome=()=>{
            navigate("/");
    }

  return (
    <Button className='botonGoToHome' icon basic onClick={onGoToHome}>
        <Icon name="eye"/> Ver Web
    </Button>
  )
}