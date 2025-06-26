async function cargarProyectosDeGitHub() {
    const projectsContainer = document.getElementById('projects-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const username = 'Marceagonzn';
    
    let currentIndex = 0;
    let projectsPerPage = 3;
    let isDragging = false;
    let startPosX = 0;
    let startPosY = 0;
    let isHorizontalScroll = false;
    let repos = [];

    // Make goToSlide and calculateContainerWidth global for access from index.html
    window.goToSlide = goToSlide;
    window.calculateContainerWidth = calculateContainerWidth;

    function adjustProjectsPerPage() {
        const width = window.innerWidth;
        if (width < 768) projectsPerPage = 1;
        else if (width < 1024) projectsPerPage = 2;
        else projectsPerPage = 3;
        calculateContainerWidth(); // Recalcular ancho después de ajustar proyectos por página
    }

    // Nueva función para calcular y aplicar el ancho del contenedor
    function calculateContainerWidth() {
        // Calcula el ancho total que el projects-carousel debe tener para contener todos los proyectos
        // sin que se superpongan o tengan espacio extra no deseado al final.
        // projectsPerPage es el número de proyectos visibles.
        // El ancho de cada tarjeta es: (100% / projectsPerPage) - (margen * 2)
        // O más simple: project-card { width: calc(X% - Ypx) }
        // La clave es que projectsContainer.scrollWidth debe coincidir con el total de anchos de las tarjetas + márgenes
        
        // Obtenemos el ancho de una sola tarjeta una vez que están renderizadas
        const firstCard = projectsContainer.querySelector('.project-card');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth + (parseFloat(getComputedStyle(firstCard).marginLeft) * 2);
            // Establecemos el scrollLeft para mantener la posición del carrusel
            projectsContainer.scrollLeft = currentIndex * cardWidth;
        }
        updateDots();
    }

    async function getRepoImage(repoName) {
        try {
            // Intentar obtener la imagen OpenGraph de GitHub
            const response = await fetch(`https://opengraph.githubassets.com/1/${username}/${repoName}`);
            if (response.ok) {
                // GitHub devuelve una imagen directamente o una redirección.
                // Si la respuesta es OK y es una imagen, usarla.
                // No hay una forma directa de saber el tipo de contenido aquí sin consumir el stream,
                // así que confiaremos en la URL de OpenGraph para la imagen principal del repo.
                return `https://opengraph.githubassets.com/1/${username}/${repoName}`;
            } else {
                console.log(`OpenGraph image not available for ${repoName}, using default.`);
                return 'img/default-project.png'; // Imagen por defecto si no hay OpenGraph
            }
        } catch (error) {
            console.log(`Error obteniendo imagen para ${repoName}:`, error);
            return 'img/default-project.png';
        }
    }

    function goToSlide(index) {
        const totalSlides = Math.ceil(repos.length / projectsPerPage);
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        
        const slideWidth = projectsContainer.offsetWidth; // Ancho del contenedor visible
        
        // Calcular el scroll exacto basado en el ancho de la tarjeta real, incluyendo márgenes
        const firstCard = projectsContainer.querySelector('.project-card');
        if (firstCard) {
            const cardWidthWithMargin = firstCard.offsetWidth + (parseFloat(getComputedStyle(firstCard).marginLeft) * 2);
            projectsContainer.scrollTo({
                left: currentIndex * projectsPerPage * cardWidthWithMargin, // Multiplicar por projectsPerPage
                behavior: 'smooth'
            });
        } else {
            // Fallback si no hay tarjetas cargadas (debería ser raro después de renderProjects)
            projectsContainer.scrollTo({
                left: currentIndex * slideWidth,
                behavior: 'smooth'
            });
        }
        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(repos.length / projectsPerPage);
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    async function renderProjects() {
        projectsContainer.innerHTML = '<div class="loading-message">Cargando proyectos...</div>'; // Mostrar mensaje de carga

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            repos = await response.json();

            // Filtrar y ordenar: solo repositorios con una descripción y ordenados por fecha de la última actualización
            repos = repos.filter(repo => repo.description)
                         .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

            if (repos.length === 0) {
                projectsContainer.innerHTML = `
                    <div class="error-message">
                        <p>No se encontraron proyectos con descripción en GitHub.</p>
                        <p>Asegúrate de que tus repositorios públicos tengan una descripción.</p>
                        <p>Puedes ver todos mis repositorios en <a href="https://github.com/${username}" target="_blank">mi perfil de GitHub</a>.</p>
                    </div>
                `;
                return;
            }

            projectsContainer.innerHTML = ''; // Limpiar mensaje de carga

            for (const repo of repos) {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                const repoImage = await getRepoImage(repo.name); // Obtener imagen
                
                projectCard.innerHTML = `
                    <img src="${repoImage}" alt="${repo.name} Project Image">
                    <div class="project-info">
                        <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                        <p>${repo.description}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank">Ver Proyecto</a>
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank">Demo</a>` : ''}
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            }

            adjustProjectsPerPage(); // Ajustar el número de proyectos por página al cargar
            goToSlide(currentIndex); // Ir a la primera diapositiva (o la actual)

            // Crear los puntos del carrusel después de cargar los proyectos
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(repos.length / projectsPerPage);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }

            setupEventListeners();
            setupTouchEvents();

        } catch (error) {
            console.error('Error cargando repositorios:', error);
            projectsContainer.innerHTML = `
                <div class="error-message">
                    <p>No se pudieron cargar los proyectos desde GitHub.</p>
                    <p>Puedes verlos en <a href="https://github.com/${username}" target=\"_blank\">mi perfil</a>.</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Listener para el scroll del carrusel para actualizar los puntos
        projectsContainer.addEventListener('scroll', () => {
            // Calcular qué slide está visible basándose en el scroll actual
            const slideWidth = projectsContainer.offsetWidth / projectsPerPage;
            currentIndex = Math.round(projectsContainer.scrollLeft / slideWidth / projectsPerPage);
            updateDots();
        });

        window.addEventListener('resize', () => {
            adjustProjectsPerPage();
            goToSlide(currentIndex); // Mantener la misma "página" al redimensionar
        });
    }

    function setupTouchEvents() {
        projectsContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPosX = e.clientX;
            startPosY = e.clientY;
            projectsContainer.style.cursor = 'grabbing';
            projectsContainer.style.scrollSnapType = 'none'; // Desactivar snap durante el arrastre
        });

        projectsContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startPosX;
            const dy = e.clientY - startPosY;

            if (!isHorizontalScroll) {
                // Determinar si es un scroll horizontal significativo
                if (Math.abs(dx) > Math.abs(dy)) {
                    isHorizontalScroll = true;
                } else {
                    return; // No es un arrastre horizontal, ignorar
                }
            }
            
            projectsContainer.scrollLeft -= dx;
            startPosX = e.clientX; // Actualizar posición inicial para el siguiente movimiento
        });

        projectsContainer.addEventListener('mouseup', () => {
            isDragging = false;
            isHorizontalScroll = false;
            projectsContainer.style.cursor = 'grab';
            projectsContainer.style.scrollSnapType = 'x mandatory'; // Reactivar snap al soltar
            // Asegurarse de que se alinee a una tarjeta después de soltar
            goToSlide(currentIndex); 
        });

        projectsContainer.addEventListener('mouseleave', () => {
            if (isDragging) { // Si el mouse sale mientras se arrastra
                isDragging = false;
                isHorizontalScroll = false;
                projectsContainer.style.cursor = 'grab';
                projectsContainer.style.scrollSnapType = 'x mandatory';
                goToSlide(currentIndex);
            }
        });

        // Touch events for mobile
        projectsContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startPosX = e.touches[0].clientX;
            startPosY = e.touches[0].clientY;
            projectsContainer.style.scrollSnapType = 'none';
        }, { passive: true }); // Usar { passive: true } para mejorar el rendimiento del scroll

        projectsContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - startPosX;
            const dy = e.touches[0].clientY - startPosY;

            if (!isHorizontalScroll) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    isHorizontalScroll = true;
                } else {
                    return;
                }
            }
            projectsContainer.scrollLeft -= dx;
            startPosX = e.touches[0].clientX;
        }, { passive: true });

        projectsContainer.addEventListener('touchend', () => {
            isDragging = false;
            isHorizontalScroll = false;
            projectsContainer.style.scrollSnapType = 'x mandatory';
            goToSlide(currentIndex);
        });
    }

    await renderProjects();
}

document.addEventListener('DOMContentLoaded', cargarProyectosDeGitHub);