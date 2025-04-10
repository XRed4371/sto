document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
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
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Карусель фотографий
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselIndicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        carouselIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselItems.length) newIndex = 0;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = carouselItems.length - 1;
        showSlide(newIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Автоматическая смена слайдов
    let carouselInterval = setInterval(nextSlide, 5000);

    // Остановка автоматической смены при наведении
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });

    // Модальное окно
    const modal = document.getElementById('contactModal');
    const btn = document.getElementById('contactBtn');
    const span = document.querySelector('.modal-close');

    btn.onclick = function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    span.onclick = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});