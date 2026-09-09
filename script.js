const particles =
    document.getElementById("particles");

const loveButton =
    document.getElementById("loveButton");

const loveMessage =
    document.getElementById("loveMessage");

const backgroundHearts =
    document.getElementById("backgroundHearts");


const svg =
    document.querySelector(".heart-svg");


/* =========================
   SVG YOLUNDAN NOKTA AL
========================= */

function getScreenPoint(path, percent) {

    const length =
        path.getTotalLength();

    const point =
        path.getPointAtLength(
            length * percent
        );

    const svgPoint =
        svg.createSVGPoint();

    svgPoint.x =
        point.x;

    svgPoint.y =
        point.y;

    const matrix =
        svg.getScreenCTM();

    const screenPoint =
        svgPoint.matrixTransform(
            matrix
        );

    const parentRect =
        particles
        .getBoundingClientRect();

    return {

        x:
            screenPoint.x
            - parentRect.left,

        y:
            screenPoint.y
            - parentRect.top
    };
}


/* =========================
   KALP PARÇACIĞI OLUŞTUR
========================= */

function makeHeart(
    x,
    y,
    delay,
    size
) {

    const heart =
        document.createElement(
            "div"
        );

    heart.className =
        "heart-particle";

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
        x + "px";

    heart.style.top =
        y + "px";

    heart.style.fontSize =
        size + "px";

    heart.style.transform =
        "translate(-50%, -50%) scale(0)";

    particles.appendChild(
        heart
    );


    setTimeout(() => {

        heart.classList.add(
            "visible"
        );

        heart.animate(

            [

                {
                    transform:
                        "translate(-50%, -50%) scale(0)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1.5)"
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)"
                }

            ],

            {

                duration: 650,

                easing:
                    "cubic-bezier(.2,.8,.3,1)",

                fill:
                    "forwards"
            }

        );

    }, delay);
}


/* =========================
   PARILTI
========================= */

function makeSpark(
    x,
    y,
    delay
) {

    const spark =
        document.createElement(
            "div"
        );

    spark.className =
        "spark";

    spark.style.left =
        (
            x
            + Math.random() * 50
            - 25
        )
        + "px";

    spark.style.top =
        (
            y
            + Math.random() * 50
            - 25
        )
        + "px";

    spark.style.opacity =
        "0";

    particles.appendChild(
        spark
    );


    setTimeout(() => {

        spark.style.opacity =
            "1";

    }, delay);
}


/* =========================
   BİR YOLU DOLDUR
========================= */

function fillPath(
    pathID,
    reverse,
    startDelay
) {

    const path =
        document.getElementById(
            pathID
        );

    const amount =
        55;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        let percent =
            i
            / (amount - 1);


        if (reverse) {

            percent =
                1 - percent;
        }


        const point =
            getScreenPoint(
                path,
                percent
            );


        const delay =
            startDelay
            + i * 25;


        makeHeart(

            point.x
            + Math.random() * 15
            - 7,

            point.y
            + Math.random() * 15
            - 7,

            delay,

            12
            + Math.random() * 18
        );


        if (
            i % 3 === 0
        ) {

            makeSpark(

                point.x,

                point.y,

                delay
            );
        }
    }
}


/* =========================
   ANA ANİMASYON
========================= */

function startHeartAnimation() {

    particles.innerHTML =
        "";


    /*
       Önce iki ekran kenarından
       ortaya doğru geliyorlar.
    */

    fillPath(
        "leftPath",
        false,
        0
    );

    fillPath(
        "rightPath",
        false,
        0
    );


    /*
       Sonra kalbin iç kıvrımları
       tamamlanıyor.
    */

    setTimeout(() => {

        fillPath(
            "leftInner",
            true,
            0
        );

        fillPath(
            "rightInner",
            true,
            0
        );

    }, 900);
}


/* SAYFA AÇILINCA */

window.addEventListener(
    "load",
    () => {

        setTimeout(

            startHeartAnimation,

            500
        );
    }
);


/* =========================
   BUTON
========================= */

loveButton.addEventListener(
    "click",
    () => {

        startHeartAnimation();

        loveMessage
            .classList
            .add("show");


        loveButton.innerHTML =
            "♥ Sen Benim Her Şeyimsin";


        heartExplosion();


        setTimeout(() => {

            loveMessage
                .scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "center"
                });

        }, 1100);
    }
);


/* =========================
   ARKA PLAN KALPLERİ
========================= */

function backgroundHeart() {

    const heart =
        document.createElement(
            "div"
        );

    heart.className =
        "bg-heart";

    heart.innerHTML =
        Math.random() > .5
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
    backgroundHeart,
    600
);


/* =========================
   BUTONA BASINCA
   KALP PATLAMASI
========================= */

function heartExplosion() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(

            backgroundHeart,

            i * 40
        );
    }
}
