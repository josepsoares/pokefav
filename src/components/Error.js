import React from 'react';
import { Col } from 'reactstrap';

const Error = (props) => {
    return (
        <Col xs='12' style={{ height: '60vh' }}>
            <p>Ops! Something went wrong!</p>
            <p>{props.error.message}</p>
        </Col>
    )
}

export default Error;