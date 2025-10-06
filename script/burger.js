document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerMenu');
    const nav = document.getElementById('main-nav');
    const overlay = document.getElementById('navOverlay');
    const navLinks = nav.querySelectorAll('a');
    
    function toggleMenu() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        
        // На мобилках при открытии меню убираем фиксированный класс если он есть
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
            nav.classList.remove('fixed');
        }
    }
    
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    overlay.addEventListener('click', toggleMenu);
    
    // Закрытие при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Закрытие при ресайзе на десктоп
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // На десктопе закрываем меню если оно открыто
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
    
    // Закрытие меню при скролле на мобилках
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});