import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";




function Language_selection() {
  async function HandleChange  (value)  {
    const val = value
    console.log(val+" значение")

    const translationLanguage =
    document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык вывода
  // console.log(translationLanguage);
  }
      return (
        <div className="Language_selection">
    <Form>
        <Form.Item name="language_left" id="language_left">
                
                  <Select
                    name="select_lang_enter"
                    defaultValue="Выберите язык"  
                    onChange={HandleChange}  
                  >
                    <option id="rus" value="rus">
                      Русский
                    </option>
                    <option id="fre" value="fre">
                      French
                    </option>
                    <option id="kor" value="kor">
                      Korean
                    </option>
                  </Select>
                
              </Form.Item>
            </Form>
        </div>
        );
    
  }
  export default Language_selection;