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
  const salePrice = products[index].sale_price;
  const oldPrice = products[index].old_price;
  const productElement = document.querySelector(`#product-${index + 1}`);

  productElement.dataset.discount = salePrice && oldPrice
    ? `-${calculateDiscount(oldPrice, salePrice)}%`
    : null;

  if (salePrice) {
    productElement.classList.add('has-sale-price');
    const salePriceElement = document.createElement('span');
    salePriceElement.classList.add('sale-price');
    salePriceElement.innerHTML = salePrice;
    const pricesWrapper = productElement.querySelector('.prices-wrapper');
    pricesWrapper.appendChild(salePriceElement);
  }

  if (oldPrice) {
    productElement.classList.add('has-old-price');
    const oldPriceElement = document.createElement('span');
    oldPriceElement.classList.add('old-price');
    oldPriceElement.classList.add('hidden');
    oldPriceElement.innerHTML = oldPrice;
    const pricesWrapper = productElement.querySelector('.prices-wrapper');
    pricesWrapper.appendChild(oldPriceElement);
  }
};

const createProducts = (items) => {
  const productsWrapper = document.querySelector('.banner-wrapper__products');

  items.map((item, index) => {
    const productSection = document.createElement('section');
    productSection.id = `product-${index + 1}`;
    productSection.dataset.product = index + 1;
    productSection.className = 'banner-wrapper__item';

    const imageNoExtension = item.image.split('.')[0];

    productSection.innerHTML = `<img src="${productImages[imageNoExtension]}"><div class="prices-wrapper"></div>`;
    productsWrapper.appendChild(productSection);

    productSection.addEventListener('mouseover', ({ target }) => {
      const id = target.dataset.product;
      const productsList = document.querySelectorAll('.banner-wrapper__item');
      productsList.forEach((el) => el.classList.remove('banner-wrapper__item--active'));
      toggleCycle = false;
      cycles.cycleProducts(toggleCycle, id);
    });

    productSection.addEventListener('mouseout', () => {
      toggleCycle = true;
      cycles.cycleProducts();
    });

    insertPrice(index);
  });

  cycles.cycleProducts();
  cycles.cyclePrices();
};

export { products, optout, createProducts };
