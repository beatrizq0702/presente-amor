
const dataInicio = new Date(2026 ,02, 25);

const home = document.getElementById("home");
const gift = document.getElementById("gift");
const present = document.getElementById("present");

const startBtn = document.getElementById("startBtn");
const presentBtn = document.getElementById("presentBtn");
const backBtn = document.getElementById("backBtn");

const giftBox = document.getElementById("giftBox");
const letter = document.getElementById("letter");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// Troca de telas
function showScreen(screen) {
  [home, gift, present].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

startBtn.addEventListener("click", () => {
  showScreen(gift);
});

presentBtn.addEventListener("click", () => {
  showScreen(present);
});

// Abre a caixa
giftBox.addEventListener("click", () => {
  giftBox.classList.add("open");

  setTimeout(() => {
    giftBox.style.display = "none";
    letter.classList.remove("hidden");
  }, 700);
});

// Volta
backBtn.addEventListener("click", () => {
  letter.classList.add("hidden");
  giftBox.style.display = "block";
  giftBox.classList.remove("open");
  showScreen(gift);
});

// Música
musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "⏸️ Pausar música";
    } else {
      music.pause();
      musicBtn.textContent = "🎵 Tocar música";
    }
  } catch (error) {
    alert("Coloque um arquivo chamado musica.mp3 na mesma pasta do site.");
  }
});

// Contador
function atualizarContador() {
  const agora = new Date();

  if (dataInicio > agora) {
    document.getElementById("counter").textContent =
      "Escolha uma data de início válida ❤️";
    return;
  }

  let anos = agora.getFullYear() - dataInicio.getFullYear();
  let meses = agora.getMonth() - dataInicio.getMonth();
  let dias = agora.getDate() - dataInicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      0
    ).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  document.getElementById("counter").textContent =
    `${anos} ano(s), ${meses} mês(es) e ${dias} dia(s) ❤️`;
}

atualizarContador();
setInterval(atualizarContador, 60000);

// Pequenos corações no fundo
setInterval(() => {
  if (!document.querySelector(".screen.active")) return;

  const heart = document.createElement("span");
  heart.textContent = "❤";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-20px";
  heart.style.fontSize = Math.random() * 15 + 10 + "px";
  heart.style.opacity = "0.7";
  heart.style.zIndex = "20";
  heart.style.pointerEvents = "none";

  document.body.appendChild(heart);

  heart.animate(
    [
      { transform: "translateY(0) scale(1)", opacity: .7 },
      { transform: `translateY(-110vh) scale(1.5)`, opacity: 0 }
    ],
    { duration: 5000, easing: "linear" }
  );

  setTimeout(() => heart.remove(), 5000);
}, 800);
