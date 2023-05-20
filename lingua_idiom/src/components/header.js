import React, { Component } from "react";
//Импорт картинок
import logoHeader from "../img/logo_header_logout2.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="headerChildren">
            <img src={logoHeader} />
          </div>
          <div className="buttons">{this.props.buttons}</div>
        </div>
      </div>
    );
  }
}
export default Header;
