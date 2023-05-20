import React, { Component } from "react";
import {Form,Input} from "antd";
import Language_selection from "./Language_selection";
import TextArea from "./TextArea";
class TranslatorBoby extends React.Component {
    render() {
      const { TextArea } = Input;
      return (
        <div className="TranslatorBoby">
        <div className="Contentlefttransl">
          <div className="Language_selection">              
                  <Language_selection/>
            </div>
            <div className="TextAreaEnter">
                <TextArea/>
            </div>
          
        </div>
        <div className="middl">
        <button className="Contentmiddletransl">Заменить</button>
        <button className="Contentmiddletransl">Перевести</button>
        </div>
        <div className="Contentrighttransl">
          <div className="Language_selection">
        <Language_selection/>
         </div>
         <div className="TextAreaExit">
        <TextArea/>
          </div>       
        </div>
        </div>
        );
    }
  }
  export default TranslatorBoby;