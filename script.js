let cells = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
}
let winnsCombinations = {
    1: [1, 4, 7],
    2: [1, 2, 3],
    3: [3, 6, 9],
    4: [7, 8, 9],
    5: [1, 5, 9],
    6: [4, 5, 6],
    7: [2, 5, 8],
    8: [3, 5, 7]
}
let allCells = document.querySelector('.game_display');
//flags
let isXmove = true;
let isThreeInARow = false;
let isTie = false;
let isinputWithKeyboardAndMouse = false;
let isOnePlayer = true;
let isComputer_O = true;
let isMoveOfComputer = true;
let isNewGame = true;
//messages
let message_winn_player = " won!";
let message_tie = "Tie!";
let message_with_results = document.querySelector(".message_with_results");
let message_with_results_tie = document.querySelector(".message_with_results_tie");
let count_of_moves_text_content = document.querySelector(".count_of_moves_text_content");
//scoreboard


let player_x = "Player (x)";
let player_o = "Player (o)";
let computer_x = "Computer (x)";
let computer_o = "Computer (o)";
let firstPlayer_x = "Player 1 (x)";
let secondPlayer_o = "Player 2 (o)";

let winnsPlayerX = 0;
let winnsPlayerO = 0;
let tie = 0;
let moveCount = 0;
//elements DOM
let firstScoreboard = document.getElementById("player_x");
let secondScoreboard = document.getElementById("player_o");
let scoreboard_player_x = document.querySelector("#player_x");
let scoreboard_player_o = document.querySelector("#player_o");
let scoreboard_player_x_content = document.querySelector(".player_x.content")
let scoreboard_player_o_content = document.querySelector(".player_o.content");
let scoreboard_tie_content = document.querySelector(".tie.content");

let endOfTheGame = document.querySelector(".endOfTheGame");

//input 
function inputWithKeyboard(event) {
    if (endOfTheGame.classList.contains("show_result") && event.code == "Enter") {
        (retry)();
        return false;
    }
    if (!isinputWithKeyboardAndMouse || isThreeInARow || endOfTheGame.classList.contains("show_result")) return false;
    if (isOnePlayer && isComputer_O && !isXmove || isOnePlayer && !isComputer_O && isXmove) return false;
    switch (event.code) {
        case "Numpad7":
            (move)(allCells.children[0], 1);
            clearHighlight();
            break;

        case "Numpad8":
            (move)(allCells.children[1], 2);
            clearHighlight();
            break;

        case "Numpad9":
            (move)(allCells.children[2], 3);
            clearHighlight();
            break;

        case "Numpad4":
            (move)(allCells.children[3], 4);
            clearHighlight();
            break;

        case "Numpad5":
            (move)(allCells.children[4], 5);
            clearHighlight();
            break;

        case "Numpad6":
            (move)(allCells.children[5], 6);
            clearHighlight();
            break;

        case "Numpad1":
            (move)(allCells.children[6], 7);
            clearHighlight();
            break;

        case "Numpad2":
            (move)(allCells.children[7], 8);
            clearHighlight();
            break;

        case "Numpad3":
            (move)(allCells.children[8], 9);
            clearHighlight();
            break;
    }

    if (event.code == "ArrowRight" || event.code == "ArrowLeft" ||
        event.code == "ArrowDown" || event.code == "ArrowUp" || event.code == "Enter"
    ) {
        if (!document.querySelector(".highlighted_cell")) {
            document.querySelector(".game_display").firstElementChild.classList.add("highlighted_cell");
        }
        let highlightedCell = document.querySelector(".highlighted_cell");
        switch (event.code) {
            case "ArrowRight":
                if (!highlightedCell.nextElementSibling) return false;

                highlightedCell.nextElementSibling.classList.add("highlighted_cell");
                highlightedCell.classList.remove("highlighted_cell");
                break;

            case "ArrowLeft":
                if (!highlightedCell.previousElementSibling) return false;

                highlightedCell.previousElementSibling.classList.add("highlighted_cell");
                highlightedCell.classList.remove("highlighted_cell");
                break;

            case "ArrowDown":
                let downCell = highlightedCell;;
                for (let i = 1; i < 4; i++) {
                    if (!downCell) return false;
                    downCell = downCell.nextElementSibling;
                }
                if (!downCell) return false;
                downCell.classList.add("highlighted_cell");
                highlightedCell.classList.remove("highlighted_cell");
                break;

            case "ArrowUp":
                let upCell = highlightedCell;;
                for (let i = 1; i < 4; i++) {
                    if (!upCell) return false;
                    upCell = upCell.previousElementSibling;
                }
                if (!upCell) return false;
                upCell.classList.add("highlighted_cell");
                highlightedCell.classList.remove("highlighted_cell");
                break;

            case "Enter":
                let j;
                for (j = 0; j <= allCells.children.length; j++) {
                    if (allCells.children[j].classList.contains("highlighted_cell")) {
                        j++;
                        break;
                    }
                }
                (move)(highlightedCell, j++);
                break;
        }
    }
}

