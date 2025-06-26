// Универсальная система переключения между десктопными и мобильными версиями
(function() {
    'use strict';

    // Конфигурация соответствий страниц
    const pageMapping = {
        // Десктопные -> Мобильные
        'index.html': 'index-m.html',
        'portfolio.html': 'portfolio-m.html',
        'portfolio-detail.html': 'portfolio-detail-m.html',
        'blogger.html': 'blogger-m.html',
        'blog-detail.html': 'blog-detail-m.html',
        'about.html': 'about-m.html',
        // Мобильные -> Десктопные (обратное соответствие)
        'index-m.html': 'index.html',
        'portfolio-m.html': 'portfolio.html',
        'portfolio-detail-m.html': 'portfolio-detail.html',
        'blogger-m.html': 'blogger.html',
        'blog-detail-m.html': 'blog-detail.html',
        'about-m.html': 'about.html'
    };

    // Определение мобильной версии по ширине экрана
    function isMobileWidth() {
        return window.innerWidth <= 700;
    }

    // Получение текущего имени файла
    function getCurrentPageName() {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    }

    // Определение, является ли текущая страница мобильной
    function isCurrentPageMobile(pageName) {
        return pageName.includes('-m.html');
    }

    // Переключение на соответствующую версию
    function switchToAppropriateVersion() {
        const currentPage = getCurrentPageName();
        const isMobile = isMobileWidth();
        const isPageMobile = isCurrentPageMobile(currentPage);

        // Если нужно переключиться
        if ((isMobile && !isPageMobile) || (!isMobile && isPageMobile)) {
            const targetPage = pageMapping[currentPage];
            
            if (targetPage) {
                // Сохраняем параметры URL если есть
                const urlParams = window.location.search;
                const targetUrl = targetPage + urlParams;
                
                console.log(`Переключение с ${currentPage} на ${targetPage}`);
                window.location.href = targetUrl;
            }
        }
    }

    // Инициализация при загрузке страницы
    function init() {
        // Немедленная проверка при загрузке
        switchToAppropriateVersion();

        // Проверка при изменении размера окна (с задержкой для производительности)
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(switchToAppropriateVersion, 250);
        });

        // Проверка при изменении ориентации
        window.addEventListener('orientationchange', function() {
            setTimeout(switchToAppropriateVersion, 500);
        });
    }

    // Запуск при готовности DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Экспорт функций для внешнего использования
    window.VersionSwitcher = {
        switch: switchToAppropriateVersion,
        isMobile: isMobileWidth,
        getCurrentPage: getCurrentPageName,
        pageMapping: pageMapping
    };

})(); 