import Logo from "./Color master Logo.png";
import { Row, Col, Image } from "antd";
import SignupCard from "./SignupCard"

const SignupView= () => {
  return (
    <Row className={"view"} justify="space-around" align="middle">
      <Col span={40}>
        <Image
          width={200}
          src={Logo}
        />
      </Col>
      <Col span={10}>
          <SignupCard/>
      </Col>
    </Row>
  );
};

export default SignupView;
