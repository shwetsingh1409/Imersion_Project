let products = [];
let allProducts = [];

window.onload = () => {
  fetchProducts();
};

function fetchProducts() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      products = [...allProducts];
      populateBrandFilter(allProducts);
      displayProducts(products);
    });
}

function populateBrandFilter(products) {
  const brandSelect = document.getElementById('brandFilter');
  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  brandSelect.innerHTML = `<option value="">All Brands</option>` + 
    uniqueBrands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
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
      allProducts = data.products;
      products = [...allProducts];
      populateBrandFilter(allProducts);
      applyFilters(); // apply filters if set
    });
}

function displayProducts(productArray) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  if (productArray.length === 0) {
    productList.innerHTML = `<p>No products found.</p>`;
    return;
  }

  productArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Brand: ${product.brand}</p>
      <p>Price: $${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;

    productList.appendChild(productCard);
  });
}

function sortProducts() {
  const sortBy = document.getElementById('sortSelect').value;
  let sorted = [...products];

  if (sortBy === 'price') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}

function applyFilters() {
  const brand = document.getElementById('brandFilter').value;
  const min = parseFloat(document.getElementById('minPrice').value) || 0;
  const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  products = allProducts.filter(product => {
    return (
      (brand === '' || product.brand === brand) &&
      product.price >= min &&
      product.price <= max
    );
  });

  sortProducts(); // apply sorting to filtered products
}
