/* eslint-disable quote-props */
import logoImage from '../img/voucher.png';
import {
  products,
  // optout,
  logoUrl,
} from './Data';

import Product from './Product';

let isHovering = false;

const logoElement = document.querySelector('.banner-wrapper__footer #logo');
logoElement.src = logoImage;

const logoLink = document.querySelector('.banner-wrapper__footer #link');
logoLink.href = logoUrl;
logoLink.setAttribute('target', '_blank');

const createListeners = () => {
  const productList = document.querySelectorAll('.banner-wrapper__item');

  productList.forEach((product) => {
    product.addEventListener('mouseenter', ({ target }) => {
      const activeProduct = document.querySelector('.banner-wrapper__item--active');
      activeProduct.classList.remove('banner-wrapper__item--active');

      if (!isHovering) {
        isHovering = true;
      }
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
  });
};

const createProducts = (items) => {
  const productsWrapper = document.querySelector('.banner-wrapper__products');

  items.forEach((item, index) => {
    const newProduct = new Product();
    newProduct.init({
      product: item,
      productID: index + 1,
      wrapper: productsWrapper,
    });
  });
};

export default createProducts;
