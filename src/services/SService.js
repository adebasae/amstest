import { trackPromise } from 'react-promise-tracker';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import api from '../api/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const SService = {
  updateService: (Servicio) =>
    trackPromise(
      api.post(`Servicios/EditarServicio`, JSON.stringify(Servicio))
    ),
  getServiceByid: (idservicio) =>
    trackPromise(
      api.get(`Servicios/idservicio`),
      JSON.stringify({ idservicio })
    ),

  getService: () => trackPromise(api.get(`Servicios/optenerServicios`)),

  saveService: (Servicio) =>
    trackPromise(
      api.post(`Servicios/adiconarServicio`, JSON.stringify(Servicio))
    ),

  deleteServiceByid: (idservicio) =>
    trackPromise(
      api.delete(`Servicios/eliminarServicio/{id}`),
      JSON.stringify({ idservicio })
    )
};
export default SService;
