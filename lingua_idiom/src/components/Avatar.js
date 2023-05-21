import React, { Component } from "react";
import aboutContentRight from "../img/aboutContentRight.png";
class Avatar extends React.Component {
  render() {
    return (
      <div className="aboutRight">
        <div
          className="imgPG"
          style={{
            backgroundImage: `url(${aboutContentRight})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="avatarDiv">{this.props.image}</div>
        </div>
      </div>
    );
  }
}
export default Avatar;
