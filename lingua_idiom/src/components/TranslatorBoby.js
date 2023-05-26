import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import Language_selection from "./Language_selection";
import Language_selectionExit from "./Language_selection";
import SearchCategory from "./SearchCategory";
import { HeartTwoTone, DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";
import { supabase } from "../supabase/supabaseClient";
import { useState } from "react";
import { useAuth } from "../hoc/useAuth";

export default function TranslatorBoby() {
  const [lidesc, setlidesc] = useState([]);
  const [litranscEnter, setlitranscEnter] = useState([]);
  const [translitExit, settranslitExit] = useState([]);
  const [buttonTextLike, setButtonTextLike] = useState(0);
  const [buttonTextDislike, setButtonTextDislike] = useState(0);
  const [isplaying, setisplaying] = useState(false);
  const [isplaying2, setisplaying2] = useState(false);

  async function ChangeLanguage() {
    const chosenLanguage = document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык ввода
    const translationLanguage =
      document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
    document.getElementById("select_lang_enter").value = translationLanguage;
    document.getElementById("select_lang_exit").value = chosenLanguage;
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст из левого блока
    const secondT = document.getElementById("textAreaExit").value;
    const secondText = secondT.toLowerCase(); //Возвращаем текст из правого блока
    document.getElementById("textAreaEnter").value = secondT;
    document.getElementById("textAreaExit").value = firstT;
  }

  async function TranslateFunction() {
    GetLike();
    const translationLanguage =
      document.getElementById("select_lang_exit").value; //Возвращаем выбранный язык вывода
    // console.log(translationLanguage);

    //Получаем язык на который переводим
    let lang = 0;
    if (translationLanguage == "rus") {
      lang = 1;
    } else if (translationLanguage == "kor") {
      lang = 2;
    } else {
      lang = 3;
    }

    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст к переводу

    if (firstText == "") {
      document.getElementById("textAreaExit").value = "";
    } else {
      //Получаем айди фразеологизма с которого переводим
      const phrase = await supabase
        .from("phrase_text")
        .select()
        .eq("phrase_text_text", firstText);

      try {
        //Получаем фразеологизм на языке, который выбран к переводу
        const translate = await supabase
          .from("phrase_text")
          .select()
          .eq("phrase_id", phrase.data[0]["phrase_id"])
          .eq("language_id", lang);
        settranslitExit(translate.data[0]["phrase_text_text"]);
        setlidesc(translate.data[0]["phrase_text_desc"]);
        setlitranscEnter(translate.data[0]["phrase_text_transcription"]);

        //то выводим во второй текстБокс перевод по выбранному языку к переводу
        //  document.getElementById("textAreaExit").value += translate1.data[0]["link_phraseological"];
      } catch (error) {
        notification.open({
          message: "Простите!",
          description:
            "Мы не нашли нужного Вам фразеологизма. Вы всегда можете отправить нам запрос на добавление нового фразеологизма в Личном кабинете!",
        });
      }
      //-------------------------------------------------------------------------------
      // Вывод лайков
    }
  }

  //Функция лайка
  async function LikePhrase() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .eq("phrase_text_text", firstText);

    const phrase2 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    let like = phrase2.data[0]["rating_like"];
    console.log("like: " + like);
    const { error } = await supabase
      .from("phraseological")
      .update({ rating_like: like + 1 })
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    const phrase3 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    setButtonTextLike(phrase3.data[0]["rating_like"]);
  }

  //Функция дизлайка
  async function DislikePhrase() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .eq("phrase_text_text", firstText);

    const phrase2 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    let like = phrase2.data[0]["rating_dislike"];
    console.log("like: " + like);
    const { error } = await supabase
      .from("phraseological")
      .update({ rating_dislike: like + 1 })
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    const phrase3 = await supabase
      .from("phraseological")
      .select()
      .eq("phrase_id", phrase.data[0]["phrase_id"]);

    setButtonTextDislike(phrase3.data[0]["rating_dislike"]);
  }

  const { user } = useAuth();
  //Функция добавления в избранное
  async function AddToFavourite() {
    if (!user) {
      notification.open({
        message: "Внимание!",
        description:
          "Для добавления фразеологизма в избранное Вам необходимо войти.",
      });
    } else {
      notification.open({
        message: "Успешно!",
        description: "Фразеологизм добавлен!",
      });
    }
  }

  async function GetLike() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст

    if (firstText == "") {
      document.getElementById("textAreaExit").value = "";
    } else {
      try {
        const phrase = await supabase
          .from("phrase_text")
          .select()
          .eq("phrase_text_text", firstText);

        const likes = await supabase
          .from("phraseological")
          .select()
          .eq("phrase_id", phrase.data[0]["phrase_id"]);

        setButtonTextLike(likes.data[0]["rating_like"]);
        setButtonTextDislike(likes.data[0]["rating_dislike"]);
      } catch (error) {}
    }
  }

  async function PlayAudio() {
    try {
      const firstT = document.getElementById("textAreaEnter").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

      //Получаем айди фразеологизма
      const audio_id = await supabase
        .from("phrase_text")
        .select("audio_id")
        .eq("phrase_text_text", firstText);

      //----------------------------Получаем аудиодорожку
      const audio_path = await supabase
        .from("audio_recording")
        .select("audio_path")
        .eq("audio_id", audio_id.data[0]["audio_id"]);

      var path =
        "https://inyxfjfjxzdevxwzukie.supabase.co/storage/v1/object/public/audio/";

      path = path + audio_path.data[0]["audio_path"];

      var audio = document.getElementById("audio");

      audio.volume = 0.9;

      audio.src = path;

      if (isplaying) {
        setisplaying(false);
        audio.pause();
      } else {
        setisplaying(true);
        audio.play();
        setisplaying(false);
      }
    } catch {
      notification.open({
        message: "Не найдено ",
        description: "Аудио-озвучка временно отсутствует",
      });
    }
  }

  async function PlayAudio2() {
    try {
      const firstT = document.getElementById("textAreaExit").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

      //Получаем айди фразеологизма
      const audio_id = await supabase
        .from("phrase_text")
        .select("audio_id")
        .eq("phrase_text_text", firstText);

      //Получаем аудиодорожку
      const audio_path = await supabase
        .from("audio_recording")
        .select("audio_path")
        .eq("audio_id", audio_id.data[0]["audio_id"]);

      var path =
        "https://inyxfjfjxzdevxwzukie.supabase.co/storage/v1/object/public/audio/";

      path = path + audio_path.data[0]["audio_path"];

      var audio = document.getElementById("audio");

      audio.volume = 0.9;

      audio.src = path;

      if (isplaying) {
        setisplaying2(false);
        audio.pause();
      } else {
        setisplaying2(true);
        audio.play();
        setisplaying2(false);
      }
    } catch {
      notification.open({
        message: "Не найдено ",
        description: "Аудио-озвучка временно отсутствует",
      });
    }
  }

  const { TextArea } = Input;
  return (
    <div className="TranslatorBoby">
      <div className="Contentlefttransl">
        <div className="Language_selection">
          <Form>
            <Form.Item name="language_left" id="language_left">
              <select
                className="Language_selection"
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
            <audio id="audio" src=""></audio>
          </Form>
        </div>
        <div className="TextArea">
          <TextArea
            className="txt"
            id="textAreaEnter"
            maxLength={100}
            style={{ height: "280px" }}
            placeholder="Введите текст для перевода"
          />
          <div className="Chek">
            <SearchCategory></SearchCategory>
          </div>
          <div className="ButtonTr">
            <Button
              className="buttonsToplike"
              onClick={AddToFavourite}
              icon={<HeartTwoTone />}
            ></Button>
            <Button
              className="buttonsToplike"
              onClick={LikePhrase}
              id="like"
              icon={<LikeTwoTone />}
            >
              {buttonTextLike}
            </Button>
            <Button
              className="buttonsToplike"
              onClick={DislikePhrase}
              id="dislike"
              icon={<DislikeTwoTone />}
            >
              {buttonTextDislike}
            </Button>
            <Button onClick={PlayAudio} className="buttonsTop">
              Прослушать
            </Button>
          </div>
        </div>
      </div>
      <div className="middl">
        <Button className="Contentmiddletransl" onClick={ChangeLanguage}>
          Заменить
        </Button>
        <Button className="Contentmiddletransl" onClick={TranslateFunction}>
          Перевести
        </Button>
      </div>
      <div className="Contentrighttransl">
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
        <div className="TextArea">
          <TextArea
            className="txt"
            value={translitExit}
            id="textAreaExit"
            /*onChange={onChange}*/ placeholder="Перевод"
            style={{ height: "140px" }}
          />
          <TextArea
            className="txt"
            value={translitExit}
            id="textAreaExit1"
            /*onChange={onChange}*/ placeholder="Описание"
            style={{ height: "140px" }}
          />
        </div>
        <Button onClick={PlayAudio2} className="buttonsTop">
          Прослушать
        </Button>
      </div>
    </div>
  );
}
