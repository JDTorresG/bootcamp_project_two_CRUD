// Primera parte: acceso al documento y programación de la configuración del formulario.

document.addEventListener('DOMContentLoaded', () => {
    drawGamesHTML();
    document.getElementById("formInventory").addEventListener('submit', (evento) => {
        evento.preventDefault();
        console.log("Información enviada correctamente.");

        let key = document.getElementById("key").value;
        let title = document.getElementById("title").value;
        let publisher = document.getElementById("publisher").value;
        let price = document.getElementById("price").value;
        let stock = document.getElementById("stock").value;

        if ( !key || !title || !publisher || !price || !stock) {
            alert("Por favor, es necesario llenar todos los campos.");
            return;
        }

        addGame({ key, title, publisher, price, stock });
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
};

const drawGamesHTML = () => {
    const tableBody = document.getElementById("bodyGamesTable");
    tableBody.innerHTML = "";
    const games = getGamesFromLocalStorage();

    games.forEach((game, indexGame) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${indexGame + 1}</td>
            <td>${game.key}</td>
            <td>${game.title}</td>
            <td>${game.publisher}</td>
            <td>${game.price}</td>
            <td>${game.stock}</td>
            <td class="text-center">
                <button onclick="eraseGame(${indexGame})" type="button" class="btn btn-danger mt-3">Eliminar</button>
                <button onclick="editGame(${indexGame})" type="button" class="btn btn-warning mt-3">Editar</button>
            </td>
            `;
        tableBody.appendChild(row);
    });
};

function editGame(index) {
    const games = getGamesFromLocalStorage();
    const game = games[index];
    document.getElementById("body").innerHTML = `
        <h2 class="text-center">Editar Juego</h2>
        <form id="formInventory">
            <div class="mb-3">
                <label for="newKey">Clave del producto</label>
                <input type="text" id="newKey" value="${game.key}" class="form-control">
            </div>
            <div class="mb-3">
                <label for="newTitle">Título</label>
                <input type="text" id="newTitle" value="${game.title}" class="form-control">
            </div>
            <div class="mb-3">
                <label for="newPublisher">Publisher</label>
                <input type="text" id="newPublisher" value="${game.publisher}" class="form-control">
            </div>
            <div class="mb-3">
                <label for="newPrice">Precio</label>
                <input type="number" id="newPrice" value="${game.price}" class="form-control">
            </div>
            <div class="mb-3">
                <label for="newStock">Stock</label>
                <input type="number" id="newStock" value="${game.stock}" class="form-control">
            </div>
            <button type="button" onclick="update(${index})" class="btn btn-success">Actualizar</button>
            <button type="button" onclick="principalView()" class="btn btn-primary">Cancelar</button>
        </form>
    `;
}

function update(index) {
    const games = getGamesFromLocalStorage();
    games[index] = {
        index: document.getElementById("newIndexGame").value,
        key: document.getElementById("newKey").value,
        title: document.getElementById("newTitle").value,
        publisher: document.getElementById("newPublisher").value,
        price: document.getElementById("newPrice").value,
        stock: document.getElementById("newStock").value,
    };
    localStorage.setItem("games", JSON.stringify(games));
    principalView();
    drawGamesHTML(); // Actualiza la tabla
}

function eraseGame(index) {
    let games = getGamesFromLocalStorage();
    games.splice(index, 1);
    localStorage.setItem("games", JSON.stringify(games));
    drawGamesHTML(); // Para actualizar la tabla
}


function principalView() {
    document.getElementById("body").innerHTML = `
    <div class="shadow-sm container-sm mb-4 border rounded-2">
        <header class="container text-center p-3 bg-black text-light">
            <div class="row align-items-center">
                <div class="col">
                    <img src="img/logo.png" height="70px" alt="logo">
                </div>
                <div class="col">
                    <h1>Game Store</h1>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary">Inciar sesión</button>
                </div>
            </div>
        </header>
        <main class="p-4">
            <h2 class="text-center p-2 mt-3">Agregar juego al inventario</h2>
            <form id="formInventory" class="shadow-sm p-3 mb-5 bg-body-tertiary border rounded-2">
                <div class="mb-3">
                    <label for="key" class="form-label">Clave del producto</label>
                    <input type="text" class="form-control" id="key">
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Título</label>
                    <input type="text" class="form-control" id="title">
                </div>
                <div class="mb-3">
                    <label for="publisher" class="form-label">Publisher</label>
                    <input type="text" class="form-control" id="publisher">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="price" >
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Existencias</label>
                    <input type="number" class="form-control" id="stock">
                </div>
                <button type="submit" class="btn btn-primary text-center">Agregar artículo</button>
            </form>
            <!-- Tabla para mostrar los datos almacenados en el LocalStorage -->
            <div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TÍTULO</th>
                                <th scope="col">PUBLISHER</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">EXISTENCIAS</th>
                                <th scope="col">OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody id="bodyGamesTable">
                            <!-- <tr>
                                <th scope="row">1</th>
                                <td>Tetris Story</td>
                                <td>The Tetris Company</td>
                                <td>$ 1,500.00</td>
                                <td>20</td>
                                <td>
                                    <button type="submit" class="btn btn-warning">Editar</button>
                                    <button type="submit" class="btn btn-danger">Borrar</button>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
        <footer class="bg-black">
            <hr class="border border-light border-3 opacity-50">
            <p class="text-center text-light p-3">© Game Store 2025. Todos los derechos reservados.</p>
        </footer>
    </div>
    `;

    drawGamesHTML(); 
}
