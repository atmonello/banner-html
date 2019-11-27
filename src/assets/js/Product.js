import Cycles from './Cycles';

export default class Product {
  constructor() {
    this.url = '';
    this.logo = '';
    this.hover = false;
    this.active = true;
    this.cycles = null;
    this.wrapper = null;
    this.name = '';
    this.el = null;
    this.id = null;
    this.salePrice = null;
    this.oldPrice = null;
  }

  init(config) {
    const {
      product, productID, wrapper,
    } = config;

    const {
      image,
      name,
      old_price: oldPrice,
      sale_price: salePrice,
      url,
    } = product;

    this.cycles = new Cycles();
    this.id = productID;
    this.wrapper = wrapper;

    this.url = url;
    this.logo = image;
    this.name = name;
    this.oldPrice = oldPrice;
    this.salePrice = salePrice;

    this.createProduct();
  }

  createProduct() {
    this.el = document.createElement('section');
    this.el.classList.add('banner-wrapper__item');
    this.el.dataset.product = this.id;
    this.el.dataset.item = this.name;
    this.el.dataset.productUrl = this.url;

    this.el.innerHTML = `<img src="img/${this.logo}"><div class="prices-wrapper"></div>`;
    this.wrapper.appendChild(this.el);
  }

  removeImageExtension(img) {
    [this.logo] = img.split('.');
    return this.logo;
  }

  startPriceCycle() {
    this.cycles.cyclePrices();
  }

  mouseEnter() {
    this.addEventListener('mouseenter');
  }

  mouseLeave() {
    this.addEventListener('mouseleave');
  }
}
