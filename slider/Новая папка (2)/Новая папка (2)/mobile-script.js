// Универсальная функция слайдера
function createSlider(sel,imgs,lbls,cls='slider'){
const c=document.querySelector(sel);if(!c)return;
let cur=0,startX=0;
c.innerHTML=`<div class="${cls}"><div class="${cls}-label">${lbls[0]}</div><img class="${cls}-img" src="${imgs[0]}"><div class="wrapper-${cls}"><div class="${cls}-indicators"></div><div class="${cls}-thumbs"></div></div></div>`;
const img=c.querySelector(`.${cls}-img`),label=c.querySelector(`.${cls}-label`),ind=c.querySelector(`.${cls}-indicators`),th=c.querySelector(`.${cls}-thumbs`),s=c.querySelector(`.${cls}`);
function show(i){cur=(i+imgs.length)%imgs.length;img.style.opacity='0';setTimeout(()=>{img.src=imgs[cur];label.textContent=lbls[cur];img.style.opacity='1';ind.innerHTML=imgs.map((_,i)=>`<div class="${cls}-bar${i===cur?' active':''}"></div>`).join('');th.innerHTML=imgs.map((src,i)=>`<img src="${src}" class="${cls}-thumb${i===cur?' active':''}">`).join('');[...ind.children].forEach((el,i)=>el.onclick=()=>show(i));[...th.children].forEach((el,i)=>el.onclick=()=>show(i))},200)}
s.addEventListener('touchstart',e=>startX=e.touches[0].clientX);s.addEventListener('touchend',e=>{const deltaX=e.changedTouches[0].clientX-startX;if(Math.abs(deltaX)>50)show(cur+(deltaX>0?-1:1))});show(0)}

document.addEventListener('DOMContentLoaded',function(){
createSlider('.slider-container',['slider/1.jpg','slider/2.jpg','slider/3.png','slider/4.jpg','slider/5.png'],['ЖК Балтийский','ЖК Саморкад','Green Pool','Batmansity','Iron Speedy']);
    
// Блок преимуществ и услуги
const advContainer=document.getElementById('whyAdvantages');
if(advContainer)advContainer.innerHTML=[{num:'01',title:'Камерность',text:'Отличаемся не шаблонным подходом к работе, как психологи изучая стиль и философию жизни заказчика'},{num:'02',title:'Умение слышать',text:'Предлагаем проект с учетом финансовых возможностей и творческих идей'},{num:'03',title:'Уважение',text:'Стараемся понять заказчика с первого слова и точно превратить картинку из головы в визуальный ряд'},{num:'04',title:'Опыт',text:'За 3 года на рынке успели реализовать более 30 проектов'},{num:'05',title:'Скорость',text:'На реализацию одного дизайн-проекта закладываем до 2-х месяцев'},{num:'06',title:'Внимание к деталям',text:'Создаем практичные пространства с детальной проработкой зон хранения вещей'}].map(a=>`<div class="why-advantage"><div class="why-num">${a.num}</div><div class="why-adv-title">${a.title}</div><div class="why-adv-text">${a.text}</div></div>`).join('');

const nav=document.getElementById('servicesNav');
if(nav){
const data=[{name:'Проект для старта ремонта',desc:'Выезд на объект для замеров<br>Подготовка планировочного решения<br>Минимальный необходимый набор чертежей для старта ремонта',price:'3 500 ₽'},{name:'Экспресс проект',desc:'Быстрое планировочное решение<br>Базовая 3D визуализация<br>Экспресс чертежи',price:'15 000 ₽'},{name:'Полный дизайн проект',desc:'Полный комплект чертежей<br>Детальная 3D визуализация<br>Подбор материалов и мебели',price:'45 000 ₽'}];
const img=document.getElementById('servicesImg'),thumbs=document.getElementById('servicesThumbs'),content=document.getElementById('servicesContent');
let cur=0,startX=0;
function update(i){cur=i;nav.querySelectorAll('button').forEach((btn,idx)=>btn.classList.toggle('active',idx===i));content.querySelector('h3').textContent=data[i].name;content.querySelector('div').innerHTML=data[i].desc;content.querySelector('.services-m-price span').textContent=data[i].price}
nav.querySelectorAll('button').forEach((btn,i)=>btn.onclick=()=>update(i));
thumbs.querySelectorAll('img').forEach((thumb,i)=>{thumb.onclick=()=>{img.src=thumb.src;thumbs.querySelectorAll('img').forEach(t=>t.classList.remove('active'));thumb.classList.add('active')}});
thumbs.addEventListener('touchstart',e=>startX=e.touches[0].clientX);thumbs.addEventListener('touchend',e=>{const deltaX=e.changedTouches[0].clientX-startX;if(Math.abs(deltaX)>50){const imgs=thumbs.querySelectorAll('img');const active=[...imgs].findIndex(img=>img.classList.contains('active'));const next=active+(deltaX>0?-1:1);if(next>=0&&next<imgs.length)imgs[next].click()}});
update(0)}
});

// Портфолио слайдер
document.addEventListener('DOMContentLoaded', function() {
    const pc = document.querySelector('.portfolio-slider-container');
    if (!pc) return;
    
    const portfolioImages = ['slider/1.jpg','slider/2.jpg','slider/3.png','slider/4.jpg','slider/5.png'];
    const portfolioLabels = ['Vershina Art','ЖК Саморкад','Green Pool','Batmansity','Iron Speedy'];
    let portfolioCur = 0, portfolioStartX = 0;
    
    pc.innerHTML = `<div class="portfolio-slider">
        <div class="portfolio-slider-label">${portfolioLabels[0]}</div>
        <img class="portfolio-slider-img" src="${portfolioImages[0]}">
        <div class="portfolio-wrapper-slider">
            <div class="portfolio-slider-indicators"></div>
            <div class="portfolio-slider-thumbs"></div>
        </div>
    </div>`;
    
    const pImg = pc.querySelector('.portfolio-slider-img');
    const pLabel = pc.querySelector('.portfolio-slider-label');
    const pInd = pc.querySelector('.portfolio-slider-indicators');
    const pTh = pc.querySelector('.portfolio-slider-thumbs');
    const pS = pc.querySelector('.portfolio-slider');
    
    function portfolioShow(i) {
        portfolioCur = (i + portfolioImages.length) % portfolioImages.length;
        pImg.style.opacity = '0';
        setTimeout(() => {
            pImg.src = portfolioImages[portfolioCur];
            pLabel.textContent = portfolioLabels[portfolioCur];
            pImg.style.opacity = '1';
            pInd.innerHTML = portfolioImages.map((_,i) => `<div class="portfolio-slider-bar${i===portfolioCur?' active':''}"></div>`).join('');
            pTh.innerHTML = portfolioImages.map((src,i) => `<img src="${src}" class="portfolio-slider-thumb${i===portfolioCur?' active':''}">`).join('');
            [...pInd.children].forEach((el,i) => el.onclick = () => portfolioShow(i));
            [...pTh.children].forEach((el,i) => el.onclick = () => portfolioShow(i));
        }, 200);
    }
    
    pS.addEventListener('touchstart', e => portfolioStartX = e.touches[0].clientX);
    pS.addEventListener('touchend', e => {
        const deltaX = e.changedTouches[0].clientX - portfolioStartX;
        if (Math.abs(deltaX) > 50) portfolioShow(portfolioCur + (deltaX > 0 ? -1 : 1));
    });
    
    portfolioShow(0);
});

