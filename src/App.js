import React from "react";
import { HashRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";
import { AuthProvider } from "./contexts";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <WebRouter></WebRouter>
        <AdminRouter></AdminRouter>
      </HashRouter>
    </AuthProvider>
  );
}
