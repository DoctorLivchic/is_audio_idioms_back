import React, { Component } from "react";
//Импорт картинок
import logoHeader from "../img/logo_header_logout.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="headerChildren">
          <img src={logoHeader} />
        </div>
        <div className="buttons">{this.props.buttons}</div>
      </div>
    );
  }
}
export default Header;
