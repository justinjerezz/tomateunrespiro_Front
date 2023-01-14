import React, { useState, useEffect } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { useAuth } from "../../../../hooks";
import { UserForm } from "../UserForm";
import { User } from "../../../../api";
import "./UserItem.scss";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titelModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [infoUser, setInfoUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const infoUserResponse = await userController.getMe(accessToken);
        setInfoUser(infoUserResponse.role);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario ${user.email}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          ></Image>
          <div>
            <p>
              {user.name} {user.surnames}
            </p>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil"></Icon>
          </Button>
          {infoUser === "admin" && (
           <>
           <Button
              icon
              color={user.active ? "orange" : "teal"}
              onClick={openDesactivateActivateConfirm}
            >
              <Icon name={user.active ? "ban" : "check"}></Icon>
            </Button>
             <Button icon color="red" onClick={openDeleteConfirm}>
             <Icon name="trash"></Icon>
           </Button>
           </>
          )}

         
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titelModal}>
        <UserForm
          close={onOpenCloseModal}
          onReload={onReload}
          user={user}
        ></UserForm>
      </BasicModal>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      ></Confirm>
    </>
  );
}
