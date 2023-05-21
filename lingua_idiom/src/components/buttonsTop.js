import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { useState } from "react";
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";

function buttonsTop() {

return ( 
    <div className="buttonsTop">
     <Button
    className="buttom-audio"
    onClick={""}
    icon={<HeartTwoTone />}
  ></Button>
  <Button
    className="buttom-audio"
    onClick={""}
    id="like"
    icon={<LikeTwoTone />}
  >
    {}
  </Button>
  <Button
    className="buttom-audio"
    onClick={""}
    id="dislike"
    icon={<DislikeTwoTone />}
  >
    {}
  </Button>
  </div> 
  )

}

export default buttonsTop;
