import './assets/stylesheets/base.scss';
import { Products as GetProducts, Loaded } from './assets/js/Products';

const checkLoadedProducts = setInterval(() => {
  if (Loaded) {
    clearInterval(checkLoadedProducts);
    const div = document.createElement('div');
    div.innerHTML = JSON.stringify(GetProducts);
    document.body.appendChild(div);
  }
}, 100);