// Этапы работы мобильная версия
// Анимация векторов при скролле
function checkHeroVectorsScroll() {
    const heroBlock = document.getElementById('heroMobileBlock');
    const vectors = document.getElementById('heroMobileVectors');
    
    if (!heroBlock || !vectors) return;
    
    const rect = heroBlock.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Если блок виден на экране (хотя бы частично)
    if (rect.top < windowHeight && rect.bottom > 0) {
        // Вычисляем прогресс скролла для этого блока
        const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight * 0.7)));
        
        if (progress > 0.4) {
            vectors.classList.add('hero-mobile-visible');
        } else {
            vectors.classList.remove('hero-mobile-visible');
        }
    } else {
        vectors.classList.remove('hero-mobile-visible');
    }
}

// Добавляем обработчик скролла
window.addEventListener('scroll', checkHeroVectorsScroll);
window.addEventListener('load', checkHeroVectorsScroll);

// Touch swipe функционал с бесконечной прокруткой
function initTouchSwipe(containerSelector, sliderSelector, cardSelector, infinite = false) {
    const container = document.querySelector(containerSelector);
    const slider = document.querySelector(sliderSelector);
    const cards = document.querySelectorAll(cardSelector);
    
    if (!container || !slider || cards.length === 0) return;
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    function getCardWidth() {
        // Берем реальную ширину первой карточки
        const firstCard = cards[0];
        if (!firstCard) return 0;
        
        // Получаем текущую ширину карточки
        const cardRect = firstCard.getBoundingClientRect();
        
        // Получаем gap из стилей слайдера  
        const sliderStyle = window.getComputedStyle(slider);
        const gap = parseFloat(sliderStyle.gap) || 20;
        
        // Для корректного переключения берем ширину карточки + gap
        // Поскольку каждый слайд должен сдвигаться на полную ширину + промежуток
        return cardRect.width + gap;
    }
    
    function updateSliderPosition() {
        const cardWidth = getCardWidth();
        const translateX = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${translateX}px)`;
    }
    
    function goToNext() {
        if (infinite) {
            currentIndex = (currentIndex + 1) % cards.length;
        } else {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
            }
        }
        updateSliderPosition();
    }
    
    function goToPrev() {
        if (infinite) {
            currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        } else {
            if (currentIndex > 0) {
                currentIndex--;
            }
        }
        updateSliderPosition();
    }
    
    // Touch events
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        slider.style.transition = 'none';
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        const cardWidth = getCardWidth();
        const translateX = -currentIndex * cardWidth + diffX;
        slider.style.transform = `translateX(${translateX}px)`;
    });
    
    container.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        slider.style.transition = 'transform 0.3s ease';
        
        const diffX = currentX - startX;
        const cardWidth = getCardWidth();
        const threshold = cardWidth * 0.3;
        
        if (diffX > threshold) {
            goToPrev();
        } else if (diffX < -threshold) {
            goToNext();
        } else {
            updateSliderPosition();
        }
    });
    
    // Mouse events для тестирования на десктопе
    container.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        slider.style.transition = 'none';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        currentX = e.clientX;
        const diffX = currentX - startX;
        const cardWidth = getCardWidth();
        const translateX = -currentIndex * cardWidth + diffX;
        slider.style.transform = `translateX(${translateX}px)`;
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        slider.style.transition = 'transform 0.3s ease';
        
        const diffX = currentX - startX;
        const cardWidth = getCardWidth();
        const threshold = cardWidth * 0.3;
        
        if (diffX > threshold) {
            goToPrev();
        } else if (diffX < -threshold) {
            goToNext();
        } else {
            updateSliderPosition();
        }
    });
    
    // Обработчик изменения размера экрана
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateSliderPosition();
        }, 100);
    });
    
    // Инициализируем позицию слайдера
    setTimeout(() => {
        updateSliderPosition();
    }, 100);
    
    return { goToNext, goToPrev, currentIndex };
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдеров
    const reviewsSwipe = initTouchSwipe(
        '#reviewsMobileWrapper', 
        '#reviewsMobileSlider', 
        '.review-mobile-card',
        false
    );
    
    const blogSwipe = initTouchSwipe(
        '#blogMobileWrapper', 
        '#blogMobileSlider', 
        '.blog-mobile-card',
        true
    );

    // Этапы работы (только если есть элемент)
    const workStepsList = document.getElementById('workStepsMobileList');
    
    if (workStepsList) {
        const workStepsImages = [
            'steps/жк балтийский.png',
            'steps/green pool.jpg', 
            'steps/batmansity.png',
            'steps/iron speedy.png',
            'steps/жк саморкад.jpg',
            'steps/надеждой и сергеем бойко.jpg',
            'steps/бегущая строка.png',
            'steps/1.jpg'
        ];
        
        const workSteps = workStepsList.querySelectorAll('.work-step-mobile');
        let currentActiveStep = null;
        let currentImageContainer = null;
        
        function hideCurrentImage() {
            if (currentImageContainer && currentImageContainer.parentNode) {
                currentImageContainer.classList.remove('show');
                setTimeout(() => {
                    if (currentImageContainer && currentImageContainer.parentNode) {
                        currentImageContainer.parentNode.removeChild(currentImageContainer);
                    }
                    currentImageContainer = null;
                }, 450);
            }
        }
        
        function showWorkStepImage(clickedStep, stepIndex) {
            // Убираем активный класс у всех элементов
            workSteps.forEach(step => step.classList.remove('active'));
            
            // Если кликнули на тот же элемент - скрываем картинку
            if (currentActiveStep === clickedStep) {
                hideCurrentImage();
                currentActiveStep = null;
                return;
            }
            
            // Добавляем активный класс к выбранному элементу
            clickedStep.classList.add('active');
            currentActiveStep = clickedStep;
            
            // Скрываем предыдущую картинку И ждем завершения
            if (currentImageContainer) {
                currentImageContainer.classList.remove('show');
                setTimeout(() => {
                    if (currentImageContainer && currentImageContainer.parentNode) {
                        currentImageContainer.parentNode.removeChild(currentImageContainer);
                    }
                    // Создаем новую картинку после удаления старой
                    createNewImage();
                }, 450);
            } else {
                // Если нет предыдущей картинки, создаем сразу
                createNewImage();
            }
            
            function createNewImage() {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'work-step-mobile-image-container';
                imageContainer.innerHTML = `
                    <img src="${workStepsImages[stepIndex]}" alt="Этап работы">
                    <div class="work-step-mobile-arrow">↗</div>
                `;
                
                // Вставляем контейнер после выбранного элемента
                clickedStep.parentNode.insertBefore(imageContainer, clickedStep.nextSibling);
                currentImageContainer = imageContainer;
                
                // Показываем картинку с анимацией
                setTimeout(() => {
                    if (imageContainer) {
                        imageContainer.classList.add('show');
                    }
                }, 100);
            }
        }
        
        // Добавляем обработчики событий
        workSteps.forEach((step, index) => {
            step.addEventListener('click', () => showWorkStepImage(step, index));
        });
    }
    
    // Портфолио слайдер (для страницы portfolio-m.html)
    const portfolioSlider = document.getElementById('portfolioSlider');
    if (portfolioSlider) {
        const portfolioImages = [
            { src: 'slider/жк саморкад.jpg', label: 'ЖК Саморкад' },
            { src: 'slider/жк балтийский.png', label: 'ЖК Балтийский' },
            { src: 'slider/batmansity.png', label: 'Batmansity' },
            { src: 'slider/green pool.jpg', label: 'Green Pool' },
            { src: 'slider/iron speedy.png', label: 'Iron Speedy' }
        ];
        
        let portfolioCurrentIndex = 0;
        let sliderStartX = 0;
        let sliderCurrentX = 0;
        let sliderIsDragging = false;
        let autoSlideInterval;
        
        const portfolioMainImg = portfolioSlider.querySelector('.slider-img');
        const portfolioLabel = portfolioSlider.querySelector('.slider-label');
        const portfolioIndicators = portfolioSlider.querySelectorAll('.slider-bar');
        const portfolioThumbs = portfolioSlider.querySelectorAll('.slider-thumb');
        
        function updatePortfolioSlider(index) {
            portfolioCurrentIndex = index;
            portfolioMainImg.src = portfolioImages[index].src;
            portfolioMainImg.alt = portfolioImages[index].label;
            portfolioLabel.textContent = portfolioImages[index].label;
            
            // Обновляем индикаторы
            portfolioIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Обновляем превью
            portfolioThumbs.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }
        
        function nextPortfolioSlide() {
            updatePortfolioSlider((portfolioCurrentIndex + 1) % portfolioImages.length);
        }
        
        function prevPortfolioSlide() {
            updatePortfolioSlider((portfolioCurrentIndex - 1 + portfolioImages.length) % portfolioImages.length);
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextPortfolioSlide, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Touch events для главного изображения
        portfolioMainImg.addEventListener('touchstart', (e) => {
            sliderStartX = e.touches[0].clientX;
            sliderIsDragging = true;
            stopAutoSlide();
        });
        
        portfolioMainImg.addEventListener('touchmove', (e) => {
            if (!sliderIsDragging) return;
            sliderCurrentX = e.touches[0].clientX;
        });
        
        portfolioMainImg.addEventListener('touchend', (e) => {
            if (!sliderIsDragging) return;
            sliderIsDragging = false;
            
            const diffX = sliderCurrentX - sliderStartX;
            const threshold = 50; // минимальное расстояние для свайпа
            
            if (diffX > threshold) {
                prevPortfolioSlide();
            } else if (diffX < -threshold) {
                nextPortfolioSlide();
            }
            
            // Возобновляем автослайдер через 3 секунды
            setTimeout(startAutoSlide, 3000);
        });
        
        // Обработчики для превью
        portfolioThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                stopAutoSlide();
                updatePortfolioSlider(index);
                setTimeout(startAutoSlide, 3000);
            });
        });
        
        // Обработчики для индикаторов
        portfolioIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                updatePortfolioSlider(index);
                setTimeout(startAutoSlide, 3000);
            });
        });
        
        // Автоматическая смена слайдов каждые 5 секунд
        startAutoSlide();
    }
    
    // Портфолио фильтр и грид
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn-mobile');
    const portfolioSliderContainer = document.getElementById('portfolioSliderMobile');
    
    if (portfolioFilterBtns.length && portfolioSliderContainer) {
        // Данные портфолио (позже будут с сервера) - по 6 карточек
        const portfolioData = {
            flat: [
                { img: 'slider/жк саморкад.jpg', title: 'ЖК Саморкад', desc: 'Современный дизайн с элементами классики' },
                { img: 'slider/жк балтийский.png', title: 'ЖК Балтийский', desc: 'Минималистичный стиль в светлых тонах' },
                { img: 'slider/1.jpg', title: 'Квартира на Ленина', desc: 'Уютный семейный интерьер' },
                { img: 'slider/2.jpg', title: 'Современная студия', desc: 'Функциональное пространство' },
                { img: 'slider/4.jpg', title: 'Квартира-лофт', desc: 'Индустриальный стиль в городской квартире' },
                { img: 'slider/5.png', title: 'Пентхаус', desc: 'Роскошная квартира с панорамными окнами' }
            ],
            house: [
                { img: 'slider/green pool.jpg', title: 'Green Pool', desc: 'Эко-дизайн с природными материалами' },
                { img: 'slider/надеждой и сергеем бойко.jpg', title: 'Загородный дом', desc: 'Просторный дом в современном стиле' },
                { img: 'slider/4.jpg', title: 'Коттедж', desc: 'Семейный дом с панорамными окнами' },
                { img: 'slider/1.jpg', title: 'Дача', desc: 'Уютный загородный дом для отдыха' },
                { img: 'slider/2.jpg', title: 'Особняк', desc: 'Роскошный дом с бассейном' },
                { img: 'slider/3.png', title: 'Таунхаус', desc: 'Современный двухэтажный дом' }
            ],
            commercial: [
                { img: 'slider/batmansity.png', title: 'Batmansity', desc: 'Лофт-стиль с промышленными акцентами' },
                { img: 'slider/iron speedy.png', title: 'Iron Speedy', desc: 'Высокотехнологичный дизайн офиса' },
                { img: 'slider/3.png', title: 'Бизнес-центр', desc: 'Современный офисный интерьер' },
                { img: 'slider/5.png', title: 'Коворкинг', desc: 'Креативное пространство для работы' },
                { img: 'slider/1.jpg', title: 'Ресторан', desc: 'Стильный интерьер ресторана' },
                { img: 'slider/2.jpg', title: 'Магазин', desc: 'Торговое пространство с современным дизайном' }
            ]
        };
        
        let portfolioCurrentIndex = 0;
        let portfolioStartX = 0;
        let portfolioCurrentX = 0;
        let portfolioIsDragging = false;
        
        function renderPortfolioGrid(type) {
            const items = portfolioData[type] || [];
            portfolioSliderContainer.innerHTML = items.map(item => `
                <div class="portfolio-item-mobile" style="position: relative; overflow: hidden;">
                    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 250px; object-fit: cover; display: block;">
                    <div class="portfolio-item-content-mobile" style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.9)); color: white; padding: 20px 15px 15px 15px; z-index: 10;">
                        <div class="portfolio-item-title-mobile" style="font-size: 16px; font-weight: 600; margin-bottom: 4px; color: white;">${item.title}</div>
                        <div class="portfolio-item-desc-mobile" style="font-size: 12px; opacity: 0.9; color: white;">${item.desc}</div>
                    </div>
                    <button class="portfolio-item-btn-mobile" style="position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; color: #222; font-size: 18px; z-index: 15;">+</button>
                </div>
            `).join('');
            
            // Сбрасываем позицию слайдера при смене категории
            portfolioCurrentIndex = 0;
            updatePortfolioPosition();
        }
        
        function getPortfolioCardWidth() {
            const cards = portfolioSliderContainer.querySelectorAll('.portfolio-item-mobile');
            if (cards.length === 0) return 0;
            
            const cardRect = cards[0].getBoundingClientRect();
            const sliderStyle = window.getComputedStyle(portfolioSliderContainer);
            const gap = parseFloat(sliderStyle.gap) || 15;
            
            return cardRect.width + gap;
        }
        
        function updatePortfolioPosition() {
            const cardWidth = getPortfolioCardWidth();
            const translateX = -portfolioCurrentIndex * cardWidth;
            portfolioSliderContainer.style.transform = `translateX(${translateX}px)`;
        }
        
        function goToNextPortfolio() {
            const maxIndex = portfolioSliderContainer.querySelectorAll('.portfolio-item-mobile').length - 1;
            if (portfolioCurrentIndex < maxIndex) {
                portfolioCurrentIndex++;
                updatePortfolioPosition();
            }
        }
        
        function goToPrevPortfolio() {
            if (portfolioCurrentIndex > 0) {
                portfolioCurrentIndex--;
                updatePortfolioPosition();
            }
        }
        
        // Touch events для портфолио
        portfolioSliderContainer.addEventListener('touchstart', (e) => {
            portfolioStartX = e.touches[0].clientX;
            portfolioIsDragging = true;
            portfolioSliderContainer.style.transition = 'none';
        });
        
        portfolioSliderContainer.addEventListener('touchmove', (e) => {
            if (!portfolioIsDragging) return;
            e.preventDefault();
            
            portfolioCurrentX = e.touches[0].clientX;
            const diffX = portfolioCurrentX - portfolioStartX;
            const cardWidth = getPortfolioCardWidth();
            const translateX = -portfolioCurrentIndex * cardWidth + diffX;
            portfolioSliderContainer.style.transform = `translateX(${translateX}px)`;
        });
        
        portfolioSliderContainer.addEventListener('touchend', (e) => {
            if (!portfolioIsDragging) return;
            portfolioIsDragging = false;
            
            portfolioSliderContainer.style.transition = 'transform 0.3s ease';
            
            const diffX = portfolioCurrentX - portfolioStartX;
            const cardWidth = getPortfolioCardWidth();
            const threshold = cardWidth * 0.3;
            
            if (diffX > threshold) {
                goToPrevPortfolio();
            } else if (diffX < -threshold) {
                goToNextPortfolio();
            } else {
                updatePortfolioPosition();
            }
        });
        
        // Обработчики фильтров
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Убираем active у всех кнопок
                portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                // Добавляем active к текущей кнопке
                btn.classList.add('active');
                // Рендерим сетку
                renderPortfolioGrid(btn.dataset.type);
            });
        });
        
        // Изначально показываем квартиры
        renderPortfolioGrid('flat');
    }
    
    // FAQ блок (только если есть элемент)
    const faqList = document.getElementById('faqMobileList');
    
    if (faqList) {
        const faqItems = faqList.querySelectorAll('.faq-mobile-item');
        let currentActiveFaq = null;
        let currentAnswerContainer = null;
        
        function hideCurrentAnswer() {
            if (currentAnswerContainer && currentAnswerContainer.parentNode) {
                currentAnswerContainer.classList.remove('show');
                setTimeout(() => {
                    if (currentAnswerContainer && currentAnswerContainer.parentNode) {
                        currentAnswerContainer.parentNode.removeChild(currentAnswerContainer);
                    }
                    currentAnswerContainer = null;
                }, 450);
            }
        }
        
        function showFaqAnswer(clickedItem, itemIndex) {
            // Убираем активный класс у всех элементов
            faqItems.forEach(item => item.classList.remove('active'));
            
            // Если кликнули на тот же элемент - скрываем ответ
            if (currentActiveFaq === clickedItem) {
                hideCurrentAnswer();
                currentActiveFaq = null;
                return;
            }
            
            // Добавляем активный класс к выбранному элементу
            clickedItem.classList.add('active');
            currentActiveFaq = clickedItem;
            
            // Скрываем предыдущий ответ И ждем завершения
            if (currentAnswerContainer) {
                currentAnswerContainer.classList.remove('show');
                setTimeout(() => {
                    if (currentAnswerContainer && currentAnswerContainer.parentNode) {
                        currentAnswerContainer.parentNode.removeChild(currentAnswerContainer);
                    }
                    // Создаем новый ответ после удаления старого
                    createNewAnswer();
                }, 450);
            } else {
                // Если нет предыдущего ответа, создаем сразу
                createNewAnswer();
            }
            
            function createNewAnswer() {
                // Получаем текст ответа из data-атрибута
                const answerText = clickedItem.getAttribute('data-answer') || 'Ответ на этот вопрос скоро появится';
                
                const answerContainer = document.createElement('div');
                answerContainer.className = 'faq-mobile-answer-container';
                answerContainer.innerHTML = `
                    <div class="faq-mobile-answer">${answerText}</div>
                `;
                
                // Вставляем контейнер после выбранного элемента
                clickedItem.parentNode.insertBefore(answerContainer, clickedItem.nextSibling);
                currentAnswerContainer = answerContainer;
                
                // Показываем ответ с анимацией
                setTimeout(() => {
                    if (answerContainer) {
                        answerContainer.classList.add('show');
                    }
                }, 100);
            }
        }
        
        // Добавляем обработчики событий
        faqItems.forEach((item, index) => {
            item.addEventListener('click', () => showFaqAnswer(item, index));
        });
    }
});

// ===== PORTFOLIO DETAIL MOBILE FUNCTIONS =====

// Данные проекта (имитация получения с сервера)
const portfolioDetailProjectData = [
    {
        id: 1,
        title: 'Квартира в стиле минимализма и акцентами в мебели',
        numbers: [
            { value: '7м', label: 'Стоимость реализации' },
            { value: '200к', label: 'Стоимость проекта' },
            { value: '60 дней', label: 'Время реализации' },
            { value: '100м²', label: 'Площадь' }
        ],
        images: [
            'slider/жк балтийский.png',
            'slider/iron speedy.png',
            'slider/green pool.jpg',
            'slider/batmansity.png',
            'slider/жк саморкад.jpg'
        ],
        labels: [
            'ЖК Балтийский',
            'Iron Speedy',
            'Green Pool',
            'Batmansity',
            'ЖК Саморкад'
        ],
        content: [
            {
                title: 'Практически все из нас знают',
                text: 'Практически все из нас знают, что есть полезная и вредная еда. Мы делим все продукты на плохие и хорошие, и стараемся есть только хорошее, которое полезно, а вредное избегать. Но для кого-то будет открытием, что овощи и фрукты приносят организму максимальную пользу, если их есть только в сезон и в климате, где они выращены.',
                img: 'slider/жк саморкад.jpg'
            },
            {
                imgFull: 'slider/iron speedy.png'
            },
            {
                imgRow: ['slider/green pool.jpg', 'slider/batmansity.png']
            },
            {
                text: 'Подобные знания о себе и своём теле, которые приходят с опытом, помогают нам быть здоровыми и счастливыми. Точно так же и с интерьером: есть много стилей, которые можно изучать, и долго их выбирать. Но только один из них будет по-настоящему вашим.',
                isBottom: true
            },
            {
                imgFull: 'slider/жк балтийский.png'
            }
        ]
    }
];

// Получение ID проекта из URL или использование 1 по умолчанию
function getPortfolioDetailProjectId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10) || 1;
}

function findPortfolioDetailProjectData(id) {
    return portfolioDetailProjectData.find(p => p.id === id) || portfolioDetailProjectData[0];
}

// Слайдер для portfolio-detail
function createPortfolioDetailSlider({containerId, images, title}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="slider">
            <div class="slider-main-title">${title}</div>
            <img class="slider-img" src="${images[0]}" alt="Слайд 1">
            <div class="slider-indicators"></div>
            <div class="slider-thumbs"></div>
        </div>
    `;
    
    let current = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    const img = container.querySelector('.slider-img');
    const indicators = container.querySelector('.slider-indicators');
    const thumbs = container.querySelector('.slider-thumbs');
    const slider = container.querySelector('.slider');
    
    function renderIndicators() {
        indicators.innerHTML = '';
        images.forEach((_, idx) => {
            const bar = document.createElement('div');
            bar.className = 'slider-bar' + (idx === current ? ' active' : '');
            bar.addEventListener('click', () => showSlide(idx));
            indicators.appendChild(bar);
        });
    }
    
    function renderThumbs() {
        thumbs.innerHTML = '';
        images.forEach((src, idx) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.className = 'slider-thumb' + (idx === current ? ' active' : '');
            thumb.addEventListener('click', () => showSlide(idx));
            thumbs.appendChild(thumb);
        });
    }
    
    function showSlide(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        img.classList.add('fade');
        setTimeout(() => {
            img.src = images[index];
            img.classList.remove('fade');
        }, 350);
        
        current = index;
        renderIndicators();
        renderThumbs();
    }
    
    // Touch events
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = currentX - startX;
        const threshold = 50;
        
        if (diffX > threshold) {
            showSlide(current - 1);
        } else if (diffX < -threshold) {
            showSlide(current + 1);
        }
    });
    
    renderIndicators();
    renderThumbs();
}

