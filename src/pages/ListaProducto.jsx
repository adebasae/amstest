import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import Card from '../components/Card';

function ListProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductService.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const listaProducto = () =>
    products.length === 0
      ? 'poner spinner'
      : products.map(({ imagen, description, marca, modelo, precio, id }) => (
          <Card
            key={id}
            imagen={imagen}
            marca={marca}
            description={description}
            modelo={modelo}
            precio={precio}
          />
        ));
  return (
    <div className="container card-container d-flex ">{listaProducto()}</div>
  );
}

export default ListProduct;
