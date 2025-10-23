// Espera o conteúdo da página carregar para então executar os scripts
window.addEventListener('load', () => {

    // --- Script da Animação de Partículas ---
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#cccccc" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#888888", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 },
            }
        },
        detectRetina: true
    });


    // --- Script para Funcionalidade dos Modais ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modalOverlay = document.querySelector('.modal-overlay');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
        initializeSlider(modal);
    };

    const closeModal = () => {
        const activeModal = document.querySelector('.portfolio-modal.active');
        if (activeModal == null) return;
        activeModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = item.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            openModal(modal);
        });
    });

    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => button.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', closeModal);


    // --- Script para o Slider dentro dos Modais ---
    const initializeSlider = (modal) => {
        const slides = modal.querySelectorAll('.modal-slide');
        const prevButton = modal.querySelector('.slider-nav.prev');
        const nextButton = modal.querySelector('.slider-nav.next');
        let currentSlide = 0;
        
        // Se não houver botões de navegação, simplesmente saia da função.
        if (!prevButton || !nextButton) return;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            prevButton.style.display = index === 0 ? 'none' : 'block';
            nextButton.style.display = index === slides.length - 1 ? 'none' : 'block';
        }

        nextButton.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        });
        
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        });

        showSlide(currentSlide);
    };

    // --- NOVO: Script para o Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Abre/fecha o menu ao clicar no hambúrguer
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um dos links (útil em one-page sites)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});