/**
 * ParkVision - Script principal
 * 
 * Este archivo contiene las funciones JavaScript básicas para la landing page de ParkVision,
 * incluyendo la funcionalidad para mostrar/ocultar elementos y actualizar dinámicamente
 * elementos de la página.
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Referencias a elementos del DOM
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const showContactFormBtn = document.getElementById("show-contact-form");
    const hideContactFormBtn = document.getElementById("hide-contact-form");
    const contactForm = document.getElementById("contact-form");
    const parkingAvailability = document.getElementById("parking-availability");
    
    // Contador de espacios disponibles (simulación)
    let availableSpaces = 78;
    
    /**
     * Función para alternar la visibilidad del menú móvil
     */
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("animate-slide-down");
        } else {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("animate-slide-down");
        }
    }
    
    /**
     * Función para mostrar el formulario de contacto
     */
    function showContactForm() {
        contactForm.classList.remove("hidden");
        contactForm.classList.add("animate-fade-in");
        
        // Desplazar la página al formulario
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Función para ocultar el formulario de contacto
     */
    function hideContactForm() {
        contactForm.classList.add("hidden");
        contactForm.classList.remove("animate-fade-in");
    }
    
    /**
     * Función para actualizar el contador de espacios disponibles (simulación)
     * Esta función simula cambios en la disponibilidad de estacionamientos
     */
    function updateParkingAvailability() {
        // Simular cambios aleatorios en la disponibilidad (-2 a +2)
        const change = Math.floor(Math.random() * 5) - 2;
        availableSpaces += change;
        
        // Asegurar que el número no sea negativo ni demasiado alto
        if (availableSpaces < 0) availableSpaces = 0;
        if (availableSpaces > 100) availableSpaces = 100;
        
        // Actualizar el texto y el color según la disponibilidad
        parkingAvailability.textContent = `${availableSpaces} espacios libres`;
        
        // Actualizar el color según la disponibilidad
        if (availableSpaces > 50) {
            parkingAvailability.className = "text-green-500 font-bold";
        } else if (availableSpaces > 20) {
            parkingAvailability.className = "text-yellow-500 font-bold";
        } else {
            parkingAvailability.className = "text-red-500 font-bold";
        }
        
        // Actualizar la barra de progreso
        const progressBar = document.querySelector(".bg-green-500");
        if (progressBar) {
            const percentage = (availableSpaces / 120) * 100; // Asumiendo capacidad total de 120
            progressBar.style.width = `${percentage}%`;
            
            // Cambiar el color de la barra según la disponibilidad
            if (availableSpaces > 50) {
                progressBar.className = "bg-green-500 h-4 rounded-full";
            } else if (availableSpaces > 20) {
                progressBar.className = "bg-yellow-500 h-4 rounded-full";
            } else {
                progressBar.className = "bg-red-500 h-4 rounded-full";
            }
        }
    }
    
    /**
     * Crear un botón para volver arriba
     */
    function createScrollTopButton() {
        // Crear el botón
        const scrollButton = document.createElement("div");
        scrollButton.className = "scroll-top-button";
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollButton);
        
        // Mostrar/ocultar botón basado en la posición de desplazamiento
        window.addEventListener("scroll", function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                scrollButton.classList.add("visible");
            } else {
                scrollButton.classList.remove("visible");
            }
        });
        
        // Funcionalidad para desplazarse hacia arriba al hacer clic
        scrollButton.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
    /**
     * Muestra una notificación temporal
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo de notificación (success, error, info)
     * @param {number} duration - Duración en milisegundos
     */
    function showNotification(message, type = "info", duration = 3000) {
        // Crear elemento de notificación
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);
        
        // Eliminar después de la duración especificada
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
    
    /**
     * Simula el envío de un formulario
     * @param {HTMLFormElement} form - El formulario a enviar
     */
    function submitForm(form) {
        // Obtener los datos del formulario
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validar el formulario (ejemplo básico)
        if (!formValues.name || !formValues.email || !formValues.message) {
            showNotification("Por favor, completa todos los campos", "error");
            return false;
        }
        
        // Simulación de envío (en un caso real, aquí iría el fetch/ajax)
        showNotification("Enviando mensaje...", "info");
        
        // Simular respuesta exitosa después de 1 segundo
        setTimeout(() => {
            showNotification("¡Mensaje enviado con éxito! Pronto nos pondremos en contacto contigo.", "success");
            form.reset();
            hideContactForm();
        }, 1000);
        
        return false; // Prevenir envío real del formulario
    }
    
    // Crear el botón para volver arriba
    createScrollTopButton();
    
    // Añadir event listeners
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }
    
    if (showContactFormBtn) {
        showContactFormBtn.addEventListener("click", showContactForm);
    }
    
    if (hideContactFormBtn) {
        hideContactFormBtn.addEventListener("click", hideContactForm);
    }
    
    // Actualizar la disponibilidad de estacionamiento inicialmente
    if (parkingAvailability) {
        updateParkingAvailability();
        
        // Actualizar cada 5 segundos (simulación)
        setInterval(updateParkingAvailability, 5000);
    }
    
    // Añadir event listener para formularios
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            submitForm(this);
        });
    });
    
    // Añadir evento para los botones de envío de formulario
    document.querySelectorAll("form button[type='button']").forEach(button => {
        button.addEventListener("click", function() {
            const form = this.closest("form");
            if (form) {
                submitForm(form);
            }
        });
    });
    
    // Simular carga inicial
    window.addEventListener("load", function() {
        // Mostrar notificación de bienvenida después de 2 segundos
        setTimeout(() => {
            showNotification("¡Bienvenido a ParkVision! Explora cómo podemos transformar tu experiencia de estacionamiento.", "info", 5000);
        }, 2000);
    });
    
    /**
     * Añade animaciones a elementos cuando aparecen en el viewport
     */
    function setupScrollAnimations() {
        const elements = document.querySelectorAll(".animate-on-scroll");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Inicializar animaciones de scroll si hay elementos con la clase
    if (document.querySelectorAll(".animate-on-scroll").length > 0) {
        setupScrollAnimations();
    }
});