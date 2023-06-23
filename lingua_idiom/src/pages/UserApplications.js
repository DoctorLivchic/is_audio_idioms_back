import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { useEffect, useState } from "react";
import { Table, notification } from 'antd';

//Импорт компонентов
import Header from "../components/header";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";

function UserApplications() {
    const navigate = useNavigate();
    const { signout } = useAuth();
    const [request, setrequest] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    const[pagination]=useState({
      current:1,
      pageSize:10,
      showSizeChanger:true,
      showTotal:(total)=>{
        return "Всего "+total
      },
      onChange:(page,pageSize)=>{
        pagination.pageSize=pageSize;
        pagination.current=page;
        GridDataOption.page=page;
        GridDataOption.rowCount=pageSize;
        
      }
    })
    const columns = [
        {
          title: 'Номер запроса',
          dataIndex: 'request_id',
          key: 'request_id'
        },
        {
          title: 'Пользователь',
          dataIndex: 'user_id',
          key: 'user_id'
        },
        {
          title: 'Русский перевод',
          dataIndex: 'rus_request',
          key: 'rus_request'
        },
        {
          title: 'Французский перевод',
          dataIndex: 'fre_request',
          key: 'fre_request'
        },
        {
          title: 'Корейский перевод',
          dataIndex: 'kor_request',
          key: 'kor_request'
        },
        {
          title: 'Статус запроса',
          dataIndex: 'status_id',
          key: 'status_id'
        },
        {
          title: 'Вид операции',
          dataIndex: 'type_id',
          key: 'type_id'
        },
        {
          title: 'Категория',
          dataIndex: 'tag_id',
          key: 'tag_id'
        }
      ]


    const GridDataOption = {
        rowCount: 10,
        page: 1,
        orderBy: 'request_id',
        from: 'request'
      }
    const buttons = [
      <p
        onClick={() => {
            delete_row();
        }}
      >
        Удалить 
      </p>,
      <p
        onClick={() => {
            update();
        }}
      >
        Обновить
      </p>,
       <p
       onClick={() => {
        push_request();
       }}
     >
       Добавить в проверенные
     </p>,
      <button
        className="buttonWhite"
        onClick={() => {
          signout(() => navigate("/pages/ModerAccount", { replace: true }));
        }}
      >
        Назад
      </button>,
    ];

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
      };
  
    useEffect(() => {
        getrequest().then(() => setLoading(false));
      }, [loading]);
    
      function update() {
        setLoading(true);
      }

    async function getrequest() {
        // const request = await supabase.from("request").select();
        // const data = (await request).data;
      try {
          const request = await supabase.from("request").select();
          const req = (await request).data;
          const data = await supabase
            .from('request')
            .select()
            .eq('status_id', `${1}`)
            .order('request_id')
          for (let i = 0; i < data.data.length; i++) { 
            if (data.data[i]["type_id"] == 0) {
              data.data[i]["type_id"] = "Редактирование";
            } else if ((data.data[i]["type_id"] == 1)) {
              data.data[i]["type_id"] = "Добавление";}
          
          if (data.data[i]["status_id"] == 1) {
            data.data[i]["status_id"] = "Новое";
          } else if ((data.data[i]["status_id"] == 2)) {
            data.data[i]["status_id"] = "Отклонено";}
            else if ((data.data[i]["status_id"] == 3)) {
              data.data[i]["status_id"] = "Принято";}
              else if ((data.data[i]["status_id"] == 4)) {
                data.data[i]["status_id"] = "Обработанно";}

                if (data.data[i]["tag_id"] == 1) {
                  data.data[i]["tag_id"] = "Влияние на человека";}  
                  else if ((data.data[i]["tag_id"] == 2)) {
                    data.data[i]["tag_id"] = "внешность человека";}
                    else if ((data.data[i]["tag_id"] == 3)) {
                      data.data[i]["tag_id"] = "действия человека";}
                      else if ((data.data[i]["tag_id"] == 5)) {
                        data.data[i]["tag_id"] = "другое";}
                        else if ((data.data[i]["tag_id"] == 6)) {
                          data.data[i]["tag_id"] = "количество";}
                          else if ((data.data[i]["tag_id"] == 7)) {
                            data.data[i]["tag_id"] = "негативные привычки";}
                            else if ((data.data[i]["tag_id"] == 9)) {
                              data.data[i]["tag_id"] = "описание человека";}
                              else if ((data.data[i]["tag_id"] == 10)) {
                                data.data[i]["tag_id"] = "отличительные черты человека";}
                                else if ((data.data[i]["tag_id"] == 11)) {
                                  data.data[i]["tag_id"] = "поведение человека";}
                                  else if ((data.data[i]["tag_id"] == 12)) {
                                    data.data[i]["tag_id"] = "поступки человека";}
                                    else if ((data.data[i]["tag_id"] == 13)) {
                                      data.data[i]["tag_id"] = "предпочтение человека ";}
                                      else if ((data.data[i]["tag_id"] == 14)) {
                                        data.data[i]["tag_id"] = "состояние человека";}
                                        else if ((data.data[i]["tag_id"] == 15)) {
                                          data.data[i]["tag_id"] = "социальные отношения";}
                                          else if ((data.data[i]["tag_id"] == 16)) {
                                            data.data[i]["tag_id"] = "характер человека";}
                                            else if ((data.data[i]["tag_id"] == 18)) {
                                              data.data[i]["tag_id"] = "коммуникация";}
                                              else if ((data.data[i]["tag_id"] == 19)) {
                                                data.data[i]["tag_id"] = "описание ситуации";}
                                                else if ((data.data[i]["tag_id"] == 20)) {
                                                  data.data[i]["tag_id"] = "характер действия";}
                  
        }
          setrequest(data.data)
      } catch (error) {
        console.log(error)
      }
      }

    async function delete_row() {
        const request = await supabase.from("request").select().filter('type_id', 'not.gt', 1);
        const data1 = (await request).data;
        for (let i = 0; i < selectedRowKeys.length; i++) {
          try {
            const { error } = await supabase
              .from('request')
              .delete()
              .eq('request_id', selectedRowKeys.at(i));
            console.log("Запись удалена", selectedRowKeys.at(i))
           notification.open({description:'Запись успешно удалена',message: 'Успешно'})
          }
          catch (error) {
            notification.open({ message: 'Ошибка', description: 'Ошибка,некоректно введены данные' });
          }
        }
        getrequest()
        update()
      }

    async function push_request() {
        for (let i = 0; i < selectedRowKeys.length; i++) {
          try {
            var update1 = ((new Date()).toISOString()).toLocaleString();
            const { error } = await supabase
              .from('request')
              .update({ status_id: '4', update_at: (update1) })
              .eq('request_id', selectedRowKeys.at(i));
            console.log("Запись обновлена")
            console.log((update1))
            notification.open({ message: 'Успешно', description:'Запись успешно обновлена' });
          }
          catch (error) {
            notification.open({ message: 'Ошибка', description: error.message });
          }
        }
        getrequest()
        update()
      }

    return (
      <div className="">
        <Header logo={logoHeaderAuthOther} buttons={buttons} />
        <div className="bodyApp">
        <Table
        loading={loading}
        pagination={pagination}
        dataSource={request}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={(record) => record.request_id}
        onRow={(record) => ({
          onClick: () => {

          },
        })}
      />
      </div>
      </div>
    );
  }
  
  export default UserApplications;