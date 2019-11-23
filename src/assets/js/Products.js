/* eslint-disable import/no-mutable-exports */
/* eslint-disable array-callback-return */
const Products = {};
let Loaded = false;

fetch('/products.json')
  .then((res) => res.json())
  .then((data) => {
    Object.keys(data).map((key) => {
      Products[key] = data[key];
    });
    Loaded = true;
  });

function LoadImages(container, products) {
  products.map((item, index) => {
    const imgEl = document.createElement('img');
    imgEl.src = `/img/${item.image}`;
    const product = container.querySelector(`#product-${index + 1} .product-image`);
    product.appendChild(imgEl);
  });
}

function LoadPrices(products) {
  products.map((item, index) => {
    const productPrice = document.querySelector(`#product-${index + 1} .product-price`);
    if (item.sale_price) {
      productPrice.innerHTML += (`<span class="product-price__sale">${item.sale_price}</span>`);
    }
    if (item.old_price) {
      productPrice.innerHTML += (`<span class="product-price__old">${item.old_price}</span>`);
    }
  });
}


export {
  Products,
  Loaded,
  LoadImages,
  LoadPrices,
};
