    // Textos en diferentes idiomas
    const translations = {
        es: {
            title: "Portafolio de Marcelo González",
            subtitle: "Soy estudiante de ingeniería informática y desarrollador de software",
            skillsTitle: "Habilidades en aprendizaje",
            aboutMeTitle: "Sobre mí",
            aboutMeText: "¡Hola! Soy un apasionado estudiante de Ingeniería en Computación con interés en el desarrollo de aplicaciones web y móviles. Me encanta aprender nuevas tecnologías y aplicar mis conocimientos en proyectos reales. Mi objetivo es convertirme en un desarrollador profesional que pueda brindar soluciones creativas e innovadoras.",
            contactTitle: "Contacto",
            contactText: "¿Tienes una idea interesante o un proyecto en mente? Como apasionado del desarrollo, siempre estoy buscando nuevos desafíos y oportunidades para aprender. Hablemos sobre cómo puedo contribuir con mis habilidades técnicas y creatividad.",
            footerText: "Diseño realizado por <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>"
        },
        en: {
            title: "Marcelo González's Portfolio",
            subtitle: "I'm an informatic engineering student and software developer",
            skillsTitle: "Learning skills",
            aboutMeTitle: "About me",
            aboutMeText: "Hello! I am a passionate Computer Engineering student with interest in the development of web and mobile applications. I love learning new technologies and applying my knowledge in real projects. My goal is to become a professional developer who can provide creative and innovative solutions.",
            contactTitle: "Contact",
            contactText: "Do you have an interesting idea or a project in mind? As someone passionate about development, I'm always looking for new challenges and opportunities to learn. Let's talk about how I can contribute with my technical skills and creativity.",
            footerText: "Design by <a href='https://github.com/Marceagonzn' target='_blank'>Marcelo González</a>"
        }
    };
    
// En tu script.js
if (navigator.userAgent.includes('Instagram')) {
    document.querySelector('.ascii-title').style.fontSize = '6px';
}

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }

    // Evento para cambiar el idioma cuando se selecciona una opción
    document.getElementById('language-select').addEventListener('change', function() {
        const selectedLanguage = this.value;
        changeLanguage(selectedLanguage);
    });

    // Establecer el idioma inicial (español por defecto)
    changeLanguage('es');


    // Mostrar u ocultar el botón de volver arriba
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        var backToTopButton = document.getElementById("back-to-top");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // Función para volver al principio de la página
    document.getElementById("back-to-top").onclick = function() {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    };