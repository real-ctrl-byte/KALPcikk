const heartContainer = document.getElementById("heart-container");
const loveButton = document.getElementById("loveButton");
const secretMessage = document.getElementById("secretMessage");

function createHeart() {
  const heart = document.createElement("div");

  heart.classList.add("heart");

  const hearts = [
    "❤️",
    "💗",
    "💕",
    "💖",
    "💘"
  ];

  heart.innerHTML =
    hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    Math.random() * 20 + 18 + "px";

  heart.style.animationDuration =
    Math.random() * 3 + 4 + "s";

  heart.style.opacity =
    Math.random() * 0.5 + 0.5;

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 450);

loveButton.addEventListener("click", () => {

  secretMessage.classList.add("show");

  for (let i = 0; i < 25; i++) {
    setTimeout(createHeart, i * 80);
  }

  loveButton.innerHTML = "Seni Seviyorum ❤️";
});