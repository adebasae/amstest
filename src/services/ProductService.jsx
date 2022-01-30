import { trackPromise } from 'react-promise-tracker';
import Cookies from 'universal-cookie';

import api from '../api/api';

const SECOND = 60;
const MINUTES = 1;
const TIME_COOKIE = SECOND * MINUTES;

const ProductService = {
  getAllProducts: () => {
    const cookies = new Cookies();
    const allProductCookie = cookies.get('allProductCookie');

    if (allProductCookie !== undefined) {
      const promise = new Promise((resolve) => {
        resolve(allProductCookie);
      });
      return trackPromise(promise);
    }

    return trackPromise(
      api.get(`/product`, {}).then((res) => {
        cookies.set('allProductCookie', res, {
          path: '/',
          maxAge: TIME_COOKIE
        });
        return res;
      })
    );
  }
};
export default ProductService;
