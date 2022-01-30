import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="posicion"> {children} </Container>
    </>
  );
}

export default Layout;
