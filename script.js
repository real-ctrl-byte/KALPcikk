const loveButton =
    document.getElementById("loveButton");

const heartButton =
    document.getElementById("heartButton");

const loveMessage =
    document.getElementById("loveMessage");

const floatingHearts =
    document.getElementById("floatingHearts");


function showLoveMessage() {

    loveMessage.classList.add("show");

    loveButton.innerHTML =
        "❤️ Sen Benim Her Şeyimsin";

    createHeartExplosion();

    setTimeout(() => {

        loveMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 500);
}


loveButton.addEventListener(
    "click",
    showLoveMessage
);


heartButton.addEventListener(
    "click",
    showLoveMessage
);


/* KALP OLUŞTUR */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.classList.add(
        "floating-heart"
    );

    const heartTypes = [
        "♥",
        "♡",
        "❤",
        "💕"
    ];

    heart.innerHTML =
        heartTypes[
            Math.floor(
                Math.random()
                * heartTypes.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        Math.random() * 22 + 15 + "px";


    heart.style.animationDuration =
        Math.random() * 4 + 5 + "s";


    floatingHearts.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 9000);
}


/* NORMAL KALPLER */

setInterval(
    createHeart,
    650
);


/* TIKLAYINCA KALP PATLAMASI */

function createHeartExplosion() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        setTimeout(() => {

            createHeart();

        }, i * 45);

    }

}
