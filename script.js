const heartArea = document.querySelector(".heart-area");
const leftHearts = document.getElementById("leftHearts");
const rightHearts = document.getElementById("rightHearts");
const loveButton = document.getElementById("loveButton");
const loveMessage = document.getElementById("loveMessage");


function createHeart(x, y, delay) {
  const heart = document.createElement("div");

  heart.className = "side-heart";
  heart.innerHTML = Math.random() > 0.35 ? "♥" : "♡";

  heart.style.left = x + "%";
  heart.style.top = y + "%";

  heart.style.fontSize =
    (12 + Math.random() * 22) + "px";

  heartArea.appendChild(heart);

  setTimeout(() => {
    heart.classList.add("show");
  }, delay);
}


function drawHeart() {

  document.querySelectorAll(".side-heart")
    .forEach(h => h.remove());


  const total = 90;

  for (let i = 0; i < total; i++) {

    const t = (Math.PI * 2 * i) / total;

    const x =
      16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    const finalX =
      50 + x * 2.7;

    const finalY =
      48 - y * 2.1;


    /*
      SOL VE SAĞ TARAF
      AYRI GECİKMELERLE GELİYOR
    */

    let delay;

    if (finalX < 50) {
      delay =
        Math.abs(finalX - 50) * 14;
    } else {
      delay =
        Math.abs(finalX - 50) * 14;
    }

    createHeart(
      finalX,
      finalY,
      800 - delay
    );
  }


  /*
    EKRANIN İKİ KENARINDAN
    İÇERİ AKAN EKSTRA KALPLER
  */

  for (let i = 0; i < 35; i++) {

    const left = document.createElement("div");

    left.className = "side-heart";
    left.innerHTML = "♥";

    left.style.left = "0%";
    left.style.top =
      (10 + Math.random() * 65) + "%";

    heartArea.appendChild(left);


    setTimeout(() => {

      left.style.opacity = "1";

      left.animate(
        [
          {
            left: "0%",
            transform: "scale(.5)"
          },

          {
            left: (35 + Math.random() * 12) + "%",
            transform: "scale(1.2)"
          }
        ],
        {
          duration: 1300,
          fill: "forwards",
          easing: "ease-out"
        }
      );

    }, i * 45);


    const right = document.createElement("div");

    right.className = "side-heart";
    right.innerHTML = "♥";

    right.style.left = "100%";
    right.style.top =
      (10 + Math.random() * 65) + "%";

    heartArea.appendChild(right);


    setTimeout(() => {

      right.style.opacity = "1";

      right.animate(
        [
          {
            left: "100%",
            transform: "scale(.5)"
          },

          {
            left: (53 + Math.random() * 12) + "%",
            transform: "scale(1.2)"
          }
        ],
        {
          duration: 1300,
          fill: "forwards",
          easing: "ease-out"
        }
      );

    }, i * 45);
  }
}


window.addEventListener("load", () => {
  setTimeout(drawHeart, 500);
});


loveButton.addEventListener("click", () => {

  drawHeart();

  loveMessage.classList.add("show");

  loveButton.innerHTML =
    "❤️ Sen Benim Her Şeyimsin";

  setTimeout(() => {

    loveMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 1000);
});
