import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map,find } from "lodash";
import { User } from "../../../../api";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUser(props) {
  const { usersActives, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const [infoUser, setInfoUser] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      setUsers(null);
      try {
        const infoUserResponse = await userController.getMe(accessToken);
        const response = await userController.getUsers(
          accessToken,
          usersActives
        );
        setInfoUser(infoUserResponse);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActives, reload]);

  if (!users) return <Loader active inline="centered"></Loader>;
  if (size(users.response) === 0) return "No hay ningún usuario";

  const usuarioActual=find(users.response,(user)=>{
    return user._id===infoUser._id;
  })

  if (infoUser.role === "user"){
    return (
      <UserItem key={usuarioActual._id} user={usuarioActual} onReload={onReload}></UserItem>
    );
    }else{
      return map(users.response, (user) => (
        <UserItem key={user._id} user={user} onReload={onReload}></UserItem>
      ));
    }

}
