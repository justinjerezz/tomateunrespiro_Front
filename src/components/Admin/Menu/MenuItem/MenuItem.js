import React, { useState } from "react";
import "./MenuItem.scss";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { MenuForm } from "../MenuForm";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuItem(props) {
  const { menu, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateModal = () => {
    setTitleModal(`Actualizar menu: ${menu.title}`);
    onOpenCloseModal();
  };

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      menu.active
        ? `Desactivar el menu ${menu.title}`
        : `Activar el menu ${menu.title}`
    );
    onOpenCloseConfirm();
  };


  const onActivateDesactivate= async()=>{
    try {
      await menuController.updateMenu(accessToken,menu._id,{
        active: !menu.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  }

  const openDeleteConfirm=()=>{
    setIsDelete(true);
    setConfirmMessage(`Eliminar el menu ${menu.title}`);
    onOpenCloseConfirm();
  }

  const onDelete=async()=>{
    try {
      await menuController.deleteMenu(accessToken,menu._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{menu.title}</span>
          <span className="menu-item__info-path">{menu.path}</span>
        </div>
        <div>
          <Button icon primary onClick={openUpdateModal}>
            <Icon name="pencil"></Icon>
          </Button>

          <Button
            icon
            color={menu.active ? "orange" : "teal"}
            onClick={openDesactivateActivateConfirm}
          >
            <Icon name={menu.active ? "ban" : "check"}></Icon>
          </Button>

          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash"></Icon>
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <MenuForm
          onClose={onOpenCloseModal}
          menu={menu}
          onReload={onReload}
        ></MenuForm>
      </BasicModal>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirMessage}
        size="mini"
      ></Confirm>
    </>
  );
}
