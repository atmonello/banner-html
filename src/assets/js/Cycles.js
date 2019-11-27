export default class BannerCycles {
  constructor() {
    this.product = null;
    this.id = 1;
    this.priceCycle = null;
    this.productCycle = null;
  }

  cyclePrices() {
    const pricesWrappersList = document.querySelectorAll('.prices-wrapper');

    this.priceCycle = setInterval(() => {
      pricesWrappersList.forEach((wrapper) => {
        const prices = [...wrapper.children];
        prices.forEach((item) => {
          if (prices.length > 1) {
            item.classList.toggle('hidden');
          }
        });
      });
    }, 2000);
  }

  cycleProducts(toggle = true) {
    if (this.id > 4) {
      this.id = 1;
    }
    this.product = document.querySelector(`.banner-wrapper__item[data-product="${this.id}"`);

    if (toggle) {
      this.product.classList.add('banner-wrapper__item--active');
      this.productCycle = setInterval(() => {
        this.product.classList.remove('banner-wrapper__item--active');
        this.product = document.querySelector(`.banner-wrapper__item[data-product="${this.id}"`);
        this.product.classList.add('banner-wrapper__item--active');
        this.id += 1;
        if (this.id > 4) {
          this.id = 1;
        }
      }, 4000);
    } else {
      clearInterval(this.productCycle);
      this.product.classList.remove('banner-wrapper__item--active');
    }
  }
}
