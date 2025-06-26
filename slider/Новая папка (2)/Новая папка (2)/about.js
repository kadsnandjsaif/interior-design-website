// Данные для страницы О нас (имитация получения с сервера)
const aboutData = {
    person: {
        name: "Надежда Бойко",
        position: "главный дизайнер, соучредитель студии"
    },
    photos: [
        { image: 'slider/1.jpg' },
        { image: 'slider/2.jpg' },
        { image: 'slider/3.png' },
        { image: 'slider/4.jpg' },
        { image: 'slider/5.png' },
        { image: 'slider/green pool.jpg' }
    ],
    team: [
        {
            name: 'Корсун Наталья',
            position: 'Руководитель отдела дизайна',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        },
        {
            name: 'Косихина Анна',
            position: 'Бухгалтер',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        },
        {
            name: 'Тишман Герман',
            position: 'Прораб',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        },
        {
            name: 'Гордеева Кристина',
            position: 'Тот кто поставляет товары',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        },
        {
            name: 'Петров Дмитрий',
            position: 'Архитектор',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        },
        {
            name: 'Сидорова Елена',
            position: 'Дизайнер интерьеров',
            image: 'slider/gh.png',
            socials: [
                { type: 'vk', url: '#' },
                { type: 'telegram', url: '#' },
                { type: 'instagram', url: '#' }
            ]
        }
    ]
};

// Создание photo-карточки (только фото)
function createPhotoCard({image}) {
    return `
        <div class="blog-card">
            <img class="blog-card-bg" src="${image}" alt="photo">
        </div>
    `;
}

// Создание карточки члена команды
function createTeamCard({name, position, image, socials}) {
    const socialIcons = socials.map(social => {
        let iconPath = '';
        switch(social.type) {
            case 'vk': iconPath = 'lastblock/Vk.svg'; break;
            case 'telegram': iconPath = 'lastblock/Telegram.svg'; break;
            case 'instagram': iconPath = 'lastblock/Instagram.svg'; break;
            case 'facebook': iconPath = 'lastblock/Facebook.svg'; break;
            case 'whatsapp': iconPath = 'lastblock/Whatsapp.svg'; break;
            case 'youtube': iconPath = 'lastblock/Youtube.svg'; break;
        }
        return `
            <a href="${social.url}" class="team-social-link">
                <img src="${iconPath}" alt="${social.type}" class="team-social-icon">
            </a>
        `;
    }).join('');
    
    return `
        <div class="team-card">
            <div class="team-card-top-line"></div>
            <div class="team-card-socials">
                ${socialIcons}
            </div>
            <div class="team-card-image">
                <img src="${image}" alt="${name}">
            </div>
            <div class="team-card-info">
                <h3 class="team-card-name">${name}</h3>
                <p class="team-card-position">${position}</p>
            </div>
        </div>
    `;
}

// Создание photo-слайдера для страницы О нас (как в блоге)
function createAboutHeroSlider(containerId, photos) {
    const container = document.getElementById(containerId);
    const btn = document.getElementById('aboutNextBtn');
    const btnText = btn.querySelector('.blog-next-btn-text');
    
    if (!container || !btn) return;
    
    const visible = 2; // Показываем 2 карточки как в блоге
    let current = 0;
    const total = photos.length;
    
    // Создаем HTML photo-слайдера
    container.innerHTML = `
        <div class="blog-slider-wrapper">
            <div class="blog-slider" id="aboutPhotoSlider"></div>
        </div>
    `;
    
    const slider = container.querySelector('.blog-slider');
    
    function render() {
        slider.innerHTML = '';
        for (let i = 0; i < total; i++) {
            slider.innerHTML += createPhotoCard(photos[i]);
        }
        updateTransform(false);
        updateBtn();
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
    
    // Обработчик кнопки (как в блоге)
    btn.addEventListener('click', () => {
        if (current + visible >= total) {
            current = 0;
        } else {
            current++;
        }
        updateTransform();
        updateBtn();
    });
    
    // Touch events
    let startX = 0;
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0 && current > 0) {
                current--;
            } else if (deltaX < 0 && current + visible < total) {
                current++;
            }
            updateTransform();
            updateBtn();
        }
    });
    
    // Инициализация
    render();
}

// Создание слайдера команды
function createAboutTeamSlider(containerId, team) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById('teamNavPrev');
    const nextBtn = document.getElementById('teamNavNext');
    const indicatorsContainer = document.getElementById('teamNavIndicators');
    
    if (!container) return;
    
    const visible = 4; // Показываем 4 карточки команды
    let current = 0;
    const total = team.length;
    const totalSlides = Math.ceil(total / visible);
    
    // Создаем HTML team-слайдера
    container.innerHTML = `
        <div class="blog-slider-wrapper">
            <div class="blog-slider" id="aboutTeamSliderInner"></div>
        </div>
    `;
    
    const slider = container.querySelector('.blog-slider');
    
    function render() {
        slider.innerHTML = '';
        for (let i = 0; i < total; i++) {
            slider.innerHTML += createTeamCard(team[i]);
        }
        updateTransform(false);
        updateNavButtons();
        updateIndicators();
    }
    
    function updateTransform(animate = true) {
        slider.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
        const cardWidth = 320 + 48; // ширина team-карточки + gap (margin учитывается автоматически)
        slider.style.transform = `translateX(-${current * cardWidth}px)`;
    }
    
    function updateNavButtons() {
        // Убираем disabled состояния, теперь кнопки всегда активны
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }
    
    function updateIndicators() {
        if (!indicatorsContainer) return;
        
        // Создаем индикаторы для каждой карточки команды
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const indicator = document.createElement('div');
            indicator.className = `team-nav-indicator ${i === current ? 'active' : ''}`;
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function nextSlide() {
        if (current < total - 2) {
            current++; // Переключаем по одной карточке до предпоследней
        } else {
            current = 0; // Возвращаемся в начало на предпоследней
        }
        updateTransform();
        updateNavButtons();
        updateIndicators();
    }
    
    function prevSlide() {
        if (current > 0) {
            current--; // Переключаем по одной карточке
        } else {
            current = total - 2; // Переходим на предпоследнюю
        }
        updateTransform();
        updateNavButtons();
        updateIndicators();
    }
    
    // Обработчики кнопок навигации
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Touch events
    let startX = 0;
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - startX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    });
    
    // Инициализация
    render();
}

// Инициализация страницы
function initAboutPage() {
    // Создаем первый слайдер с фотографиями
    createAboutHeroSlider('aboutHeroSlider', aboutData.photos);
    
    // Создаем второй слайдер с командой
    createAboutTeamSlider('aboutTeamSlider', aboutData.team);
}

// Запускаем при загрузке DOM
document.addEventListener('DOMContentLoaded', initAboutPage); 