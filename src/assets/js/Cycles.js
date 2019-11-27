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

  cycleProducts() {
    if (this.toggle) {
      this.productCycle = setInterval(() => {
        this.id += 1;

        if (this.id > 4) {
          this.id = 1;
        }

        const $oldProduct = document.querySelector('.banner-wrapper__item--active');
        if ($oldProduct) {
          $oldProduct.classList.remove('banner-wrapper__item--active');
        }

        const $product = document.querySelector(`.banner-wrapper__item[data-product="${this.id}"]`);
        $product.classList.add('banner-wrapper__item--active');
      }, 1500);
    } else {
      clearInterval(this.productCycle);
      this.id = 1;
    }
  }

  toggleProductCycle(bool = true) {
    this.toggle = bool;
  }
}
