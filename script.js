const loveButton =
  document.getElementById("loveButton");

const loveMessage =
  document.getElementById("loveMessage");

const floatingHearts =
  document.getElementById("floatingHearts");

const leftStream =
  document.getElementById("leftStream");

const rightStream =
  document.getElementById("rightStream");


/* KALP ŞEKLİ FORMÜLÜ */

function getHeartPoint(t, scale = 8) {

  const x =
    16 * Math.pow(Math.sin(t), 3);

  const y =
    13 * Math.cos(t)
    - 5 * Math.cos(2 * t)
    - 2 * Math.cos(3 * t)
    - Math.cos(4 * t);

  return {
    x: x * scale,
    y: -y * scale
  };
}


/* İKİ YANDAN KALPLER GELİYOR */

function createSideHeartStream() {

  leftStream.innerHTML = "";
  rightStream.innerHTML = "";

  const total = 70;

  for (let i = 0; i < total; i++) {

    const t =
      (Math.PI * 2 * i) / total;

    const point =
      getHeartPoint(t, 8.8);


    /* SOL TARAFTAN */

    const leftHeart =
      document.createElement("div");

    leftHeart.className =
      "stream-heart";

    leftHeart.innerHTML =
      i % 3 === 0 ? "♥" : "♡";

    leftHeart.style.fontSize =
      12 + Math.random() * 13 + "px";

    leftHeart.style.setProperty(
      "--x",
      `calc(50vw - 80px + ${point.x}px)`
    );

    leftHeart.style.setProperty(
      "--y",
      `${point.y}px`
    );

    leftHeart.style.animation =
      `flyFromLeft 1.8s ease-out ${
        i * 0.025
      }s forwards`;

    leftStream.appendChild(
      leftHeart
    );


    /* SAĞ TARAFTAN */

    const rightHeart =
      document.createElement("div");

    rightHeart.className =
      "stream-heart";

    rightHeart.innerHTML =
      i % 3 === 0 ? "♥" : "♡";

    rightHeart.style.fontSize =
      12 + Math.random() * 13 + "px";

    rightHeart.style.setProperty(
      "--x",
      `calc(-50vw + 80px + ${point.x}px)`
    );

    rightHeart.style.setProperty(
      "--y",
      `${point.y}px`
    );

    rightHeart.style.animation =
      `flyFromRight 1.8s ease-out ${
        i * 0.025
      }s forwards`;

    rightStream.appendChild(
      rightHeart
    );
  }
}


/* SAYFA AÇILINCA BAŞLASIN */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      createSideHeartStream();

    }, 700);

  }
);


/* BUTONA BASINCA MESAJ */

loveButton.addEventListener(
  "click",
  () => {

    createSideHeartStream();

    loveMessage.classList.add(
      "show"
    );

    loveButton.innerHTML =
      "♥ Sen Benim Her Şeyimsin";

    createHeartExplosion();

    setTimeout(() => {

      loveMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 700);
  }
);


/* ARKA PLANDA UÇAN KALPLER */

function createFloatingHeart() {

  const heart =
    document.createElement("div");

  heart.className =
    "floating-heart";

  const hearts = [
    "♥",
    "♡",
    "❤"
  ];

  heart.innerHTML =
    hearts[
      Math.floor(
        Math.random()
        * hearts.length
      )
    ];

  heart.style.left =
    Math.random() * 100 + "vw";

  heart.style.fontSize =
    Math.random() * 18 + 12 + "px";

  heart.style.animationDuration =
    Math.random() * 4 + 6 + "s";

  floatingHearts.appendChild(
    heart
  );

  setTimeout(() => {

    heart.remove();

  }, 10000);
}


setInterval(
  createFloatingHeart,
  750
);


/* TIKLAYINCA KALP PATLAMASI */

function createHeartExplosion() {

  for (
    let i = 0;
    i < 30;
    i++
  ) {

    setTimeout(() => {

      createFloatingHeart();

    }, i * 45);

  }
}
