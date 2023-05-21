import React, { Component } from "react";
//Импорт картинок
import aboutContentLeft from "../img/aboutContentLeft.png";
class AboutHeader extends React.Component {
  render() {
    return (
      <div className="aboutLeft">
        <div
          className="imgPG"
          style={{
            backgroundImage: `url(${aboutContentLeft})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    );
  }
}
export default AboutHeader;
