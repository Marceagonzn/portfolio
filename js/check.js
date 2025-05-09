
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita recargar la página

    const form = e.target;
    const successMessage = document.getElementById('success-message');

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        form.reset(); // Limpia el formulario
        successMessage.style.display = 'block'; // Muestra el mensaje
    } else {
        alert('Ocurrió un error. Por favor intenta nuevamente.');
    }
});