// Инициализация portfolio-detail при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на странице portfolio-detail-m.html
    const portfolioDetailSlider = document.getElementById('portfolio-detail-slider');
    if (!portfolioDetailSlider) return;
    
    const id = getPortfolioDetailProjectId();
    const project = findPortfolioDetailProjectData(id);
    
    // Создаем слайдер
    createPortfolioDetailSlider({
        containerId: 'portfolio-detail-slider',
        images: project.images,
        title: project.title
    });
    
    // Рендерим цифры
    const numbersRow = document.getElementById('portfolioDetailNumbersRow');
    if (numbersRow) {
        numbersRow.innerHTML = project.numbers.map(n => `
            <div class="portfolio-detail-number-block">
                <div class="portfolio-detail-number">${n.value}</div>
                <div class="portfolio-detail-number-label">${n.label}</div>
            </div>
        `).join('');
    }
    
    // Рендерим контент
    const content = document.getElementById('portfolioDetailContent');
    if (content) {
        content.innerHTML = '';
        project.content.forEach(block => {
            if (block.title && block.text && block.img) {
                content.innerHTML += `
                    <div class="portfolio-detail-content-row">
                        <div class="portfolio-detail-content-text">
                            <div class="portfolio-detail-content-title">${block.title}</div>
                            <div class="portfolio-detail-content-subtitle">${block.text}</div>
                        </div>
                        <div class="portfolio-detail-content-img">
                            <img src="${block.img}" alt="${block.title}">
                        </div>
                    </div>
                `;
            } else if (block.imgFull) {
                content.innerHTML += `
                    <div class="portfolio-detail-img-full">
                        <img src="${block.imgFull}" alt="Фото проекта">
                    </div>
                `;
            } else if (block.imgRow) {
                content.innerHTML += `
                    <div class="portfolio-detail-img-row">
                        <div class="portfolio-detail-img-half"><img src="${block.imgRow[0]}" alt="Фото проекта"></div>
                        <div class="portfolio-detail-img-half"><img src="${block.imgRow[1]}" alt="Фото проекта"></div>
                    </div>
                `;
            } else if (block.text && block.isBottom) {
                content.innerHTML += `
                    <div class="portfolio-detail-content-bottom-text">${block.text}</div>
                `;
            }
        });
    }
});

