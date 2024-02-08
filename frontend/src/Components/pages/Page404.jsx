import React from 'react';
import {
  Col, Container, Image, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  const rotatedStyle = {
    transform: 'rotate(45deg)',
    fontSize: '10rem',
  };
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xxl={4} md={6} xs={12} className=" d-none d-md-flex justify-content-center">
          <h1 style={rotatedStyle}>404</h1>
        </Col>
        <Col className="d-flex flex-column align-items-center" xxl={4} md={6} xs={12}>
          <Image src="../tigra-loading.jpg" className="img-fluid" roundedCircle />
          <h4 className="mt-3">{t('errors.NotFind')}</h4>
          <p>
            <Link to="/">{t('services.returnToMain')}</Link>
          </p>
        </Col>
        <Col xxl={4} md={6} xs={12} className="d-flex justify-content-center">
          <h1 style={rotatedStyle}>404</h1>
        </Col>
      </Row>
    </Container>

  );
};

export default Page404;
