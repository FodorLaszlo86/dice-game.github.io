/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var players, roundScore, activePlayer, winningScore, isGameOver, prevRoll, currentRoll;



initGame();


  // ***********************************************//
 // *************** ROLL THE DICE *****************//
// ***********************************************//

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    //var dice = Math.floor(Math.random() * 2);
    var dice1DOM = document.querySelector('.dice-1');
    var dice2DOM = document.querySelector('.dice-2');
    

    // UPDATE THE DICE IMAGE BASED ON THE CURRENT ROLL
    // DISPLAY THE DICE// WHEN THE ROLL IS 1 ROUNDSORE WILL BE ZERO AND THE OTHER PLAYER COMES

    if(isGameOver === false) {
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        
    

        // WHEN THE ROLL IS 1 ROUNDSORE WILL BE ZERO AND THE OTHER PLAYER COMES
        if(dice1 !== 1 && dice2 !== 1) {
            // UPDATE THE PLAYERS CURRENT DICE ROLL
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();
        }
    }
})

console.log(prevRoll);


  // ******************************************************//
 // ************** SAVE SCORE TO THE TOTAL ***************//
// ******************************************************//

document.querySelector('.btn-hold').addEventListener('click', function() {

        //  Update the current player's total score
        players[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = players[activePlayer];

        // Check if player has won the game
        if(players[activePlayer] >= winningScore) {
            roundScore = 0;
            isGameOver = true;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            // Next player
            nextPlayer();
        }
})

  // ***********************************************//
 // ************** START A NEW GAME ***************//
// ***********************************************//

document.querySelector('.btn-new').addEventListener('click', initGame);

function nextPlayer() {
    roundScore = 0;
    prevRoll = 0;
    document.querySelector('#current-' + activePlayer).textContent = '0';
    
    // NEXT PLAYER WIT TERNARY OPERATOR
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active'
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

function initGame() {
    // RESET GAME CONTROL VALUES
    players = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = 100;
    isGameOver = false;

    // HIDE DICE FROM PANEL
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    // RESET DISPLAY
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.points').textContent = winningScore;
 }


 var inputElement = document.getElementById('user-rounds');
 inputElement.addEventListener('change', function(e) {
   winningScore = Number(e.target.value);
   console.log(winningScore);
   document.querySelector('.points').textContent = winningScore;
   e.target.value = '';
 }); 






 