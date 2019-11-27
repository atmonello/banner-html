/* eslint-disable array-callback-return */
/* eslint-disable quote-props */
import boots from '../img/boots.jpg';
import dress from '../img/dress.jpg';
import gym from '../img/gym.jpg';
import tshirt from '../img/tshirt.jpg';

import data from '../products.json';
import Cycles from './Cycles';

const { products, optout_url: optout } = data;
const cycles = new Cycles();

const productImages = {
  'boots': boots,
  'dress': dress,
  'gym': gym,
  'tshirt': tshirt,
};

let toggleCycle = true;

const calculateDiscount = (old, sale) => {
  const oldNumber = Number(old.split(' ')[1].replace(',', '.'));
  const saleNumber = Number(sale.split(' ')[1].replace(',', '.'));
  return 100 - Math.floor((saleNumber * 100) / oldNumber);
};

const insertPrice = (index) => {
  const productElement = document.querySelector(`.banner-wrapper__item[data-product="${index + 1}"`);
  const pricesWrapper = productElement.querySelector('.prices-wrapper');

  const salePrice = products[index].sale_price;
  const oldPrice = products[index].old_price;

  productElement.dataset.discount = salePrice && oldPrice
    ? `-${calculateDiscount(oldPrice, salePrice)}%`
    : null;

  if (salePrice) {
    productElement.classList.add('has-sale-price');
    pricesWrapper.innerHTML += `<span class="sale-price">${salePrice}</span>`;
  }

  if (oldPrice) {
    productElement.classList.add('has-old-price');
    pricesWrapper.innerHTML += `<span class="old-price hidden">${oldPrice}</span>`;
  }
};

const createListeners = () => {
  const productList = document.querySelectorAll('.banner-wrapper__item');

  productList.forEach((product) => {
    product.addEventListener('mouseenter', () => {
      const activeProduct = document.querySelector('.banner-wrapper__item--active');
      activeProduct.classList.remove('banner-wrapper__item--active');

      toggleCycle = false;
      cycles.cycleProducts(toggleCycle);
    });

    product.addEventListener('mouseleave', () => {
      toggleCycle = true;
      cycles.cycleProducts();
    });
  });
};

const createProducts = (items) => {
  const productsWrapper = document.querySelector('.banner-wrapper__products');

  items.map((item, index) => {
    const imageNoExtension = item.image.split('.')[0];

    productsWrapper.innerHTML += `
      <section class="banner-wrapper__item" data-product="${index + 1}">
        <img src="${productImages[imageNoExtension]}">
        <div class="prices-wrapper"></div>
      </section>
    `;

    insertPrice(index);
    createListeners();
  });

  cycles.cycleProducts();
  cycles.cyclePrices();
};

export { products, optout, createProducts };
