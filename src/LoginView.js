import Logo from "./Color master Logo.png";
import { Row, Col, Image } from "antd";
import LoginCard from "./LoginCard"


const LoginView= () => {
  return (
    <Row className={"view"} justify="space-around" align="middle">
      <Col span={40}>
        <Image
          width={200}
          src={Logo}
        />
      </Col>
      <Col span={10}>
          <LoginCard/>
      </Col>
    </Row>
  );
};

export default LoginView;
