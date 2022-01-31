/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
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
            alt="Logo"
            src={Logo}
            style={{ width: 60, marginTop: -7, marginLeft: 26 }}
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
        </div>

        <Navbar.Toggle style={{ order: 0 }} aria-controls="navbarScroll" />
      </Navbar>
    </header>
  );
}

export default Header;
