// Game setup
const gameBoard = document.getElementById('gameBoard');
const letters = ["A", "B", "C", "D", "E", "F", "G", "H",]
const cards = [...letters, ...letters]; // Duplicate letters to form pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Render the game board
function renderBoard() {
    gameBoard.innerHTML = ''; // Clear the board
    cards.forEach((letter, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;
        card.dataset.index = index;
        card.innerHTML = `<div class="front"></div><div class="back">${letter}</div>`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Handle card flipping
function flipCard(event) {
    const card = event.currentTarget;

    // Ignore clicks on already matched or flipped cards
    if (flippedCards.length === 2 || card.classList.contains('flipped') || matchedCards.includes(card.dataset.index)) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for matches
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.letter === card2.dataset.letter) {
        // Match found
        matchedCards.push(card1.dataset.index, card2.dataset.index);
        flippedCards = [];

        // Check if the game is over
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Congratulations! You found all pairs!'), 500);
        }
    } else {
        // No match, flip cards back after 1 second
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Initialize the game
renderBoard();