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
    this.pricesContainer = null;
    this.checkHover = null;
    this.clone = null;
  }

  init(config) {
    const {
      product, productID, wrapper, cycles,
    } = config;

    const {
      image,
      name,
      old_price: oldPrice,
      sale_price: salePrice,
      url,
    } = product;

    this.cycles = cycles;
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

    if (this.id === 1) {
      this.el.classList.add('banner-wrapper__item--active');
    }

    this.el.dataset.product = this.id;
    this.el.dataset.item = this.name;
    this.el.dataset.productUrl = this.url;

    this.el.innerHTML = `
      <img src="http://localhost:3001/products/images/${this.logo}">
      <button class="btn btn-close">X</button>
      <aside>
        <p class="item-name">${this.name}</p>
        <div class="prices-wrapper"></div>
        <button class="btn btn-purchase">
          <a href="${this.url}" target="_blank">Comprar</a>
        </button>
      </aside>
    `;
    this.wrapper.appendChild(this.el);
    this.insertPrice();
    this.startPriceCycle();
    this.bindEvents();
    this.cycles.cycleProducts();
  }

  insertPrice() {
    this.pricesContainer = this.el.querySelector('.prices-wrapper');

    if (this.salePrice) {
      this.el.classList.add('has-sale-price');
      this.pricesContainer.innerHTML += `<span class="sale-price">${this.salePrice}</span>`;
    }

    if (this.oldPrice) {
      this.el.classList.add('has-old-price');
      this.pricesContainer.innerHTML += `<span class="old-price">${this.oldPrice}</span>`;
    }

    if (this.el.classList.contains('has-sale-price')
    && this.el.classList.contains('has-old-price')) {
      this.el.dataset.discount = this.salePrice && this.oldPrice
        ? `-${this.getPriceDiscount(this.oldPrice, this.salePrice)}%`
        : null;
      const $old = this.pricesContainer.querySelector('.old-price');
      $old.classList.add('hidden');
    }
  }

  getPriceDiscount() {
    const oldNumber = Number(this.oldPrice.split(' ')[1].replace(',', '.'));
    const saleNumber = Number(this.salePrice.split(' ')[1].replace(',', '.'));
    return 100 - Math.floor((saleNumber * 100) / oldNumber);
  }

  removeImageExtension(img) {
    [this.logo] = img.split('.');
    return this.logo;
  }

  startPriceCycle(element) {
    const $el = element || this.el;
    this.cycles.cyclePrices($el);
  }

  bindEvents() {
    this.el.addEventListener('mouseenter', this.mouseEnter.bind(this));
    this.el.addEventListener('mouseleave', this.mouseLeave.bind(this));
  }

  mouseEnter() {
    this.cycles.cycleProducts(false);
    this.cycles.removeActiveProducts();

    this.el.classList.add('banner-wrapper__item--active');
    this.hover = true;

    this.checkHover = setTimeout(() => {
      if (this.hover) {
        this.clone = this.el.cloneNode(true);
        this.clone.classList.add('banner-wrapper__item--large');
        this.wrapper.appendChild(this.clone);

        this.startPriceCycle(this.clone);

        const $closeBtn = this.clone.querySelector('.btn-close');
        $closeBtn.onclick = () => this.clone.remove();
      }
    }, 2000);
  }

  mouseLeave() {
    clearTimeout(this.checkHover);
    this.el.classList.remove('banner-wrapper__item--active');
    this.hover = false;
    this.cycles.setActiveProduct();
    this.cycles.cycleProducts();
  }
}
