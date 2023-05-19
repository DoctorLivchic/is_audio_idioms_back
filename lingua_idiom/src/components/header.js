import React, { Component } from "react";
//Импорт картинок
import logoHeader from "../img/logo_header_logout.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="headerInside">
          <div className="img_logo">
            <img src={logoHeader} />
          </div>
          <div className="" >{this.props.buttons}</div>
        </div >
      </div>
    );
  }
}
export default Header;
