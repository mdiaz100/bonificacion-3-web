document.addEventListener("DOMContentLoaded", () => {
    let player1Selection = null;
    let player2Selection = null;
    let player1Health = 20;
    let player2Health = 20;
    let turnoJugador1 = true; // Comienza el Jugador 1

    const player1List = document.querySelectorAll("#choose-player1 li");
    const player2List = document.querySelectorAll("#choose-player2 li");

    const battleScreen = document.getElementById("battle-screen");
    const player1Img = document.getElementById("player1-img");
    const player2Img = document.getElementById("player2-img");

    // Botones
    const fightButton = document.getElementById("fight-button");
    const backToMenuButton = document.getElementById("back-to-menu");

    // Cargar sonidos; funcionalidad a futuro
    const selectSound = new Audio("./../sounds/select.mp3");
    const fightSound = new Audio("./../sounds/fight.mp3");
    const hitSound = new Audio("./../sounds/hit.mp3"); // Sonido de golpe

    // Función para seleccionar un personaje
    function selectCharacter(player, characterName, listItems, playerNumber) {
        selectSound.play();

        // Quitar selección previa
        listItems.forEach(item => item.classList.remove("selected"));

        // Marcar nuevo personaje
        player.textContent = characterName;
        event.target.classList.add("selected");

        // Guardar selección en la variable correcta
        if (playerNumber === 1) {
            player1Selection = characterName;
        } else {
            player2Selection = characterName;
        }

        // Verificar si ambos jugadores han elegido
        if (player1Selection && player2Selection) {
            setTimeout(startFight, 1000);
        }
    }

    player1List.forEach(item => {
        item.addEventListener("click", (event) => {
            selectCharacter(document.querySelector("#choose-player1 h2"), event.target.textContent, player1List, 1);
        });
    });

    player2List.forEach(item => {
        item.addEventListener("click", (event) => {
            selectCharacter(document.querySelector("#choose-player2 h2"), event.target.textContent, player2List, 2);
        });
    });

    function startFight() {
        fightSound.play();

        // Ocultar selección de personajes y mostrar la pantalla de pelea
        document.querySelector("main").classList.add("hidden");
        battleScreen.classList.remove("hidden");

        // Asignar imágenes a los personajes seleccionados
        player1Img.src = `./../images/${player1Selection.toLowerCase()}.png`;
        player2Img.src = `./../images/${player2Selection.toLowerCase()}.png`;

        // Reiniciar la vida y los turnos
        player1Health = 20;
        player2Health = 20;
        turnoJugador1 = true; // Reiniciar turno para que Player 1 comience
    }

    function attack() {
        if (player1Health <= 0 || player2Health <= 0) return; // Detener si ya hay un ganador

        let damage = Math.floor(Math.random() * 10) + 1;
        hitSound.play(); // Sonido de golpe

        if (turnoJugador1) {
            player2Health -= damage;
            alert(`${player1Selection} ataca a ${player2Selection} y le quita ${damage} de vida. Vida restante: ${player2Health}`);
        } else {
            player1Health -= damage;
            alert(`${player2Selection} ataca a ${player1Selection} y le quita ${damage} de vida. Vida restante: ${player1Health}`);
        }

        // Verificar si alguien ha ganado
        if (player1Health <= 0) {
            alert(`${player2Selection} es el ganador!`);
            resetGame();
            return;
        } else if (player2Health <= 0) {
            alert(`${player1Selection} es el ganador!`);
            resetGame();
            return;
        }

        // Alternar turno
        turnoJugador1 = !turnoJugador1;
    }

    function resetGame() {
        document.getElementById("battle-screen").classList.add("hidden");
        document.querySelector("main").classList.remove("hidden");

        // Reiniciar selección de personajes
        document.querySelectorAll("ul li").forEach(li => li.classList.remove("selected"));

        // Resetear valores
        player1Selection = null;
        player2Selection = null;
        player1Health = 20;
        player2Health = 20;
        turnoJugador1 = true;
    }

    // Eventos de los botones
    fightButton.addEventListener("click", attack);
    backToMenuButton.addEventListener("click", resetGame);
});



