import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import ProductService from '../services/ProductService';

function Details(props) {
  const { match } = props;
  const [detail, setDetail] = useState();

  const MODELO = 'Modelo';
  const PRECIO = 'Precio';
  const CPU = 'CPU';
  const RAM = 'RAM';
  const RESOLUCION = 'Resolución de Pantalla';
  const BATERIA = 'Batería';
  const CAMARA = 'Camara';
  const PESO = 'Peso';
  const DIMENSIONES = 'Dimensiones';
  const MARCA = 'Marca';
  const SISTEMA = 'Sistema Operativo';
  useEffect(() => {
    ProductService.getProductById(match.params.id).then((res) => {
      console.log('res', res);
      setDetail(res.data);
    });
  }, []);

  if (detail === undefined) return 'no hay detalles';

  return (
    <div id="productDetails">
      <div className="container card-container d-flex ">
        <div className="w-100 d-flex flex-row flex-wrap">
          <h2>Detalles</h2>
        </div>
      </div>
      <div className="w-100 px-4 d-flex flex-row flex-wrap align-items-center justify-content-between">
        <div className="w-100 d-flex flex-row py-4 ">
          <div className="w-50">
            <div className="wh">
              <img
                className="img-fluid"
                alt={detail.imagen.alt}
                src={detail.imagen.src}
              />
            </div>
          </div>
          <div className="w-50">
            <div className="d-flex flex-column  ">
              <div>
                <input
                  type="checkbox"
                  className="read-more-state"
                  id="post-detail"
                />

                <div>
                  <input
                    type="checkbox"
                    className="read-more-state"
                    id="post-2"
                  />

                  <div className="read-more-wrap">
                    <Card className="w-75 read-more-wrap">
                      <Card.Body>
                        <Card.Title>{detail.descripcion}</Card.Title>

                        <Card.Text className=" px-2">
                          <span>{`${MODELO}:`}</span>
                          {` ${detail.modelo}`}
                        </Card.Text>
                        <Card.Text className=" px-2">
                          <span>{`${PRECIO}:`}</span>
                          {` ${detail.precio}`}
                        </Card.Text>
                        <Card.Text className=" px-2">
                          <span>{`${CPU}:`}</span>
                          {` ${detail.cpu}`}
                        </Card.Text>
                        <Card.Text className=" px-2">
                          <span>{`${RAM}:`}</span>
                          {` ${detail.ram}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${RESOLUCION}:`}</span>
                          {` ${detail.resolucion}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${BATERIA}:`}</span>
                          {` ${detail.bateria}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${CAMARA}:`}</span>
                          {` ${detail.camara}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${PESO}:`}</span>
                          {` ${detail.peso}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${DIMENSIONES}:`}</span>
                          {` ${detail.dimensiones}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${SISTEMA}:`}</span>
                          {` ${detail.sistema}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${MARCA}:`}</span>
                          {` ${detail.marca}`}
                        </Card.Text>
                        <Card.Text className=" px-2 read-more-target">
                          <span>{`${SISTEMA}:`}</span>
                          {` ${detail.sistema}`}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  <label htmlFor="post-2" className="read-more-trigger" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Details;
