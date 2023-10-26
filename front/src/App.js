import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

function App() {
  const [inputValues, setInputValues] = useState([""]);
  const [requestExecuted, setRequestExecuted] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [respuestas, setRespuestas] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const textsArray = inputValues.filter((value) => value !== "");
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
        setRequestExecuted(true);
      })
      .catch((error) => {
        setRespuestas([]);
        setRequestExecuted(true);
      });
  };

  const handleInputChange = (index, event) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };

  const handleAddFields = () => {
    const values = [...inputValues];
    values.push("");
    setInputValues(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputValues];
    values.splice(index, 1);
    setInputValues(values);
  };

  const textFields = inputValues.map((inputValue, index) => {
    return (
      <Row key={index}>
        <Col>
          <Row>
            <Col sm={10}>
              <Form.Group controlId={`formBasicEmail${index}`}>
                <Form.Control
                  rows={5}
                  placeholder="Texto del comentario"
                  value={inputValue}
                  onChange={(event) =>
                    handleInputChange(index, event)
                  }
                />
              </Form.Group>
            </Col>
            <Col sm>
              {index === inputValues.length - 1 ? (
                <Button variant="primary" onClick={handleAddFields}>
                  +
                </Button>
              ) : (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </Button>
              )}
            </Col>
          </Row>
        </Col>

      </Row>
    );
  });

  const textosMostrar = respuestas.map(
    (respuesta) => {
      return (
        <tr>
          <td>{respuesta.text}</td>
          <td>{respuesta.sdg}</td>
          <td><div class="flip-box">
            {(() => {
              switch (respuesta.sdg) {
                case 3:
                  return (
                    <div class="flip-box-inner">

                      <div class="flip-box-front">
                        <img src="https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-03.png" width="200" height="200" alt="" />
                      </div>
                      <div class="flip-box-back3">
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <p class="paragraph-flip" >
                            Garantizar una vida sana y promover el bienestar para todos en todas las edades
                          </p>
                        </div>
                      </div>
                    </div>);
                case 4:
                  return (
                    <div class="flip-box-inner">

                      <div class="flip-box-front">
                        <img src="https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-04.png" width="200" height="200" alt="" />
                      </div>
                      <div class="flip-box-back4">
                        <p>Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos</p>
                      </div>
                    </div>);
                case 5:
                  return (
                    <div class="flip-box-inner">

                      <div class="flip-box-front">
                        <img src="https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2018/07/S_SDG-goals_icons-individual-rgb-05.png" width="200" height="200" alt="" />
                      </div>
                      <div class="flip-box-back5">
                        <p>Lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas</p>
                      </div>
                    </div>);
                default:
                  return null;
              }
            })()}

          </div>
          </td>
        </tr>
      )
    }
  )

  return (
    <div className="App">
      <img src="https://www.un.org/sustainabledevelopment/es/wp-content/uploads/sites/3/2019/09/S_SDG_logo_without_UN_emblem_horizontal_WEB-1024x134.png" alt="Banner" />
      <nav class="navbar bg-body-tertiary" style={{ color: "blue" }}>
        <div class="container-fluid">
          <a class="navbar-brand">
            <h1 class="entry-title fusion-responsive-typography-calculated" data-fontsize="30" style={{ color: "#333333", fontSize: 30, lineheight: 1.4,paddingLeft:100 }} data-lineheight="42px">CLASIFICADOR DE TEXTOS EN OBJETIVOS DE DESARROLLO SOSTENIBLE</h1>
          </a>
        </div>
      </nav>
      <Form onSubmit={handleSubmit}>
        <Container style={{ textAlign: "left", paddingTop: "5vh" }}>
          <div class="row justify-content-md-center">
            <div class="col col-8">
              {textFields}
              <Button variant="primary" type="submit">
                Predecir
              </Button>
            </div>
            <div class="col">
              <li className="card-1 card-item">
                <h1 className="card-title">Intrucciones</h1>
                <p className="card-description">Escribe pega el texto que deseas clasificar en el cuadro de texto y recibe el texto clasificado</p>
                <div className="img-container">
                  <img style={{ height: "50%", width: "50%" }} src={"https://upload.wikimedia.org/wikipedia/commons/1/14/UNFPA_logo.svg"} alt={"imagen"} />
                  <img style={{ height: "20%", width: "20%" }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/University_of_Los_Andes_logo.svg/1200px-University_of_Los_Andes_logo.svg.png"} alt={"imagen2"} />
                </div>
              </li>
            </div>

          </div>
        </Container>
      </Form>
      {requestExecuted && (

        <Form>
          <nav class="navbar bg-body-tertiary" style={{ color: "blue" }}>
            <div class="container-fluid">
              <a class="navbar-brand">
                <h1 class="entry-title fusion-responsive-typography-calculated" data-fontsize="30" style={{ color: "#333333", fontSize: 30, lineheight: 1.4, paddingLeft:100}} data-lineheight="42px">Resultado</h1>
              </a>
            </div>
          </nav>
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Texto</th>
                  <th>Objetivo</th>
                  <th>Flipcard</th>
                </tr>
              </thead>
              <tbody>
                {textosMostrar}
              </tbody>
            </Table>
          </Container>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-0uQYs0OqSA?si=3NFF9SXeUEvNLcL6&amp;start=13&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Form>

      )}

    </div>
  );
}

export default App;
