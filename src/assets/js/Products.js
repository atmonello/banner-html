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


export { Products, Loaded };
