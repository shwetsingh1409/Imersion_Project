let products = [];

window.onload = () => {
  fetchProducts();
};

function fetchProducts() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      products = data.products;
      displayProducts(products);
    });
}

function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert("Search field cannot be empty!");
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      products = data.products;
      displayProducts(products);
    });
}

function displayProducts(productArray) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  productArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;

    productList.appendChild(productCard);
  });
}

function sortProducts() {
  const sortBy = document.getElementById('sortSelect').value;
  let sortedProducts = [...products];

  if (sortBy === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'rating') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sortedProducts);
}
