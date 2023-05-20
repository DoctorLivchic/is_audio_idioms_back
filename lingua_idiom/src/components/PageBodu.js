import React from "react";
import { Layout } from "antd";
import page_body from "../img/page_body_right.png";
import Ellipse from "../img/Ellipse.png";
const { Content } = Layout;

// npm i antd что бы работало с компонентами
class PageBodu extends React.Component {
  render() {
    return (
      <div>
        <div className="Contentleft">
          <h1 className="page_body_p1">Откройте мир фразеологизмов!</h1>
          <h4 className="page_body_p2">
            Мы предлагаем платформу для тех, кто занимаеться изучением
            французского или корейского языков и столкнулся с проблемой перевода
            фразеологизмов и идиом
          </h4>
          <div className="page_button ">
            <p className="page_button_text">Начать переводить</p>
            <div className="page_button_circle">
              <div className="page_button_circl1"></div>
              <img className="" src={Ellipse} />
            </div>
          </div>
        </div>
        <div className="Contentright">
          <div>
            <img src={page_body} />
          </div>
        </div>
      </div>
    );
  }
}
export default PageBodu;
