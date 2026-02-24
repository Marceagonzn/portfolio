// js/web-projects-carousel.js - VERSIÓN CORREGIDA
// =================================================

// --- DATOS DE PROYECTOS (HARDCODEADOS) ---
const proyectosWeb = [
    {
        id: 1,
        title: "💰 Landing Page - Finanzas Personales",
        image: "https://github.com/Marceagonzn/LadingPageFinance/raw/main/screenshot/screen1.png",
        description: "Este proyecto es una Landing Page informativa y moderna dedicada al tema de finanzas personales, diseñada para captar la atención de usuarios interesados en mejorar su situación financiera. <br><br>El diseño está enfocado en la claridad, la confianza y la conversión, con secciones claves como testimonios, beneficios, seguridad de la información y medios de contacto.",
        tags: ["HTML", "CSS", "JS"],
        url: "https://marceagonzn.github.io/LadingPageFinance/",
        featured: true,
        longDescription: "Este proyecto es una Landing Page informativa y moderna dedicada al tema de finanzas personales, diseñada para captar la atención de usuarios interesados en mejorar su situación financiera. <br><br>El diseño está enfocado en la claridad, la confianza y la conversión, con secciones claves como testimonios, beneficios, seguridad de la información y medios de contacto."
    },
    {
        id: 2,
        title: "Página Web de Café ☕",
        description: "Este proyecto es una página web moderna y responsive para una cafetería, desarrollada con HTML, CSS y JavaScript. Incluye un diseño atractivo, secciones interactivas y efectos visuales para mejorar la experiencia del usuario.",
        image: "https://github.com/Marceagonzn/CafeWeb/raw/main/screenshot/screen1.png",
        tags: ["HTML", "CSS", "JS"],
        url: "https://marceagonzn.github.io/CafeWeb/",
        featured: true,
        longDescription: "Este proyecto es una página web moderna y responsive para una cafetería, desarrollada con HTML, CSS y JavaScript. Incluye un diseño atractivo, secciones interactivas y efectos visuales para mejorar la experiencia del usuario. <br> Características principales: <br> ✅ Diseño elegante y responsive (adaptable a móviles, tablets y desktop). <br> ✅ Menú interactivo. <br> ✅ Efectos visuales (hover, animaciones CSS, sliders con JavaScript). <br> ✅ Formulario de contacto con validación en tiempo real. <br> Tecnologías utilizadas: <br> HTML5 (Estructura semántica y accesible). <br> CSS3 (Flexbox, Grid, Transiciones y Keyframes).JavaScript."
    },
    {
        id: 3,
        title: "Sistema de Gestión Factura Electronica",
        description: "Este proyecto es un sistema básico de facturación electrónica desarrollado con HTML, CSS y JavaScript. Permite generar, visualizar y descargar facturas en formato electrónico, simulando un proceso de compra con cálculos automáticos de subtotal, impuestos y total.",
        image: "https://github.com/Marceagonzn/FacturaElectronica/raw/main/screenshot/screen1.png",
        tags: ["HTML", "CSS", "JS"],
        url: "https://github.com/Marceagonzn/FacturaElectronica",
        featured: false,
        longDescription: "Este proyecto es un sistema básico de facturación electrónica desarrollado con HTML, CSS y JavaScript. Permite generar, visualizar y descargar facturas en formato electrónico, simulando un proceso de compra con cálculos automáticos de subtotal, impuestos y total."
    },
    {
        id: 4,
        title: "🛒 Prototipo de Tienda Web Online",
        description: "Este es un prototipo funcional de una tienda online desarrollado con HTML, CSS y JavaScript puro. El objetivo principal del proyecto es simular una experiencia básica de compra en línea, con interfaz visual atractiva, productos en catálogo y funcionalidad de carrito.",
        image: "https://github.com/Marceagonzn/TiendaWeb/raw/main/screenshot/screen1.png",
        tags: ["HTML5", "CSS3", "JavaScript"],
        url: "https://marceagonzn.github.io/TiendaWeb/",
        featured: false,
        longDescription: "Este es un prototipo funcional de una tienda online desarrollado con HTML, CSS y JavaScript puro. El objetivo principal del proyecto es simular una experiencia básica de compra en línea, con interfaz visual atractiva, productos en catálogo y funcionalidad de carrito."
    }
];

// --- VARIABLES GLOBALES ---
let scrollPositionBeforeModal = 0; // Guardar posición del scroll

