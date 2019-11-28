export default class BannerCycles {
  constructor() {
    this.product = null;
    this.id = 1;
    this.priceCycle = null;
    this.productCycle = null;
    this.toggle = true;
  }

  cyclePrices(product) {
    const pricesWrappersList = product.querySelectorAll('.prices-wrapper');
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

  // eslint-disable-next-line class-methods-use-this
  removeActiveProducts() {
    const $activeProducts = document.querySelectorAll('.banner-wrapper__item--active');
    $activeProducts.forEach((item) => {
      item.classList.remove('banner-wrapper__item--active');
    });
  }

  setActiveProduct() {
    this.product = document.querySelector(`.banner-wrapper__item[data-product="${this.id}"]`);
    this.product.classList.add('banner-wrapper__item--active');
  }

  cycleProducts(bool = true) {
    this.toggle = bool;

    if (this.toggle) {
      if (!this.productCycle) {
        this.productCycle = setInterval(() => {
          this.removeActiveProducts();
          this.id += 1;
          if (this.id > 4 || this.id <= 0) {
            this.id = 1;
          }
          this.setActiveProduct();
        }, 4000);
      }
    } else {
      clearInterval(this.productCycle);
      this.productCycle = null;
      this.id = 1;
    }
  }
}
