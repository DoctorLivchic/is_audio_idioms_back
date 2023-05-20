import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";


class TextArea extends React.Component {
    render() {
      return (
        <TextArea
        showCount
        // value={translitExit}
        id="textAreaExit"
        maxLength={100}
        /*onChange={onChange}*/ placeholder="Перевод"
        className="Text_area"
      />
      )}}
export default TextArea;