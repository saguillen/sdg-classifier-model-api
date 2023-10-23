import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [requestExecuted, setRequestExecuted] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        //setTextFieldValue(data.result);
        setTextFieldValue("Sexo la película");
        setRequestExecuted(true);
      })
      .catch((error) => {
        setTextFieldValue("Sexo la película");
        setRequestExecuted(true);
      });
  };

  return (
    <div className="App">
      <h1>Objetivos de desarrollo sostenible</h1>
      <Form onSubmit={handleSubmit}>
        <Container style={{textAlign: "left", paddingTop:"5vh"}}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Texto del comentario"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" type="submit">
                Predecir objetivo
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      {requestExecuted && (
        <Form>
          <Container style={{textAlign: "left", paddingTop:"5vh"}}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Resultado de la predicción"
                    value={"Resultado de la predicción: " + textFieldValue}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <iframe width="560" height="315" src="https://youtu.be/BBJa32lCaaY?si=hUCoAUrSjKoaNQrp&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Form>
      )}
    </div>
  );
}

export default App;
