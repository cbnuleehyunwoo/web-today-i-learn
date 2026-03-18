document.addEventListener('DOMContentLoaded', () => {
  const tilForm = document.getElementById('til-form');
  const tilList = document.getElementById('til-list');

  // 초기 실행
  loadTils();
  initGalleryModal(); // 1. 이미지 모달 기능 활성화
  initClickFeedback(); // 2. 클릭/터치 피드백 활성화

  /* --- TIL 관리 로직 --- */
  if (tilForm) {
    tilForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.querySelector('#til-date').value;
      const title = document.querySelector('#til-title').value;
      const content = document.querySelector('#til-content').value;

      const newTil = { id: Date.now(), date, title, content };
      addTilToDOM(newTil);
      saveTilToLocalStorage(newTil);
      tilForm.reset();
    });
  }

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

  /* --- [신규] 1. 이미지 모달 확대 로직 --- */
  function initGalleryModal() {
    // 모달용 HTML 요소 생성 및 삽입
    const modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.innerHTML = `<span class="close">&times;</span><img class="modal-content" id="modal-img">`;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('modal-img');
    const galleryImages = document.querySelectorAll('.gallery-grid img, .work-thumbnail img');

    galleryImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        document.body.style.overflow = 'hidden'; // 스크롤 방지
      });
    });

    // 모달 닫기 (배경이나 닫기 버튼 클릭 시)
    modal.addEventListener('click', (e) => {
      if (e.target !== modalImg) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  /* --- [신규] 2. 화면 터치 피드백 (반짝이 효과) --- */
  function initClickFeedback() {
    window.addEventListener('mousedown', (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'click-feedback';
      
      // 클릭 위치에 반짝이 생성
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      
      document.body.appendChild(sparkle);

      // 애니메이션 종료 후 제거
      setTimeout(() => {
        sparkle.remove();
      }, 600);
    });
  }
});