function inputWithClick(event, key) {
    let cell = event.target;
    (move)(cell, key);
}

function move(cell, key) {
    if (endOfTheGame.classList.contains("show_result") || isThreeInARow) return false;
    if (isNewGame) {
        isNewGame = false;
    }
    if (cells[key] != 0) return false;
    (audioAfterClick)();

    if (isXmove) {          // x 
        cells[key] = 1;
        cell.classList.remove("highlighted_cell");
        cell.classList.add("x_move");
        (checkIsThreeInARow)();
        isXmove = false;
        if (scoreboard_player_o.classList.contains("current_move_player")) {
            scoreboard_player_o.classList.remove("current_move_player");
        }
        scoreboard_player_x.classList.toggle("current_move_player");

    } else {                // o
        cells[key] = 2;
        cell.classList.remove("highlighted_cell");
        cell.classList.add("null_move");

        (checkIsThreeInARow)();
        isXmove = true;
        if (scoreboard_player_x.classList.contains("current_move_player")) {
            scoreboard_player_x.classList.remove("current_move_player");
        }
        scoreboard_player_o.classList.toggle("current_move_player");
    }
    moveCount++;

    if (isThreeInARow) {
        (clearHighlight)();
        if (isXmove) {
            winnsPlayerO++;
            scoreboard_player_o_content.textContent = winnsPlayerO;
            isXmove = false;
        } else {
            winnsPlayerX++;
            scoreboard_player_x_content.textContent = winnsPlayerX;
            isXmove = true;
        }
        setTimeout(showResult, 1000, moveCount);
        return false;
    }
    if (isTie) return false;
    if (isOnePlayer && isMoveOfComputer) {
        setTimeout(playWithComputer, 500);
    }
    isMoveOfComputer = true;
}

function showResult(count) {
    endOfTheGame.classList.toggle("show_result");
    if (isTie) {
        document.querySelector(".message_with_results_tie").textContent = message_tie;
    } else if (!isXmove) {
        if (isOnePlayer && isComputer_O) {
            message_with_results.textContent = computer_o + message_winn_player;
        } else if (isOnePlayer && !isComputer_O) {
            message_with_results.textContent = player_o + message_winn_player;
        }
        if (!isOnePlayer) {
            message_with_results.textContent = secondPlayer_o + message_winn_player;
        }
    } else {
        if (isOnePlayer && isComputer_O) {
            message_with_results.textContent = player_x + message_winn_player;
        } else if (isOnePlayer && !isComputer_O) {
            message_with_results.textContent = computer_x + message_winn_player;
        }
        if (!isOnePlayer) {
            message_with_results.textContent = firstPlayer_x + message_winn_player;
        }
    }
    count_of_moves_text_content.textContent = count;
}

function retry() {
    (clearCells)();
    if (endOfTheGame.classList.contains("show_result")) {
        endOfTheGame.classList.toggle("show_result");
    }
    if (isOnePlayer) {
        if (!isComputer_O && isXmove || isComputer_O && !isXmove) {
            setTimeout(playWithComputer, 500);
        }
    }
    isMoveOfComputer = true;
}

function newGame() {
    (clearCells)();
    if (endOfTheGame.classList.contains("show_result")) {
        endOfTheGame.classList.toggle("show_result");
    }
    if (isOnePlayer) {
        if (isComputer_O) {
            isXmove = true;
        } else {
            isXmove = false;
        }
    } else {
        isXmove = true;
    }
    isMoveOfComputer = true;
    winnsPlayerX = 0;
    winnsPlayerO = 0;
    tie = 0;
    scoreboard_player_x_content.textContent = winnsPlayerX;
    scoreboard_player_o_content.textContent = winnsPlayerO;
    scoreboard_tie_content.textContent = tie;
    isNewGame = true;
}

