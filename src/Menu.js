import Logo from "./Color master Logo.png";
import {Typography, Image,  Row, Col } from "antd";
import {UserOutlined} from "@ant-design/icons";

const{Text}=Typography;

const Menu = ({pagina}) => {
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
        <a href={"/explorar"} style={{color:"inherit"}}>
          Explorar
        </a>
       </Text>
       <Text strong={pagina==="mispaletas"}className="menu_title">
       <a href={"/mispaletas"} style={{color:"inherit"}}>
           Mis Paletas
        </a>
       </Text> 
       <Text strong={pagina==="favoritos"}className="menu_title">
          <a href={"/favoritos"} style={{color:"inherit"}}>
            Favoritos
         </a>
         </Text> 
    </Col>
    
    <Col span={2} offset={11} align="middle">
    <UserOutlined className="user-icon-menu" style={{color: "white", fontSize: 25, textAlign:'center', display:"inline-block"}}  />
    <Text >
         Fernanditoo
         </Text> 
    </Col>
  </Row>
  );
};

export default Menu;
