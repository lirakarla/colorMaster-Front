import { Row, Col, Form, Button, Input, message } from "antd";
import { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {UserOutlined, EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

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

const LoginCard= () => {
const [loading, setLoading] = useState(false);
const history=useHistory();
const [form] = Form.useForm();

const onFinish = (values) => {
    console.log(values);
    
    if (values.usuario===undefined || values.usuario.length<1) {
      return message.error("Nombre de usuario vacío")  
    }
    else if(values.contrasenia===undefined || values.contrasenia.length<6){
      return message.error("Contraseña vacía")  
    }
    else{
      setLoading(true);
      axios.post("http://localhost:4000/login",{
        username: values.usuario, contrasena:values.contrasenia
      }).then((res)=>{
        setLoading(false);
        //libreria para guardar info del usuario
        localStorage.setItem("user", JSON.stringify(res.data.usuario))
        history.push("/explorar")
      })
      .catch(error=>{
        if(error.response.status===401){
          message.warning("Revisar la información ingresada")
        }
        else{
          message.error("Hay un problema, por favor de intentar más tarde")
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
        Iniciar Sesión
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
     
      <Form.Item {...tailLayout}>
        <Button type="link" htmlType="submit" href="/" disabled={loading} >
        Regístrate
        </Button>

        <Button type="primary" htmlType="submit" loading={loading}>
          Iniciar sesión
        </Button>
      </Form.Item>
    </Form>
    </div>
 
  );
};

export default LoginCard;
