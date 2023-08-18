// Symbols for the cards
let symbols = ['🦉', '🔮', '⚡', '🧙‍♂️', '🕊', '🪄', '🐍', '🏰'];

// Get the game board element
let gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedPairs = 0;
let isFlipping = false;

// Shuffle the symbols array randomly
function shuffleArray(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Create a card element with a symbol
function createCard(symbol) {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<div class="card-back">${symbol}</div><div class="card-front"><img src="/Users/youssef/Downloads/card-back.jpg"></div>`;
    return card;
}

// Create the game board with shuffled symbols
function createGameBoard() {
    let shuffledSymbols = shuffleArray(symbols.concat(symbols));

    for (let symbol of shuffledSymbols) {
        let card = createCard(symbol);
        gameBoard.appendChild(card);
        card.addEventListener('click', function () {
            flipCard(card);
        });
    }

    shuffleCards();
}

function shuffleCards() {
    let cards = Array.from(gameBoard.querySelectorAll('.card'));
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        gameBoard.appendChild(card);
        cards.splice(randomPosition, 0, card);
    });
}

function flipCard(card) {
    if (isFlipping || card.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards;
    let symbol1 = card1.querySelector('.card-back').textContent;
    let symbol2 = card2.querySelector('.card-back').textContent;

    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === symbols.length) {
            alert('Congratulations! You won the game!');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
    isFlipping = false;
}

// Call the function to create the game board
createGameBoard();
