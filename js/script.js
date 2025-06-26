// Asegúrate de que TODO tu código JavaScript esté dentro de este único 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {

    // --- Animación de Scroll para Secciones ---
    const sectionsToAnimate = document.querySelectorAll('.scroll-animate');

    // Opciones para el Intersection Observer
    const observerOptions = {
        root: null, /* Observa el viewport */
        rootMargin: '0px', /* No añade margen extra al viewport */
        threshold: 0.1 /* Un 10% del elemento debe ser visible para activar la animación */
    };

    // Callback que se ejecuta cuando un elemento cruza el umbral
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento está visible, añade la clase para activar la animación
                entry.target.classList.add('show-on-scroll');
                // Deja de observar el elemento una vez que se ha animado
                observer.unobserve(entry.target);
            }
        });
    };

    // Crea una nueva instancia de Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToAnimate.forEach(section => {
        // Observa el elemento para animaciones al hacer scroll
        observer.observe(section);

        // Además, verifica si el elemento ya está en el viewport al cargar la página
        // y anima esos elementos inmediatamente.
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Si el elemento está al menos parcialmente visible en el viewport inicial
        if (rect.top < viewportHeight && rect.bottom > 0) {
            section.classList.add('show-on-scroll');
            // Deja de observarlo ya que ya está animado (esto lo había olvidado en la revisión anterior)
            observer.unobserve(section); 
        }
    });

    // --- Script para el envío del formulario a Formspree usando Fetch (AJAX) ---
    const form = document.getElementById('contactForm'); // Asegúrate de que este ID coincida con tu formulario
    
    // Solo si el formulario existe
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevenir el envío de formulario por defecto

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                // Asegúrate de que los campos tengan un atributo 'name' para que FormData los capture
                object[key] = value;
            });
            const json = JSON.stringify(object);

            try {
                const response = await fetch('https://formspree.io/f/mqaqbroz', { // Tu URL de Formspree
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Esto le dice a Formspree que estamos enviando JSON
                        'Accept': 'application/json' // Opcional, pero buena práctica
                    },
                    body: json // Aquí enviamos los datos como JSON
                });

                if (response.ok) {
                    // Éxito:
                    console.log('¡Mensaje enviado correctamente!');
                    alert('¡Mensaje enviado correctamente!'); // Puedes cambiar esto por un mensaje en pantalla
                    form.reset(); // Limpia los campos del formulario
                } else {
                    // Error en la respuesta de Formspree
                    const data = await response.json();
                    let errorMessageText = 'Hubo un error al enviar tu mensaje.';
                    if (data && data.errors) {
                        errorMessageText += ' Errores: ' + data.errors.map(err => err.message).join(', ');
                    } else if (data && data.error) {
                        errorMessageText += ' Error: ' + data.error;
                    }
                    console.error(errorMessageText);
                    alert(errorMessageText); // O mostrar en pantalla
                }
            } catch (error) {
                // Error de red
                console.error('Error al enviar el formulario:', error);
                alert('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
            }
        });
    }


    // --- Lógica de la pantalla de carga (Preloader) ---
    const preloader = document.getElementById('preloader');
    const terminalText = preloader ? preloader.querySelector('.terminal-loader .text') : null;

    // Función para ocultar el preloader
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hidden'); // Añade la clase 'hidden' para desvanecerlo
            // Opcional: Eliminar el preloader del DOM después de la transición
            preloader.addEventListener('transitionend', () => {
                preloader.remove(); // Remueve el elemento del DOM una vez que se desvanece
            });
        }
        // Asegúrate de que el body no tenga overflow: hidden si lo usaste para el preloader
        document.body.style.overflow = '';
    }

    if (terminalText) {
        // Simular un retardo si el texto es muy corto para la animación
        const textContent = terminalText.textContent;
        terminalText.textContent = ''; // Limpiar el texto para la animación
        let i = 0;
        const speed = 70; // Velocidad de escritura en ms

        function typeWriter() {
            if (i < textContent.length) {
                terminalText.textContent += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Una vez que el texto se ha escrito, esperar un momento antes de ocultar
                // Llama a hidePreloader cuando la animación de escritura termine
                setTimeout(hidePreloader, 500); 
            }
        }
        // Inicia la animación de escritura
        typeWriter();

        // Asegurarse de que el preloader se oculte si el 'load' ya se disparó o si hay un fallo
        // Esto previene que se quede cargando si la animación de escritura no se dispara por alguna razón.
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
            // Fallback por si la carga o la animación tardan demasiado
            setTimeout(() => {
                hidePreloader();
            }, 8000); // Ocultar después de 8 segundos como máximo
        }

    } else {
        // Si no hay terminalText, oculta el preloader sin animación de escritura
        // Esto se ejecutará si el preloader no tiene la estructura esperada
        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
            // Fallback general por si la carga tarda demasiado
            setTimeout(() => {
                hidePreloader();
            }, 5000); 
        }
    }


    // --- Textos en diferentes idiomas ---
    const translations = {
        es: {
            title: "Portafolio de Marcelo González",
            titleName: "¡Hola! Soy <span class=\"highlight-name\">&lt;Marcelo González/&gt;</span>",
            subtitle: "Soy estudiante de ingeniería informática y desarrollador de software",
            skillsTitle: "Habilidades en aprendizaje",
            aboutMeTitle: "Sobre mí",
            aboutMeText: "¡Hola! Soy un apasionado estudiante de Ingeniería en Computación con interés en el desarrollo de aplicaciones web y móviles. Me encanta aprender nuevas tecnologías y aplicar mis conocimientos en proyectos reales. Mi objetivo es convertirme en un desarrollador profesional que pueda brindar soluciones creativas e innovadoras.",
            contactTitle: "Contacto",
            contactText: "¿Tienes una idea interesante o un proyecto en mente? Como apasionado del desarrollo, siempre estoy buscando nuevos desafíos y oportunidades para aprender. Hablemos sobre cómo puedo contribuir con mis habilidades técnicas y creatividad.",
            footerText: "Diseño realizado por <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>",
            projectsTab: "Proyectos", /* Nuevo */
            certificatesTab: "Certificados", /* Nuevo */
            projectsTitle: "Mis Proyectos", /* Nuevo */
            certificatesTitle: "Mis Certificados" /* Nuevo */
        },
        en: {
            title: "Marcelo González's Portfolio",
            titleName: "Hello! I'm <span class=\"highlight-name\">&lt;Marcelo González/&gt;</span>",
            subtitle: "I'm an informatic engineering student and software developer",
            skillsTitle: "Learning skills",
            aboutMeTitle: "About me",
            aboutMeText: "Hello! I am a passionate Computer Engineering student with interest in the development of web and mobile applications. I love learning new technologies and applying my knowledge in real projects. My goal is to become a professional developer who can provide creative and innovative solutions.",
            contactTitle: "Contact",
            contactText: "Do you have an interesting idea or a project in mind? As a passionate developer, I'm always looking for new challenges and opportunities to learn. Let's talk about how I can contribute with my technical skills and creativity.",
            footerText: "Design made by <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>",
            projectsTab: "Projects", /* Nuevo */
            certificatesTab: "Certificates", /* Nuevo */
            projectsTitle: "My Projects", /* Nuevo */
            certificatesTitle: "My Certificates" /* Nuevo */
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

    // Evento para cambiar el idioma cuando se selecciona una opción
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) { // Asegurarse de que el selector exista
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            changeLanguage(selectedLanguage);
        });
    }

    // Establecer el idioma inicial (español por defecto)
    changeLanguage('es');


    // --- Mostrar u ocultar el botón de volver arriba ---
    // Mantenemos la función de scroll global para el evento window.onscroll
    // Si la pones dentro de DOMContentLoaded, window.onscroll no la encontrará.
    // O puedes usar addEventListener en window si quieres encapsularla.
    // Para simplificar, la dejaré como estaba, pero ten en cuenta este detalle.
    // **Nota:** Lo más limpio sería:
    // window.addEventListener('scroll', scrollFunction);
    // document.getElementById("back-to-top").addEventListener('click', function() { ... });

    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) { // Solo si el botón existe
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        // Función para volver al principio de la página
        backToTopButton.addEventListener('click', () => {
            document.body.scrollTop = 0; // Para Safari
            document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
        });
    }
});