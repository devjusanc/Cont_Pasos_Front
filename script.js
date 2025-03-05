document.addEventListener("DOMContentLoaded", function () {
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
    const togglePassword = document.getElementById("toggle-password");
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            togglePasswordVisibility("password", "toggle-password");
        });
    }

    const toggleRegisterPassword = document.getElementById("toggle-register-password");
    if (toggleRegisterPassword) {
        toggleRegisterPassword.addEventListener("click", function () {
            togglePasswordVisibility("register-password", "toggle-register-password");
        });
    }

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

    async function loginUsuario(correo, clave) {
        const url = "http://localhost:8085/api/usuarios/login";
        const requestBody = {
            correo: correo,
            clave: clave
        };

        console.log(JSON.stringify(requestBody));

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Error HTTP: ${response.status}');
            }

            const data = await response.json();
            //console.log("Respuesta del servidor:", data);
            return data;
        } catch (error) {
            //console.error("Error en la petición:", error);
            return null;
        }
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();


            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            //const mensaje = document.getElementById("mensaje");


            if (!email.includes("@") || password.length < 6) {
                //mensaje.textContent = "❌ Correo o contraseña incorrectos";
                //mensaje.style.color = "red";
                return;
            }
            const datos = await loginUsuario(email, password);
            console.log(datos);
            if (datos) {
                //mensaje.textContent = "✅ Usuario autenticado con éxito";
                //mensaje.style.color = "green";
                // window.location.href = "/dashboard.html";
            } else {
                //mensaje.textContent = "❌ Error en la autenticación";
                //mensaje.style.color = "red";
            }
        });
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            if (name.trim() === "" || !email.includes("@") || password.length < 6 || password !== confirmPassword) {
                alert("Por favor, ingresa datos válidos y asegúrate de que las contraseñas coincidan.");
            } else {
                alert("Registro exitoso");
            }
        });
    }

    const showRegister = document.getElementById("show-register");
    if (showRegister) {
        showRegister.addEventListener("click", function () {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("register-container").style.display = "block";
            document.getElementById("reset-container").style.display = "none";
        });
    }

    const showLogin = document.getElementById("show-login");
    if (showLogin) {
        showLogin.addEventListener("click", function () {
            document.getElementById("register-container").style.display = "none";
            document.getElementById("login-container").style.display = "block";
            document.getElementById("reset-container").style.display = "none";
        });
    }

    const showReset = document.getElementById("show-reset");
    if (showReset) {
        showReset.addEventListener("click", function () {
            document.getElementById("login-container").style.display = "none";
            document.getElementById("register-container").style.display = "none";
            document.getElementById("reset-container").style.display = "block";
        });
    }

    const botonEnviar = document.getElementById("boton-enviar");
    if (botonEnviar) {
        botonEnviar.addEventListener("click", function () {
            const emailInput = document.getElementById("reset-email");
            const mensaje = document.getElementById("mensaje");
            const email = emailInput.value.trim();

            if (!email || !email.includes("@")) {
                alert("Por favor, introduce un correo válido.");
                mensaje.style.display = "none";
            } else {
                mensaje.textContent = "Se ha enviado un enlace a tu correo.";
                mensaje.style.display = "block";

                setTimeout(() => {
                    mensaje.style.display = "none";
                }, 5000);
            }
        });
    }
});