import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Detail from '../components/Detail';
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
      <div className="w-100 d-flex flex-row py-3 ">
        <h2>Detalles</h2>
      </div>
      <div className="sticky">
        <div className="wh">
          <img
            className="img-fluid"
            alt={detail.imagen.alt}
            src={detail.imagen.src}
          />
        </div>
      </div>
      <Detail
        descripcion={detail.descripcion}
        modelo={detail.modelo}
        precio={detail.precio}
        cpu={detail.cpu}
        ram={detail.ram}
        resolucion={detail.resolucion}
        bateria={detail.bateria}
        camara={detail.camara}
        peso={detail.peso}
        dimensiones={detail.dimensiones}
        sistema={detail.sistema}
        marca={detail.marca}
      />
      <div className=" sticky" style={{ top: '2%', width: '274px' }}>
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
