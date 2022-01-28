import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

function ListProduct() {
  const [products, setProducts] = useState([]);
  console.log(setProducts);
  useEffect(() => {
    ProductService.getAllProduct().then((res) => {
      setProducts(res);
    });
  }, []);
  const percent = ` Lista de productos ${products.length} `;
  return <div> {percent}</div>;
}

export default ListProduct;
