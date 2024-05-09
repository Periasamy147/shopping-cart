let D = document;
let pContainer = D.querySelector('.products-container');
let cContainer = D.querySelector('.cart-container');
let amount = 0;
let amt = D.querySelector('.amt');

type Product = [number, string, number, number];
type CartItem = [number, string, number, number];

// Sample data
let products: Product[] = [
  [1, 'Milk', 10, 100],
  [2, 'Bread', 20, 200],
  [3, 'Butter', 30, 300],
];

products.forEach((p) => {
  let item = document.createElement('div');
  item.className = 'product';
  item.id = `p${p[0]}`;
  item.innerHTML = `
    <p>Product Id:${p[0]}</p>
    <p>Name:${p[1]}</p>
    <p>Qty Available: ${p[2]}</p>
    <p>Price: ₹${p[3]}</p>
    <button onclick="addToCart(${p[0]})">Add to Cart</button>
  `;

  pContainer?.appendChild(item);
});

let cart: CartItem[] = [];

function addToCart(pid: number) {
  let pIndex: number = -1;
  let cIndex: number = -1;

  for (let i = 0; i < products.length; i++) {
    if (products[i][0] === pid) {
      pIndex = i;
      break;
    }
  }

  if (pIndex === -1 || products[pIndex][2] === 0) {
    alert('Out of Stock!');
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0] === pid) {
      cIndex = i;
      break;
    }
  }

  products[pIndex][2]--;
  if (cIndex === -1) {
    cart.push([pid, products[pIndex][1], 1, products[pIndex][3]]);
  } else {
    cart[cIndex][2]++;
  }

  updateCart();
  updateItem(pid, pIndex);
}

function updateCart() {
  let currAmt: number = 0;
  cContainer!.innerHTML = '';

  cart.forEach((i) => {
    let item = document.createElement('div');
    item.className = 'item';
    currAmt += i[2] * i[3];
    item.innerHTML = `
      <p class="pid">${i[0]}</p>
      <p class="name">${i[1]}</p>
      <p class="qty">${i[2]}</p>
      <p class="price">₹${i[3]}</p>
      <button onclick="removeItem(${i[0]}, ${i[2]})">X</button>
    `;

    cContainer?.appendChild(item);
  });

  amount = currAmt;
  updateAmount(amount);
}

function updateItem(pid: number, pIndex: number) {
  let item = document.getElementById(`p${pid}`);
  if (item) {
    item.innerHTML = `
      <p>Product Id:${products[pIndex][0]}</p>
      <p>Name:${products[pIndex][1]}</p>
      <p>Qty Available: ${products[pIndex][2]}</p>
      <p>Price: ₹${products[pIndex][3]}</p>
      <button onclick="addToCart(${pid})">Add to Cart</button>
    `;
  }
}

function updateAmount(amount: number) {
  if (amt) {
    amt.innerHTML = `${amount}`;
  }
}

function removeItem(pid: number, qty: number) {
  let pIndex: number = -1;
  let cIndex: number = -1;

  for (let i = 0; i < products.length; i++) {
    if (products[i][0] === pid) {
      pIndex = i;
      break;
    }
  }

  for (let i = 0; i < cart.length; i++) {
    if (cart[i][0] === pid) {
      cIndex = i;
      break;
    }
  }

  if (pIndex !== -1 && cIndex !== -1) {
    products[pIndex][2] += qty;
    cart.splice(cIndex, 1);
    updateCart();
    updateItem(pid, pIndex);
  }
}
