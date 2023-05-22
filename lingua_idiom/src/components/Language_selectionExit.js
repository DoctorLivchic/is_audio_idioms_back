import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";


function Language_selectionExit() {

  async function HandleChange  (value)  {
    const val = value
    console.log(val+" значение")

    const translationLanguage =
    document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
  // console.log(translationLanguage);
  }
      return (
        <div className="Language_selection">
    <Form>
        <Form.Item name="language_left" id="language_left">
                
                  <select
                  className="Language_selection"
                   id="select_lang_exit"
                   onChange={(e) => {
                     console.log(e.target.value);
                   }}
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
                  </select>
                
              </Form.Item>
            </Form>
        </div>
        );
    
  }
  export default Language_selectionExit;