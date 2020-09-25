import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = (props) => {
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xs='11' className='mx-auto'>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;