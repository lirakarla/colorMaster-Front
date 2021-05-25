import { Row, Col, Form, Button, Input, message } from "antd";
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {withoutEmoji} from "emoji-aware";


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
  const history=useHistory();

  const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const onFinish = (values) => {
      console.log(values);
      if(values.usuario===undefined || values.usuario.length<1 || values.contrasenia===undefined){
        return message.error("Es necesario completar todos los campos")
      }
      else if (values.usuario.length<3) {
        return message.error("Nombre de usuario muy corto")  
      }

      else if (values.usuario.length>20) {
        return message.error("Nombre de usuario muy largo")  
      }
      
      
      else if(!validateEmail(values.correo)){
        return message.warning("Revisa el correo, no es válido")  
      }
      else if(values.contrasenia!==values.contrasenia2){
        return message.error("Las contraseñas no coinciden")  
      }
      else if(values.contrasenia.length<6 ){
        return message.error("La contraseña es muy corta")  
      }
      else if(values.usuario!==withoutEmoji(values.usuario).join("") || values.contrasenia!==withoutEmoji(values.contrasenia).join("")){
        return message.error("Hay campos que contiene caracteres inválidos")  
      }
      else{
        setLoading(true);
        axios.post("http://localhost:4000/usuario",{
          username: values.usuario, correo:values.correo, contrasena:values.contrasenia
        }).then((res)=>{
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(res.data.usuario))
          history.push("/explorar")
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
          name="correo"
          label="Correo Electrónico"
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

        <Button type="link" htmlType="submit" href="/login" disabled={loading} style={{marginRight:"50px"}}>
            Iniciar Sesión
        </Button>

          <Button type="primary" htmlType="submit" loading={loading} >
            Regístrate
          </Button>
          

        </Form.Item>
      </Form>
      </div>
  
    );
};

export default SignupCard;
