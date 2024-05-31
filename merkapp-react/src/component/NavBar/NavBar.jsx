import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./nav.css"
// import { AuthContext, useAuth } from "../Auth/AuthContext";


function NavBar() {
    const [logedIn, setlogedin] = useState(false);
    const [user, setUser] = useState('');
    // const { user, logout } = useAuth(AuthContext);
    // var user = "";
    useEffect(() => {
        var almacenadoUser = Cookies.get('user');
        if(almacenadoUser){
            setlogedin(true)
            var almacenado = almacenadoUser.split(",");
            setUser(almacenado[1])
            console.log(almacenado)
        }else{
            setlogedin(false)
        }
    },[]);

    return (
    <Navbar bg="secondary" expand="lg">
        {/* <Container> */}
        <Navbar.Brand href="/">MerkApp</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="me-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="/about">Acerca de</Nav.Link>
        <Nav.Link href="/contact">Contacto</Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Form inline className="margenD">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit"><i className="fa fa-search" aria-hidden="true"></i> </Button>
          </Col>
        </Row>
      </Form>
        <Navbar.Text className="margenD">
            {logedIn ? <a>Hola {user} </a> : <a href="/login">Iniciar Sesion</a>}
            
        </Navbar.Text>
        </Navbar.Collapse>
        {/* </Container>  <button onClick={logout}>Cerrar Sesión</button>*/}
    </Navbar>
    );
}

export default NavBar;
