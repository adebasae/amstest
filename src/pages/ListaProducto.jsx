import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

function ListProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductService.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);
  const percent = ` Lista de productos ${products.length} `;
  return <div> {percent}</div>;
}

export default ListProduct;
