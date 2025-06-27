// Получаем все фото из services_photos
const servicePhotos = [
  'services_photos/жк балтийский.png',
  'services_photos/надеждой и сергеем бойко.jpg',
  'services_photos/green pool.jpg',
  'services_photos/batmansity.png',
  'services_photos/iron speedy.png',
  'services_photos/жк саморкад.jpg',
  'services_photos/бегущая строка.png',
  'services_photos/5.png',
  'services_photos/3.png',
  'services_photos/2.jpg',
  'services_photos/1.jpg',
  'services_photos/4.jpg'
];

function getPhotosForService(startIdx) {
  // Возвращает 5 фото подряд, с повторением если не хватает
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(servicePhotos[(startIdx + i) % servicePhotos.length]);
  }
  return arr;
}

const servicesData = {
  start: {
    title: "Проект для старта ремонта",
    items: getPhotosForService(0).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для старта ремонта.`,
      price: `от ${1500 + i*500} ₽/м²`,
      image: img
    }))
  },
  express: {
    title: "Экспресс проект",
    items: getPhotosForService(1).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для экспресс проекта.`,
      price: `от ${1800 + i*400} ₽/м²`,
      image: img
    }))
  },
  full: {
    title: "Полный дизайн проект",
    items: getPhotosForService(2).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для полного дизайн проекта.`,
      price: `от ${3000 + i*600} ₽/м²`,
      image: img
    }))
  },
  supervision: {
    title: "Авторский надзор",
    items: getPhotosForService(3).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для авторского надзора.`,
      price: `от ${1000 + i*700} ₽/м²`,
      image: img
    }))
  },
  completion: {
    title: "Комплектация объекта",
    items: getPhotosForService(4).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для комплектации объекта.`,
      price: `от ${1500 + i*800} ₽/м²`,
      image: img
    }))
  },
  day: {
    title: "День с дизайнером",
    items: getPhotosForService(5).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для дня с дизайнером.`,
      price: `от ${15000 + i*2000} ₽/день`,
      image: img
    }))
  },
  homestaging: {
    title: "Хоумстейджинг",
    items: getPhotosForService(6).map((img, i) => ({
      title: `Вариант ${i+1}`,
      description: `Описание варианта ${i+1} для хоумстейджинга.`,
      price: `от ${50000 + i*10000} ₽`,
      image: img
    }))
  }
};

function createServiceThumbs(items, activeIdx) {
  return items.map((item, idx) =>
    `<img src="${item.image}" class="service-thumb${idx === activeIdx ? ' active' : ''}" data-idx="${idx}" alt="thumb">`
  ).join('');
}

function createServiceMainContent(service, itemIdx) {
  const item = service.items[itemIdx];
  return `
    <div>
      <div class="service-main-title">${service.title}</div>
      <div class="service-main-description">${item.description}</div>
      <div class="service-main-price">${item.price}</div>
      <button class="service-main-btn">Заказать</button>
    </div>
  `;
}

function updateServiceBlock(serviceType, itemIdx = 0) {
  const service = servicesData[serviceType];
  if (!service) return;
  const thumbs = document.getElementById('servicesThumbs');
  if (thumbs) thumbs.innerHTML = createServiceThumbs(service.items, itemIdx);
  const mainContent = document.getElementById('serviceMainContent');
  if (mainContent) mainContent.innerHTML = createServiceMainContent(service, itemIdx);
  const mainImage = document.getElementById('serviceMainImage');
  if (mainImage) mainImage.innerHTML = `<img src="${service.items[itemIdx].image}" alt="main">`;

  // События для миниатюр
  if (thumbs) {
    thumbs.querySelectorAll('.service-thumb').forEach(thumb => {
      thumb.addEventListener('click', e => {
        updateServiceBlock(serviceType, +thumb.dataset.idx);
      });
    });
  }
}

