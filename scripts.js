// Primera parte: acceso al documento para obetener los datos del formulario.

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

        if (!key || !title || !publisher || !price || !stock) {
            alert("Por favor, es necesario llenar todos los campos.");
            return;
        }

        addGame({ key, title, publisher, price, stock });
        emptyForm();
    });
});

// SEGUNDA PARTE: Declaración de variables y arreglos principales de la aplicación.

const getGamesFromLocalStorage = () => { //Declaración de variable para obtener la información de los juegos desde el LocalStorage
    return JSON.parse(localStorage.getItem("games")) || [];
};

const updateGamesInLocalStorage = (game) => { //Delcaración de variable para actualizar la información de los juegos en la LocalStorage
    let currentGames = getGamesFromLocalStorage();
    currentGames.push(game);
    localStorage.setItem("games", JSON.stringify(currentGames));
    drawGamesHTML(); //Llama a la función que permite redibujar la tabla que muestra la información de los juegos.
};

const addGame = (game) => { //Declaración de variable para agregar un nuevo juego al LocalStorage
    updateGamesInLocalStorage(game);
};

const emptyForm = () => { //Declaración de variable para limpiar el formulario.
    document.getElementById("formInventory").reset();
};

const drawGamesHTML = () => { //Declaración y configuración de variable que dibuja la tabla en la pantalla.
    const tableBody = document.getElementById("bodyGamesTable");
    tableBody.innerHTML = "";
    const games = getGamesFromLocalStorage();

    games.forEach((game, indexGame) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="h-100 p-3">${indexGame + 1}</td>
            <td class="h-100 p-3">${game.key}</td>
            <td class="h-100 p-3">${game.title}</td>
            <td class="h-100 p-3">${game.publisher}</td>
            <td class="h-100 p-3">${game.price}</td>
            <td class="h-100 p-3">${game.stock}</td>
            <td class="position-relative h-100 p-2">
                <button onclick="eraseGame(${indexGame})" type="button" class="btn btn-danger">Eliminar</button>
                <button onclick="editGame(${indexGame})" type="button" class="btn btn-warning">Editar</button>
            </td>
            `;
        tableBody.appendChild(row);
    });
};

//TERCERA PARTE: Funciones de la aplicación

function editGame(index) { //Función para editar la información de los juegos almacenados en la LocalStorage
    const games = getGamesFromLocalStorage();
    const game = games[index];
    //Muestra el formulario para editar la información de la LocalStorage
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
    `
    ;
}

function update(index) { //Función del botón que guarda los cambios hechos en la información de la LocalStorage
    const games = getGamesFromLocalStorage();
    games[index] = {
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

function eraseGame(index) { //Función para borrar los datos de un juego almacenados en la LocalStorage
    let games = getGamesFromLocalStorage();
    games.splice(index, 1);
    localStorage.setItem("games", JSON.stringify(games));
    drawGamesHTML(); // Para actualizar la tabla
}

function principalView() { //Función para redibujar la página principal del inventario
    document.getElementById("body").innerHTML = `
    <div class="shadow-sm container-sm mb-4 border rounded-2">
        <header class="container text-center p-3 bg-black text-light">
            <div class="row align-items-center">
                <div class="col">
                    <img src="img/logo.png" height="70px" alt="logo">
                </div>
                <div class="col">
                    <h1>Super Gaming Store</h1>
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
                    <table class="table table-striped hide">
                        <thead>
                            <tr class="table-dark">
                                <th scope="col">#</th>
                                <th scope="col">CLAVE</th>
                                <th scope="col">TÍTULO</th>
                                <th scope="col">PUBLISHER</th>
                                <th scope="col">PRECIO</th>
                                <th scope="col">EXISTENCIAS</th>
                                <th scope="col">OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody id="bodyGamesTable">
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

    drawGamesHTML(); // Para actualizar la tabla
}
