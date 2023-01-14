import React from "react";
import { Icon } from "../../assets";
import {
  AdminMenu,
  Logout,
  GoToHome,
} from "../../components/Admin/AdminLayout";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Icon.LogoBonito className="logo" />
        <AdminMenu></AdminMenu>
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <GoToHome></GoToHome>
          <Logout></Logout>
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
