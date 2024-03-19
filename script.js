document.addEventListener('DOMContentLoaded', () => {
  const sortAscendingButton = document.getElementById('sortAscending');
  const sortDescendingButton = document.getElementById('sortDescending');
  const categorySelect = document.getElementById('categorySelect');
  const productsContainer = document.getElementById('productsContainer');

  let products = [];

  // Fetch data from API
  async function fetchData() {
      try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          products = data;
          renderProducts(products);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  // Render products on the page
  function renderProducts(productsToRender) {
      productsContainer.innerHTML = '';
      productsToRender.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
              <h3>${product.title}</h3>
              <p><strong>Price:</strong> $${product.price}</p>
              <p><strong>Category:</strong> ${product.category}</p>
          `;
          productsContainer.appendChild(productCard);
      });
  }

  // Sort products by price in ascending order
  sortAscendingButton.addEventListener('click', () => {
      products.sort((a, b) => a.price - b.price);
      renderProducts(products);
  });

  // Sort products by price in descending order
  sortDescendingButton.addEventListener('click', () => {
      products.sort((a, b) => b.price - a.price);
      renderProducts(products);
  });

  // Filter products by category
  categorySelect.addEventListener('change', () => {
      const category = categorySelect.value;
      if (category === '') {
          renderProducts(products);
      } else {
          const filteredProducts = products.filter(product => product.category === category);
          renderProducts(filteredProducts);
      }
  });

  // Fetch data when the page loads
  fetchData();
});