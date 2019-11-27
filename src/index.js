import './assets/stylesheets/base.scss';
import {
  products, optout, createProducts, logoUrl,
} from './assets/js/Products';
import logoImage from './assets/img/voucher.png';

const logoElement = document.querySelector('.banner-wrapper__footer #logo');
logoElement.src = logoImage;

const logoLink = document.querySelector('.banner-wrapper__footer #link');
logoLink.href = logoUrl;
logoLink.setAttribute('target', '_blank');

createProducts(products);
