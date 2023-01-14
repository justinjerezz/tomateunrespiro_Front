import React from "react";
import {Container} from "semantic-ui-react";
import {TopBar,Footer} from "../../components/Web";
import "./ClientLayout.scss";

export function ClientLayout(props) {
    const{children}=props;

    return(
        <div className="client-layout">
            <div className="client-layout__header">
                <TopBar></TopBar>
            </div>
            {children}
            <div className="client-layout__footer">
                <Container>
                    <Footer.Info></Footer.Info>
                    <Footer.Menu></Footer.Menu>
                    <Footer.Newsletter></Footer.Newsletter>
                </Container>
                <Container>
                    <span>© Derechos Reservados  2023</span>
                    <span>JUSTIN JEREZ | WEB DEVELOPER</span>
                </Container>
            </div>
        </div>
    )
}
