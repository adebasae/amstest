import React from 'react';
// import Container from 'react-bootstrap/Container';
import Header from './Header';

function Layout({ children }) {
  console.log(children);
  return (
    <>
      <Header />
      {/* <Container className="posicion"> {children} </Container> */}
    </>
  );
}
// const Layout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       <Container className="posicion"> {children} </Container>
//     </>
//   );
// };

export default Layout;
