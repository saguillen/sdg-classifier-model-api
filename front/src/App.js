import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [requestExecuted, setRequestExecuted] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [respuestas, setRespuestas] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const textsArray = inputValue.split('\n');
    fetch("http://localhost:5000/api/texts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texts: textsArray }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRespuestas(data["texts"]);
        console.log(respuestas);
        setRequestExecuted(true);
      })
      .catch((error) => {
        setRespuestas([]);
        setRequestExecuted(true);
      });
  };

    const textosMostrar=respuestas.map(
        (respuesta)=>{
            return(
                <tr>
                    <td>{respuesta.text}</td>
                    <td>{respuesta.sdg}</td>
                </tr>
            )
        }
    )

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
          <Table>
            <thead>
              <tr>
                <th>Texto</th>
                <th>Objetivo</th>
              </tr>
            </thead>
            <tbody>
            {textosMostrar}
            </tbody>
          </Table>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=SqyQ7ctzykF1R4hG&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Form>
      )}
    </div>
  );
}

export default App;
