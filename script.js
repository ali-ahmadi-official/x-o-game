const box = [...document.querySelectorAll(".box")];
const player1 = document.querySelector(".p1");
const player2 = document.querySelector(".p2");
const progressBar = document.querySelector(".progress");
const progressBarEqual = document.querySelector(".progress-equal");
const noGame = document.querySelector(".no-game");

let player = 1;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let full = [
    false, false, false,
    false, false, false,
    false, false, false
];

box.forEach(element => {
    element.addEventListener("click", () => {
        let num = box.findIndex(rank => rank === element);

        if (!full[num]) {
            if (player == 1) {
                element.children[0].innerHTML = "X";
                element.setAttribute("played", "p1");
                player = 2;
            } else {
                element.children[0].innerHTML = "O";
                element.setAttribute("played", "p2");
                player = 1;
            }
            element.children[0].classList.add("element");
            full[num] = true;
            winner();

            if (player == 1) {
                player1.parentElement.parentElement.classList.add("turn");
                player2.parentElement.parentElement.classList.remove("turn");
            } else {
                player1.parentElement.parentElement.classList.remove("turn");
                player2.parentElement.parentElement.classList.add("turn");
            }
        }
    });
});

const winner = () => {
    let table = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const key of table) {
        if (box[key[0]].getAttribute("played") == box[key[1]].getAttribute("played")
            && box[key[0]].getAttribute("played") == box[key[2]].getAttribute("played")
            && box[key[0]].getAttribute("played") != null) {
            box[key[0]].classList.add("winner");
            box[key[1]].classList.add("winner");
            box[key[2]].classList.add("winner");

            let win = box[key[0]].getAttribute("played");

            if (win == "p1") {
                scorePlayer1++;
                player1.innerHTML = scorePlayer1;
            } else {
                scorePlayer2++;
                player2.innerHTML = scorePlayer2;
            }

            setTimeout(asFirst, 1600);

            let interval = null;
            let conic = 0;

            const progress = () => {
                progressBar.classList.add("progress-run");
                noGame.classList.add("no-game-on");
                if (conic == 100) {
                    clearInterval(interval);
                    progressBar.classList.remove("progress-run");
                    noGame.classList.remove("no-game-on");
                } else {
                    conic += 0.5;
                    progressBar.style.background = `radial-gradient(closest-side, #F0ECE5 89%, transparent 90% 100%),
                    conic-gradient(rgba(112, 54, 193, 1) ${conic}%, #F0ECE5 0)`;
                }
            }

            interval = setInterval(progress, 8);

            if (player == 1) {
                player = 2;
            } else {
                player = 1;
            }

        } if (full[0] && full[1] && full[2]
            && full[3] && full[4] && full[5]
            && full[6] && full[7] && full[8]) {
            setTimeout(asFirst, 1600);
            let interval2 = null;
            let conic2 = 0;

            const progress2 = () => {
                progressBarEqual.classList.add("progress-run");
                noGame.classList.add("no-game-on");
                if (conic2 == 100) {
                    clearInterval(interval2);
                    progressBarEqual.classList.remove("progress-run");
                    noGame.classList.remove("no-game-on");
                } else {
                    conic2 += 0.5;
                    progressBarEqual.style.background = `radial-gradient(closest-side, #F0ECE5 89%, transparent 90% 100%),
                    conic-gradient(rgba(112, 54, 193, 1) ${conic2}%, #F0ECE5 0)`;
                }
            }

            interval2 = setInterval(progress2, 8);

            if (player == 1) {
                player = 2;
            } else {
                player = 1;
            }
        }
    }
}

const asFirst = () => {
    full = [
        false, false, false,
        false, false, false,
        false, false, false
    ];

    box.forEach(element => {
        element.classList.remove("winner");
        element.children[0].innerHTML = "";
        element.removeAttribute("played");
    });
}