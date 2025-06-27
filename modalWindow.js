document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.navigation-item');
    const contactsBlock = document.querySelector('.contacts-block');
    const requisitesBlock = document.querySelector('.requisites-block');

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
    setActive('contacts');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const tab = this.dataset.tab;
            const isMobile = window.innerWidth <= 600;
            if (tab === 'contacts') {
                setActive('contacts');
            } else if (tab === 'requisites') {
                setActive('requisites');
            } else if (tab === 'portfolio') {
                window.location.href = 'portfolio.html';
            } else if (tab === 'about') {
                window.location.href = 'about.html';
            } else if (tab === 'blog') {
                window.location.href = 'blogger.html';
            } else if (tab === 'philosophy') {
                window.location.href = isMobile ? 'portfolio-detail-m.html' : 'portfolio-detail.html';
            } else if (tab === 'services') {
                window.location.href = 'index.html#services-section';
            }
        });
    });

    window.addEventListener('resize', function() {
        const activeTab = Array.from(navItems).find(item => item.classList.contains('active'))?.dataset.tab || 'contacts';
        updateBlocks(activeTab);
    });

    // ====== Обработка формы ======
    function showSuccess(form) {
        const msg = document.createElement('div');
        msg.textContent = 'Спасибо, ваша заявка отправлена!';
        msg.style.cssText = 'margin: 24px 0; color: #111; font-size: 20px; text-align: center;';
        form.parentNode.replaceChild(msg, form);
    }
    document.body.addEventListener('submit', function(e) {
        if (e.target.classList.contains('modal-form')) {
            e.preventDefault();
            const form = e.target;
            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Отправка...';
            const data = Object.fromEntries(new FormData(form));
            fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(() => showSuccess(form))
            .catch(() => { btn.textContent = 'Ошибка'; setTimeout(()=>{btn.textContent='Отправить';btn.disabled=false;}, 2000); })
        }
    });
}); 