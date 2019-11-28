/* eslint-disable quote-props */
import logoImage from '../img/voucher.png';
import Cycles from './Cycles';
import Product from './Product';

(async () => {
  await fetch('http://localhost:3001/products')
    .then((res) => res.json())
    .then((data) => {
      const { products, logo_url: logoUrl } = data;
      const cycles = new Cycles();
      cycles.init({
        total: products.length,
        priceInterval: 2000,
        productsInterval: 4000,
      });

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
    });
})();
