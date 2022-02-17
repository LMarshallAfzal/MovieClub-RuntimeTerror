import React from "react";
import "../styling/pages/Login.css";
import {Col, Container, Row} from "react-bootstrap";

function login() {
    return (
        <Container>
            <Row>
                <Col>
                    log in.
                </Col>
                <Col>
                    username:
                    password:
                </Col>
            </Row>
        </Container>
    );
}

export default login;
