import React from "react";
import { Layout} from 'antd';
import page_body from "../img/page_body_right.png";
const {  Content } = Layout;

// npm i antd что бы работало с компонентами
class PageBodu extends React.Component{   
    render(){      
        return(
            <div  >
            <Content className="Contentleft">
           <h1 className="page_body_p1">Откройте мир фразеологизмов!</h1>
           <h4 className="page_body_p2">Мы предлагаем платформу для тех, кто занимаеться изучением французского или корейского языков и столкнулся с проблемой перевода фразеологизмов и идиом</h4>
          <div className="page_button ">
            <p className="page_button_text">Начать переводить</p>
            <div className="page_button_circle" >
                <div className="page_button_circl1"></div>

                
            </div>
           
          </div>
           </Content>
           <Content className="Contentright">
           <div >
           <img className="Contentright1" src={page_body} />
           </div>
           </Content>
           </div>
        )
    }
}
export default PageBodu