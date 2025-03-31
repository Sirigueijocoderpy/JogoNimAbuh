document.getElementById('startButton').addEventListener('click', showInputs);
document.getElementById('startGameButton').addEventListener('click', startGame);

function showInputs() {
    document.getElementById('inputs').style.display = 'block';
}

function startGame() {
    const mode = document.getElementById('mode').value.toLowerCase();
    const pieces = parseInt(document.getElementById('pieces').value);
    const limit = parseInt(document.getElementById('limit').value);
    const gameInfo = document.getElementById('gameInfo');

    gameInfo.innerHTML = ""; // Limpa mensagens anteriores

    if (mode !== 'partida' && mode !== 'campeonato') {
        alert('Modo de jogo inválido! Insira "Partida" ou "Campeonato".');
        return;
    }

    if (pieces <= 0 || limit <= 0) {
        alert('Insira um número válido de peças e limite.');
        return;
    }

    if (mode === 'partida') {
        startRound(pieces, limit);
    } else if (mode === 'campeonato') {
        startChampionship();
    }
}

function startRound(pieces, limit) {
    let gameInfo = document.getElementById('gameInfo');
    gameInfo.innerHTML = `<p>Iniciando uma nova rodada com ${pieces} peças.</p>`;

    // O computador decide quem começa
    let currentPlayer = (pieces % (limit + 1) === 0) ? 'Computador' : 'Você';

    if (currentPlayer === 'Computador') {
        gameInfo.innerHTML += `<p>O Computador escolheu começar!</p>`;
    } else {
        gameInfo.innerHTML += `<p>O Computador escolheu que você comece!</p>`;
    }

    gameLoop(pieces, limit, currentPlayer);
}

function gameLoop(pieces, limit, currentPlayer) {
    let gameInfo = document.getElementById('gameInfo');
    let currentMove;

    function nextMove() {
        if (pieces <= 0) {
            gameInfo.innerHTML += `<p><strong>Fim de jogo! ${currentPlayer === 'Computador' ? 'Você' : 'O computador'} ganhou!</strong></p>`;
            return;
        }

        if (currentPlayer === 'Computador') {
            currentMove = computerMove(pieces, limit);
            pieces -= currentMove;
            gameInfo.innerHTML += `<p>O computador tirou ${currentMove} peça(s).</p>`;
            currentPlayer = 'Você';
        } else {
            userMove(pieces, limit).then(move => {
                pieces -= move;
                gameInfo.innerHTML += `<p>Você tirou ${move} peça(s).</p>`;
                currentPlayer = 'Computador';
                nextMove(); // Chama a próxima jogada
            });
            return; // Para evitar continuar o fluxo antes da jogada do usuário
        }

        gameInfo.innerHTML += `<p>Restam ${pieces} peças no tabuleiro.</p>`;
        
        setTimeout(nextMove, 1000); // Aguarda 1 segundo antes da próxima jogada
    }

    nextMove();
}

function computerMove(pieces, limit) {
    // Estratégia: sempre que possível, fazer com que o número de peças restantes seja um múltiplo de (limite + 1)
    for (let i = 1; i <= limit; i++) {
        if ((pieces - i) % (limit + 1) === 0) {
            return i;
        }
    }

    // Se não for possível, joga o máximo permitido
    return Math.min(limit, pieces);
}

function userMove(pieces, limit) {
    return new Promise(resolve => {
        let move;
        while (true) {
            move = parseInt(prompt(`Quantas peças você vai tirar? (máximo ${Math.min(limit, pieces)})`));

            if (move > 0 && move <= Math.min(limit, pieces)) {
                resolve(move);
                break;
            } else {
                alert(`Jogada inválida! Você deve tirar entre 1 e ${Math.min(limit, pieces)} peças.`);
            }
        }
    });
}

function startChampionship() {
    let round = 1;
    let userScore = 0;
    let computerScore = 0;
    const gameInfo = document.getElementById('gameInfo');
    
    gameInfo.innerHTML = "<p>Iniciando campeonato...</p>";

    function playNextRound() {
        if (round > 3) {
            gameInfo.innerHTML += `<p><strong>Fim do campeonato! Placar final: Você ${userScore} x ${computerScore} Computador.</strong></p>`;
            return;
        }

        gameInfo.innerHTML += `<p>Rodada ${round}:</p>`;
        //eu//
        //adoro//
        //pintar//
        //o//
        //cabelo//

        startRound(10, 3); // Exemplo: 10 peças e limite de 3gfdsa

        setTimeout(() => {
            let winner = (10 % (3 + 1) === 0) ? 'Usuário' : 'Computador';
            if (winner === 'Computador') {
                computerScore++;
            } else {
                userScore++;
            }

            round++;
            playNextRound();
        }, 5000);
    }

    playNextRound();
    //abuh//
}