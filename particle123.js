// topography-background.js
(function() {
    function createTopographyBackground(options = {}) {
        const {
            lineCount = 20,
            lineColor = "rgba(120, 120, 120, 0.3)",
            backgroundColor = "#0a0a0f",
            speed = 1,
            strokeWidth = 1
        } = options;

        // Crear el contenedor principal
        const container = document.createElement('div');
        container.className = 'topography-container';
        
        // Estilos del contenedor
        Object.assign(container.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: backgroundColor,
            zIndex: '-1',
            pointerEvents: 'none'
        });

        // Crear el canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'topography-canvas';
        
        Object.assign(canvas.style, {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            display: 'block'
        });

        container.appendChild(canvas);

        // Crear gradiente overlay
        const gradientOverlay = document.createElement('div');
        Object.assign(gradientOverlay.style, {
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            opacity: '0.5',
            background: `radial-gradient(ellipse at 50% 50%, transparent 0%, ${backgroundColor} 100%)`
        });
        container.appendChild(gradientOverlay);

        // Crear viñeta
        const vignette = document.createElement('div');
        Object.assign(vignette.style, {
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 40%, ${backgroundColor} 100%)`
        });
        container.appendChild(vignette);

        // Configuración del canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) return container;

        let width, height;
        let animationId;
        let tick = 0;

        // Función para generar altura del terreno
        function getHeight(x, t) {
            const scale = 0.003;
            return (
                Math.sin(x * scale * 2 + t) * 30 +
                Math.sin(x * scale * 3.7 + t * 0.7) * 20 +
                Math.sin(x * scale * 1.3 - t * 0.5) * 40 +
                Math.sin(x * scale * 5.1 + t * 1.2) * 10 +
                Math.sin(x * scale * 0.7 + t * 0.3) * 50
            );
        }

        // Función para redimensionar el canvas
        function resizeCanvas() {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            
            // Alta resolución para líneas nítidas
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        }

        // Función de animación
        function animate() {
            tick += 0.008 * speed;

            // Limpiar canvas con color de fondo
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // Configurar estilo de línea
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = strokeWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const spacing = height / (lineCount - 1);
            const padding = 50;

            // Dibujar líneas de contorno
            for (let i = 0; i < lineCount; i++) {
                const baseY = spacing * i;
                
                ctx.beginPath();
                
                let started = false;
                for (let x = -padding; x <= width + padding; x += 3) {
                    const terrainHeight = getHeight(x + i * 100, tick);
                    const y = baseY + terrainHeight;

                    if (!started) {
                        ctx.moveTo(x, y);
                        started = true;
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                
                ctx.stroke();
            }

            animationId = requestAnimationFrame(animate);
        }

        // Inicializar
        resizeCanvas();
        animate();

        // Observer para cambios de tamaño
        const resizeObserver = new ResizeObserver(() => {
            resizeCanvas();
        });
        resizeObserver.observe(container);

        // Observer para cambios de tamaño de ventana (como fallback)
        window.addEventListener('resize', () => {
            resizeCanvas();
        });

        // Limpiar al descargar la página (opcional, para evitar memory leaks)
        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            resizeObserver.disconnect();
        });

        return container;
    }

    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        // Buscar el canvas existente y reemplazarlo o agregar el nuevo fondo
        const existingCanvas = document.getElementById('canvas');
        const existingRetroGrid = document.getElementById('retro-grid-custom');
        
        // Si existe retro-grid, eliminarlo
        if (existingRetroGrid) {
            existingRetroGrid.remove();
        }

        const topographyBg = createTopographyBackground({
            lineCount: 20,
            lineColor: "rgba(0, 255, 65, 0.2)", // Verde matriz sutil
            backgroundColor: "#000000",
            speed: 1,
            strokeWidth: 1.5
        });

        if (existingCanvas) {
            existingCanvas.parentNode.replaceChild(topographyBg, existingCanvas);
        } else {
            document.body.insertBefore(topographyBg, document.body.firstChild);
        }
    });
})();