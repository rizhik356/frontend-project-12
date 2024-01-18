import React from 'react';
import { Container, Row, Card, Col, Image } from 'react-bootstrap';
import LoginForm from './LoginForm';

const Login = () => (
  <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={6} md={6} xs={12}>
          <Card className="shadow">
            <Card.Body className="row p-5">
              <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
                <Image className='img-fluid w-75' src="../tigra-logo.jpeg" roundedCircle />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Card.Link href="/">Регистрация</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
);

export default Login;