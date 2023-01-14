import React, { useState, useEffect } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUser } from "../../../components/Admin/Users";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import "./User.scss";

const userController = new User();

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const { accessToken } = useAuth();
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

  const onOpenCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUser
            usersActives={true}
            reload={reload}
            onReload={onReload}
          ></ListUser>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUser
            usersActives={false}
            reload={reload}
            onReload={onReload}
          ></ListUser>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {infoUser === "admin" ? (
        <>
          <div className="users-page">
            <Button
              className="users-page__add"
              primary
              onClick={onOpenCloseModal}
            >
              Nuevo Usuario
            </Button>
            <Tab menu={{ secondary: true }} panes={panes}></Tab>
          </div>
          <BasicModal
            show={showModal}
            close={onOpenCloseModal}
            title="Crear nuevo usuario"
          >
            <UserForm close={onOpenCloseModal} onReload={onReload}></UserForm>
          </BasicModal>
        </>
      ) : (
        <>
          <div className="users-page">
          <Tab.Pane attached={false}>
          <ListUser
            usersActives={true}
            reload={reload}
            onReload={onReload}
          ></ListUser>
        </Tab.Pane>
          </div>
        </>
      )}
    </>
  );
}
