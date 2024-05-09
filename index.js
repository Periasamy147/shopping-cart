var D = document;
var pContainer = D.querySelector('.products-container');
var cContainer = D.querySelector('.cart-container');
var amount = 0;
var amt = D.querySelector('.amt');
// Sample data
var products = [
    [1, 'Milk', 10, 100],
    [2, 'Bread', 20, 200],
    [3, 'Butter', 30, 300],
];
products.forEach(function (p) {
    var item = document.createElement('div');
    item.className = 'product';
    item.id = "p".concat(p[0]);
    item.innerHTML = "\n    <p>Product Id:".concat(p[0], "</p>\n    <p>Name:").concat(p[1], "</p>\n    <p>Qty Available: ").concat(p[2], "</p>\n    <p>Price: \u20B9").concat(p[3], "</p>\n    <button onclick=\"addToCart(").concat(p[0], ")\">Add to Cart</button>\n  ");
    pContainer === null || pContainer === void 0 ? void 0 : pContainer.appendChild(item);
});
var cart = [];
function addToCart(pid) {
    var pIndex = -1;
    var cIndex = -1;
    for (var i = 0; i < products.length; i++) {
        if (products[i][0] === pid) {
            pIndex = i;
            break;
        }
    }
    if (pIndex === -1 || products[pIndex][2] === 0) {
        alert('Out of Stock!');
        return;
    }
    for (var i = 0; i < cart.length; i++) {
        if (cart[i][0] === pid) {
            cIndex = i;
            break;
        }
    }
    products[pIndex][2]--;
    if (cIndex === -1) {
        cart.push([pid, products[pIndex][1], 1, products[pIndex][3]]);
    }
    else {
        cart[cIndex][2]++;
    }
    updateCart();
    updateItem(pid, pIndex);
}
function updateCart() {
    var currAmt = 0;
    cContainer.innerHTML = '';
    cart.forEach(function (i) {
        var item = document.createElement('div');
        item.className = 'item';
        currAmt += i[2] * i[3];
        item.innerHTML = "\n      <p class=\"pid\">".concat(i[0], "</p>\n      <p class=\"name\">").concat(i[1], "</p>\n      <p class=\"qty\">").concat(i[2], "</p>\n      <p class=\"price\">\u20B9").concat(i[3], "</p>\n      <button onclick=\"removeItem(").concat(i[0], ", ").concat(i[2], ")\">X</button>\n    ");
        cContainer === null || cContainer === void 0 ? void 0 : cContainer.appendChild(item);
    });
    amount = currAmt;
    updateAmount(amount);
}
function updateItem(pid, pIndex) {
    var item = document.getElementById("p".concat(pid));
    if (item) {
        item.innerHTML = "\n      <p>Product Id:".concat(products[pIndex][0], "</p>\n      <p>Name:").concat(products[pIndex][1], "</p>\n      <p>Qty Available: ").concat(products[pIndex][2], "</p>\n      <p>Price: \u20B9").concat(products[pIndex][3], "</p>\n      <button onclick=\"addToCart(").concat(pid, ")\">Add to Cart</button>\n    ");
    }
}
function updateAmount(amount) {
    if (amt) {
        amt.innerHTML = "".concat(amount);
    }
}
function removeItem(pid, qty) {
    var pIndex = -1;
    var cIndex = -1;
    for (var i = 0; i < products.length; i++) {
        if (products[i][0] === pid) {
            pIndex = i;
            break;
        }
    }
    for (var i = 0; i < cart.length; i++) {
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
