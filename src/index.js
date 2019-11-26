import './assets/stylesheets/base.scss';
import { products, optout, createProducts } from './assets/js/Products';
import logoImage from './assets/img/voucher.png';

const logoElement = document.querySelector('.banner-wrapper__footer #logo');
logoElement.src = logoImage;

createProducts(products);
