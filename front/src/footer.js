import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="mt-5" style={{ backgroundColor: "black" }}>
            <Container>
                <Row className="text-center py-3">
                    <Col className="text-left py-3" style={{ color: "white" }}>
                        <p>Grupo 21 SAS</p>
                    </Col>
                    <Col className="text-center py-3" style={{ color: "white" }}>
                        <p>Colombia</p>
                    </Col>
                    <Col className="text-right py-3" style={{ color: "white" }}>
                        <p>Vigilado por ministerio de cultura de Colombia</p>
                    </Col>
                    <Col className="text-right py-3" style={{ color: "white" }}>
                        <p>© 2023</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}


export default Footer;
