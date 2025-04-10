/*document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Мобильное меню
    // =============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Функция для переключения мобильного меню
    function toggleMobileMenu() {
        nav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        */
        // Блокировка прокрутки body при открытом меню
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    // Обработчик клика по кнопке меню
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // =============================================
    // Плавная прокрутка к якорям
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновление URL без перезагрузки страницы
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // =============================================
    // Анимация шапки при скролле
    // =============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // В самом верху страницы
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            header.classList.remove('scrolled');
            return;
        }
        
        // Прокрутка вниз - скрываем шапку
        if (currentScroll > lastScroll && !header.classList.contains('hidden') && currentScroll > scrollThreshold) {
            header.classList.add('hidden');
        } 
        // Прокрутка вверх - показываем шапку
        else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
            header.classList.remove('hidden');
        }
        
        // Эффект уменьшения при прокрутке
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    // Оптимизация обработчика скролла
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            handleScroll();
        }, 66); // ~15fps
    }, false);
    
    // Инициализация при загрузке
    handleScroll();
        // =============================================
    // Карусель фотографий
    // =============================================
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;
        
        const carouselItems = document.querySelectorAll('.carousel-item');
        const carouselIndicators = document.querySelectorAll('.carousel-indicator');
        const prevBtn = document.querySelector('.carousel-control.prev');
        const nextBtn = document.querySelector('.carousel-control.next');
        let currentIndex = 0;
        let carouselInterval;
        const intervalDuration = 5000;

        function showSlide(index) {
            // Проверка границ
            if (index >= carouselItems.length) index = 0;
            if (index < 0) index = carouselItems.length - 1;
            
            // Обновление слайдов
            carouselItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            
            // Обновление индикаторов
            carouselIndicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        // Навигация по кнопкам
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }

        // Навигация по индикаторам
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Автоматическая смена слайдов
        function startCarousel() {
            carouselInterval = setInterval(nextSlide, intervalDuration);
        }
        
        function stopCarousel() {
            clearInterval(carouselInterval);
        }

        // Пауза при наведении
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);

        // Запуск карусели
        startCarousel();
        
        // Инициализация первого слайда
        showSlide(0);
    }
    
    initCarousel();
    
    // =============================================
    // Модальное окно
    // =============================================
    const modal = document.getElementById('contactModal');
    const modalBtn = document.getElementById('contactBtn');
    const modalClose = document.querySelector('.modal-close');
    const callbackForm = document.getElementById('callbackForm');

    // Открытие модального окна
    if (modalBtn) {
        modalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Обработка формы обратного звонка
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь должна быть логика отправки формы
            const formData = new FormData(callbackForm);
            const data = Object.fromEntries(formData);
            
            console.log('Форма отправлена:', data);
            
            // Можно добавить AJAX-отправку или другой обработчик
            
            // Закрытие модального окна после отправки
            closeModal();
            
            // Очистка формы
            callbackForm.reset();
            
            // Уведомление пользователя
            alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
        });
    }
    
    // =============================================
    // Дополнительные функции
    // =============================================
    
    // Обновление года в футере
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Инициализация при полной загрузке страницы
    window.addEventListener('load', function() {
        initLazyLoading();
    });
});
