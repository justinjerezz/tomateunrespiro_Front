import React,{useState}  from 'react';
import {Tab} from "semantic-ui-react";
import {RegisterForm,LoginForm} from "../../../components/Admin/Auth";
import { Link } from 'react-router-dom';
import {Icon} from "../../../assets";
import "./Auth.scss"

export function Auth() {

    const [activeIndex, setActiveIndex]=useState(0 );
    const openLogin=()=>setActiveIndex(0);


    const panes=[
        {
            menuItem:"Entrar",
            render: ()=>(
                <Tab.Pane>
                    <LoginForm openLogin={openLogin}></LoginForm>
                </Tab.Pane>
            )
        },
        {
            menuItem:"Nuevo usuario",
            render: ()=>(
                <Tab.Pane>
                    <RegisterForm openLogin={openLogin}></RegisterForm>
                </Tab.Pane>
            )
        } 

    ];

    return(
        <div className='auth'>
            <Icon.LogoBonito className="logo"></Icon.LogoBonito>
            <Tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_,data)=>setActiveIndex(data.activeIndex)}/>
            <Link to="/">Volver a tomate un respiro</Link>
        </div>
    )
  }
