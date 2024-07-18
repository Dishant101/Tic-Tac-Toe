var loaderH1 = document.querySelector('.loaderH1');
var btns = document.querySelectorAll(".btns");
var winner = document.querySelector("#winner");
var reset = document.querySelector(".reset");
var move0 = true;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (move0) {
            btn.innerText = "X";
            move0 = false;
        } else {
            btn.innerText = "O";
            move0 = true;
        }
        btn.disabled = true;
        if (checkWinner()) {
            disableAllButtons();
        } else if (checkTie()) {
            winner.innerText = "It's a tie!";
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        var pos1 = btns[pattern[0]].innerText;
        var pos2 = btns[pattern[1]].innerText;
        var pos3 = btns[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winner.innerText = "Winner is player " + pos1;
                winner.style.mixBlendMode = "normal";
                return true;
            }
            else{
                winner.innerText = "Its a tie" ;
                winner.style.mixBlendMode = "normal";
            }
        }
    }
    return false;
};



const disableAllButtons = () => {
    btns.forEach((btn) => {
        btn.disabled = true;
    });
};

reset.addEventListener("click", () => {
    move0 = true;
    btns.forEach((btn) => {
        btn.innerText = "";
        btn.disabled = false;
    });
    winner.innerText = "";
});

let tl = gsap.timeline();

tl.from(".loader", {
    opacity: 0,
    onStart: function () {
        var h2timer = document.querySelector(".loaderH1");
        var grow = 0;
        setInterval(function () {
            if (grow < 100) {
                h2timer.innerHTML = grow++;
            } else {
                h2timer.innerHTML = grow;
            }
        }, 27);
    },
});
tl.from(".hero h1", {
    y: 150,
    stagger: 0.2,
    duration: 1.4
})
.to(".mains", {
    y: -1000,
    stagger: 1,
});
