document.addEventListener('DOMContentLoaded', () => {
  const tilForm = document.getElementById('til-form');
  const tilList = document.getElementById('til-list');

  loadTils();

  tilForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const date = document.querySelector('#til-date').value;
    const title = document.querySelector('#til-title').value;
    const content = document.querySelector('#til-content').value;

    const newTil = {
      id: Date.now(),
      date,
      title,
      content
    };

    addTilToDOM(newTil);
    saveTilToLocalStorage(newTil);

    tilForm.reset();
  });

  function addTilToDOM(til) {
    const article = document.createElement('article');
    article.className = 'til-item';
    
    const formattedContent = til.content.replace(/\n/g, '<br>');

    article.innerHTML = `
      <time>${til.date}</time>
      <h3>${til.title}</h3>
      <p>${formattedContent}</p>
    `;
    
    tilList.prepend(article);
  }

  function saveTilToLocalStorage(til) {
    const tils = JSON.parse(localStorage.getItem('myTils')) || [];
    tils.push(til);
    localStorage.setItem('myTils', JSON.stringify(tils));
  }

  function loadTils() {
    const tils = JSON.parse(localStorage.getItem('myTils')) || [];
    tils.forEach(til => addTilToDOM(til));
  }
});