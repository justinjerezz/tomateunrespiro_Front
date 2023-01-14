import React from "react";
import {Container} from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
        <Container>
          <h1>BIENVENID@ A TOMATE UN RESPIRO</h1>
          <h2>
            Explora, ecuentra y comparte tu experiencia vivída 
            <br/>
            en un lugar único para ti.
          </h2>
        </Container>
        <div className="banner__dark"></div>
    </div>
  );
}