function playWithComputer() {
    isMoveOfComputer = false;
    // CYCLE 1  
    for (let comb = 1; comb < 9; comb++) {
        let ourCombination = [];
        let valueOfCell;
        for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
            valueOfCell = winnsCombinations[comb][arrayNumber];
            ourCombination[arrayNumber] = cells[valueOfCell];
        }
        if (!ourCombination.includes(0)) continue;
        let countOfNull = 0;
        let sumOfCombination = 0;

        for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
            sumOfCombination += ourCombination[valueOfCombination];
            if (ourCombination[valueOfCombination] == 0) {
                countOfNull++;
            }
        }
        if (countOfNull == 1 && sumOfCombination == 2 && !isComputer_O) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        } else if (countOfNull == 1 && sumOfCombination == 4 && isComputer_O) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        }
    }
    // CYCLE 2  
    for (let comb = 1; comb < 9; comb++) {
        let ourCombination = [];
        let valueOfCell;
        for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
            valueOfCell = winnsCombinations[comb][arrayNumber];
            ourCombination[arrayNumber] = cells[valueOfCell];
        }
        if (!ourCombination.includes(0)) continue;
        let countOfNull = 0;
        let sumOfCombination = 0;

        for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
            sumOfCombination += ourCombination[valueOfCombination];
            if (ourCombination[valueOfCombination] == 0) {
                countOfNull++;
            }
        }
        if (countOfNull == 1 && sumOfCombination == 2 && isComputer_O) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        } else if (countOfNull == 1 && sumOfCombination == 4 && !isComputer_O) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        }
    }
    // CYCLE 3
    for (let comb = 1; comb < 9; comb++) {
        let ourCombination = [];
        let valueOfCell;
        for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
            valueOfCell = winnsCombinations[comb][arrayNumber];
            ourCombination[arrayNumber] = cells[valueOfCell];
        }
        if (!ourCombination.includes(0)) continue;
        let countOfNull = 0;
        let sumOfCombination = 0;

        for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
            sumOfCombination += ourCombination[valueOfCombination];
            if (ourCombination[valueOfCombination] == 0) {
                countOfNull++;
            }
        }
        if (countOfNull === 2) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        } else if (countOfNull === 3) {
            (findRandomNumber)(comb);
            (move)(allCells.children[randomCell - 1], randomCell);
            return false;
        }
    }
    //CYCLE 4
    for (let comb = 1; comb < 9; comb++) {
        let ourCombination = [];
        let valueOfCell;
        for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
            valueOfCell = winnsCombinations[comb][arrayNumber];
            ourCombination[arrayNumber] = cells[valueOfCell];
        }
        if (!ourCombination.includes(0)) continue;
        let countOfNull = 0;
        let sumOfCombination = 0;

        for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
            sumOfCombination += ourCombination[valueOfCombination];
            if (ourCombination[valueOfCombination] == 0) {
                countOfNull++;
            }
        }
        if (countOfNull === 1 || countOfNull === 2) {
            for (let valueOfCombination = 0; valueOfCombination < 3; valueOfCombination++) {
                if (ourCombination[valueOfCombination] == 0) {
                    let cell = winnsCombinations[comb][valueOfCombination];
                    (move)(allCells.children[cell - 1], cell);
                    return false;
                }
            }
        }
    }
}

function changePlayer(x) {
    if (!isNewGame) return false;
    switch (x) {
        case '2p':
            isOnePlayer = false;
            isMoveOfComputer = false;
            isXmove = true;
            if (document.querySelector(".select_mode_2players").classList.contains("inactiveMode")) {
                document.querySelector(".select_mode_2players").classList.remove("inactiveMode");
                document.querySelector(".select_mode_2players").classList.add("currentMode");

                document.querySelector(".select_mode_1player").classList.remove("currentMode");
                document.querySelector(".select_mode_1player").classList.add("inactiveMode");
            }
            firstScoreboard.textContent = firstPlayer_x;
            secondScoreboard.textContent = secondPlayer_o;
            break;
        case '1p':
            // document.querySelector("#select_x_or_o").classList.toggle("hidden_select_x_or_o"); 
            // document.querySelector("#select_x_or_o").classList.toggle("show_select_x_or_o");

            if (document.querySelector(".select_mode_1player").classList.contains("inactiveMode")) {
                document.querySelector(".select_mode_1player").classList.remove("inactiveMode");
                document.querySelector(".select_mode_1player").classList.add("currentMode");

                document.querySelector(".select_mode_2players").classList.remove("currentMode");
                document.querySelector(".select_mode_2players").classList.add("inactiveMode");
            }
            (selectXorO)("x");
            break;
    }
}

