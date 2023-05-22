import React from "react";
import { Layout } from "antd";
import page_body from "../img/page_body_right.png";
import Ellipse from "../img/Ellipse.png";
import { useNavigate } from "react-router-dom";
import Vector from "../img/Vector.png";
const { Content } = Layout;

// npm i antd что бы работало с компонентами
function PageBody() {
  const navigate = useNavigate();
  return (
    <div className="PageBobi">
      <div className="Contentleft">
        <div className="page_body_h1">Откройте мир фразеологизмов!</div>
        <div className="page_body_h2">
          Мы предлагаем платформу для тех, кто занимаеться изучением
          французского или корейского языков и столкнулся с проблемой перевода
          фразеологизмов и идиом
        </div>
        <div className="page_button">
          <div
            onClick={() => {
              navigate("/pages/Translater");
            }}
            className="page_button_text"
          >
            Начать переводить
          </div>
          <div className="page_button_circle">
            <img
              onClick={() => {
                navigate("/pages/Translater");
              }}
              src={Ellipse}
            />
          </div>
        </div>
      </div>
      <div className="Contentright">
        <div
          className="imgPG"
          style={{
            backgroundImage: `url(${page_body})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}

export default PageBody;