// ===== BLOG DETAIL MOBILE FUNCTIONS =====

// Данные блога (используем те же данные, что и в blogger.js)
const blogCardsData = [
    // Дизайн
    {
        title: 'Современный интерьер гостиной',
        desc: 'Минимализм, светлые тона и максимум уюта — идеальный вариант для городской квартиры.',
        image: 'slider/1.jpg',
        category: 'design',
        fullText: 'Практически все из нас знают, что есть полезная и вредная еда, мы делаем все продукты на плохие и хорошие, и это действительно так, потому что не все они полезны для человеческого организма, и есть много таких, которые вредны, и иногда и опасны.\n\nНи для кого не будет открытием, что овощи и фрукты принесут организму колоссальную пользу, так же как мясные вкусняшки вред и плохие эмоции.\n\nСоблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище. Вкусная и полезная пища необходима для здоровья и работоспособности человека.',
        date: '06.05.2025',
        author: 'Надежда Бойко'
    },
    {
        title: 'Лофт в центре города',
        desc: 'Грубые фактуры, открытые коммуникации и стильные детали для ценителей урбанистики.',
        image: 'slider/2.jpg',
        category: 'design',
        fullText: 'Лофт-стиль представляет собой уникальное направление в дизайне интерьеров, которое возникло в результате переоборудования промышленных помещений под жилые пространства.\n\nОсновными элементами стиля являются открытые коммуникации, кирпичные стены, высокие потолки и большие окна. Эти особенности создают атмосферу свободы и простора.\n\nВ современном понимании лофт — это не просто стиль, а философия жизни, отражающая стремление к простоте, функциональности и творческой свободе.',
        date: '05.05.2025',
        author: 'Сергей Бойко'
    },
    {
        title: 'Скандинавский стиль',
        desc: 'Белые стены, натуральное дерево и много света — уют и простота в каждой детали.',
        image: 'slider/3.png',
        category: 'design',
        fullText: 'Скандинавский стиль в интерьере — это воплощение северной красоты и практичности. Основными принципами являются функциональность, простота и гармония с природой.\n\nЦветовая палитра строится на белом цвете как основе, дополненном натуральными оттенками дерева, серого и приглушенными акцентами.\n\nОсобое внимание уделяется естественному освещению и использованию натуральных материалов, что создает атмосферу уюта и спокойствия.',
        date: '04.05.2025',
        author: 'Мария Иванова'
    },
    {
        title: 'Классика вне времени',
        desc: 'Молдинги, лепнина и благородные материалы для ценителей традиций.',
        image: 'slider/4.jpg',
        category: 'design',
        fullText: 'Классический стиль в интерьере никогда не выходит из моды. Он основан на проверенных временем принципах красоты, гармонии и элегантности.\n\nОсновными элементами являются симметрия, качественные материалы, изысканная мебель и декоративные элементы.\n\nСовременная классика позволяет адаптировать традиционные решения к потребностям современной жизни, сохраняя при этом благородство и изысканность.',
        date: '03.05.2025',
        author: 'Екатерина Смирнова'
    },
    {
        title: 'Эклектика в интерьере',
        desc: 'Смелое сочетание стилей и фактур для яркой индивидуальности.',
        image: 'slider/5.png',
        category: 'design',
        fullText: 'Эклектика — это искусство гармоничного сочетания элементов разных стилей в одном пространстве. Этот подход требует тонкого вкуса и понимания основ дизайна.\n\nВажно найти объединяющие элементы: цветовую гамму, фактуры или формы, которые свяжут разнородные предметы в единую композицию.\n\nЭклектичный интерьер отражает индивидуальность владельца и позволяет создать по-настоящему уникальное пространство.',
        date: '02.05.2025',
        author: 'Алексей Ковалёв'
    },
    {
        title: 'Японский минимализм',
        desc: 'Лаконичность, природные материалы и гармония пространства.',
        image: 'slider/6.svg',
        category: 'design',
        fullText: 'Японский минимализм — это философия дизайна, основанная на принципах дзен-буддизма и традиционной японской эстетике.\n\nОсновными элементами являются простота форм, натуральные материалы, обилие свободного пространства и связь с природой.\n\nЭтот стиль учит нас ценить красоту в простоте и находить гармонию через освобождение от лишнего.',
        date: '01.05.2025',
        author: 'Юми Танака'
    }
];

