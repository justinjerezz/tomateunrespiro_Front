import React ,{useState}from "react";
import { Tab, Button } from "semantic-ui-react";
import {BasicModal} from "../../../components/Shared";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import "./Menu.scss";

export function Menu() {

  const [showMdal,setShowModal]= useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal=()=>setShowModal((prevState)=>!prevState);
  const onReload=()=>setReload((prevState)=>!prevState);
  const panes = [
    {
      menuItem: "Menus activos",
      render:()=>(
        <Tab.Pane attached={false}>
          <ListMenu active={true} reload={reload} onReload={onReload}></ListMenu>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus inactivos",
      render:()=>(
        <Tab.Pane attached={false}>
          <ListMenu active={false} reload={reload} onReload={onReload}></ListMenu>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          Nuevo menu
        </Button>
        <Tab menu={{secondary:true}} panes={panes}/>
      </div>
      <BasicModal show={showMdal} close={onOpenCloseModal} title="Crear menu">
        <MenuForm onClose={onOpenCloseModal} onReload={onReload}>

        </MenuForm>
      </BasicModal>
    </>
  );
}
