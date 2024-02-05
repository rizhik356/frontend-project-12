import React from 'react';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignUpForm from '../forms/SignUpForm';

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={6} xxl={6} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="w-50">
                <Image className="img-fluid w-75 rounded-circle" alt="Регистрация" src="../tigra-signup.jpg" />
              </div>
              <SignUpForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('services.hasAccount')}</span>
                <Card.Link href="/login">{t('services.toAuthorizate')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
