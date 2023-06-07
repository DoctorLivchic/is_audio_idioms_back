import React from "react";
import { Layout } from "antd";
import bodyacc from "../img/bodyacc.png";
import { supabase } from "../supabase/supabaseClient";
import { Form, Input, Button, notification } from "antd";

function ExpertBody() {
  async function setTable() {
    const phrases = await supabase.from("temp").select();
    for (let i = 0; i < phrases.data.length; i++) {
      let tag_id = 0;
      let tag_text = phrases.data[i]["tag_id"];

      tag_text.trim();
      switch (tag_text) {
        case "влияние на человека":
          tag_id = 1;
          break;

        case "внешность человека":
          tag_id = 2;
          break;

        case "действия человека":
          tag_id = 3;
          break;

        case "другое":
          tag_id = 5;
          break;

        case "количество":
          tag_id = 6;
          break;

        case "негативные привычки":
          tag_id = 7;
          break;

        case "описание человека":
          tag_id = 9;
          break;

        case "отличительные черты человека":
          tag_id = 10;
          break;

        case "поведение человека":
          tag_id = 11;
          break;

        case "поступки человека":
          tag_id = 12;
          break;

        case "предпочтения человека":
          tag_id = 13;
          break;

        case "состояние человека":
          tag_id = 14;
          break;

        case "социальные отношения":
          tag_id = 15;
          break;

        case "характер человека":
          tag_id = 16;
          break;
      }
      if (tag_id == 0) {
        console.log(phrases.data[i]["id"]);
      }

      try {
        var update = new Date().toISOString().toLocaleString();
        //Заносим записи в таблицу фразеологизмов
        const { error } = await supabase.from("phraseological").insert([
          {
            link_phraseological: phrases.data[i]["link_phraseological"],
            tag_id: tag_id,
            updated_at: update,
          },
        ]);

        //Получаем последний созданный айди
        const data = await supabase
          .from("phraseological")
          .select("phrase_id")
          .order("phrase_id", { ascending: false })
          .limit(1);

        let last_id = data.data[0]["phrase_id"];

        const { error1 } = await supabase.from("phrase_text").insert([
          {
            phrase_id: last_id,
            language_id: 1,
            phrase_text_text: phrases.data[i]["rus"],
            phrase_text_desc: phrases.data[i]["phrase_text_desc"],
          },
          {
            phrase_id: last_id,
            language_id: 2,
            phrase_text_text: phrases.data[i]["kor"],
            phrase_text_desc: phrases.data[i]["phrase_text_desc"],
          },
          {
            phrase_id: last_id,
            language_id: 3,
            phrase_text_text: phrases.data[i]["fre"],
            phrase_text_desc: phrases.data[i]["phrase_text_desc"],
          },
        ]);
        console.log(i);
      } catch (error) {
        console.log(error);
      }
    }
    notification.open({
      message: "Успешно!",
      description: "Записи успешно добавлены!",
    });
  }

  return (
    <div className="PageBobiExp">
      <img src={bodyacc}></img>
      <button className="buttonWhite" onClick={setTable}>
        Добавить записи
      </button>
      ,
    </div>
  );
}

export default ExpertBody;
