/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/Logo.png';

import Carrito from '../assets/images/carrito.png';
import Perfil from '../assets/images/perfil.png';
import useAppContext from '../hooks/useAppContext';
import Breadcrumbs from './Breadcumbs';

function Header() {
  const { carCount } = useAppContext();

  return (
    <header className="header" style={{ marginBottom: '10px' }}>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <Image
            alt="Logo"
            src={Logo}
            style={{ width: 60, marginTop: -7, marginLeft: 26 }}
          />
        </Navbar.Brand>
        <hr />
        <Breadcrumbs />
        <hr />
        <Navbar.Toggle style={{ order: 0 }} aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <div role="navigation" className="d-flex order-nav">
            <span style={{ marginTop: '3px', marginRight: '10px' }}>
              Bienvenido
            </span>
            <div>
              <Image alt="Perfil" src={Perfil} className="header-btn-right" />
            </div>
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
              <Nav.Link className="px-4" as={Link} to="/">
                Productos
              </Nav.Link>
            </Nav>
            <div>
              <Image alt="Carrito" src={Carrito} className="header-btn-right" />
              <span className="carNumber">{carCount}</span>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
