// Primera parte: acceso al documento y programación de la configuración del formulario.

document.addEventListener('DOMContentLoaded', () => {
    drawGamesHTML();
    document.getElementById("formInventory").addEventListener('submit', (evento) => {
        evento.preventDefault();
        console.log("Información enviada correctamente.");

        let title = document.getElementById("title").value;
        let publisher = document.getElementById("publisher").value;
        let price = document.getElementById("price").value;
        let stock = document.getElementById("stock").value;
        let indexGame = document.getElementById("indexGame").value;

        if (!title || !publisher || !price || !stock) {
            alert("Por favor, es necesario llenar todos los campos.");
            return;
        }

        addGame({title, publisher, price, stock});
        emptyForm();
    });
});


const getGamesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("games")) || [];
};

const updateGamesInLocalStorage = (game) => {
    let currentGames = getGamesFromLocalStorage();
    currentGames.push(game);
    localStorage.setItem("games", JSON.stringify(currentGames));
    drawGamesHTML();
};

const addGame = (game) => {
    updateGamesInLocalStorage(game);
};

const emptyForm = () => {
    document.getElementById("formInventory").reset();
    document.getElementById("indexGame").value = "";
};

const drawGamesHTML = () => {
    const tableBody = document.getElementById("bodyGamesTable");
    tableBody.innerHTML = "";
    const games = getGamesFromLocalStorage();

    games.forEach((game, indexArray) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${indexArray + 1}</td>
            <td>${game.title}</td>
            <td>${game.publisher}</td>
            <td>${game.price}</td>
            <td>${game.stock}</td>
            <td class="text-center">
                <button onclick="eraseGame(${indexArray})" type="button" class="btn btn-danger mt-3">Eliminar</button>
                <button onclick="editGame(${indexArray})" type="button" class="btn btn-warning mt-3">Editar</button>
            </td>
            `;
        tableBody.appendChild(row);
    });
};


