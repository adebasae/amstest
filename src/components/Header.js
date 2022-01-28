/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Logo.png';

import Carrito from '../assets/images/carrito.png';
import Perfil from '../assets/images/perfil.png';

function Header() {
  return (
    <header className="header" style={{ marginBottom: '10px' }}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <Image
            alt="NovaView"
            src={Logo}
            style={{ width: 200, marginTop: -7 }}
          />
        </Navbar.Brand>

        <div role="navigation" className="d-flex order-nav">
          <span style={{ marginTop: '3px', marginRight: '10px' }}>
            Bienvenido
          </span>
          <div>
            <Image alt="Perfil" src={Perfil} className="header-btn-right" />
          </div>
          <div>
            <Image alt="Carrito" src={Carrito} className="header-btn-right" />
          </div>
          <Nav.Link
            style={{ marginLeft: '10px', marginRight: '10px' }}
            to="/logout"
            className="boton-C2"
            as={Link}
          >
            Salir
          </Nav.Link>
        </div>

        <Navbar.Toggle style={{ order: 0 }} aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto my-2 my-lg-0">
            <>
              <Nav.Link className="linkD2" as={Link} to="/admin/producto">
                PRODUCTOS
              </Nav.Link>
              <Nav.Link className="linkD2" as={Link} to="/admin/tipoProductos">
                TIPOS DE PRODUCTOS
              </Nav.Link>

              <Nav.Link className="linkD2" as={Link} to="/admin/servicios">
                SERVICIOS
              </Nav.Link>
              <Nav.Link className="linkD2" as={Link} to="/admin/compras">
                COMPRAS
              </Nav.Link>
              <Nav.Link className="linkD2" as={Link} to="/admin/usuarios">
                USUARIOS
              </Nav.Link>
            </>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
