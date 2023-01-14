import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div className="footer-menu">
      <h4>Navegacion</h4>
      <Grid columns={1}>
        <Grid.Column>
          <Link to="/">
            <Icon name="home" />
            Home
          </Link>
          <Link to="/blog">
            <Icon name="map" />
            Blog
          </Link>
          <Link to="/admin">
            <Icon name="user circle outline" />
            Iniciar Sesion
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
}
