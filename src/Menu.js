import Logo from "./Color master Logo.png";
import {Typography, Image,  Row, Col } from "antd";
import {UserOutlined} from "@ant-design/icons";

const{Text}=Typography;

const Menu = () => {
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
       <Text className="menu_title">
         Explorar
       </Text>
       <Text className="menu_title">
       Mis Paletas
       </Text> 
       <Text className="menu_title">
         Explorar
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