// Получение параметра id из URL
function getBlogDetailQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Получение данных статьи по ID
function getBlogDetailDataById(id) {
    const idx = parseInt(id, 10);
    if (isNaN(idx) || idx < 0 || idx >= blogCardsData.length) {
        return blogCardsData[0]; // возвращаем первую статью по умолчанию
    }
    return blogCardsData[idx];
}

// Получение похожих статей (исключая текущую)
function getSimilarBlogPosts(currentId, count = 6) {
    const currentIndex = parseInt(currentId, 10) || 0;
    const similar = blogCardsData.filter((_, index) => index !== currentIndex);
    
    // Перемешиваем и берем нужное количество
    const shuffled = similar.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Рендеринг основного контента блога
function renderBlogDetailMobile(data) {
    // Заголовок
    const titleEl = document.getElementById('blogDetailMobileTitle');
    if (titleEl) titleEl.textContent = data.title;
    
    // Изображение
    const imageEl = document.getElementById('blogDetailMobileImage');
    if (imageEl) {
        imageEl.src = data.image;
        imageEl.alt = data.title;
    }
    
    // Метаданные
    const dateEl = document.getElementById('blogDetailMobileDate');
    if (dateEl) dateEl.textContent = data.date;
    
    const categoryEl = document.getElementById('blogDetailMobileCategory');
    if (categoryEl) categoryEl.textContent = 'Дизайн интерьеров';
    
    const authorEl = document.getElementById('blogDetailMobileAuthor');
    if (authorEl) authorEl.textContent = data.author;
    
    // Контент
    const contentEl = document.getElementById('blogDetailMobileContent');
    if (contentEl && data.fullText) {
        const paragraphs = data.fullText.split('\n\n');
        contentEl.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    }
}

// Рендеринг похожих статей
function renderSimilarBlogPosts(similarPosts) {
    const gridEl = document.getElementById('blogSimilarMobileGrid');
    if (!gridEl) return;
    
    gridEl.innerHTML = similarPosts.map((post, index) => `
        <div class="blog-similar-mobile-card" data-blog-id="${blogCardsData.indexOf(post)}">
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.desc}</p>
        </div>
    `).join('');
    
    // Добавляем обработчики клика для перехода к другим статьям
    const cards = gridEl.querySelectorAll('.blog-similar-mobile-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const blogId = card.getAttribute('data-blog-id');
            if (blogId !== null) {
                window.location.href = `blog-detail-m.html?id=${blogId}`;
            }
        });
    });
}

