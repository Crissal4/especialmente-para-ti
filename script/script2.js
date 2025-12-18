// -------------------- FIREWORKS, HEARTS, CONFETTI --------------------
const fireworksContainer = document.getElementById('fireworksContainer');
const bgMusicP2 = document.getElementById('bgMusicP2');
let fireworksActive = true;

const fireworkColors = [
    '#ff1744', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
    '#009688', '#4caf50', '#8bc34a', '#cddc39',
    '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
];

function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
    fireworksContainer.appendChild(firework);
    setTimeout(() => {
        createParticles(x, y, firework.style.backgroundColor);
        firework.remove();
    }, 200);
}

function createParticles(x, y, color) {
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 100;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        fireworksContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

function launchRandomFirework() {
    if (!fireworksActive) return;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6) + 50;
    createFirework(x, y);
    setTimeout(launchRandomFirework, 1000 + Math.random() * 2000);
}

function createFireworkSequence() {
    const sequences = [
        {x:0.2,y:0.3},{x:0.3,y:0.2},{x:0.4,y:0.15},{x:0.5,y:0.1},
        {x:0.6,y:0.15},{x:0.7,y:0.2},{x:0.8,y:0.3},{x:0.35,y:0.4},
        {x:0.45,y:0.35},{x:0.55,y:0.35},{x:0.65,y:0.4},
        {x:0.5,y:0.2},{x:0.4,y:0.3},{x:0.6,y:0.3},{x:0.3,y:0.4},
        {x:0.7,y:0.4},{x:0.5,y:0.5},{x:0.3,y:0.6},{x:0.7,y:0.6},
        {x:0.4,y:0.7},{x:0.6,y:0.7},{x:0.5,y:0.8}
    ];
    sequences.forEach((pos,index)=>{
        setTimeout(()=>{
            const x = pos.x * window.innerWidth;
            const y = pos.y * window.innerHeight;
            createFirework(x,y);
        }, index * 200);
    });
}

function createHeartRain() {
    for(let i=0;i<15;i++){
        setTimeout(()=>{
            const heart=document.createElement('div');
            heart.innerHTML='💖';
            heart.style.position='fixed';
            heart.style.fontSize='30px';
            heart.style.left=Math.random()*window.innerWidth+'px';
            heart.style.top='-50px';
            heart.style.pointerEvents='none';
            heart.style.zIndex='1000';
            heart.style.animation='heartFall 4s ease-out forwards';
            document.body.appendChild(heart);
            setTimeout(()=>heart.remove(),4000);
        },i*200);
    }
}

function createConfetti() {
    for(let i=0;i<100;i++){
        setTimeout(()=>{
            const confetti=document.createElement('div');
            const colors=['#ff1744','#e91e63','#9c27b0','#2196f3','#4caf50','#ffeb3b'];
            confetti.style.position='fixed';
            confetti.style.width='10px';
            confetti.style.height='10px';
            confetti.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
            confetti.style.left=Math.random()*window.innerWidth+'px';
            confetti.style.top='-10px';
            confetti.style.pointerEvents='none';
            confetti.style.zIndex='1000';
            confetti.style.animation='confettiFall 5s ease-out forwards';
            document.body.appendChild(confetti);
            setTimeout(()=>confetti.remove(),5000);
        },i*50);
    }
}

function createShootingStars() {
    for(let i=0;i<5;i++){
        setTimeout(()=>{
            const star=document.createElement('div');
            star.innerHTML='⭐';
            star.style.position='fixed';
            star.style.fontSize='20px';
            star.style.left='-50px';
            star.style.top=Math.random()*window.innerHeight+'px';
            star.style.pointerEvents='none';
            star.style.zIndex='1000';
            star.style.animation='shootingStar 3s ease-out forwards';
            document.body.appendChild(star);
            setTimeout(()=>star.remove(),3000);
        },i*1000);
    }
}

// -------------------- MATRIX --------------------
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let speed = 10;
let message = "very happy";
let color = "#ff69b4";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = Array.from({ length: columns }).fill(1);

// CONTROLES
document.getElementById("speedControl").addEventListener("input", (e) => {
  speed = parseInt(e.target.value);
});

document.getElementById("colorPicker").addEventListener("input", (e) => {
  color = e.target.value;
});

document.getElementById("textInput").addEventListener("input", (e) => {
  message = e.target.value;
});

// EXPLOSIONES AL CLIC
canvas.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  explosion(x, y);
});

function explosion(x, y) {
  const parts = 20;
  for (let i = 0; i < parts; i++) {
    const angle = (Math.PI * 2 * i) / parts;
    const dx = Math.cos(angle) * 5;
    const dy = Math.sin(angle) * 5;
    animateExplosion(x, y, dx, dy);
  }
}

function animateExplosion(x, y, dx, dy) {
  let life = 30;
  function frame() {
    if (life <= 0) return;
    ctx.fillStyle = color;
    ctx.font = "bold 16px Arial";
    ctx.fillText(message, x + dx * (30 - life), y + dy * (30 - life));
    life--;
    requestAnimationFrame(frame);
  }
  frame();
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px Arial`;

  for (let i = 0; i < drops.length; i++) {
    const text = message;
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
    draw();
  }, 1000 / speed);
}

animate();

// -------------------- EVENT LISTENERS --------------------
document.addEventListener('click', e=>createFirework(e.clientX,e.clientY));
document.addEventListener('keydown', e=>{
  const targetTag = e.target.tagName.toLowerCase();
  const isTyping = targetTag === "input" || targetTag === "textarea";

  if(!isTyping && e.key === ' '){ 
      e.preventDefault(); 
      createFireworkSequence(); 
  }
  else if(!isTyping && e.key === 'h') createHeartRain();
  else if(!isTyping && e.key === 'c') createConfetti();
  else if(!isTyping && e.key === 's') createShootingStars();
});

// -------------------- ANIMACIONES DINÁMICAS --------------------
const style=document.createElement('style');
style.textContent=`
@keyframes heartFall{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(360deg);opacity:0;}}
@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(100vh) rotate(720deg);opacity:0;}}
@keyframes shootingStar{0%{transform:translateX(0) translateY(0);opacity:1;}100%{transform:translateX(100vw) translateY(-50px);opacity:0;}}
`;
document.head.appendChild(style);

// -------------------- INICIALIZACIÓN --------------------
setTimeout(launchRandomFirework,1000);
setTimeout(createFireworkSequence,3000);
setTimeout(createHeartRain,6000);
setTimeout(createConfetti,9000);
setTimeout(createShootingStars,12000);

// -------------------- MÚSICA --------------------
function tryPlayMusicP2(){
    if(!bgMusicP2) return;
    bgMusicP2.volume=0.6;
    const p=bgMusicP2.play();
    if(p&&typeof p.then==='function') p.catch(()=>{});
}
tryPlayMusicP2();
function enableMusicOnFirstInteraction(){
    tryPlayMusicP2();
    window.removeEventListener('click',enableMusicOnFirstInteraction);
    window.removeEventListener('keydown',enableMusicOnFirstInteraction);
    window.removeEventListener('touchstart',enableMusicOnFirstInteraction);
}
window.addEventListener('click',enableMusicOnFirstInteraction);
window.addEventListener('keydown',enableMusicOnFirstInteraction);
window.addEventListener('touchstart',enableMusicOnFirstInteraction,{passive:true});

console.log('🎆 Página cargada: Fuegos Artificiales, Rosas y Matrix 🎆');
console.log('💡 Controles: clic=fuegos artificiales, espacio=secuencia, H=corazones, C=confeti, S=estrellas');
