// Load entries from JSON
fetch('entries.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('entries-grid');
    const categorySelect = document.getElementById('category-select');
    const categories = new Set(data.entries.map(entry => entry.category));
    
    // Populate category select
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    // Display all entries initially
    displayEntries(data.entries);

    // Filter entries by category
    categorySelect.addEventListener('change', (e) => {
      const selectedCategory = e.target.value;
      const filteredEntries = selectedCategory ? 
        data.entries.filter(entry => entry.category === selectedCategory) : 
        data.entries;
      displayEntries(filteredEntries);
    });

    // Search Functionality
    document.getElementById('search-bar').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredEntries = data.entries.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm) || 
        entry.description.toLowerCase().includes(searchTerm)
      );
      displayEntries(filteredEntries);
    });
  });

function displayEntries(entries) {
  const grid = document.getElementById('entries-grid');
  grid.innerHTML = ''; // Clear current entries
  entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.innerHTML = `
      <h3>${entry.title}</h3>
      <p>${entry.description}</p>
      <small>${entry.date}</small>
    `;
    card.addEventListener('click', () => openModal(entry));
    grid.appendChild(card);
  });
}

// Open Modal
function openModal(entry) {
  const modal = document.getElementById('entry-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalEntry = document.getElementById('modal-entry');

  modalTitle.textContent = entry.title;
  modalDescription.textContent = entry.description;
  modalEntry.textContent = entry.entry;

  modal.style.display = 'flex';
}

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('entry-modal').style.display = 'none';
});

// Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLightMode = document.body.classList.contains('light-mode');
  document.getElementById('theme-toggle').textContent = isLightMode ? 'Toggle Dark Mode' : 'Toggle Light Mode';
});