// Инициализация блога при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на странице blog-detail-m.html
    const blogDetailTitle = document.getElementById('blogDetailMobileTitle');
    if (!blogDetailTitle) return;
    
    // Получаем ID статьи из URL
    const blogId = getBlogDetailQueryParam('id');
    const blogData = getBlogDetailDataById(blogId);
    
    // Рендерим основной контент
    renderBlogDetailMobile(blogData);
    
    // Рендерим похожие статьи
    const similarPosts = getSimilarBlogPosts(blogId);
    renderSimilarBlogPosts(similarPosts);
});

// ===== BLOGGER MOBILE FUNCTIONS =====

// Данные категорий и статей (из blogger.js)
const bloggerMobileCategories = [
    { id: 'design', name: 'дизайн' },
    { id: 'news', name: 'новости' },
    { id: 'styles', name: 'стили' },
    { id: 'inspiration', name: 'вдохновение' },
    { id: 'other', name: 'другая рубрика' }
];

const bloggerMobileFeaturedData = {
    design: {
        title: 'Какая-то основная новость, которая важнее',
        date: '06.05.2025',
        category: 'Дизайн интерьеров',
        author: 'Надежда Бойко',
        desc: 'Соблюдение определённых ограничений в рационе вовсе не означает, что вы должны исключить из ежедневного меню все ваши любимые продукты и отдать предпочтение невкусной, но полезной пище.',
        image: 'slider/3.png'
    },
    news: {
        title: 'Важная новость из мира дизайна',
        date: '05.05.2025',
        category: 'Новости',
        author: 'Сергей Бойко',
        desc: 'Новости в мире дизайна интерьеров: новые тренды, открытия и события, которые нельзя пропустить.',
        image: 'slider/2.jpg'
    },
    styles: {
        title: 'Стиль — это больше, чем просто оформление',
        date: '04.05.2025',
        category: 'Стили',
        author: 'Мария Иванова',
        desc: 'Погружаемся в разнообразие стилей интерьера: от минимализма до ар-деко. Как выбрать свой?',
        image: 'slider/1.jpg'
    },
    inspiration: {
        title: 'Вдохновение для вашего дома',
        date: '03.05.2025',
        category: 'Вдохновение',
        author: 'Екатерина Смирнова',
        desc: 'Где искать вдохновение для создания уникального интерьера? Советы и подборки от экспертов.',
        image: 'slider/4.jpg'
    },
    other: {
        title: 'Другая важная рубрика',
        date: '02.05.2025',
        category: 'Другое',
        author: 'Алексей Ковалёв',
        desc: 'Иногда самые интересные идеи рождаются вне привычных рамок. Открываем новые горизонты.',
        image: 'slider/5.png'
    }
};