// --- FUNCIÓN PRINCIPAL DEL CARRUSEL ---
async function cargarProyectosWebCarousel() {
    const carousel = document.getElementById('webProjectsCarousel');
    const dotsContainer = document.getElementById('webProjectsDots');
    const prevButton = document.getElementById('webProjectsPrev');
    const nextButton = document.getElementById('webProjectsNext');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeProjectModal');

    if (!carousel) return;

    let currentIndex = 0;
    let projects = proyectosWeb;

    // --- FUNCIÓN PARA ABRIR MODAL ---
    function openProjectModal(project) {
        if (!modal || !modalContent) return;

        // Guardar la posición actual del scroll ANTES de abrir el modal
        scrollPositionBeforeModal = window.scrollY;
        console.log('📌 Posición guardada al abrir modal:', scrollPositionBeforeModal);

        const description = project.longDescription || project.description;

        const features = [
            { icon: "check_circle", text: `Desarrollado con ${project.tags[0]}` },
            { icon: "speed", text: "Alto rendimiento y optimización" },
            { icon: "devices", text: "Completamente responsive" },
            { icon: "security", text: "Prácticas de seguridad implementadas" },
            { icon: "update", text: "Código mantenible y escalable" }
        ];

        const featuresHTML = features.map(f => `
            <li>
                <span class="material-symbols-outlined">${f.icon}</span>
                ${f.text}
            </li>
        `).join('');

        const tagsHTML = (project.tags || []).map(tag =>
            `<span class="expandable-modal-tag">${tag}</span>`
        ).join('');

        modalContent.innerHTML = `
            <div class="expandable-modal-image-container">
                <img src="${project.image}" alt="${project.title}" class="expandable-modal-image">
            </div>
            <div class="expandable-modal-info">
                <h2 class="expandable-modal-title">${project.title}</h2>
                <div class="expandable-modal-tags">
                    ${tagsHTML}
                </div>
                <p class="expandable-modal-description">${description}</p>
                
                <div class="expandable-modal-features">
                    <div class="expandable-modal-features-title">
                        <span class="material-symbols-outlined">stars</span>
                        Características
                    </div>
                    <ul class="expandable-modal-features-list">
                        ${featuresHTML}
                    </ul>
                </div>
                
                <div class="expandable-modal-footer">
                    <a href="${project.url}" target="_blank" class="expandable-modal-btn expandable-modal-btn-primary">
                        <span class="material-symbols-outlined">open_in_new</span>
                        Visitar sitio web
                    </a>
                    <button class="expandable-modal-btn expandable-modal-btn-secondary" onclick="cerrarModalManual(event)">
                        <span class="material-symbols-outlined">close</span>
                        Cerrar
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPositionBeforeModal}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
    }

    // --- FUNCIÓN PARA CERRAR MODAL (CORREGIDA) ---
    function closeProjectModal() {
        if (!modal) return;

        console.log('🔙 Restaurando scroll a:', scrollPositionBeforeModal);

        // Quitar clase active del modal
        modal.classList.remove('active');

        // Restaurar estilos del body
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';

        // Restaurar la posición exacta del scroll
        window.scrollTo({
            top: scrollPositionBeforeModal,
            behavior: 'auto'
        });

        // Pequeño timeout de respaldo por si acaso
        setTimeout(() => {
            if (window.scrollY !== scrollPositionBeforeModal) {
                window.scrollTo({
                    top: scrollPositionBeforeModal,
                    behavior: 'auto'
                });
            }
        }, 10);
    }

    // --- EVENT LISTENERS PARA EL MODAL ---
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                e.preventDefault();
                e.stopPropagation();
                closeProjectModal();
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeProjectModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            e.preventDefault();
            closeProjectModal();
        }
    });

    window.cerrarModalManual = function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        closeProjectModal();
    };

    // --- FUNCIONES DEL CARRUSEL ---
    function goToSlide(index) {
        if (!carousel || projects.length === 0) return;

        const cardWidth = carousel.querySelector('.project-card-modern')?.offsetWidth || 340;
        const gap = 24;
        const scrollAmount = index * (cardWidth + gap);

        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer || projects.length === 0) return;

        const totalDots = Math.min(projects.length, 10);

        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot-modern ${i === currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // --- RENDERIZAR PROYECTOS ---
    try {
        if (projects.length === 0) {
            carousel.innerHTML = '<div class="loading-message-modern">No hay proyectos web disponibles</div>';
            return;
        }

        carousel.innerHTML = '';

        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card-modern';

            const tagsHTML = (project.tags || []).map(tag =>
                `<span class="project-tag">${tag}</span>`
            ).join('');

            const featuredBadge = project.featured
                ? '<div class="active-badge">★ Destacado</div>'
                : '';

            card.innerHTML = `
                <div class="project-card-image-container">
                    <div class="project-card-overlay"></div>
                    <img src="${project.image}" alt="${project.title}" class="project-card-image" loading="lazy">
                    <div class="project-card-tags">
                        ${tagsHTML}
                    </div>
                </div>
                <div class="project-card-content">
                    <h3 class="project-card-title">${project.title}</h3>
                    <p class="project-card-description">${project.description}</p>
                    <div class="project-links" style="display: flex; gap: 10px; margin-top: 15px;">
                        <button class="project-card-button expand-btn" style="flex: 1;" data-project-index="${index}">
                            <span class="material-symbols-outlined">open_in_full</span>
                            Ver más
                        </button>
                        <a href="${project.url}" target="_blank" class="project-card-button" style="flex: 1;">
                            <span class="material-symbols-outlined">arrow_forward</span>
                            Visitar
                        </a>
                    </div>
                    <div style="text-align: right; margin-top: 5px;">
                        ${featuredBadge}
                    </div>
                </div>
            `;

            const expandBtn = card.querySelector('.expand-btn');
            expandBtn.addEventListener('click', () => openProjectModal(project));

            carousel.appendChild(card);
        });

        updateDots();

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) goToSlide(currentIndex - 1);
            });

            nextButton.addEventListener('click', () => {
                const maxIndex = Math.min(projects.length, 10) - 1;
                if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
            });
        }

        carousel.addEventListener('scroll', () => {
            const cardWidth = carousel.querySelector('.project-card-modern')?.offsetWidth || 340;
            const gap = 24;
            const scrollLeft = carousel.scrollLeft;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));

            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < Math.min(projects.length, 10)) {
                currentIndex = newIndex;
                updateDots();
            }
        });

        window.addEventListener('resize', () => {
            goToSlide(currentIndex);
        });

    } catch (error) {
        console.error('Error cargando proyectos web:', error);
        carousel.innerHTML = `
            <div class="error-message" style="width: 100%; text-align: center; padding: 60px;">
                <p>Error al cargar los proyectos web.</p>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProyectosWebCarousel);