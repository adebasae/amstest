import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Select from 'react-select';
import ProductService from '../services/ProductService';

const colores = [
  { label: 'Azul', value: '1' },
  { label: 'Amarrillo', value: '2' },
  { label: 'Rojo', value: '3' },
  { label: 'Verde', value: '4' }
];

const store = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' }
];

function Details(props) {
  const { match } = props;
  const [detail, setDetail] = useState();

  // Para cambio de idioma la internacionalización se hace a estas variables

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
  const NO_DETAILS = 'No hay detalles';

  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);

  useEffect(() => {
    ProductService.getProductById(match.params.id).then((res) => {
      setDetail(res.data);
    });
  }, []);

  if (detail === undefined) return NO_DETAILS;

  return (
    <div
      id="productDetails"
      className="container flex-wrap justify-content-between card-container d-flex  flex-row"
    >
      <div className="w-100 d-flex flex-row ">
        <h2>Detalles</h2>
      </div>
      <div className=" left-container">
        <div className="wh">
          <img
            className="img-fluid"
            alt={detail.imagen.alt}
            src={detail.imagen.src}
          />
        </div>
      </div>
      <div className="">
        <div>
          <input type="checkbox" className="read-more-state" id="post-detail" />

          <div>
            <input type="checkbox" className="read-more-state" id="post-2" />

            <div className="read-more-wrap">
              <Card className=" read-more-wrap h-auto">
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
      <div style={{ width: '274px' }}>
        <Select
          className="py-2"
          classNamePrefix="select "
          isSearchable
          name="color"
          menuPlacement="auto"
          menuPosition="fixed"
          options={colores}
          onChange={(e) => {
            setSelectedColor(e);
          }}
          placeholder="Seleccione Color..."
          value={selectedColor}
          autosize={false}
        />

        <Select
          className="py-2"
          classNamePrefix="select "
          isSearchable
          menuPlacement="auto"
          menuPosition="fixed"
          autosize={false}
          name="color"
          options={store}
          onChange={(e) => {
            setSelectedStore(e);
          }}
          placeholder="Seleccione Almacenamiento..."
          value={selectedStore}
        />

        <button
          type="button"
          //   onClick={() => comprar()}
          className="btn btn-outline-primary w-40 float-end"
        >
          Añadir
        </button>
      </div>
    </div>
  );
}
export default Details;
