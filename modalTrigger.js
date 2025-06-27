document.addEventListener('DOMContentLoaded', function() {
    let modalLoaded = false;
    let modalOverlay = null;
    let modalTabToActivate = null;
    function openModal(tab) {
        if (modalLoaded) return;
        fetch('modalWindow.html')
            .then(res => res.text())
            .then(html => {
                // Создаём overlay для блюра
                modalOverlay = document.createElement('div');
                modalOverlay.className = 'modal-blur-overlay';
                document.body.appendChild(modalOverlay);
                // Вставляем модалку
                const modalWrapper = document.createElement('div');
                modalWrapper.className = 'modal-outer-wrapper';
                modalWrapper.innerHTML = html;
                document.body.appendChild(modalWrapper);
                document.body.style.overflow = 'hidden';
                modalLoaded = true;
                // ====== ИНИЦИАЛИЗАЦИЯ ТАБОВ И ПЕРЕКЛЮЧЕНИЯ БЛОКОВ ======
                const navItems = modalWrapper.querySelectorAll('.navigation-item');
                const contactsBlock = modalWrapper.querySelector('.contacts-block');
                const requisitesBlock = modalWrapper.querySelector('.requisites-block');
                function updateBlocks(tab) {
                    if (window.innerWidth > 900) {
                        contactsBlock.classList.add('active');
                        requisitesBlock.classList.add('active');
                    } else {
                        contactsBlock.classList.remove('active');
                        requisitesBlock.classList.remove('active');
                        if (tab === 'requisites') {
                            requisitesBlock.classList.add('active');
                        } else {
                            contactsBlock.classList.add('active');
                        }
                    }
                }
                function setActive(tab) {
                    navItems.forEach(item => item.classList.remove('active'));
                    updateBlocks(tab);
                    const activeItem = Array.from(navItems).find(item => item.dataset.tab === tab);
                    if (activeItem) activeItem.classList.add('active');
                }
                // По умолчанию показываем контакты
                setActive(tab || 'contacts');
                navItems.forEach(item => {
                    item.addEventListener('click', function(e) {
                        const tab = this.dataset.tab;
                        if (tab === 'contacts') {
                            setActive('contacts');
                        } else if (tab === 'requisites') {
                            setActive('requisites');
                        }
                    });
                });
                window.addEventListener('resize', function() {
                    const activeTab = Array.from(navItems).find(item => item.classList.contains('active'))?.dataset.tab || 'contacts';
                    updateBlocks(activeTab);
                });
                // ====== КОНЕЦ ИНИЦИАЛИЗАЦИИ ======
                // Динамически подключаем modalWindow.js
                var script = document.createElement('script');
                script.src = 'modalWindow.js';
                script.onload = function() {
                    // После загрузки скрипта активируем нужный таб
                    if (tab) {
                        setTimeout(() => {
                            const nav = modalWrapper.querySelector('.navigation-item[data-tab="' + tab + '"]');
                            if (nav) nav.click();
                        }, 150);
                    } else {
                        setTimeout(() => {
                            const nav = modalWrapper.querySelector('.navigation-item[data-tab="contacts"]');
                            if (nav) nav.click();
                        }, 150);
                    }
                };
                document.body.appendChild(script);
                // Делегируем клик на .left только внутри модалки для закрытия
                modalWrapper.addEventListener('click', function(e) {
                    if (e.target.classList.contains('left')) {
                        e.stopPropagation();
                        closeModal();
                    }
                });
                // Делегируем переходы по табам внутри модалки
                modalWrapper.addEventListener('click', function(e) {
                    const navItem = e.target.closest('.navigation-item');
                    if (navItem && navItem.dataset.tab) {
                        const tab = navItem.dataset.tab;
                        if (tab === 'contacts' || tab === 'requisites') {
                            e.preventDefault();
                            e.stopPropagation();
                            setActive(tab);
                            return;
                        }
                        if (["portfolio","about","blog","philosophy"].includes(tab)) {
                            if (tab === 'portfolio') window.location.href = 'portfolio.html';
                            if (tab === 'about') window.location.href = 'about.html';
                            if (tab === 'blog') window.location.href = 'blogger.html';
                            if (tab === 'philosophy') window.location.href = 'doverie.html';
                            closeModal();
                        } else if (tab === 'services') {
                            const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
                            if (isIndex) {
                                closeModal();
                                setTimeout(() => {
                                    const target = document.querySelector('.services-section');
                                    if (target) target.scrollIntoView({behavior: 'smooth'});
                                }, 200);
                            } else {
                                window.location.href = 'index.html#services-section';
                                closeModal();
                            }
                        }
                    }
                });
            });
    }
    function closeModal() {
        const modal = document.querySelector('.modal-outer-wrapper');
        if (modal) modal.remove();
        if (modalOverlay) modalOverlay.remove();
        document.body.style.overflow = '';
        modalLoaded = false;
    }
    function addModalOpenListeners() {
        function handler(e) {
            if (
                e.target.classList.contains('left') &&
                !document.querySelector('.modal-outer-wrapper') &&
                !e.target.closest('.modal-outer-wrapper')
            ) {
                e.preventDefault();
                openModal();
            }
            if (
                (e.target.classList.contains('footer-contacts') || (e.target.textContent && e.target.textContent.trim().toLowerCase() === 'контакты')) &&
                !document.querySelector('.modal-outer-wrapper')
            ) {
                e.preventDefault();
                openModal('contacts');
            }
        }
        document.body.addEventListener('click', handler);
        document.body.addEventListener('touchstart', handler, { passive: false });
    }
    addModalOpenListeners();
    // Стили для overlay
    const style = document.createElement('style');
    style.innerHTML = `
    .modal-blur-overlay {
        position: fixed;
        z-index: 9998;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100vw; height: 100vh;
        background: rgba(255,255,255,0.6);
        backdrop-filter: blur(8px);
        transition: opacity 0.2s;
    }
    .modal-outer-wrapper {
        position: fixed;
        z-index: 9999;
        top: 0; left: 0; width: 100vw; height: 100vh;
        display: flex; align-items: flex-start; justify-content: center;
        overflow-y: auto;
        background: transparent;
    }
    `;
    document.head.appendChild(style);
}); 