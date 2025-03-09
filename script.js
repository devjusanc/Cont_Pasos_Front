document.addEventListener("DOMContentLoaded", function () {
    
    // Carga de pantalla de inicio
    function loadMainContent() {
        const splashScreen = document.getElementById("splash-screen");
        const mainContent = document.getElementById("main-content");

        if (splashScreen && mainContent) {
            splashScreen.style.animation = "fadeOut 1s forwards";
            setTimeout(() => {
                splashScreen.style.display = "none";
                mainContent.style.display = "flex";
            }, 1000);
        }
    }
    setTimeout(loadMainContent, 3000);

    // Alternar visibilidad de contraseñas
    function togglePasswordVisibility(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            toggleIcon.textContent = "👁️";
        }
    }

    // Función para iniciar sesión
    async function loginUsuario(correo, clave) {
        const url = "http://localhost:8085/api/usuarios/login";
        const requestBody = { correo, clave };

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Error en la petición:", error);
            return null;
        }
    }

    // Función para registrar usuario
    async function registrarUsuario(nombre, correo, clave) {
        const url = "http://localhost:8085/api/usuarios/registro";
        const requestBody = { nombre, correo, clave };

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            return await response.text();
        } catch (error) {
            console.error("Error en el registro:", error);
            return null;
        }
    }

    // Función para recuperar contraseña
    async function recuperarClave(correo) {
        const url = "http://localhost:8085/api/usuarios/recuperar";
        const requestBody = { correo };

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            return await response.text();
        } catch (error) {
            console.error("Error en la recuperación de clave:", error);
            return null;
        }
    }

    // Evento para manejar el formulario de inicio de sesión
    document.getElementById("login-form")?.addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email.includes("@") || password.length < 6) return;
        const datos = await loginUsuario(email, password);
        if (datos) window.location.href = "p-principal.html";
    });

    // Evento para manejar el formulario de registro
    document.getElementById("register-form")?.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (name === "" || !email.includes("@") || password.length < 6 || password !== confirmPassword) {
            alert("Por favor, ingresa datos válidos y asegúrate de que las contraseñas coincidan.");
            return;
        }
        const mensaje = await registrarUsuario(name, email, password);
        alert(mensaje);
    });

    // Evento para manejar la recuperación de contraseña
    document.getElementById("boton-enviar")?.addEventListener("click", async function () {
        const email = document.getElementById("reset-email").value.trim();
        if (!email.includes("@")) {
            alert("Por favor, introduce un correo válido.");
            return;
        }
        const mensaje = await recuperarClave(email);
        alert(mensaje);
    });
});