// Скролл меню при наведении
function scrollNavItemIntoView(item) {
  const navScroll = document.querySelector('.services-nav-scroll');
  if (!navScroll) return;
  const navRect = navScroll.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  // Если элемент левее видимой области
  if (itemRect.left < navRect.left) {
    navScroll.scrollLeft -= (navRect.left - itemRect.left) + 16; // 16 — запас
  }
  // Если элемент правее видимой области
  else if (itemRect.right > navRect.right) {
    navScroll.scrollLeft += (itemRect.right - navRect.right) + 16;
  }
}

// Новый массив этапов работ
const workStepsTitles = [
  'знакомство и заполнение анкеты',
  'заключение договора',
  'разработка планировочного решения',
  'составление коллажей концепции',
  '3д визуализация',
  'разработка полного пакета чертежей',
  'подготовка сметы чистовых материалов',
  'сдача проекта для реализации'
];
const workStepsImagesFolder = 'steps/';
const workStepsImages = [
  'жк балтийский.png',
  'green pool.jpg',
  'batmansity.png',
  'iron speedy.png',
  'жк саморкад.jpg',
  'надеждой и сергеем бойко.jpg',
  'бегущая строка.png',
  '1.jpg'
];

function renderWorkStepsAuto(steps, imagesFolder, imagesArr) {
  const list = document.getElementById('workStepsList');
  const image = document.getElementById('workStepsImage');
  if (!list || !image) return;
  list.innerHTML = '';
  let activeIdx = 0;
  function getImage(idx) {
    // Повторяем картинки по кругу
    const imgIdx = idx % imagesArr.length;
    return imagesFolder + imagesArr[imgIdx];
  }
  function showImage(idx) {
    image.innerHTML = `<img src="${getImage(idx)}" alt="${steps[idx]}">`;
    list.querySelectorAll('.work-step').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
  }
  steps.forEach((step, idx) => {
    const li = document.createElement('li');
    li.className = 'work-step' + (idx === 0 ? ' active' : '');
    li.textContent = step;
    li.addEventListener('mouseenter', () => li.classList.add('active'));
    li.addEventListener('mouseleave', () => {
      if (activeIdx !== idx) li.classList.remove('active');
    });
    li.addEventListener('click', () => {
      activeIdx = idx;
      showImage(idx);
    });
    list.appendChild(li);
  });
  showImage(0);
}

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.service-nav-item');
  let currentService = 'start';
  let currentIdx = 0;
  let scrollInterval = null;
  const navScroll = document.querySelector('.services-nav-scroll');

  function isLeftMost(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return Math.abs(rect.left - parentRect.left) < 5;
  }
  function isRightMost(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return Math.abs(rect.right - parentRect.right) < 5;
  }
  function isFullyVisible(item) {
    const rect = item.getBoundingClientRect();
    const parentRect = navScroll.getBoundingClientRect();
    return rect.left >= parentRect.left && rect.right <= parentRect.right;
  }
  function startAutoScroll(direction, item) {
    stopAutoScroll();
    scrollInterval = setInterval(() => {
      if ((direction < 0 && navScroll.scrollLeft <= 0) ||
          (direction > 0 && navScroll.scrollLeft >= navScroll.scrollWidth - navScroll.clientWidth - 1)) {
        stopAutoScroll();
        return;
      }
      if (isFullyVisible(item)) {
        stopAutoScroll();
        return;
      }
      navScroll.scrollLeft += direction * 12;
    }, 16);
  }
  function stopAutoScroll() {
    if (scrollInterval) clearInterval(scrollInterval);
    scrollInterval = null;
  }

  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('hovered');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('hovered');
    });
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentService = item.dataset.service;
      currentIdx = 0;
      updateServiceBlock(currentService, currentIdx);
      // Скроллим выбранный пункт в видимую область только по горизонтали
      scrollNavItemIntoView(item);
    });
    item.onfocus = null;
    item.onblur = null;
  });

  // Инициализация
  updateServiceBlock(currentService, currentIdx);

  // Слайдеры (только если есть контейнер)
  if (document.getElementById('main-slider')) {
    createSlider({
      containerId: 'main-slider',
      images: [
        'slider/1.jpg',
        'slider/2.jpg',
        'slider/3.png',
        'slider/4.jpg'
      ],
      labels: ['ЖК Балтийский', 'ЖК Саморкад', 'Iron Speedy', 'Batmansity']
    });
  }
  if (document.getElementById('main-slider-bottom')) {
    createSlider({
      containerId: 'main-slider-bottom',
      images: [
        'slider/1.jpg',
        'slider/2.jpg',
        'slider/3.png',
        'slider/4.jpg'
      ],
      labels: ['ЖК Балтийский', 'ЖК Саморкад', 'Iron Speedy', 'Batmansity']
    });
  }
  if (document.getElementById('vershina-slider')) {
    createSlider({
      containerId: 'vershina-slider',
      images: [
        'services_photos/жк балтийский.png',
        'services_photos/green pool.jpg',
        'services_photos/batmansity.png',
        'services_photos/iron speedy.png'
      ],
      labels: ['Vershina 1', 'Vershina 2', 'Vershina 3', 'Vershina 4'],
      withLogo: true,
      logoSrc: 'services_photos/Group 19.svg'
    });
  }

  // Блок услуг (только если есть servicesThumbs)
  if (document.getElementById('servicesThumbs')) {
    let currentService = 'start';
    let currentIdx = 0;
    updateServiceBlock(currentService, currentIdx);
  }

  // Этапы работы (только если есть workStepsList)
  if (document.getElementById('workStepsList')) {
    renderWorkStepsAuto(
      [
        'знакомство и заполнение анкеты',
        'заключение договора',
        'разработка планировочного решения',
        'составление коллажей концепции',
        '3д визуализация',
        'разработка полного пакета чертежей',
        'подготовка сметы чистовых материалов',
        'сдача проекта для реализации'
      ],
      'steps/',
      [
        'жк балтийский.png',
        'green pool.jpg',
        'batmansity.png',
        'iron speedy.png',
        'жк саморкад.jpg',
        'надеждой и сергеем бойко.jpg',
        'бегущая строка.png',
        '1.jpg'
      ]
    );
  }

  // Отзывы (только если есть reviewsMarqueeTrack)
  if (document.getElementById('reviewsMarqueeTrack')) {
    renderReviewsMarquee();
  }

  // Блог (только если есть blogSlider)
  if (document.getElementById('blogSlider')) {
    (function initBlogSlider() {
      const visible = 2;
      let current = 0;
      const total = blogData.length;
      const slider = document.getElementById('blogSlider');
      const btn = document.getElementById('blogNextBtn');
      const btnText = btn.querySelector('.blog-next-btn-text');
      function render() {
        slider.innerHTML = '';
        for (let i = 0; i < total; i++) {
          slider.innerHTML += createBlogCard(blogData[i]);
        }
        updateTransform(false);
        updateBtn();
        // Переход на all-blocks.html по нажатию клавиши '1'
        window.addEventListener('keydown', function(e) {
          if (e.key === '1') {
            window.location.href = 'all-blocks.html';
          }
        });
      }
      function updateTransform(animate = true) {
        slider.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
        const cardWidth = 725 + 48; // ширина карточки + gap
        slider.style.transform = `translateX(-${current * cardWidth}px)`;
      }
      function updateBtn() {
        if (current + visible >= total) {
          btn.classList.add('to-start');
          btnText.textContent = 'Вначало';
        } else {
          btn.classList.remove('to-start');
          btnText.textContent = 'Дальше';
        }
      }
      btn.addEventListener('click', () => {
        if (current + visible >= total) {
          current = 0;
        } else {
          current++;
        }
        updateTransform();
        updateBtn();
      });
      render();
    })();
  }

  // Вставка SVG в hero-блок
  const heroVectorsContainer = document.getElementById('heroVectors');
  if (heroVectorsContainer) {
    heroVectors.forEach(svg => {
      const div = document.createElement('div');
      div.innerHTML = svg;
      // Меняем цвет заливки на черный
      const svgEl = div.firstChild;
      if (svgEl && svgEl.querySelector) {
        const path = svgEl.querySelector('path');
        if (path) path.setAttribute('fill', '#222');
      }
      heroVectorsContainer.appendChild(div.firstChild);
    });
  }

  // Анимация появления векторов при скролле
  function handleHeroVectorsScroll() {
    const vectors = document.querySelector('.hero-vectors');
    if (!vectors) return;
    const rect = vectors.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      vectors.classList.add('reveal');
    } else {
      vectors.classList.remove('reveal');
    }
  }
  window.addEventListener('scroll', handleHeroVectorsScroll);
  handleHeroVectorsScroll();
  
  // Обработчик клика по .portfolio-col
  document.querySelectorAll('.portfolio-col').forEach(col => {
    col.addEventListener('click', function() {
      // Определяем тип (можно добавить data-type на .portfolio-col)
      const type = this.dataset.type || 'all';
      window.location.href = `portfolio.html?type=${type}`;
    });
  });

  const whyBtn = document.querySelector('.why-play-btn');
  if (whyBtn) {
    whyBtn.addEventListener('click', function() {
      window.location.href = 'doverie.html';
    });
  }

  renderReviewsMarquee();

  // Переход на blogger.html по клику на любую .blog-card
  const blogSection = document.querySelector('.blog-section');
  if (blogSection) {
    blogSection.addEventListener('click', function(e) {
      const card = e.target.closest('.blog-card');
      if (card) {
        window.location.href = 'blogger.html';
      }
    });
  }

  // Переходы по футерным ссылкам на десктопе
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      const isMobile = window.innerWidth <= 600;
      if (text === 'Услуги') window.location.href = 'index.html#services-section';
      else if (text === 'Портфолио') window.location.href = isMobile ? 'portfolio-m.html' : 'portfolio.html';
      else if (text === 'О нас') window.location.href = isMobile ? 'about-m.html' : 'about.html';
      else if (text === 'Блог') window.location.href = isMobile ? 'blogger-m.html' : 'blogger.html';
      else if (text === 'Философия') window.location.href = isMobile ? 'portfolio-detail-m.html' : 'portfolio-detail.html';
      else if (text === 'Контакты') window.location.href = 'modalWindow.html';
    });
  });
});

