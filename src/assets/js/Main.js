/* eslint-disable quote-props */
import logoImage from '../img/voucher.png';
import {
  products,
  logoUrl,
} from './Data';

import Product from './Product';
import Cycles from './Cycles';

const cycles = new Cycles();

const logoElement = document.querySelector('.banner-wrapper__footer #logo');
logoElement.src = logoImage;

const logoLink = document.querySelector('.banner-wrapper__footer #link');
logoLink.href = logoUrl;
logoLink.setAttribute('target', '_blank');

const createProducts = (items) => {
  const productsWrapper = document.querySelector('.banner-wrapper__products');

  items.forEach((item, index) => {
    const newProduct = new Product();
    newProduct.init({
      product: item,
      productID: index + 1,
      wrapper: productsWrapper,
      cycles,
    });
  });
};

createProducts(products);
