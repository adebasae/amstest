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

  // const headerClass = [
  //   'text-dark py-2 pr-4 m-0',
  //   paginationSetting.currentPage ? 'border-gray border-right' : ''
  // ]
  //   .join(' ')
  //   .trim();

  const onPageChanged = (data) => {
    console.log('data', data);
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = products.slice(offset, offset + pageLimit);
    setPaginationSetting({ currentProducts, currentPage, totalPages });
  };

  const listaProducto = () => {
    console.log(
      'paginationSetting.currentProducts',
      paginationSetting.currentProducts
    );
    return paginationSetting.currentProducts.length === 0 ? (
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
  };

  return (
    <div className="container card-container d-flex ">
      {listaProducto()}
      <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
        {/* <div className="d-flex flex-row align-items-center">
          <h2 className={headerClass}>
            <strong className="text-secondary">{products.length}</strong>
            Products
          </h2>
          {paginationSetting.currentPage && (
            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
              Page{' '}
              <span className="font-weight-bold">
                {paginationSetting.currentPage}
              </span>{' '}
              /{' '}
              <span className="font-weight-bold">
                {paginationSetting.totalPages}
              </span>
            </span>
          )}
        </div> */}
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
