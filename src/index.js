import './assets/stylesheets/base.scss';
import {
  Products as GetProducts, Loaded, LoadImages, LoadPrices,
} from './assets/js/Products';

const checkLoadedProducts = setInterval(() => {
  if (Loaded) {
    clearInterval(checkLoadedProducts);
    const div = document.createElement('div');
    div.innerHTML = JSON.stringify(GetProducts);
    document.body.appendChild(div);

    const productsContainer = document.querySelector('.banner-wrapper__products');

    LoadImages(productsContainer, GetProducts.products);
    LoadPrices(GetProducts.products);
  }
}, 100);
