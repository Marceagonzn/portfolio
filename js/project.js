async function cargarProyectosDeGitHub() {
    const projectsContainer = document.getElementById('projects-container');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const username = 'Marceagonzn';
    
    let currentIndex = 0;
    let projectsPerPage = 3; // Valor por defecto, se ajustará en resize
    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Ajustar proyectos por página según el ancho
    function adjustProjectsPerPage() {
        const width = window.innerWidth;
        if (width < 768) projectsPerPage = 1; // Móviles
        else if (width < 1024) projectsPerPage = 2; // Tablets
        else projectsPerPage = 3; // Escritorio
    }

    // Función para obtener imagen del repositorio
    async function getRepoImage(repoName) {
        try {
            return `https://opengraph.githubassets.com/1/${username}/${repoName}`;
        } catch (error) {
            console.log(`Error obteniendo imagen para ${repoName}:`, error);
            return 'img/default-project.png';
        }
    }

    // Función para mover el carrusel
    function goToSlide(index) {
        const maxIndex = Math.ceil(repos.length / projectsPerPage) - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const scrollPosition = projectsContainer.offsetWidth * currentIndex;
        projectsContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateDots();
    }

    // Función para actualizar los puntos
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Eventos táctiles para móviles
    function setupTouchEvents() {
        projectsContainer.addEventListener('touchstart', touchStart);
        projectsContainer.addEventListener('touchmove', touchMove);
        projectsContainer.addEventListener('touchend', touchEnd);
    }

    function touchStart(e) {
        isDragging = true;
        startPosX = e.touches[0].clientX;
        projectsContainer.style.scrollBehavior = 'auto';
    }

    function touchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentPosition = e.touches[0].clientX;
        const diff = startPosX - currentPosition;
        projectsContainer.scrollLeft += diff;
        startPosX = currentPosition;
    }

    function touchEnd() {
        isDragging = false;
        projectsContainer.style.scrollBehavior = 'smooth';
        
        // Ajustar al slide más cercano
        const slideWidth = projectsContainer.offsetWidth / projectsPerPage;
        const newIndex = Math.round(projectsContainer.scrollLeft / slideWidth);
        goToSlide(newIndex);
    }

    // Renderizar proyectos
    async function renderProjects() {
        projectsContainer.innerHTML = '<div class="loading">Cargando proyectos...</div>';
        dotsContainer.innerHTML = '';
        
        try {
            const respuesta = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
            repos = await respuesta.json();
            
            projectsContainer.innerHTML = '';
            
            // Crear tarjetas de proyectos
            for (const repo of repos) {
                const imageUrl = await getRepoImage(repo.name);
                
                const projectElement = document.createElement('div');
                projectElement.className = 'project-card';
                projectElement.innerHTML = `
                    <div class="project-image-container">
                        <img src="${imageUrl}" alt="${repo.name}" onerror="this.src='img/default-project.png'">
                    </div>
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sin descripción.'}</p>
                    <div class="project-technologies">
                        ${repo.language ? `<span>${repo.language}</span>` : ''}
                        <span>${repo.stargazers_count} ⭐</span>
                    </div>
                    <a href="${repo.html_url}" class="project-link" target="_blank">Ver en GitHub</a>
                `;
                projectsContainer.appendChild(projectElement);
            }

            // Ajustar inicialmente
            adjustProjectsPerPage();
            
            // Crear puntos de navegación
            const dotCount = Math.ceil(repos.length / projectsPerPage);
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }

            // Configurar eventos
            setupEventListeners();
            setupTouchEvents();

        } catch (error) {
            console.error('Error cargando repositorios:', error);
            projectsContainer.innerHTML = `
                <div class="error-message">
                    <p>No se pudieron cargar los proyectos desde GitHub.</p>
                    <p>Puedes verlos en <a href="https://github.com/${username}" target="_blank">mi perfil</a>.</p>
                </div>
            `;
        }
    }

    // Configurar event listeners
    function setupEventListeners() {
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        projectsContainer.addEventListener('scroll', () => {
            const slideWidth = projectsContainer.offsetWidth / projectsPerPage;
            currentIndex = Math.round(projectsContainer.scrollLeft / slideWidth);
            updateDots();
        });

        window.addEventListener('resize', () => {
            adjustProjectsPerPage();
            goToSlide(currentIndex);
        });
    }

    // Iniciar
    await renderProjects();
}

document.addEventListener('DOMContentLoaded', cargarProyectosDeGitHub);