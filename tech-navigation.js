// Техническая навигация
(function() {
    'use strict';

    // Получение текущего имени файла
    function getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return fileName;
    }

    // Определение версии страницы
    function getPageVersion() {
        const currentPage = getCurrentPageName();
        return currentPage.includes('-m.html') ? 'Mobile' : 'Desktop';
    }

    // Создание HTML навигации
    function createTechNav() {
        const currentPage = getCurrentPageName();
        const version = getPageVersion();
        
        const navHTML = `
            <nav class="tech-nav">
                <div class="tech-nav-container">
                    <a href="index.html" class="tech-nav-logo">🏠 Vershina Art</a>
                    
                    <div class="tech-nav-links">
                        <a href="index.html" class="tech-nav-link ${currentPage.startsWith('index') ? 'active' : ''}" data-page="index">Главная</a>
                        <a href="portfolio.html" class="tech-nav-link ${currentPage.startsWith('portfolio') && !currentPage.includes('detail') ? 'active' : ''}" data-page="portfolio">Портфолио</a>
                        <a href="portfolio-detail.html" class="tech-nav-link ${currentPage.includes('portfolio-detail') ? 'active' : ''}" data-page="portfolio-detail">Проект</a>
                        
                        <div class="tech-nav-divider"></div>
                        
                        <a href="blogger.html" class="tech-nav-link ${currentPage.startsWith('blogger') ? 'active' : ''}" data-page="blogger">Блог</a>
                        <a href="blog-detail.html" class="tech-nav-link ${currentPage.includes('blog-detail') ? 'active' : ''}" data-page="blog-detail">Статья</a>
                        <a href="about.html" class="tech-nav-link ${currentPage.startsWith('about') ? 'active' : ''}" data-page="about">О нас</a>
                        
                        <div class="tech-nav-divider"></div>
                        
                        <span class="tech-nav-version">${version}</span>
                    </div>
                </div>
            </nav>
        `;

        // Вставляем навигацию в начало body
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // Обработка кликов по ссылкам навигации
    function handleNavigation() {
        const navLinks = document.querySelectorAll('.tech-nav-link[data-page]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetPage = this.dataset.page;
                const currentPage = getCurrentPageName();
                const isMobile = currentPage.includes('-m.html');
                
                // Определяем нужную версию страницы
                let targetUrl = this.href;
                if (isMobile && !targetUrl.includes('-m.html')) {
                    // Если мы на мобильной версии, переходим на мобильную версию целевой страницы
                    const mobilePage = targetPage + '-m.html';
                    targetUrl = targetUrl.replace(targetPage + '.html', mobilePage);
                    
                    e.preventDefault();
                    window.location.href = targetUrl;
                }
            });
        });
    }

    // Добавление эффектов
    function addEffects() {
        const nav = document.querySelector('.tech-nav');
        if (!nav) return;

        // Эффект скрытия/показа при скролле
        let lastScrollTop = 0;
        let scrollTimeout;

        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Скролл вниз - скрываем
                    nav.style.transform = 'translateY(-100%)';
                } else {
                    // Скролл вверх - показываем
                    nav.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            }, 100);
        });

        // Показываем навигацию при наведении на верх экрана
        document.addEventListener('mousemove', function(e) {
            if (e.clientY < 50) {
                nav.style.transform = 'translateY(0)';
            }
        });
    }

    // Инициализация
    function init() {
        // Проверяем, есть ли уже навигация
        if (document.querySelector('.tech-nav')) return;

        createTechNav();
        handleNavigation();
        addEffects();

        console.log('🚀 Техническая навигация загружена');
    }

    // Запуск при готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Экспорт для отладки
    window.TechNav = {
        getCurrentPage: getCurrentPageName,
        getVersion: getPageVersion,
        init: init
    };

})(); 