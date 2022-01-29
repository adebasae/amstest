import React, { useState, useEffect } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
// https://codepen.io/monsieurv/pen/abyJQWQ
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../services/ProductService';
import Card from '../components/Card';
// import Pagination from '../components/Pagination';
import isEmpty from '../components/utils';

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 2;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    ProductService.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(products.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, products]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  // const onChangePage = (pageOfItems) => {
  //   // update state with new page of items
  //   this.setState({ pageOfItems: pageOfItems });
  // };

  const filter = (text) => {
    ProductService.getAllProducts().then((res) => {
      const productsInitial = res.data;
      let filtered = productsInitial;
      if (productsInitial.length > 0) {
        if (!isEmpty(text)) {
          const lowerCaseText = text.toLowerCase();
          filtered = productsInitial.filter(
            (x) =>
              x.marca.toLowerCase().includes(lowerCaseText) ||
              x.modelo.toLowerCase().includes(lowerCaseText)
          );
        }
      }
      setProducts(filtered);
    });
  };

  const productList = () =>
    currentItems.length === 0 ? (
      <p>poner spinner</p>
    ) : (
      currentItems.map(({ imagen, description, marca, modelo, precio, id }) => (
        <Card
          key={id}
          imagen={imagen}
          marca={marca}
          description={description}
          modelo={modelo}
          precio={precio}
        />
      ))
    );
  return (
    <div className="container card-container d-flex ">
      <div className="w-100 d-flex flex-row flex-wrap">
        <h2>Lista de Productos</h2>
        <div className="ms-auto">
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faSearch} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  onChange={(e) => filter(e.target.value)}
                  type="text"
                  placeholder="Buscar aqui.."
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </div>
      </div>
      {products.length !== 0 ? (
        <>
          {productList()}
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row py-4 align-items-center mx-auto">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </>
      ) : (
        <span className="w-100 text-center">No hay Productos</span>
      )}
    </div>
  );
}

export default ListProduct;
