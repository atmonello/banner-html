/* eslint-disable quote-props */
import boots from '../img/boots.jpg';
import dress from '../img/dress.jpg';
import gym from '../img/gym.jpg';
import tshirt from '../img/tshirt.jpg';
import logoImage from '../img/voucher.png';

import {
  products,
  // optout,
  logoUrl,
} from './Products';

import Cycles from './Cycles';

const productImages = {
  'boots': boots,
  'dress': dress,
  'gym': gym,
  'tshirt': tshirt,
};

let toggleCycle = true;
let isHovering = false;

const logoElement = document.querySelector('.banner-wrapper__footer #logo');
logoElement.src = logoImage;

const logoLink = document.querySelector('.banner-wrapper__footer #link');
logoLink.href = logoUrl;
logoLink.setAttribute('target', '_blank');

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
    product.addEventListener('mouseenter', ({ target }) => {
      const activeProduct = document.querySelector('.banner-wrapper__item--active');
      activeProduct.classList.remove('banner-wrapper__item--active');

      if (!isHovering) {
        isHovering = true;
      }

      toggleCycle = false;
      Cycles.cycleProducts(toggleCycle);

      setTimeout(() => {
        if (isHovering) {
          const productsWrapper = document.querySelector('.banner-wrapper__products');
          const clone = target.cloneNode(true);
          clone.classList.add('banner-wrapper__item--hover');

          clone.innerHTML = `
            <button class="btn btn-close">X</button>
            <p class="item-name">${clone.dataset.item}</p>
            ${clone.innerHTML}
            <button class="btn btn-purchase"><a href=${clone.dataset.productUrl} target="_blank">Comprar</a><button>
          `;
          productsWrapper.appendChild(clone);

          const alternatePrice = setInterval(() => {
            if (clone.classList.contains('has-sale-price') && clone.classList.contains('has-old-price')) {
              const prices = clone.querySelector('.prices-wrapper');
              prices.childNodes.forEach((child) => {
                child.classList.toggle('hidden');
              });
            }
          }, 2000);

          const buttonClose = clone.querySelector('.btn-close');
          buttonClose.onclick = () => {
            clone.remove();
            clearInterval(alternatePrice);
          };
        }
      }, 2000);
    });

    product.addEventListener('mouseleave', () => {
      toggleCycle = true;
      isHovering = false;
      Cycles.cycleProducts();
    });
  });
};

const createProducts = (items) => {
  const productsWrapper = document.querySelector('.banner-wrapper__products');

  items.forEach((item, index) => {
    const imageNoExtension = item.image.split('.')[0];

    productsWrapper.innerHTML += `
      <section 
        class="banner-wrapper__item" 
        data-product="${index + 1}" 
        data-item="${item.name}"
        data-product-url="${item.url}"
      >
        <img src="${productImages[imageNoExtension]}">
        <div class="prices-wrapper"></div>
      </section>
    `;

    insertPrice(index);
    createListeners();
  });

  Cycles.cycleProducts();
  Cycles.cyclePrices();
};

export default createProducts;
