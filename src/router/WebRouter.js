import React from "react";
import {Routes,Route} from "react-router-dom";
import {ClientLayout} from "../layouts";
import {Home,Blog,Post} from "../pages/web";

export function WebRouter() {
  const loadLayout=(Layout,Page)=>{
    return(
      <Layout>
        <Page>

        </Page>
      </Layout>
    )
  }
  return (
    <Routes>
        <Route path="/" element={loadLayout(ClientLayout,Home)}/>
        <Route path="/blog" element={loadLayout(ClientLayout,Blog)}/>
        <Route path="/blog/:path" element={loadLayout(ClientLayout,Post)}/>

    </Routes>
  );
}
