import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

function ListProduct() {
  const [products, setProducts] = useState([]);
  const [paginationSetting, setPaginationSetting] = useState({
    currentProducts: [],
    currentPage: null,
    totalPages: null
  });
  useEffect(() => {
    ProductService.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const totalProducts = products.length;

  if (totalProducts === 0) return null;

  const onPageChanged = (data) => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    setPaginationSetting({ currentProducts, currentPage, totalPages });
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
      {productList()}
      <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
        <div className="d-flex flex-row py-4 align-items-center mx-auto">
          <Pagination
            totalRecords={totalProducts}
            pageLimit={1}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
