import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { useEffect, useState } from "react";
import { Table, notification,Button, Form, Input, Select , Modal} from 'antd';
import { useForm } from "antd/es/form/Form";

//Импорт компонентов
import Header from "../components/header";
import logoHeaderAuthOther from "../img/logoHeaderAuthOther.png";
import { supabase } from "../supabase/supabaseClient";

function ManageOfStat() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    const [request_status, setrequest] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = useForm()
    const columns = [
        {
            title:'Номер категории',
            dataIndex:'status_id',
            key:'status_id'
        },
        {
            title:'Дата добавления',
            dataIndex:'created_at',
            key:'created_at'
        },
        {
            title:'Название темы',
            dataIndex:'status_name',
            key:'status_name'
        }
      ]
      
      const GridDataOption = {
        rowCount:10,
        page:1,
        orderBy:'status_id',
        from:'request_status'
      }

      const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
       
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange:onSelectChange
    };
    
      useEffect(() => {
        getphrase().then(()=>setLoading(false));
      }, [loading]);
    
    function update(){
    setLoading(true);
    }
    function cancel(){
      setShow(false)
  }
    
    
    
      async function getphrase() {
        // const request = await supabase.from("request").select();
        // const data = (await request).data;
        const status = await supabase.from("request_status").select();
        const t = (await status).data;
          const data = await supabase
          .from('request_status')
          .select()
          .order('status_id')
        setrequest(data.data)     
      }
     
      async function delete_row(){
        const status = await supabase.from("request_status").select()
        const data1 = (await status).data;
        for (let i = 0; i < selectedRowKeys.length; i++){  
            try {
              const { error } = await supabase
              .from('request_status')
              .delete()
              .eq('status_id',selectedRowKeys.at(i));
              notification.open({message:'Успешно',description:'запись поставленна на удаление'})
              console.log("Запись удалена",selectedRowKeys.at(i))           
        }
        catch (error) {
          notification.open({message:'Ошибка',description:error.message});
        }
        }
        getphrase()
        update()
        }
    
      async function add_stat(){
        const stat_name1 = form.getFieldValue("stat_name");
        console.log(stat_name1)
        // for (let i = 0; i < selectedRowKeys.length; i++){  
            try {    
              const { error }  = await supabase
              .from('request_status')
              .insert({status_name:stat_name1})
              console.log('Точка--')           
        
        }
        
        catch (error) {
          notification.open({message:'Ошибка',description:error.message});
          console.log('Точка1--')
        }
        // }
        setShow(false)
        getphrase()
        console.log('Точка2--')
        update()
        
      
    }
  
      async function change_stat(){
        setShow(true)
        for (let i = 0; i < selectedRowKeys.length; i++){  
            try {    
              const data = await supabase.from("request_status").select()
              form.setFields(Object.keys(data).map((key) => ({
                name: key,
                value: data[key],
            })))
              console.log('Точка')
              // console.log((update1.toISOString()))
             
        }
        catch (error) {
          notification.open({message:'Ошибка',description:error.message});
          console.log('Точка1')
        }
        }
        getphrase()
        console.log('Точка2')
        update()
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
            change_stat();
        }}
      >
      Добавить
      </p>,
      <button
        className="buttonWhite"
        onClick={() => {
          signout(() => {
            navigate("/pages/ModerAccount", { replace: true });
          });
        }}
      >
        Назад
      </button>,
    ];
    return (
      <div className="">
        <Header logo={logoHeaderAuthOther} buttons={buttons} />
        <div className="bodyApp">
        <Modal open = {show}
            title="Изменение статуса" 
            onCancel={cancel}
            footer={[
                <Button onClick={add_stat}>
                    Добавить
                </Button>,
                <Button onClick={cancel}>
                    Назад
                </Button>
            ]}>
                <Form
                    form={form}
                    layout={"vertical"}
                    centered={true}
                    name="formRegistry"
                    style={{padding: 20}}>
                        <Form.Item
                            name="stat_name"
                            label="категория"
                            rules={[
                                {
                                    required: true,
                                    message: "категория не может быть пустым"
                                }
                            ]}>
                            <Input name="stat_name"
                            id="stat_name"
                            placeholder="категория"/>
                        </Form.Item>
                </Form>
            </Modal>
      <Table
      loading={loading}
      dataSource={request_status}
      columns={columns}
      rowSelection={rowSelection}
      rowKey={(record) => record.status_id}
      onRow={(record) => ({
        onClick: () => {
             
        },
    })}
      />
      </div>
      </div>
    );
  }
  
  export default ManageOfStat;