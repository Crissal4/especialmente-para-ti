// Variables globales
const passwordInput = document.getElementById('passwordInput');
const message = document.getElementById('message');
const lock = document.getElementById('lock');

// Contraseña correcta (puedes cambiarla)
const correctPassword = ["23032008","26091999","12112006","04102006","03112008","18082008"];

// Array de frases motivacionales y de error
const motivationalPhrases = [
    "¡Eres más inteligente de lo que crees!"
    
];

const errorPhrases = [
    "¡Inténtalo de nuevo, la respuesta es una fecha especial!"
];

let attemptCount = 0;

// Función para mostrar mensaje
function showMessage(text, type = 'normal') {
    message.textContent = text;
    message.className = `message ${type}`;
}

// Función para obtener frase aleatoria
function getRandomPhrase(phrases) {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// Función para verificar contraseña
function checkPassword() {
    const inputPassword = passwordInput.value.trim();
    
    if (inputPassword === '') {
        return; // No mostrar mensaje si está vacío
    }
    
    if (correctPassword.includes(inputPassword)) {
        // Contraseña correcta
        showMessage("¡Felicidades! ¡Has descifrado el misterio!", 'success');
        lock.classList.add('unlocked');
    
        passwordInput.disabled = true;
        
        // Después de 2 segundos, mostrar mensaje de éxito y redireccionar
        setTimeout(() => {
            showMessage("¡lo lograste! ¡Bienvenida!", 'success');
            
            // Aquí puedes agregar la lógica para ir a la siguiente página
            setTimeout(() => {
                window.location.href = "pagina1.html";
                alert("¡Bienvenida!");
            }, 1500);
        }, 1500);
        
    } else {
        // Contraseña incorrecta - solo mostrar mensaje, no limpiar
        attemptCount++;
        
        if (attemptCount <= 3) {
            // Mostrar frase motivacional
            showMessage(getRandomPhrase(motivationalPhrases), 'normal');
        } else {
            // Después de 3 intentos, mostrar frases de error
            showMessage(getRandomPhrase(errorPhrases), 'error');
        }
        
        // Efecto de vibración en el candado
        lock.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            lock.style.animation = '';
        }, 500);
    }
}

// Función para limpiar (se puede llamar si es necesario)
function clearInput() {
    passwordInput.value = '';
    showMessage("¡ADIVINA!", 'normal');
}


// Permitir verificar con Enter (opcional, ya que se verifica automáticamente)
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Efecto de focus en el input
passwordInput.addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)';
});

passwordInput.addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
});

// Efecto de hover en el candado
lock.addEventListener('mouseenter', function() {
    if (!this.classList.contains('unlocked')) {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    }
});

lock.addEventListener('mouseleave', function() {
    if (!this.classList.contains('unlocked')) {
        this.style.transform = 'scale(1) rotate(0deg)';
    }
});

// Mensaje inicial
showMessage("¡Tú sí puedes descifrarlo!", 'normal');

// Efecto de partículas flotantes (opcional)
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'floatUp 8s linear forwards';
    
    document.body.appendChild(particle);
    
}

// Crear partículas flotantes cada 2 segundos
setInterval(createFloatingParticle, 2000);

// Agregar animación CSS para las partículas flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', checkPassword);
