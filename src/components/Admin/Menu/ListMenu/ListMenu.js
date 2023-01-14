import React, {useState,useEffect} from 'react';
import {Loader} from 'semantic-ui-react';
import {size,map} from "lodash";
import {Menu} from "../../../../api";
import { MenuItem } from '../MenuItem/MenuItem';

const menuController=new Menu();

export  function ListMenu(props) {

    const {active,reload,onReload}=props;
    const [menus,setMenus]=useState(null);
    
    useEffect(() => {
      (async ()=>{
        try {
          setMenus(null);
          const response= await menuController.getMenus(active);
          setMenus(response);

        } catch (error) {
          console.error(error);
        }
      })()

    }, [active,reload]);
    
    
    if(!menus) return <Loader active inline="centered"></Loader>;
    if(size(menus.response)===0)return "No hay ningún menu";

    return map(menus.response,(menu)=>(
      <MenuItem key={menu._id} menu={menu} onReload={onReload}></MenuItem>
    ))
}
