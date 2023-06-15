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
  const [userid, setuserid] = useState(0);
  const [phreid, setphreid] = useState([]);

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
    document.getElementById("textAreaExit1").value = "";
    document.getElementById("textAreaExit2").value = "";
  }

  async function TranslateFunction() {
    GetLike();
    isAddFav();
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
        .ilike("phrase_text_text", `%${firstText}%`);

      try {
        //Получаем фразеологизм на языке, который выбран к переводу
        const translate = await supabase
          .from("phrase_text")
          .select()
          .eq("phrase_id", phrase.data[0]["phrase_id"])
          .eq("language_id", lang);
        settranslitExit(translate.data[0]["phrase_text_text"]);
        setphreid(translate.data[0]["phrase_id"]);
        setlitranscEnter(translate.data[0]["phrase_text_transcription"]);
        setlidesc(translate.data[0]["phrase_text_desc"]);

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
    console.log(translitExit);
  }
  async function examinationlike() {
    if (!user) {
      notification.open({
        message: "Внимание!",
        description: "Что бы поставить лайк Вам необходимо войти.",
      });
    } else {
      //Функция лайка
      const firstT = document.getElementById("textAreaEnter").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма
      if (firstText == "") {
        notification.open({
          message: "Внимание!",
          description: "Введите фразеологизм что бы поставить лайк!",
        });
      } else {
        //Получаем айди фразеологизма
        const phrase = await supabase
          .from("phrase_text")
          .select("phrase_id")
          .ilike("phrase_text_text", `%${firstText}%`);

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
    }
  }
  //Функция дизлайка
  async function examinationdislike() {
    if (!user) {
      notification.open({
        message: "Внимание!",
        description: "Что бы поставить дизлайк Вам необходимо войти.",
      });
    } else {
      const firstT = document.getElementById("textAreaEnter").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма
      if (firstText == "") {
        notification.open({
          message: "Внимание!",
          description: "Введите фразеологизм что бы поставить дизлайк!",
        });
      } else {
        //Получаем айди фразеологизма
        const phrase = await supabase
          .from("phrase_text")
          .select("phrase_id")
          .ilike("phrase_text_text", `%${firstText}%`);

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
    }
  }

  const { user } = useAuth();

  // //Функция добавления в избранное
  // async function AddToFavourite() {
  //   if (!user) {
  //     notification.open({
  //       message: "Внимание!",
  //       description:
  //         "Для добавления фразеологизма в избранное Вам необходимо войти.",
  //     });
  //   } else {
  //     const { error } = await supabase
  //       .from("favourites_phraseological")
  //       .insert({
  //         phrase_id: phreid,
  //         user_id: localStorage.getItem("userID"),
  //       });

  //     notification.open({
  //       message: "Успешно!",
  //       description: "Фразеологизм добавлен!",
  //     });
  //   }
  // }

  //--------------------------Состояния цветов ------------------------------------------
  const [color, setcolor] = useState("");
  const [stylBut, setstylBut] = useState([]);

  async function isAddFav() {
    const fav = await supabase
      .from("favourites_phraseological")
      .select("phrase_id")
      .eq("user_id", localStorage.getItem("userID"));

    const firstT = document.getElementById("textAreaEnter").value;
    var firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .ilike("phrase_text_text", `%${firstText}%`);

    let ok = false;

    for (let i = 0; i < fav.data.length; i++) {
      if (phrase.data[0]["phrase_id"] == fav.data[i]["phrase_id"]) {
        // delFromFav();
        ok = true;
        break;
      }
    }
    if (!ok) {
      setcolor("");
      setstylBut("");
    } else {
      setstylBut("#f5988c");
      setcolor("#eb2f96");
    }
  }

  async function addToFavButton() {
    if (!user) {
      notification.open({
        message: "Внимание!",
        description:
          "Для добавления фразеологизма в избранное Вам необходимо войти.",
      });
    } else {
      try {
        const fav = await supabase
          .from("favourites_phraseological")
          .select("phrase_id")
          .eq("user_id", localStorage.getItem("userID"));

        const firstT = document.getElementById("textAreaEnter").value;
        var firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

        //Получаем айди фразеологизма
        const phrase = await supabase
          .from("phrase_text")
          .select("phrase_id")
          .ilike("phrase_text_text", `%${firstText}%`);

        let ok = false;

        for (let i = 0; i < fav.data.length; i++) {
          if (phrase.data[0]["phrase_id"] == fav.data[i]["phrase_id"]) {
            // delFromFav();
            ok = true;
            break;
          }
        }
        if (!ok) {
          addToFavourite();
          notification.open({
            message: "Успешно!",
            description: "Фразеологизм добавлен!",
          });
        } else {
          delFromFav();
          notification.open({
            message: "Успешно!",
            description: "Фразеологизм удален!",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function delFromFav() {
    if (isAddFav) {
      const firstT = document.getElementById("textAreaEnter").value;
      const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма

      //Получаем айди фразеологизма
      const phrase = await supabase
        .from("phrase_text")
        .select("phrase_id")
        .ilike("phrase_text_text", `%${firstText}%`);
      try {
        const { error } = await supabase
          .from("favourites_phraseological")
          .delete()
          .eq("phrase_id", phrase.data[0]["phrase_id"]);
        isAddFav();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async function addToFavourite() {
    const firstT = document.getElementById("textAreaEnter").value;
    const firstText = firstT.toLowerCase(); //Возвращаем текст фразеологизма
    const translationLanguage =
      document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык вывода
    //Получаем язык на который переводим
    let lang = 0;
    if (translationLanguage == "rus") {
      lang = 1;
    } else if (translationLanguage == "kor") {
      lang = 2;
    } else {
      lang = 3;
    }

    //Получаем айди фразеологизма
    const phrase = await supabase
      .from("phrase_text")
      .select("phrase_id")
      .ilike("phrase_text_text", `%${firstText}%`);

    //Получаем айди пользователя
    let userID = localStorage.getItem("userID"); //получаем айди авторизованного пользователя
    console.log(userID);

    //Добавляем фразеологизм в избранные
    try {
      const { error2 } = await supabase
        .from("favourites_phraseological")
        .insert([
          {
            phrase_id: phrase.data[0]["phrase_id"],
            user_id: parseInt(userID),
            language_id: lang,
          },
        ]);
      isAddFav();
    } catch (error2) {
      alert(error2.message);
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
          .ilike("phrase_text_text", `%${firstText}%`);

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
        .ilike("phrase_text_text", `%${firstText}%`);

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
            style={{ height: "390px" }}
            placeholder="Введите текст для перевода"
          />
          <div className="Chek">
            <SearchCategory></SearchCategory>
          </div>
          <div className="ButtonTr">
            <Button
              className="buttonsToplike"
              onClick={addToFavButton}
              style={{ backgroundColor: stylBut }}
              icon={<HeartTwoTone twoToneColor={color} />}
            ></Button>
            <Button
              className="buttonsToplike"
              onClick={examinationlike}
              id="like"
              icon={<LikeTwoTone />}
            >
              {buttonTextLike}
            </Button>
            <Button
              className="buttonsToplike"
              onClick={examinationdislike}
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
            style={{ height: "130px" }}
          />
          <TextArea
            className="txt"
            value={litranscEnter}
            id="textAreaExit1"
            /*onChange={onChange}*/ placeholder="Транскрипция"
            style={{ height: "130px" }}
          />
          <TextArea
            className="txt"
            value={lidesc}
            id="textAreaExit2"
            /*onChange={onChange}*/ placeholder="Описание"
            style={{ height: "130px" }}
          />
        </div>
        <Button onClick={PlayAudio2} className="buttonsTop1">
          Прослушать
        </Button>
      </div>
    </div>
  );
}
