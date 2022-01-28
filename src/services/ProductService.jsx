import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const ProductService = {
  getAllProducts: () =>
    trackPromise(api.post(`rest/configurations/getAllPg`, {}))
};
export default ProductService;
