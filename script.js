// set of variables created for the game grabbed from the DOM

let firstPlayerName = document.querySelector('.elements__heading_type_first-player');
let secondPlayerName = document.querySelector('.elements__heading_type_second-player');
let firstPlayerHealthBar = document.querySelector('.elements__health-bar_type_first-player');
let secondPlayerHealthBar = document.querySelector('.elements__health-bar_type_second-player');
let result = document.querySelector('.results__text');
let resetBtn = document.querySelector('.results__reset');
let attackBtnPlayerOne = document.querySelector('.elements__attack-button_type_first-player');
let repairBtnPlayerOne = document.querySelector('.elements__repair-button_type_first-player');
let attackBtnPlayerSecond = document.querySelector('.elements__attack-button_type_second-player');
let repairBtnPlayerSecond = document.querySelector('.elements__repair-button_type_second-player');
let log = document.querySelector('.results__log');

// function for updating the DOM with the names and current states of health of the players
const updateGame = (player1, player2, gameState) => {
    //grab the names, grab the health
    firstPlayerName.textContent = player1.name;
    secondPlayerName.textContent = player2.name;
    firstPlayerHealthBar.textContent = player1.health;
    secondPlayerHealthBar.textContent = player2.health;
    //if health is 0 the game is over
    if (player1.health <= 0 || player2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver;
        result.innerText = game.declareWinner(game.isOver, player1, player2);
        return gameState;
    }
}

class Player {
    constructor(name, health, attackingDamage) {
        this.name = name;
        this.health = health;
        this.attackingDamage = attackingDamage;
    }

    shoot (player, enemy, attackingDamage) {
        //random amount of damage 
        let damageAmount = Math.floor(Math.random() * 10);
        //count the damage that we need to substract from the health
        if (game.isOver === false) {
        enemy.health -= damageAmount;}
        //update the game after this move
        updateGame(player1, player2, game.isOver);
        //return the message with damage
        log.textContent = `${player.name} attacks ${enemy.name} for ${damageAmount} damage`;
    }

    repair (player) {
        let healAmount = Math.floor(Math.random() * 5);
        //the reaction of the health bar 
        if (player.health <= 95) {
        player.health += healAmount;}
        //update the game
        updateGame(player1, player2, game.isOver);
        //return the message with hp
        log.textContent = `${player.name} repaired for ${healAmount} hitpoints`;
    }

}

let player1 = new Player('Tiger', 100, 10);
let player2 = new Player('T34', 100, 10);



class Game {
    constructor() {
        this.isOver = false;
    }
    declareWinner(isOver, player1, player2) {
        let message;
        if (isOver === true && player1.health <= 0) {
            message = `${player2.name} WINS!`
        }
        else if (isOver === true && player2.health <= 0) {
            message = `${player1.name} WINS!`
        }
        return message;
    }

    reset(player1, player2) {
        player1.health = 100;
        player2.health = 100;
        this.isOver = false;
        result.textContent = "";
        updateGame(player1, player2);
    }
}

//create game
let game = new Game();

//initialize the game by calling updateGame
updateGame(player1, player2, game.isOver);

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'q' && player2.health > 0 && game.isOver === false) {
        player1.shoot(player1, player2, player1.attackingDamage);
    }
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'a' && player1.health > 0 && game.isOver === false) {
        player1.repair(player1);
    }
})

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'w' && player1.health > 0 && game.isOver === false) {
        player2.shoot(player2, player1, player2.attackingDamage);
    }
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 's' && player2.health > 0 && game.isOver === false) {
        player2.repair(player2);
    }
})

resetBtn.addEventListener('click', () => {game.reset(player1, player2)});
attackBtnPlayerOne.addEventListener('click', () => {player1.shoot(player1, player2, player1.attackingDamage)});
attackBtnPlayerSecond.addEventListener('click', () => {player2.shoot(player2, player1, player2.attackingDamage)});
repairBtnPlayerOne.addEventListener('click', () => {player1.repair(player1)});
repairBtnPlayerSecond.addEventListener('click', () => {player2.repair(player2)});


