import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { useState } from "react";
import React, { useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";


function SearchCategory() {
  const [tag, settag] = useState([]);
  const [chbox, setchbox] = useState("none");
    async function onChange() {
        var chec = document.getElementById("one");
        if (chec.checked) {
          setchbox("contents");
          console.log("отобразить", chbox);
        } else {
          setchbox("none");
          console.log("не отобразить", chbox);
        }
        return chbox;
      }
      useEffect(() => {
        gettags();
      }, []);


      async function HandleChange  (value)  {
        const val = value
        console.log(val+" значение")
    
        const translationLanguage =
        document.getElementById("select_lang_enter").value; //Возвращаем выбранный язык вывода
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
      console.log(lang+" язык")
    
      document.getElementById("textAreaEnter").value =""
      try {
        //Получаем фразеологизм на языке, который выбран к переводу
        const translate_tag = await supabase
          .from("phraseological")
          .select("phrase_id","tag_id")
          .eq("tag_id", val)
    
          console.log(translate_tag.data)
    
        for(let i = 0; i <= translate_tag.data.length; i++){
        const translate_tag_enter = await supabase
          .from("phrase_text")
          .select("phrase_text_text")
          .eq("phrase_id",translate_tag.data[i]["phrase_id"])
          .eq("language_id",lang)       
          console.log(translate_tag_enter.data)
          
        document.getElementById("textAreaEnter").value +=
        translate_tag_enter.data[0]["phrase_text_text"]+" ; " //то выводим во второй текстБокс перевод по выбранному языку к переводу
      }} catch (error) {
        notification.open({ message: "Успешно", description: "Найдены все фразеологизмы по выбранной категории" });
      }
      };

      async function gettags() {
        const tags = await supabase.from("tags").select();
        const tag = (await tags).data;
        const data_tag = await supabase.from("tags").select();
        settag(data_tag.data);
        return data_tag;
      }

    return ( 
        <div className="SearchCategory">
      <Checkbox id="one" className="one" colorBorder="#f44336" onChange={onChange}>Поиск по категории</Checkbox>
        
    <Form.Item  style={{ display: chbox }}>
    <Select
      name="tag_id"
      onChange={HandleChange}            
      defaultValue="Выберите значение"           
      options={tag?.map((tag) => {
        return {
          label: tag.tag_name,
          value: tag.tag_id,
        };
      })}
    />
   </Form.Item>
   </div>
   )
}
export default SearchCategory