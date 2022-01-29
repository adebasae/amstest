import React, { useState, useEffect } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../services/ProductService';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import isEmpty from '../components/utils';

function ListProduct() {
  const [products, setProducts] = useState([]);
  // const [totalProducts, setTotalProducts] = useState();
  const [pageOfItems, setPageOfItems] = useState([]);

  // const [paginationSetting, setPaginationSetting] = useState({
  //   currentProducts: [],
  //   currentPage: null,
  //   totalPages: null
  // });
  useEffect(() => {
    ProductService.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  // const onPageChanged = (data) => {
  //   const { currentPage, totalPages, pageLimit } = data;
  //   const offset = (currentPage - 1) * pageLimit;
  //   const currentProducts = products.slice(offset, offset + pageLimit);
  //   setPaginationSetting({ currentProducts, currentPage, totalPages });
  // };

  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };

  // useEffect(() => {
  //   console.log('products', products);
  //   setTotalProducts(products.length);
  // }, [products]);

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
    paginationSetting.currentProducts.length === 0 ? (
      <p>poner spinner</p>
    ) : (
      paginationSetting.currentProducts.map(
        ({ imagen, description, marca, modelo, precio, id }) => (
          <Card
            key={id}
            imagen={imagen}
            marca={marca}
            description={description}
            modelo={modelo}
            precio={precio}
          />
        )
      )
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
              <Pagination items={products} onChangePage={onChangePage} />
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