function selectXorO(select) {
    if (!isNewGame) return false;
    isOnePlayer = true;
    isMoveOfComputer = true;
    switch (select) {
        case 'x':
            isComputer_O = true;
            firstScoreboard.textContent = player_x;
            secondScoreboard.textContent = computer_o;
            break;
        case 'o':
            isComputer_O = false;
            firstScoreboard.textContent = computer_x;
            secondScoreboard.textContent = player_o;
            break;
    }
    (newGame)();
    document.querySelector("#select_x_or_o").classList.toggle("hidden_select_x_or_o");
    document.querySelector("#select_x_or_o").classList.toggle("show_select_x_or_o");
}

function modes(mode) {
    let twoModes = document.querySelector(".mode").children;
    for (let i = 0; i < 2; i++) {
        if (twoModes[i].classList.contains("currentMode")) {
            twoModes[i].classList.remove("currentMode");
        }
        twoModes[i].classList.add("inactiveMode");
    }
    if (mode == 1) {
        isinputWithKeyboardAndMouse = false;
        (clearHighlight)();
        twoModes[0].classList.remove("inactiveMode");
        twoModes[0].classList.add("currentMode");
    } else {
        isinputWithKeyboardAndMouse = true;
        twoModes[1].classList.remove("inactiveMode");
        twoModes[1].classList.add("currentMode");
    }
}

function clearHighlight() {
    for (j = 0; j < allCells.children.length; j++) {
        if (allCells.children[j].classList.contains("highlighted_cell")) {
            allCells.children[j].classList.remove("highlighted_cell");
        }
    }
}

function checkIsThreeInARow() {
    for (let comb = 1; comb < 9; comb++) {
        let ourCombination = []
        for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
            let numberOfCell = winnsCombinations[comb][arrayNumber];
            ourCombination[arrayNumber] = cells[numberOfCell];
        }
        if (ourCombination.includes(0)) continue;
        if (ourCombination[0] == ourCombination[1] && ourCombination[1] == ourCombination[2]) {
            for (let arrayNumber = 0; arrayNumber < 3; arrayNumber++) {
                let numberOfCell = winnsCombinations[comb][arrayNumber]
                allCells.children[numberOfCell - 1].classList.add("treeInARow");
            }
            isThreeInARow = true;
            return false;
        }
    }
    let filledCells = 0;
    for (var cell in cells) {

        if (cells[cell] != 0) {
            filledCells++;
        }
        if (filledCells == 9) {
            isTie = true;
            tie++;
            scoreboard_tie_content.textContent = tie;
            setTimeout(showResult, 500, moveCount);
        }
    }
}

function clearCells() {
    for (let i in cells) {
        cells[i] = 0;
    }
    for (let j = 0; j < allCells.children.length; j++) {
        if (allCells.children[j].classList.contains("x_move")) {
            allCells.children[j].classList.remove("x_move");
        }
        if (allCells.children[j].classList.contains("null_move")) {
            allCells.children[j].classList.remove("null_move");
        }
        if (allCells.children[j].classList.contains("highlighted_cell")) {
            allCells.children[j].classList.remove("highlighted_cell");
        }
        if (allCells.children[j].classList.contains("treeInARow")) {
            allCells.children[j].classList.remove("treeInARow");
        }
    }
    document.querySelector(".message_with_results_tie").textContent = "";
    document.querySelector(".message_with_results").textContent = "";

    isThreeInARow = false;
    isTie = false;
    moveCount = 0;
}

function findRandomNumber(comb) {
    return randomCell = winnsCombinations[comb][Math.floor(Math.random() * winnsCombinations[comb].length)]
}

function audioAfterClick() {
    let audioClick = new Audio;
    audioClick.src = "audio_click.mp3";
    audioClick.play();
}