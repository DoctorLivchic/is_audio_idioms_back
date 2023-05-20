import React, { Component } from "react";

class Avatar extends React.Component {
  render() {
    return (
      <div className="personMainDiv">
        <div className="avatarDiv">{this.props.image}</div>
      </div>
    );
  }
}
export default Avatar;
