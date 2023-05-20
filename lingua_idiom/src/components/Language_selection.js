import React from "react";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";

class Language_selection extends React.Component {
    render() {
      return (
        <div className="Language_selection">
    <Form>
        <Form.Item name="language_left" id="language_left">
                
                  <select
                    id="select_lang_enter"
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
  }
  export default Language_selection;