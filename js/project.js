// project.js
async function cargarProyectosDeGitHub() {
    const projectsCarousel = document.getElementById('projectsCarousel');
    const dotsContainer = document.getElementById('projectsDots');
    const prevButton = document.getElementById('projectsPrev');
    const nextButton = document.getElementById('projectsNext');
    const username = 'Marceagonzn';
    
    let currentIndex = 0;
    let repos = [];

    // Función para navegar a una diapositiva específica
    function goToSlide(index) {
        if (!projectsCarousel || repos.length === 0) return;
        
        const cardWidth = projectsCarousel.querySelector('.project-card-modern')?.offsetWidth || 340;
        const gap = 24; // El gap definido en CSS
        const scrollAmount = index * (cardWidth + gap);
        
        projectsCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        currentIndex = index;
        updateDots();
    }

    // Función para actualizar los dots
    function updateDots() {
        if (!dotsContainer || repos.length === 0) return;
        
        const totalDots = Math.min(repos.length, 10); // Mostrar máximo 10 dots
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = `carousel-dot-modern ${i === currentIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Función para obtener una imagen de placeholder con el nombre del proyecto
    function getProjectImage(repoName, index) {
        // Usamos imágenes de placeholder con colores basados en el índice
        const colors = ['2b6cee', '00FF41', 'a855f7', 'ef4444', 'f97316', '06b6d4'];
        const colorIndex = index % colors.length;
        const text = repoName.substring(0, 2).toUpperCase();
        
        // Servicio de placeholder con gradiente
        return `https://placehold.co/600x400/1e293b/${colors[colorIndex]}/png?text=${text}`;
    }

    // Función para renderizar proyectos
    async function renderProjects() {
        if (!projectsCarousel) return;
        
        projectsCarousel.innerHTML = '<div class="loading-message-modern">Cargando proyectos...</div>';

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=20`);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            
            repos = await response.json();

            // Filtrar repositorios con descripción
            repos = repos.filter(repo => repo.description)
                         .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
                         .slice(0, 10); // Mostrar máximo 10 proyectos

            if (repos.length === 0) {
                projectsCarousel.innerHTML = `
                    <div class="error-message" style="width: 100%; text-align: center; padding: 60px;">
                        <p>No se encontraron proyectos con descripción.</p>
                    </div>
                `;
                return;
            }

            projectsCarousel.innerHTML = ''; // Limpiar

            // Crear tarjetas de proyectos
            repos.forEach((repo, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card-modern';

                // Extraer tecnologías del nombre del repo o usar tags por defecto
                const tags = repo.topics && repo.topics.length > 0 
                    ? repo.topics.slice(0, 2).join(' • ') 
                    : 'JavaScript • React';

                projectCard.innerHTML = `
                    <div class="project-card-image-container">
                        <div class="project-card-overlay"></div>
                        <img src="${getProjectImage(repo.name, index)}" 
                             alt="${repo.name}" 
                             class="project-card-image"
                             onerror="this.src='https://placehold.co/600x400/1e293b/00FF41/png?text=PROJ'">
                        <div class="project-card-tags">
                            <span class="project-tag">${tags}</span>
                        </div>
                    </div>
                    <div class="project-card-content">
                        <h3 class="project-card-title">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                        <p class="project-card-description">${repo.description || 'Sin descripción disponible'}</p>
                        <button class="project-card-button" onclick="window.open('${repo.html_url}', '_blank')">
                            Ver proyecto
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                `;

                projectsCarousel.appendChild(projectCard);
            });

            updateDots();

            // Event listeners para navegación
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    }
                });

                nextButton.addEventListener('click', () => {
                    const maxIndex = Math.min(repos.length, 10) - 1;
                    if (currentIndex < maxIndex) {
                        goToSlide(currentIndex + 1);
                    }
                });
            }

            // Event listener para scroll
            projectsCarousel.addEventListener('scroll', () => {
                const cardWidth = projectsCarousel.querySelector('.project-card-modern')?.offsetWidth || 340;
                const gap = 24;
                const scrollLeft = projectsCarousel.scrollLeft;
                const newIndex = Math.round(scrollLeft / (cardWidth + gap));
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < Math.min(repos.length, 10)) {
                    currentIndex = newIndex;
                    updateDots();
                }
            });

        } catch (error) {
            console.error('Error cargando proyectos:', error);
            projectsCarousel.innerHTML = `
                <div class="error-message" style="width: 100%; text-align: center; padding: 60px;">
                    <p>Error al cargar los proyectos.</p>
                    <p><a href="https://github.com/${username}" target="_blank" style="color: #00FF41;">Ver en GitHub</a></p>
                </div>
            `;
        }
    }

// Re-aplicar cuando cambie el idioma
const languageSelect = document.getElementById('language-select');
if (languageSelect) {
    languageSelect.addEventListener('change', function() {
        // Pequeño retraso para que el DOM se actualice
        setTimeout(applyWaveAnimation, 50);
    });
}

    await renderProjects();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProyectosDeGitHub);