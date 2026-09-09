const heartArea =
  document.querySelector(".heart-area");

const heartParticles =
  document.getElementById("heartParticles");

const loveButton =
  document.getElementById("loveButton");

const loveMessage =
  document.getElementById("loveMessage");

const touchMessageBox =
  document.getElementById("touchMessageBox");

const touchInput =
  document.getElementById("touchInput");

const placeMessageButton =
  document.getElementById("placeMessageButton");

const closeTouchBox =
  document.getElementById("closeTouchBox");

const writtenMessages =
  document.getElementById("writtenMessages");

const backgroundHearts =
  document.getElementById("backgroundHearts");


let touchX = 50;
let touchY = 50;


/* =========================
   ANA KALP ŞEKLİ
========================= */

function createMainHeart() {

  heartParticles.innerHTML = "";

  const total = 110;


  for (let i = 0; i < total; i++) {

    const t =
      (Math.PI * 2 * i)
      / total;


    const x =
      16 *
      Math.pow(
        Math.sin(t),
        3
      );


    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);


    const finalX =
      50 + x * 2.6;


    const finalY =
      49 - y * 2.1;


    const heart =
      document.createElement("div");


    heart.className =
      "heart-piece";


    const types = [
      "♥",
      "♡",
      "❤"
    ];


    heart.innerHTML =
      types[
        Math.floor(
          Math.random()
          * types.length
        )
      ];


    heart.style.left =
      finalX + "%";


    heart.style.top =
      finalY + "%";


    heart.style.fontSize =
      (
        11
        + Math.random()
        * 17
      )
      + "px";


    heartParticles
      .appendChild(
        heart
      );


    /*
      İKİ YANDAN
      ORTAYA DOĞRU GELSİN
    */

    const sideDistance =
      Math.abs(
        finalX - 50
      );


    const delay =
      Math.max(
        0,
        900
        - sideDistance * 18
      );


    setTimeout(() => {

      heart.classList.add(
        "show"
      );

    }, delay);
  }


  createSideStreams();
}


/* =========================
   İKİ YANDAN GELEN
   EKSTRA KALPLER
========================= */

function createSideStreams() {

  const amount = 34;


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    createMovingSideHeart(
      "left",
      i
    );


    createMovingSideHeart(
      "right",
      i
    );
  }
}


function createMovingSideHeart(
  side,
  index
) {

  const heart =
    document.createElement("div");


  heart.className =
    "heart-piece";


  heart.innerHTML =
    Math.random() > 0.35
      ? "♥"
      : "♡";


  heart.style.fontSize =
    (
      10
      + Math.random()
      * 16
    )
    + "px";


  const y =
    12
    + Math.random()
    * 70;


  heart.style.top =
    y + "%";


  if (side === "left") {

    heart.style.left =
      "-3%";

  } else {

    heart.style.left =
      "103%";
  }


  heartParticles
    .appendChild(
      heart
    );


  setTimeout(() => {

    heart.style.opacity = "1";


    const targetX =
      side === "left"
        ? 42 + Math.random() * 5
        : 53 + Math.random() * 5;


    heart.animate(

      [

        {
          left:
            side === "left"
              ? "-3%"
              : "103%",

          opacity: 0,

          transform:
            "translate(-50%, -50%) scale(.4)"
        },

        {
          left:
            targetX + "%",

          opacity: 1,

          transform:
            "translate(-50%, -50%) scale(1.1)"
        }

      ],

      {

        duration:
          1200
          + Math.random()
          * 500,

        easing:
          "ease-out",

        fill:
          "forwards"
      }

    );

  }, index * 45);
}


/* =========================
   SAYFA AÇILINCA
========================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      createMainHeart();

    }, 500);

  }
);


/* =========================
   KALBİME DOKUN
========================= */

loveButton.addEventListener(
  "click",
  () => {

    createMainHeart();


    loveMessage
      .classList
      .add("show");


    loveButton.innerHTML =
      "❤️ Sen Benim Her Şeyimsin";


    createBackgroundExplosion();


    setTimeout(() => {

      loveMessage
        .scrollIntoView({

          behavior:
            "smooth",

          block:
            "center"

        });

    }, 900);

  }
);


/* =========================
   EKRANA DOKUNUNCA
========================= */

document.addEventListener(
  "pointerdown",
  (event) => {

    /*
      BUTON,
      TEXTAREA,
      MESAJ KUTUSU VE
      YAZILMIŞ MESAJLAR
      TETİKLEMESİN
    */

    if (
      event.target.closest("button") ||
      event.target.closest("textarea") ||
      event.target.closest(".touch-card") ||
      event.target.closest(".written-love")
    ) {
      return;
    }


    touchX =
      (
        event.clientX
        / window.innerWidth
      )
      * 100;


    touchY =
      (
        event.clientY
        / window.innerHeight
      )
      * 100;


    /*
      DOKUNULAN YERDE
      PARLAYAN KALP
    */

    const touchHeart =
      document.createElement("div");


    touchHeart.className =
      "touch-ripple-heart";


    touchHeart.innerHTML =
      "♥";


    touchHeart.style.left =
      event.clientX
      + "px";


    touchHeart.style.top =
      event.clientY
      + "px";


    document.body
      .appendChild(
        touchHeart
      );


    setTimeout(() => {

      touchHeart.remove();

    }, 900);


    /*
      SONRA YAZI KUTUSU
    */

    setTimeout(() => {

      touchInput.value =
        "";


      touchMessageBox
        .classList
        .add("show");


      setTimeout(() => {

        touchInput.focus();

      }, 150);

    }, 450);

  }
);


/* =========================
   MESAJI EKRANA KOY
========================= */

placeMessageButton
  .addEventListener(
    "click",
    () => {

      const text =
        touchInput
        .value
        .trim();


      if (text === "") {
        return;
      }


      const message =
        document.createElement(
          "div"
        );


      message.className =
        "written-love";


      message.textContent =
        text;


      message.style.left =
        touchX
        + "%";


      message.style.top =
        touchY
        + "%";


      writtenMessages
        .appendChild(
          message
        );


      touchMessageBox
        .classList
        .remove("show");


      createMessageHearts(
        touchX,
        touchY
      );


      /*
        MESAJIN ÜSTÜNE
        TEKRAR DOKUNUNCA
      */

      message.addEventListener(
        "click",
        () => {

          message
            .classList
            .remove("pop");


          void message.offsetWidth;


          message
            .classList
            .add("pop");


          createMessageHearts(
            parseFloat(
              message.style.left
            ),

            parseFloat(
              message.style.top
            )
          );

        }
      );

    }
  );


/* =========================
   YAZI KUTUSUNU KAPAT
========================= */

closeTouchBox
  .addEventListener(
    "click",
    () => {

      touchMessageBox
        .classList
        .remove("show");

    }
  );


/* =========================
   MESAJ KALP PATLAMASI
========================= */

function createMessageHearts(
  x,
  y
) {

  for (
    let i = 0;
    i < 16;
    i++
  ) {

    const heart =
      document.createElement(
        "div"
      );


    heart.innerHTML =
      "♥";


    heart.style.position =
      "fixed";


    heart.style.left =
      x + "%";


    heart.style.top =
      y + "%";


    heart.style.zIndex =
      "999";


    heart.style.pointerEvents =
      "none";


    heart.style.color =
      "#ff5c8a";


    heart.style.fontSize =
      (
        11
        + Math.random()
        * 17
      )
      + "px";


    heart.style.textShadow =
      "0 0 10px #ff477e";


    document.body
      .appendChild(
        heart
      );


    const moveX =
      Math.random()
      * 180
      - 90;


    const moveY =
      -(
        60
        + Math.random()
        * 130
      );


    heart.animate(

      [

        {
          transform:
            "translate(-50%, -50%) scale(.4)",

          opacity:
            1
        },

        {
          transform:
            `translate(
              calc(-50% + ${moveX}px),
              calc(-50% + ${moveY}px)
            )
            scale(1.4)`,

          opacity:
            0
        }

      ],

      {

        duration:
          900
          + Math.random()
          * 500,

        easing:
          "ease-out"

      }

    );


    setTimeout(() => {

      heart.remove();

    }, 1600);
  }
}


/* =========================
   ARKA PLAN KALPLERİ
========================= */

function createBackgroundHeart() {

  const heart =
    document.createElement(
      "div"
    );


  heart.className =
    "bg-heart";


  heart.innerHTML =
    Math.random() > 0.5
      ? "♥"
      : "♡";


  heart.style.left =
    Math.random()
    * 100
    + "vw";


  heart.style.fontSize =
    (
      10
      + Math.random()
      * 18
    )
    + "px";


  heart.style.animationDuration =
    (
      6
      + Math.random()
      * 5
    )
    + "s";


  backgroundHearts
    .appendChild(
      heart
    );


  setTimeout(() => {

    heart.remove();

  }, 11000);
}


setInterval(
  createBackgroundHeart,
  650
);


/* =========================
   BÜYÜK KALP PATLAMASI
========================= */

function createBackgroundExplosion() {

  for (
    let i = 0;
    i < 35;
    i++
  ) {

    setTimeout(() => {

      createBackgroundHeart();

    }, i * 40);
  }
}
