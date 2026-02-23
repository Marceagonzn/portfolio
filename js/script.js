// script.js completo con todas las traducciones
document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Scroll para Secciones ---
    const sectionsToAnimate = document.querySelectorAll('.scroll-animate');

    // Opciones para el Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Callback que se ejecuta cuando un elemento cruza el umbral
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);

        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
            section.classList.add('show-on-scroll');
            observer.unobserve(section);
        }
    });

    // --- Script para el envío del formulario a Formspree ---
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://formspree.io/f/mqaqbroz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });

                if (response.ok) {
                    console.log('¡Mensaje enviado correctamente!');
                    alert('¡Mensaje enviado correctamente!');
                    form.reset();
                } else {
                    const data = await response.json();
                    let errorMessageText = 'Hubo un error al enviar tu mensaje.';
                    if (data && data.errors) {
                        errorMessageText += ' Errores: ' + data.errors.map(err => err.message).join(', ');
                    } else if (data && data.error) {
                        errorMessageText += ' Error: ' + data.error;
                    }
                    console.error(errorMessageText);
                    alert(errorMessageText);
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
            }
        });
    }

    // --- Lógica de la pantalla de carga (Preloader) ---
    const preloader = document.getElementById('preloader');
    const terminalText = preloader ? preloader.querySelector('.terminal-loader .text') : null;

    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true });
        }
        document.body.style.overflow = '';
    }

    if (terminalText) {
        const textContent = terminalText.textContent;
        terminalText.textContent = '';
        let i = 0;
        const speed = 70;

        function typeWriter() {
            if (i < textContent.length) {
                terminalText.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(hidePreloader, 500);
            }
        }
        typeWriter();

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
            setTimeout(() => {
                hidePreloader();
            }, 8000);
        }

    } else {
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
            setTimeout(() => {
                hidePreloader();
            }, 5000);
        }
    }

    // --- Textos en diferentes idiomas (COMPLETO) ---
    const translations = {
        es: {
            // Header
            title: "Portafolio de Marcelo González",
            titleName: "¡Hola! Soy <span class=\"highlight-name\">&lt;Marcelo González/&gt;</span>",
            subtitle: "Soy estudiante de ingeniería informática y desarrollador de software",

            // Skills (se mantiene igual)
            skillsTitle: "Habilidades en aprendizaje",
            // En el objeto 'es' (español) - AÑADE ESTO:
            skillsMainTitle: "Habilidades en Proceso",
            skillsDescription: "Dominando las tecnologías de apps modernas y la programación de sistemas. Este tablero sigue mi crecimiento técnico real.",
            categoryTitle: "Tecnologías que Domino",
            intermediateLevel: "Intermedio",
            activeBadge: "Activo",
            mainFocus: "Enfoque Principal",
            proficiencyLabel: "Competencia",
            jsTitle: "JavaScript (ES6+)",
            jsDesc: "Async, Manipulación DOM y APIs",
            reactNativeTitle: "React Native",
            reactNativeDesc: "Apps Móviles, Expo y Navegación",
            javaTitle: "Java",
            javaDesc: "POO, Spring Boot y Microservicios",
            pythonTitle: "Python",
            pythonDesc: "Automatización, Scripts y Análisis de Datos",
            cppTitle: "C++",
            cppDesc: "Gestión de Memoria, Algoritmos y POO",

            // About Me - NUEVAS TRADUCCIONES
            aboutTagline: "Sobre Mí",
            aboutTitle: "Creando experiencias digitales fluidas a través del <span class=\"about-title-highlight\">código</span> y el diseño.",
            aboutText1: "Soy desarrollador mobile y web enfocado en construir aplicaciones funcionales, escalables y centradas en el usuario.",
            aboutText2: "Me especializo en la intersección entre UI/UX e ingeniería, combinando diseño intuitivo con soluciones técnicas sólidas.",
            aboutText3: "Actualmente profundizo en React y React Native para desarrollar aplicaciones cross-platform de alto rendimiento, manteniendo una mentalidad de mejora continua y crecimiento profesional.",
            socialMedia: "Redes Sociales",
            openToOpportunities: "Abierto a nuevas oportunidades",
            focusArea: "Área de Enfoque",
            focusTitle: "Software Developer",
            yearsExperience: "Años de Experiencia",
            projectsCompleted: "Proyectos Completados",
            certifications: "Certificaciones",
            commitment: "Compromiso",

            // Portfolio - NUEVAS TRADUCCIONES
            portfolioTagline: "Portfolio & Logros",
            portfolioTitle: "Explorando mi <span class=\"portfolio-title-highlight\">trayectoria</span> técnica",
            portfolioDescription: "Proyectos destacados que demuestran mi pasión por el desarrollo de software y la creación de soluciones innovadoras.",

            // Contact - NUEVAS TRADUCCIONES
            contactTagline: "Contacto",
            contactTitle: "<strong>Colabora</strong> conmigo",
            contactDescription: "Transformemos tus ideas en realidad. Estoy a un mensaje de distancia para crear algo extraordinario juntos.",
            contactInfoTitle: "<span>Información</span> de contacto",
            contactInfoText: "Puedes contactarme directamente a través de estos canales o mediante el formulario. Respondo en menos de 24 horas.",
            responseTime: "< 24 horas",
            location: "Paraguay",
            formTitle: "Envíame un <span>mensaje</span>",
            nameLabel: "Nombre",
            emailLabel: "Email",
            messageLabel: "Mensaje",
            sendMessage: "Enviar mensaje",
            // En el objeto 'es' (español):
            titleName: `<span class="wave-text">
                <span class="wave-char">¡</span>
                <span class="wave-char">H</span>
                <span class="wave-char">o</span>
                <span class="wave-char">l</span>
                <span class="wave-char">a</span>
                <span class="wave-char">!</span>
                <span class="wave-char"> </span>
                <span class="wave-char">S</span>
                <span class="wave-char">o</span>
                <span class="wave-char">y</span>
                <span class="wave-char"> </span>
            </span>
            <span class="highlight-name wave-text">
                <span class="wave-char">&lt;</span>
                <span class="wave-char">M</span>
                <span class="wave-char">a</span>
                <span class="wave-char">r</span>
                <span class="wave-char">c</span>
                <span class="wave-char">e</span>
                <span class="wave-char">l</span>
                <span class="wave-char">o</span>
                <span class="wave-char"> </span>
                <span class="wave-char">G</span>
                <span class="wave-char">o</span>
                <span class="wave-char">n</span>
                <span class="wave-char">z</span>
                <span class="wave-char">á</span>
                <span class="wave-char">l</span>
                <span class="wave-char">e</span>
                <span class="wave-char">z</span>
                <span class="wave-char">/</span>
                <span class="wave-char">&gt;</span>
            </span>`,

            // Footer - COMPLETO
            footerText: "Diseño y desarrollo realizado por <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>",
            footerDescription: "Desarrollador de software apasionado por crear experiencias digitales únicas y funcionales. Especializado en aplicaciones web y móviles.",
            availableForWork: "Disponible para trabajar",
            quickLinks: "Enlaces Rápidos",
            aboutLink: "Sobre mí",
            projectsLink: "Proyectos",
            skillsLink: "Habilidades",
            contactLink: "Contacto",
            contactInfo: "Contacto",
            footerCopyright: "© 2024 <a href=\"https://github.com/Marceagonzn\" target=\"_blank\">Marcelo González</a>. Todos los derechos reservados.",
            privacyPolicy: "Política de Privacidad",
            termsOfUse: "Términos de Uso"
        },
        en: {
            // Header
            title: "Marcelo González's Portfolio",
            titleName: "Hello! I'm <span class=\"highlight-name\">&lt;Marcelo González/&gt;</span>",
            subtitle: "I'm an informatic engineering student and software developer",

            // Skills
            skillsTitle: "Learning skills",
            // En el objeto 'en' (inglés) - AÑADE ESTO:
            skillsMainTitle: "Skills in Progress",
            skillsDescription: "Mastering modern app technologies and systems programming. This dashboard tracks my real-time technical growth.",
            categoryTitle: "Technologies I Master",
            intermediateLevel: "Intermediate",
            activeBadge: "Active",
            mainFocus: "Main Focus",
            proficiencyLabel: "Proficiency",
            jsTitle: "JavaScript (ES6+)",
            jsDesc: "Async, DOM Manipulation & APIs",
            reactNativeTitle: "React Native",
            reactNativeDesc: "Mobile Apps, Expo & Navigation",
            javaTitle: "Java",
            javaDesc: "OOP, Spring Boot & Microservices",
            pythonTitle: "Python",
            pythonDesc: "Automation, Scripts & Data Analysis",
            cppTitle: "C++",
            cppDesc: "Memory Management, Algorithms & OOP",

            // About Me - NEW TRANSLATIONS
            aboutTagline: "About Me",
            aboutTitle: "Crafting seamless digital experiences through <span class=\"about-title-highlight\">code</span> and design.",
            aboutText1: "I am a mobile and web developer focused on building functional, scalable, and user-centered applications.",
            aboutText2: "I specialize at the intersection of UI/UX and engineering, combining intuitive design with solid technical solutions.",
            aboutText3: "I'm currently deepening my knowledge in React and React Native to develop high-performance cross-platform applications, maintaining a mindset of continuous improvement and professional growth.",
            socialMedia: "Social Media",
            openToOpportunities: "Open to new opportunities",
            focusArea: "Focus Area",
            focusTitle: "Software Developer",
            yearsExperience: "Years Experience",
            projectsCompleted: "Projects Completed",
            certifications: "Certifications",
            commitment: "Commitment",

            // Portfolio - NEW TRANSLATIONS
            portfolioTagline: "Portfolio & Achievements",
            portfolioTitle: "Exploring my technical <span class=\"portfolio-title-highlight\">journey</span>",
            portfolioDescription: "Featured projects that demonstrate my passion for software development and creating innovative solutions.",

            // Contact - NEW TRANSLATIONS
            contactTagline: "Contact",
            contactTitle: "<strong>Collaborate</strong> with me",
            contactDescription: "Let's turn your ideas into reality. I'm just a message away from creating something extraordinary together.",
            contactInfoTitle: "<span>Contact</span> information",
            contactInfoText: "You can contact me directly through these channels or via the form. I respond within 24 hours.",
            responseTime: "< 24 hours",
            location: "Paraguay",
            formTitle: "Send me a <span>message</span>",
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Message",
            sendMessage: "Send message",

            titleName: `<span class="wave-text">
            <span class="wave-char">H</span>
            <span class="wave-char">e</span>
            <span class="wave-char">l</span>
            <span class="wave-char">l</span>
            <span class="wave-char">o</span>
            <span class="wave-char">!</span>
            <span class="wave-char"> </span>
            <span class="wave-char">I</span>
            <span class="wave-char">'</span>
            <span class="wave-char">m</span>
            <span class="wave-char"> </span>
        </span>
        <span class="highlight-name wave-text">
            <span class="wave-char">&lt;</span>
            <span class="wave-char">M</span>
            <span class="wave-char">a</span>
            <span class="wave-char">r</span>
            <span class="wave-char">c</span>
            <span class="wave-char">e</span>
            <span class="wave-char">l</span>
            <span class="wave-char">o</span>
            <span class="wave-char"> </span>
            <span class="wave-char">G</span>
            <span class="wave-char">o</span>
            <span class="wave-char">n</span>
            <span class="wave-char">z</span>
            <span class="wave-char">á</span>
            <span class="wave-char">l</span>
            <span class="wave-char">e</span>
            <span class="wave-char">z</span>
            <span class="wave-char">/</span>
            <span class="wave-char">&gt;</span>
        </span>`,

            // Footer - COMPLETE
            footerText: "Design and development by <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>",
            footerDescription: "Software developer passionate about creating unique and functional digital experiences. Specialized in web and mobile applications.",
            availableForWork: "Available for work",
            quickLinks: "Quick Links",
            aboutLink: "About me",
            projectsLink: "Projects",
            skillsLink: "Skills",
            contactLink: "Contact",
            contactInfo: "Contact Info",
            footerCopyright: "© 2024 <a href=\"https://github.com/Marceagonzn\" target=\"_blank\">Marcelo González</a>. All rights reserved.",
            privacyPolicy: "Privacy Policy",
            termsOfUse: "Terms of Use"
        }
    };

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }


    // --- Cambio de idioma con botones de banderas ---
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');

    function setActiveLanguage(lang) {
        // Actualizar clases activas
        if (lang === 'es') {
            langEs.classList.add('active');
            langEn.classList.remove('active');
        } else {
            langEn.classList.add('active');
            langEs.classList.remove('active');
        }

        // Cambiar el idioma
        changeLanguage(lang);
    }

    if (langEs && langEn) {
        langEs.addEventListener('click', () => setActiveLanguage('es'));
        langEn.addEventListener('click', () => setActiveLanguage('en'));
    }

    // Establecer idioma inicial (español por defecto)
    setActiveLanguage('es');

    // Establecer el idioma inicial
    changeLanguage('es');

    // --- Botón de volver arriba ---
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener('click', () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    }

    // --- Animación WAVE para el título ---
    // --- Animación WAVE para el título (versión automática mejorada) ---
    function applyWaveAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        // Verificar si ya tiene la estructura wave (para no procesar dos veces)
        if (heroTitle.querySelector('.wave-char')) {
            return; // Ya está procesado
        }

        // Obtener el HTML original respetando el span .highlight-name
        const originalHTML = heroTitle.innerHTML;

        // Crear un contenedor temporal para procesar
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;

        // Función para procesar nodos de texto y convertirlos en spans
        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                const text = node.textContent;
                const fragment = document.createDocumentFragment();

                for (let i = 0; i < text.length; i++) {
                    const char = text.charAt(i);
                    if (char === ' ') {
                        fragment.appendChild(document.createTextNode(' '));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'wave-char';
                        span.textContent = char;
                        fragment.appendChild(span);
                    }
                }
                return fragment;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Preservar la clase highlight-name
                if (node.classList && node.classList.contains('highlight-name')) {
                    node.classList.add('wave-text');
                }

                // Procesar cada hijo
                const children = Array.from(node.childNodes);
                children.forEach(child => {
                    const processed = processNode(child);
                    if (processed) {
                        node.replaceChild(processed, child);
                    }
                });
            }
            return null;
        }

        // Procesar el contenido
        const children = Array.from(tempDiv.childNodes);
        children.forEach(child => {
            const processed = processNode(child);
            if (processed) {
                tempDiv.replaceChild(processed, child);
            }
        });

        // Actualizar el HTML
        heroTitle.innerHTML = tempDiv.innerHTML;
    }

    // Aplicar la animación después de que cambie el idioma
    applyWaveAnimation();

    // Re-aplicar cuando cambie el idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            // Pequeño retraso para que el DOM se actualice
            setTimeout(applyWaveAnimation, 50);
        });
    }

    // --- Animación de contador con efecto cascada ---
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');

        function getPureNumber(text) {
            return parseInt(text.replace(/[^0-9]/g, ''));
        }

        function getSymbol(text) {
            if (text.includes('+')) return '+';
            if (text.includes('%')) return '%';
            return '';
        }

        // Configurar datos iniciales
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const targetNumber = getPureNumber(originalText);
            const symbol = getSymbol(originalText);

            stat.setAttribute('data-target', targetNumber);
            stat.setAttribute('data-symbol', symbol);
            stat.textContent = '0' + symbol; // Comenzar desde 0
        });

        // Animar cada contador con retraso
        statNumbers.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-target'));
            const symbol = stat.getAttribute('data-symbol');

            let current = 0;
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16);
            const delay = index * 300; // 300ms de retraso entre cada contador

            setTimeout(() => {
                function updateCounter() {
                    current += increment;

                    if (current < target) {
                        stat.textContent = Math.floor(current) + symbol;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target + symbol;
                    }
                }

                updateCounter();
            }, delay);
        });
    }

    // Observar cuando la sección es visible
    const statsSection = document.querySelector('.about-stats-section');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }
    
    // --- Animación parallax con fade ---
function handleParallaxScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Determinar si la sección está visible
        const isVisible = (scrollPosition + windowHeight > sectionTop) && 
                          (scrollPosition < sectionBottom);
        
        if (isVisible) {
            // Calcular progreso de visibilidad
            const visibleProgress = Math.min(
                1,
                (scrollPosition + windowHeight - sectionTop) / (windowHeight * 0.5)
            );
            
            // Dirección del parallax (alternar entre secciones)
            const direction = index % 2 === 0 ? -1 : 1;
            
            // Aplicar transformación suave
            section.style.opacity = Math.min(1, visibleProgress);
            section.style.transform = `translateY(${direction * (1 - visibleProgress) * 50}px) scale(${0.95 + (visibleProgress * 0.05)})`;
            
            section.classList.add('visible');
        } else if (scrollPosition > sectionBottom) {
            // Sección pasada - desvanecer hacia arriba
            section.style.opacity = '0.2';
            section.style.transform = 'translateY(-30px) scale(0.9)';
            section.classList.remove('visible');
        } else if (scrollPosition + windowHeight < sectionTop) {
            // Sección por venir - desvanecer hacia abajo
            section.style.opacity = '0.2';
            section.style.transform = 'translateY(30px) scale(0.9)';
            section.classList.remove('visible');
        }
    });
}

// Aplicar estilos iniciales
document.querySelectorAll('section').forEach(section => {
    section.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) scale(0.95)';
});

// Ejecutar al hacer scroll
window.addEventListener('scroll', handleParallaxScroll);
window.addEventListener('resize', handleParallaxScroll);
setTimeout(handleParallaxScroll, 100); // Ejecutar después de un breve retraso

});