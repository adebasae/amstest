import { trackPromise } from 'react-promise-tracker';
import { sendServer } from './utils';

const ProductService = {
  getAllProducts: () =>
    trackPromise(sendServer('allProductCookie', '/product')),
  getProductById: (id) =>
    trackPromise(sendServer('productDetail', `/product/${id}`))
};

export default ProductService;
