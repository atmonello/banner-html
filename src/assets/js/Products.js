/* eslint-disable array-callback-return */
/* eslint-disable quote-props */
import data from '../products.json';
import boots from '../img/boots.jpg';
import dress from '../img/dress.jpg';
import gym from '../img/gym.jpg';
import tshirt from '../img/tshirt.jpg';


const { products, optout_url: optout } = data;

const productImages = {
  'boots': boots,
  'dress': dress,
  'gym': gym,
  'tshirt': tshirt,
};

const insertPrice = (index) => {
  const salePrice = products[index].sale_price;
  const oldPrice = products[index].old_price;
  const productElement = document.querySelector(`#product-${index + 1}`);

  if (salePrice) {
    productElement.classList.add('has-sale-price');
    const salePriceElement = document.createElement('span');
    salePriceElement.innerHTML = salePrice;
    const pricesWrapper = productElement.querySelector('.prices-wrapper');
    pricesWrapper.appendChild(salePriceElement);
  }

  if (oldPrice) {
    productElement.classList.add('has-old-price');
    const oldPriceElement = document.createElement('span');
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
    insertPrice(index);
  });
};

export { products, optout, createProducts };
