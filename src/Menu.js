import Logo from "./Color master Logo.png";
import {Typography, Image,  Row, Col, Popover } from "antd";
import {UserOutlined} from "@ant-design/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const{Text}=Typography;
const content=(history)=>{
  return(
    <a style={{color:"gray"}} href="# " onClick={()=>{
      localStorage.removeItem("user");
      history.push("/login")
    }}>
      Cerrar Sesión
    </a>
  )
}
  


const Menu = ({pagina}) => {
const [mostrarCerrar,setMostrarCerrar]=useState(false)
const history= useHistory()
const usuario=JSON.parse(localStorage.getItem("user"));
  return (
    <Row className="menu" align="middle">
    <Col span={2}>
    <Image
         width={50}
         src={Logo}
         preview={false}
       />
    </Col>
    <Col span={9}>
       <Text strong={pagina==="explorar"} className="menu_title">
        <a href={"/explorar"} style={{color:"inherit", fontSize: 14}}>
          Explorar
        </a>
       </Text>
       <Text strong={pagina==="mispaletas"}className="menu_title">
       <a href={"/mispaletas"} style={{color:"inherit", fontSize: 14}}>
           Mis Paletas
        </a>
       </Text> 
       <Text strong={pagina==="favoritos"}className="menu_title">
          <a href={"/favoritos"} style={{color:"inherit", fontSize: 14}}>
            Favoritos
         </a>
         </Text> 
    </Col>
    
    <Col span={2} offset={11} align="middle">
    <Popover
          visible={mostrarCerrar}
          placement={"bottom"}
          content={()=>content(history)}
          trigger="click"
          onVisibleChange={(visible) => setMostrarCerrar(visible)}
        >
        
         <UserOutlined className="user-icon-menu" style={{color: "white", fontSize: 23, textAlign:'center', display:"inline-block"}}  />
       
        </Popover>
    
    <Text style={{display:"block",  fontSize: 10}} >
        {usuario.username}
         </Text> 
    </Col>
  </Row>
  );
};

export default Menu;
