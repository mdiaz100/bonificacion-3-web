document.addEventListener("DOMContentLoaded", () => {
    let player1Selection = null;
    let player2Selection = null;

    const player1List = document.querySelectorAll("#choose-player1 li");
    const player2List = document.querySelectorAll("#choose-player2 li");

    const battleScreen = document.getElementById("battle-screen");
    const player1Img = document.getElementById("player1-img");
    const player2Img = document.getElementById("player2-img");

    // Cargar sonidos
    const selectSound = new Audio("./../sounds/select.mp3");
    const fightSound = new Audio("./../sounds/fight.mp3");

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
    }
});