// Используем те же данные карточек что и для blog-detail
const bloggerMobileCardsData = blogCardsData;

// Рендеринг главной статьи
function renderBloggerMobileFeatured(categoryId) {
    const data = bloggerMobileFeaturedData[categoryId];
    
    const titleEl = document.getElementById('bloggerMobileFeaturedTitle');
    if (titleEl) titleEl.textContent = data.title;
    
    const dateEl = document.getElementById('bloggerMobileFeaturedDate');
    if (dateEl) dateEl.textContent = data.date;
    
    const categoryEl = document.getElementById('bloggerMobileFeaturedCategory');
    if (categoryEl) categoryEl.textContent = data.category;
    
    const authorEl = document.getElementById('bloggerMobileFeaturedAuthor');
    if (authorEl) authorEl.textContent = data.author;
    
    const descEl = document.getElementById('bloggerMobileFeaturedDesc');
    if (descEl) descEl.textContent = data.desc;
    
    const imageEl = document.getElementById('bloggerMobileFeaturedImage');
    if (imageEl) {
        imageEl.src = data.image;
        imageEl.alt = data.title;
    }
    
    // Обработчик клика на кнопку "Читать полностью"
    const btnEl = document.getElementById('bloggerMobileFeaturedBtn');
    if (btnEl) {
        btnEl.onclick = () => {
            // Найти первую карточку текущей категории
            const firstCardIndex = blogCardsData.findIndex(card => card.category === categoryId);
            if (firstCardIndex !== -1) {
                window.location.href = `blog-detail-m.html?id=${firstCardIndex}`;
            }
        };
    }
}

// Рендеринг карточек блогов
function renderBloggerMobileCards(categoryId) {
    const gridEl = document.getElementById('bloggerMobileCardsGrid');
    if (!gridEl) return;
    
    // Фильтруем карточки по категории
    let filtered = blogCardsData.filter(card => card.category === categoryId);
    
    // Если карточек меньше 6, добавляем пустые
    if (filtered.length < 6) {
        const emptyCount = 6 - filtered.length;
        for (let i = 0; i < emptyCount; i++) {
            filtered.push({ empty: true });
        }
    } else if (filtered.length > 6) {
        // Если больше 6, берем только первые 6
        filtered = filtered.slice(0, 6);
    }
    
    gridEl.innerHTML = filtered.map((card, index) => {
        if (card.empty) {
            return `<div class="blogger-mobile-card" style="opacity: 0.3; pointer-events: none;">
                <div style="background: #f0f0f0; height: 120px; display: flex; align-items: center; justify-content: center; color: #ccc;">Скоро</div>
                <div class="blogger-mobile-card-content">
                    <h3>Новая статья</h3>
                    <p>Скоро здесь появится новая интересная статья</p>
                </div>
            </div>`;
        }
        
        const globalIndex = blogCardsData.indexOf(card);
        return `<div class="blogger-mobile-card" data-blog-id="${globalIndex}">
            <img src="${card.image}" alt="${card.title}">
            <div class="blogger-mobile-card-content">
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
            </div>
        </div>`;
    }).join('');
    
    // Добавляем обработчики клика
    const cards = gridEl.querySelectorAll('.blogger-mobile-card[data-blog-id]');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const blogId = card.getAttribute('data-blog-id');
            if (blogId !== null) {
                window.location.href = `blog-detail-m.html?id=${blogId}`;
            }
        });
    });
}

