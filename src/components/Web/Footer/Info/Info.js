import React from "react";
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils";
import "./Info.scss";

export function Info() {
  return (
    <div className="footer-info">
      <Icon.LogoBonito className="logo" />
      <p>
        Una web en la que podras ver 
        <br/> rutas publicadas
        por otras personas a la 
        <br/> vez que otras personas podrán 
        ver tus rutas.
      </p>
      {map(socialData, (social) => (
        <Button
          key={social.type}
          as="a"
          target="_black"
          href={social.link}
          color={social.type}
          icon={social.type}
        ></Button>
      ))}
    </div>
  );
}
