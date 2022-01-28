import { trackPromise } from 'react-promise-tracker';
import api from '../api/api';

const ProductService = {
  getAllProducts: () => trackPromise(api.get(`/product`, {}))
};
export default ProductService;
