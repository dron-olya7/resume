document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('navOverlay');
    const navLinks = nav.querySelectorAll('a');
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    let isMobile = window.innerWidth <= 768;
    
    // Функция для бургер-меню
    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        
        // На мобилках при открытии меню убираем фиксированный класс если он есть
        if (isMobile && nav.classList.contains('active')) {
            nav.classList.remove('fixed');
        }
    }
    
    // Функция для фиксированной навигации
    function handleScroll() {
        if (!isMobile) {
            const headerBottom = header.offsetTop + header.offsetHeight;
            
            if (window.pageYOffset > headerBottom) {
                nav.classList.add('fixed');
            } else {
                nav.classList.remove('fixed');
            }
        }
        
        // Показываем/скрываем кнопку "Наверх"
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    }
    
    // Функция для прокрутки наверх
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Функция для обновления состояния (мобилка/десктоп)
    function updateState() {
        isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // На мобилках убираем фиксированную навигацию
            nav.classList.remove('fixed');
        } else {
            // На десктопе закрываем меню если оно открыто
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
            // Обновляем позицию фиксированной навигации
            handleScroll();
        }
    }
    
    // Плавная прокрутка для якорных ссылок
    function handleAnchorClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || !targetId.startsWith('#')) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закрываем меню на мобилках
            if (isMobile && nav.classList.contains('active')) {
                toggleMenu();
            }
            
            // Рассчитываем отступ - УМЕНЬШИЛИ значения
            const offset = isMobile ? 10 : 60;
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // ===== ИНИЦИАЛИЗАЦИЯ =====
    
    // Бургер-меню события
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    overlay.addEventListener('click', toggleMenu);
    
    // События для навигационных ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', handleAnchorClick);
    });
    
    // Событие для кнопки "Наверх"
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // События окна
    window.addEventListener('scroll', function() {
        // Фиксированная навигация на десктопе
        if (!isMobile) {
            handleScroll();
        }
        // Закрытие меню при скролле на мобилках
        else if (nav.classList.contains('active')) {
            toggleMenu();
        }
        
        // Всегда обновляем состояние кнопки "Наверх"
        handleScroll();
    });
    
    window.addEventListener('resize', updateState);
    
    // Инициализация при загрузке
    updateState();
    handleScroll(); // Проверяем позицию скролла при загрузке
});