// Load entries from JSON
fetch('entries.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('entries-grid');
    data.entries.forEach(entry => {
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
  });

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

// Search Functionality
document.getElementById('search-bar').addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll('.entry-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// Dark Mode Toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
