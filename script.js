document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const windows = [];
    
    // Ссылки на картинки или гифки для окон
    const contentUrls = [
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGhqZTRybGZtZm0wY3Jub285MjNuNGp1bTRsMjh5cTRramFudXU5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/oVmJpctjWDmi4/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bGhqZTRybGZtZm0wY3Jub285MjNuNGp1bTRsMjh5cTRramFudXU5byZlcD12MV9naWZzX3NlYXJjaCZjdD1n/F6ub4AQXz13xK/giphy.gif',
        'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmo3cWFvYmdtNGh2cnR2eG5wcTd5bjY4dmJxd3J5eTVjYWV6cm12NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5oWpOD8Thsmo8/giphy.gif'
    ];

    // Функция входа в полноэкранный режим
    function goFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    // Функция создания одного летающего окна
    function createFlyingWindow() {
        const win = document.createElement('div');
        win.classList.add('flying-window');

        // Заголовок
        const header = document.createElement('div');
        header.classList.add('window-header');
        header.innerText = 'Окно #' + (windows.length + 1);

        // Контент
        const content = document.createElement('div');
        content.classList.add('window-content');
        const img = document.createElement('img');
        img.src = contentUrls[Math.floor(Math.random() * contentUrls.length)];
        content.appendChild(img);

        win.appendChild(header);
        win.appendChild(content);

        // Случайная стартовая позиция и скорость
        const windowData = {
            element: win,
            x: Math.random() * (window.innerWidth - 300),
            y: Math.random() * (window.innerHeight - 200),
            vx: (Math.random() - 0.5) * 12, // Скорость
            vy: (Math.random() - 0.5) * 12
        };

        windows.push(windowData);
        document.body.appendChild(win);

        // При клике на окно - создаем новое
        content.addEventListener('click', () => {
            createFlyingWindow();
        });
    }

    // Основная функция анимации
    function animate() {
        windows.forEach(w => {
            // Движение
            w.x += w.vx;
            w.y += w.vy;

            // Отталкивание от краев экрана
            if (w.x + w.element.offsetWidth > window.innerWidth || w.x < 0) {
                w.vx = -w.vx;
            }
            if (w.y + w.element.offsetHeight > window.innerHeight || w.y < 0) {
                w.vy = -w.vy;
            }

            // Применение стилей
            w.element.style.left = w.x + 'px';
            w.element.style.top = w.y + 'px';
        });

        requestAnimationFrame(animate);
    }

    // ----- Запуск всего -----
    startButton.addEventListener('click', () => {
        goFullscreen(); // Входим в полноэкранный режим
        startButton.style.display = 'none'; // Скрываем кнопку
        
        // Создаем несколько окон сразу
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createFlyingWindow(), i * 200); // Создаем с небольшой задержкой
        }
        
        animate(); // Запускаем анимацию
    });
});