// Универсальная функция для создания слайдера
function createSlider({
  containerId,
  images,
  labels = [],
  withLogo = false,
  logoSrc = ''
}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="slider">
      ${withLogo && logoSrc ? `<img class="slider-logo" src="${logoSrc}" alt="logo">` : ''}
      <div class="slider-label"></div>
      <img class="slider-img" src="${images[0]}" alt="Слайд 1">
      <div class="slider-indicators"></div>
      <div class="slider-thumbs"></div>
    </div>
  `;
  let current = 0;
  const img = container.querySelector('.slider-img');
  const label = container.querySelector('.slider-label');
  const indicators = container.querySelector('.slider-indicators');
  const thumbs = container.querySelector('.slider-thumbs');

  function renderIndicators() {
    indicators.innerHTML = '';
    images.forEach((_, idx) => {
      const bar = document.createElement('div');
      bar.className = 'slider-bar' + (idx === current ? ' active' : '');
      bar.addEventListener('mouseenter', () => bar.classList.add('hover'));
      bar.addEventListener('mouseleave', () => bar.classList.remove('hover'));
      bar.addEventListener('click', () => showSlide(idx, true));
      indicators.appendChild(bar);
    });
  }
  function renderThumbs() {
    thumbs.innerHTML = '';
    images.forEach((src, idx) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'slider-thumb' + (idx === current ? ' active' : '');
      thumb.addEventListener('click', () => showSlide(idx, true));
      thumbs.appendChild(thumb);
    });
  }
  function showSlide(index, manual = false) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    img.classList.add('fade');
    setTimeout(() => {
      img.src = images[index];
      img.classList.remove('fade');
    }, 350);
    current = index;
    label.textContent = labels[index] || '';
    renderIndicators();
    renderThumbs();
  }
  renderIndicators();
  renderThumbs();
  label.textContent = labels[0] || '';
}

function up() {
  const el = document.querySelector('.hero-vectors');
  if (el) el.classList.add('upp');
}

// --- Отзывы (Reviews Marquee) ---
const reviewsData = [
  {
    photo: 'images/Group 2.svg',
    name: 'Алексей Ковалёв',
    date: '17.11.2024',
    text: 'Институт дизайна стал для меня важным этапом в профессиональном развитии. Программа курса была очень насыщенной: от основ графического дизайна до продвинутых техник работы с современными...'
  },
  {
    photo: 'images/Group 4.svg',
    name: 'Марина Смирнова',
    date: '17.11.2024',
    text: 'Занятия в институте не просто интересные — они действительно полезные. Каждая лекция и мастер-класс продуманы до мелочей, давая возможность погрузиться в профессию. Структура курса позволяет...'
  },
  {
    photo: 'images/textalign-left.svg',
    name: 'Михаил Фёдоров',
    date: '17.11.2024',
    text: 'Институт стал для меня не только местом обучения, но и площадкой для нетворкинга. Прекрасная возможность познакомиться с людьми, которые помогут в будущем профессиональном росте.'
  },
  {
    photo: 'images/Group 2.svg',
    name: 'Екатерина Иванова',
    date: '16.11.2024',
    text: 'Очень благодарна преподавателям за индивидуальный подход и поддержку на каждом этапе обучения. Полученные знания уже применяю в работе!'
  },
  {
    photo: 'images/Group 4.svg',
    name: 'Денис Петров',
    date: '15.11.2024',
    text: 'Курс помог мне раскрыть творческий потенциал и научил мыслить как дизайнер. Отличная атмосфера и много практики!'
  },
  {
    photo: 'images/textalign-left.svg',
    name: 'Светлана Орлова',
    date: '14.11.2024',
    text: 'Современная программа, интересные проекты и поддержка кураторов — всё это сделало обучение незабываемым.'
  }
];

function createReviewCard({photo, name, date, text}) {
  return `
    <div class="review-card">
      <div class="review-card-header">
        <img class="review-card-photo" src="${photo}" alt="${name}">
        <div class="review-card-info">
          <div class="review-card-name">${name}</div>
          <div class="review-card-date">${date}</div>
        </div>
      </div>
      <div class="review-card-text">${text}</div>
    </div>
  `;
}

function renderReviewsMarquee() {
  const track = document.getElementById('reviewsMarqueeTrack');
  if (!track) return;
  // Дублируем отзывы минимум 2 раза для бесконечной ленты
  let cards = '';
  for (let i = 0; i < 2; i++) {
    reviewsData.forEach(r => {
      cards += createReviewCard(r);
    });
  }
  track.innerHTML = cards;
}

// --- Blog Slider ---
const blogData = [
  {
    date: '29',
    month: 'апреля',
    image: 'slider/1.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '17',
    month: 'апреля',
    image: 'slider/2.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '05',
    month: 'апреля',
    image: 'slider/3.png',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  },
  {
    date: '28',
    month: 'марта',
    image: 'slider/4.jpg',
    title: 'ПРАКТИЧЕСКИ ВСЕ ИЗ НАС ЗНАЮТ',
    desc: 'практически все из нас знают, что есть полезная и вредная еда, мы делим все продукты на плохие и хорошие...'
  }
];

function createBlogCard({date, month, image, title, desc}) {
  return `
    <div class="blog-card">
      <img class="blog-card-bg" src="${image}" alt="blog">
      <div class="blog-card-overlay"></div>
      <div class="blog-card-date">${date}<span>${month}</span></div>
      <img class="blog-card-fingerprint" src="slider/5.png" alt="fingerprint">
      <div class="blog-card-content">
        <div class="blog-card-title">${title}</div>
        <div class="blog-card-desc">${desc}</div>
      </div>
    </div>
  `;
}

window.createReviewCard = createReviewCard;

// Функция для открытия модального окна
function openModal() {
    window.open('modal.html', '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
}

// Добавляем обработчики для всех кнопок после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки с текстом "Обсудить проект" или "Оставить заявку"
    const buttons = document.querySelectorAll('.bt, .vershina-btn, .meeting-mobile-btn, .meeting-btn, .bt-mobile, .test-btn');
    
    buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        if (text.includes('обсудить проект') || text.includes('оставить заявку') || text.includes('заказать')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });
});