// Инициализация блогера при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на странице blogger-m.html
    const bloggerMobileCategories = document.getElementById('bloggerMobileCategories');
    if (!bloggerMobileCategories) return;
    
    let currentCategory = 'design';
    
    // Обработчики для кнопок категорий
    const categoryBtns = bloggerMobileCategories.querySelectorAll('.blogger-mobile-category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoryId = btn.getAttribute('data-id');
            
            // Убираем active у всех кнопок
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Добавляем active к текущей кнопке
            btn.classList.add('active');
            
            // Обновляем контент
            currentCategory = categoryId;
            renderBloggerMobileFeatured(categoryId);
            renderBloggerMobileCards(categoryId);
        });
    });
    
    // Инициализация с категорией "дизайн"
    renderBloggerMobileFeatured(currentCategory);
    renderBloggerMobileCards(currentCategory);
});

// ===== ABOUT MOBILE FUNCTIONS =====

// Данные для мобильной страницы О нас (имитация получения с сервера)
const aboutMobileData = {
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

// Создание photo-карточки для мобильной версии (только фото)
function createMobilePhotoCard({image}) {
    return `
        <div class="blog-mobile-card">
            <img src="${image}" alt="photo" class="blog-mobile-bg">
        </div>
    `;
}

// Создание photo-слайдера для мобильной версии (только touch-свайпы)
function createAboutMobileSlider(containerId, photos) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let currentIndex = 0;
    let startX = 0;
    
    // Создаем HTML photo-слайдера
    container.innerHTML = `
        <div class="blog-mobile-slider-wrapper">
            <div class="blog-mobile-slider" id="aboutMobilePhotoSlider"></div>
        </div>
    `;
    
    const slider = container.querySelector('.blog-mobile-slider');
    
    function render() {
        slider.innerHTML = '';
        photos.forEach(photo => {
            slider.innerHTML += createMobilePhotoCard(photo);
        });
    }
    
    function updateSliderPosition() {
        const cardWidth = window.innerWidth - 40; // ширина карточки (100vw - 40px отступы)
        const gap = 20;
        const translateX = -currentIndex * (cardWidth + gap);
        slider.style.transform = `translateX(${translateX}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % photos.length;
        updateSliderPosition();
    }
    
    function prevSlide() {
        currentIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
        updateSliderPosition();
    }
    
    // Touch events
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
    
    // Mouse events для тестирования на десктопе
    slider.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        e.preventDefault();
    });
    
    document.addEventListener('mouseup', (e) => {
        if (startX !== 0) {
            const deltaX = e.clientX - startX;
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
            startX = 0;
        }
    });
    
    // Обработчик изменения размера экрана
    window.addEventListener('resize', updateSliderPosition);
    
    // Инициализация
        render();
    updateSliderPosition();
}

// Создание карточки члена команды для мобильной версии
function createMobileTeamCard({name, position, image, socials}) {
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
            <a href="${social.url}" class="team-mobile-social-link">
                <img src="${iconPath}" alt="${social.type}" class="team-mobile-social-icon">
            </a>
        `;
    }).join('');
    
    return `
        <div class="team-mobile-card">
            <div class="team-mobile-card-top-line"></div>
            <div class="team-mobile-card-socials">
                ${socialIcons}
            </div>
            <div class="team-mobile-card-image">
                <img src="${image}" alt="${name}">
            </div>
            <div class="team-mobile-card-info">
                <h3 class="team-mobile-card-name">${name}</h3>
                <p class="team-mobile-card-position">${position}</p>
            </div>
        </div>
    `;
}

// Создание слайдера команды для мобильной версии
function createAboutMobileTeamSlider(containerId, team) {
    const container = document.getElementById(containerId);
    const prevBtn = document.getElementById('teamMobileNavPrev');
    const nextBtn = document.getElementById('teamMobileNavNext');
    const indicatorsContainer = document.getElementById('teamMobileNavIndicators');
    
    if (!container) return;
    
    let current = 0;
    const total = team.length;
    
    // Создаем HTML team-слайдера
    container.innerHTML = `
        <div class="blog-mobile-slider-wrapper">
            <div class="blog-mobile-slider" id="aboutMobileTeamSlider"></div>
        </div>
    `;
    
    const slider = container.querySelector('.blog-mobile-slider');
    
    function render() {
        slider.innerHTML = '';
        for (let i = 0; i < total; i++) {
            slider.innerHTML += createMobileTeamCard(team[i]);
        }
        updateTransform(false);
        updateNavButtons();
        updateIndicators();
    }
    
    function updateTransform(animate = true) {
        slider.style.transition = animate ? 'transform 0.6s cubic-bezier(.4,0,.2,1)' : 'none';
        const firstCard = slider.querySelector('.team-mobile-card');
        if (!firstCard) return;
        const gap = 20;
        const cardWidth = firstCard.getBoundingClientRect().width + gap;
        slider.style.transform = `translateX(-${current * cardWidth}px)`;
    }
    
    function updateNavButtons() {
        // Циклическая навигация - кнопки всегда активны
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }
    
    function updateIndicators() {
        if (!indicatorsContainer) return;
        
        // Создаем индикаторы для каждой карточки команды
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const indicator = document.createElement('div');
            indicator.className = `team-mobile-nav-indicator ${i === current ? 'active' : ''}`;
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
            current--;
        } else {
            current = total - 2; // Переходим на предпоследнюю
        }
        updateTransform();
        updateNavButtons();
        updateIndicators();
    }
    
    // Отключаем кнопки навигации для мобильной версии - только touch-свайп
    // if (prevBtn) {
    //     prevBtn.addEventListener('click', prevSlide);
    // }
    
    // if (nextBtn) {
    //     nextBtn.addEventListener('click', nextSlide);
    // }
    
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
    
    // Обработчик изменения размера экрана
    window.addEventListener('resize', () => {
        updateTransform();
    });
    
    // Инициализация
    render();
}

// Инициализация мобильной страницы О нас при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы на странице about-m.html
    const aboutMobileSlider = document.getElementById('aboutMobileSlider');
    if (!aboutMobileSlider) return;
    
    // Создаем photo-слайдер
    createAboutMobileSlider('aboutMobileSliderContainer', aboutMobileData.photos);
    
    // Создаем team-слайдер
    createAboutMobileTeamSlider('aboutMobileTeamContainer', aboutMobileData.team);
});

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
