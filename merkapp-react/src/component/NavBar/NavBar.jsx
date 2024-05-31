import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "./nav.css"
import { AuthContext, useAuth } from "../Auth/AuthContext";
import logo from '../../imagenes/MerkAppSinFondo.png';
import BuscarProducto from "../BuscarProducto/BuscarProducto";

function NavBar() {
    const [usr, setUsr] = useState('');
    const { user, logout } = useAuth();
    const [query, setQuery] = useState('');
  const [productos, setProductos] = useState([]);

    
    useEffect(() => {
      
    },[user]);
    const handleSearch = async (query) => {
      if (!query) {
        setProductos([]);
        return;
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:5000/buscar?query=${query}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductos([]);
      }
    };

    return (
    <Navbar bg="secondary" expand="lg">
        <Navbar.Brand href="/"><img src={logo} alt="MerkApp's logo" className="imagennn"/>MerkApp</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="/">Inicio</Nav.Link>
        <Nav.Link href="/comprador/consultar">Productos</Nav.Link>
        {/* <Nav.Link href="/contact">Contacto</Nav.Link> */}
        </Nav>
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
            {/* <BuscarProducto onSearch={handleSearch} /> */}
          </Col>
          <Col xs="auto">
            <Button type="submit" ><i className="fa fa-search" aria-hidden="true"></i> </Button>
          </Col>
        </Row>
      </Form>
        <Navbar.Text className="margenD">
            {user ? <div>Hola {user[1]} <button onClick={logout}>Cerrar Sesión</button></div> : <a href="/login">Iniciar Sesion</a>}
            
        </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
    );
}

export default NavBar;
