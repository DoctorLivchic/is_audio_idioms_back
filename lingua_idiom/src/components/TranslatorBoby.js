import React, { Component } from "react";
import {Form,Input,Button} from "antd";
import Language_selection from "./Language_selection";
import TextArea from "./TextArea";
import SearchCategory from "./SearchCategory";
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";

class TranslatorBoby extends React.Component {
    render() {
      const { TextArea } = Input;
      return (
        <div className="TranslatorBoby">
        <div className="Contentlefttransl">
          <div className="Language_selection">              
                  <Language_selection/>
            </div>
            <div className="TextArea">
                <TextArea style={{height:"280px"}}/>
                <div className="Chek">
                <SearchCategory></SearchCategory>
                </div>
          <div  className="ButtonTr">
                <Button
                className="buttonsTop"
                onClick={"addToFavourite"}
                icon={<HeartTwoTone />}
              ></Button>
              <Button
                className="buttonsTop"
                onClick={"likePhrase"}
                id="like"
                icon={<LikeTwoTone />}
              >
                {}
              </Button>
              <Button
                className="buttonsTop"
                onClick={""}
                id="dislike"
                icon={<DislikeTwoTone />}
              >
                {""}
              </Button>
              <Button
                // onClick={() => {
                //   navigate("");
                // }}
                onClick={""}
                className="buttonsTop"
              >
                Прослушать
              </Button>
                </div>
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
         <div className="TextArea">
        <TextArea style={{height:"280px"}} />
          </div> 
          <Button onClick={"PlayAudio2"} className="buttonsTop">
                Прослушать
              </Button>      
        </div>
        </div>
        );
    }
  }
  export default TranslatorBoby;