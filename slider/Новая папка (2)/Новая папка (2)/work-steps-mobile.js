/* ===============================================
   JAVASCRIPT ДЛЯ БЛОКА "ЭТАПЫ РАБОТЫ"
   
   ИНСТРУКЦИЯ ПО ПОДКЛЮЧЕНИЮ:
   1. Подключите этот JS файл: <script src="work-steps-mobile.js"></script>
   2. Убедитесь что у вас есть папка с изображениями (например: steps/)
   3. Обновите массив workStepsImages с путями к вашим изображениям
   =============================================== */

// Этапы работы - мобильная версия
document.addEventListener('DOMContentLoaded', function() {
    const workStepsList = document.getElementById('workStepsMobileList');
    
    if (!workStepsList) return;
    
    // НАСТРОЙКА: Массив изображений для каждого этапа
    // Замените пути на ваши изображения
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
    
    // Функция для скрытия текущей картинки
    function hideCurrentImage() {
        if (currentImageContainer) {
            currentImageContainer.classList.remove('show');
            setTimeout(() => {
                if (currentImageContainer.parentNode) {
                    currentImageContainer.parentNode.removeChild(currentImageContainer);
                }
                currentImageContainer = null;
            }, 400);
        }
    }
    
    // Функция для показа картинки под выбранным этапом
    function showWorkStepImage(clickedStep, stepIndex) {
        // Убираем активный класс у всех элементов
        workSteps.forEach(step => step.classList.remove('active'));
        
        // Если кликнули на тот же элемент - скрываем картинку
        if (currentActiveStep === clickedStep) {
            hideCurrentImage();
            currentActiveStep = null;
            return;
        }
        
        // Скрываем предыдущую картинку
        hideCurrentImage();
        
        // Добавляем активный класс к выбранному элементу
        clickedStep.classList.add('active');
        currentActiveStep = clickedStep;
        
        // Создаем контейнер для картинки
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
            imageContainer.classList.add('show');
        }, 50);
    }
    
    // Добавляем обработчики событий для всех этапов
    workSteps.forEach((step, index) => {
        step.addEventListener('click', () => showWorkStepImage(step, index));
    });
});

/* ===============================================
   КОНЕЦ JAVASCRIPT КОДА
   =============================================== */ 