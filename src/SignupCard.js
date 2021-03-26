import { Row, Col, Form, Button, Input, message } from "antd";
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";


const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 24,
    },
  };
const SignupCard= () => {
  //cargar del back
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
      console.log(values);
      if (values.usuario.length<3) {
        return message.error("Nombre de usuario muy corto")  
      }
      else if(values.contrasenia!==values.contrasenia2){
        return message.error("Las contrseñas no coinciden")  
      }
      else if(values.contrasenia.length<6){
        return message.error("La contraseña es muy corta")  
      }
      else{
        setLoading(true);
        axios.post("http://localhost:4000/usuario",{
          username: values.usuario, correo:"periquito@gmail.com", contrasena:values.contrasenia
        }).then((res)=>{
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(res.data.usuario))
        })
        .catch(e=>{
          if(e.response.status===409){
            message.error("Ya existe un usuario con este nombre, busca otro")
          }else{
            message.error("Inténtelo más tarde")
          }
          setLoading(false);

        })
      }
    };



    return (
      <div  className="login-card">
    
        <UserOutlined className="user-icon" style={{color: "white", fontSize: 50, textAlign:'center', display:"inline-block", marginBottom: "10px" }}  />
      
      <Row justify="space-around" >
        <Col span={24}>
        <p style={{textAlign:"center", fontSize: 16}}>
          Registro
        </p>
        </Col>
      </Row>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="usuario"
          label="Nombre de Usuario"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contrasenia"
          label="Contraseña"
        >
            <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
          
        </Form.Item>

        <Form.Item
          name="contrasenia2"
          label="Confirmar Contraseña"
        >
              <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
          
        </Form.Item>
      
        <Form.Item {...tailLayout}>


          <Button type="primary" htmlType="submit" loading={loading} >
            Regístrate
          </Button>

        </Form.Item>
      </Form>
      </div>
  
    );
};

export default SignupCard;
