import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { useState } from "react";


function SearchCategory() {
    const [tag, settag] = useState([]);
  const [chbox, setchbox] = useState("none");
    async function onChange() {
        var chec = document.getElementById("one");
        if (chec.checked) {
          setchbox("contents");
          console.log("отобразить", chbox);
        } else {
          setchbox("none");
          console.log("не отобразить", chbox);
        }
        return chbox;
      }
    return ( 
        <div className="SearchCategory">
      <Checkbox id="one" onChange={onChange}>Поиск по категории</Checkbox>
        
    <Form.Item  style={{ display: chbox }}>
    <Select
      name="tag_id"
    //    onChange={handleChange}            
      defaultValue="Выберите значение"           
      options={tag?.map((tag) => {
        return {
          label: tag.tag_name,
          value: tag.tag_id,
        };
      })}
    />
   </Form.Item>
   </div>
   )
}
export default SearchCategory