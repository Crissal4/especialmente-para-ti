// Variables globales
const letter = document.getElementById('letter');
const letterBack = document.getElementById('letterBack');
const poemButtons = document.getElementById('poemButtons');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');
const bgMusic = document.getElementById('bgMusic');

let letterOpened = false;
let rejectBtnMoving = false;

// Función para abrir la carta
function openLetter() {
    if (!letterOpened) {
        letter.classList.add('opened');
        letterOpened = true;
        
        // Mostrar los botones después de un pequeño delay
        setTimeout(() => {
            poemButtons.style.display = 'flex';
            poemButtons.style.animation = 'fadeIn 0.5s ease-in-out';
        }, 500);

        // Intentar reproducir música al primer gesto del usuario
        tryPlayMusic();
    }
}

// Función para manejar el botón "Sí, Acepto"
function handleAccept() {
    // Efecto de celebración
    createCelebrationEffect();
    
    // Redireccionar a página2.html después de 2 segundos
    setTimeout(() => {
        // Detener música de página 1 antes de salir
        if (bgMusic && !bgMusic.paused) {
            try {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            } catch (e) {}
        }
        window.location.href = "pagina2.html";
    }, 2000);
}

// Función para manejar el botón "No"
function handleReject() {
    if (!rejectBtnMoving) {
        rejectBtnMoving = true;
        rejectBtn.classList.add('moving');
        
        // Hacer que el botón se mueva por toda la pantalla
        moveButtonAround();
    }
}

// Función para mover el botón por toda la pantalla
function moveButtonAround() {
    const button = rejectBtn;
    const container = document.body;
    
    function randomMove() {
        if (rejectBtnMoving) {
            const maxX = window.innerWidth - button.offsetWidth;
            const maxY = window.innerHeight - button.offsetHeight;
            
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            button.style.position = 'fixed';
            button.style.left = randomX + 'px';
            button.style.top = randomY + 'px';
            button.style.zIndex = '1000';
            
            // Cambiar la velocidad de movimiento aleatoriamente
            const delay = Math.random() * 1000 + 500; // Entre 500ms y 1500ms
            
            setTimeout(randomMove, delay);
        }
    }
    
    randomMove();
}

// Función para crear efecto de celebración
function createCelebrationEffect() {
    // Crear corazones flotantes
    for (let i = 0; i < 20; i++) {
        createFloatingHeart();
    }
    
    // Crear confeti
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

// Función para crear corazones flotantes
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 3s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Función para crear confeti
function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#ff6b9d', '#ff8fab', '#ffb3c6', '#ffc0cb', '#ffd1dc'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = 'confettiFall 3s ease-out forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Event listeners
letter.addEventListener('click', openLetter);
acceptBtn.addEventListener('click', handleAccept);
rejectBtn.addEventListener('click', handleReject);

// Agregar animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
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
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto de partículas adicionales
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 182, 193, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'floatUp 8s linear forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Crear partículas cada 3 segundos
setInterval(createParticle, 3000);

// Mensaje de bienvenida
console.log('🦋 Página de Mariposas del Corazón cargada 🦋');

// --- Lógica de audio ---
let musicEnabled = false;

function tryPlayMusic() {
    if (!bgMusic) return;
    // Algunos navegadores requieren interacción; este método se llama tras clic en la carta
    bgMusic.volume = 0.6;
    const p = bgMusic.play();
    if (p && typeof p.then === 'function') {
        p.then(() => {
            musicEnabled = true;
        }).catch(() => {
            // Si falla (autoplay bloqueado), dejamos el botón para activar
            musicEnabled = false;
            // queda en espera hasta que el usuario active sonido
        });
    }
}

// (sin botón visible; solo intento de reproducción controlado por interacción)

// En iOS/Safari, como alternativa, intentar iniciar música al primer toque en la pantalla
window.addEventListener('touchstart', function initOnce() {
    if (!musicEnabled) tryPlayMusic();
    window.removeEventListener('touchstart', initOnce);
}, { passive: true });
