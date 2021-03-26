import Logo from "./Color master Logo.png";
import { Input, Image, Col, Row, Button} from "antd";
import Menu from "./Menu";
import {InteractionOutlined} from "@ant-design/icons";

//import Paleta from "./Paleta";



const PaletaView= () => {
  return (
  <div style={{height:"100%"}}>
   <Menu>

   </Menu>
   <div className="paleta-container" >
     <Row className="paleta-top">
        <Col span={6} offset={9}>
            <Input style={{borderRadius:"10px"}}>

            </Input>
        </Col>
     </Row>
     <div className="inner-container">
     <Row style={{margin:"10px"}}>
       <Col span={4}>
         <Button className="boton-paleta" icon={<InteractionOutlined style={{fontSize: "20px"}}/>}>
            Aleatorizar
            
         </Button>
       </Col>
       <Col span={4} offset={16} align="right">
       <Button className="boton-guardar">
           Guardar
         </Button>
       </Col>
     </Row>
     </div>
   </div>
  </div>
  )
};

export default PaletaView;


