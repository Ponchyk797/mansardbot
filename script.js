// Адаптивное меню для мобильных устройств
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.textContent = '☰ Меню';
    
    const nav = document.querySelector('nav');
    const navList = nav.querySelector('ul');
    
    // Добавляем кнопку меню на мобильные устройства
    if (window.innerWidth <= 768) {
        nav.insertBefore(menuToggle, navList);
    }
    
    // Обработчик клика по кнопке меню
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Закрываем меню на мобильных устройствах после выбора пункта
                if (window.innerWidth <= 768) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Обработка формы обратной связи
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Простая валидация формы
        const name = form.querySelector('#name');
        const phone = form.querySelector('#phone');
        const message = form.querySelector('#message');
        
        if (!name.value.trim()) {
            showMessage('error', 'Пожалуйста, введите ваше имя');
            name.focus();
            return;
        }
        
        if (!phone.value.trim()) {
            showMessage('error', 'Пожалуйста, введите ваш телефон');
            phone.focus();
            return;
        }
        
        if (!message.value.trim()) {
            showMessage('error', 'Пожалуйста, введите ваше сообщение');
            message.focus();
            return;
        }
        
        // Отправка формы через Formspree (бесплатный сервис)
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        // Здесь должен быть ваш Formspree endpoint
        // Для демонстрации используем заглушку
        console.log('Форма отправлена:', data);
        
        // Очистка формы
        form.reset();
        
        // Показываем сообщение об успехе
        showMessage('success', 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    });
    
    // Функция для отображения сообщений формы
    function showMessage(type, message) {
        formMessage.className = `message ${type}`;
        formMessage.textContent = message;
        formMessage.style.display = 'block';
        
        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Обновление меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navList.classList.remove('active');
            if (menuToggle.parentNode) {
                menuToggle.remove();
            }
        } else {
            if (!menuToggle.parentNode) {
                nav.insertBefore(menuToggle, navList);
            }
        }
    });
});