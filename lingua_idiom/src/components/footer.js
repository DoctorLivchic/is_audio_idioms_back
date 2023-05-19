import React, { Component } from "react";
//Импорт картинок
import logoFooter from "../img/logo_footer_logout.png";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <img src={logoFooter} />
        <div>{this.props.buttons}</div>
      </div>
    );
  }
}
export default Footer;
