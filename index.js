console.log("Starting program...");

const URL_API = "https://fakestoreapi.com";

const args = process.argv.slice(2);

//console.log("ARGS:", args);

const valid_args = ["GET", "POST", "DELETE"];

async function getAllProducts() {
    const response = await fetch(`${URL_API}/products`);

    if (!response.ok) {
        throw new Error("Error getting products");
    }

    const data = await response.json();
    console.log(data);
}

async function getOneProduct(id) {
    const response = await fetch(`${URL_API}/products/${id}`);

    if (!response.ok) {
        throw new Error("Error getting product " + id);
    }

    const data = await response.json();
    console.log(data);
}

async function createProduct(title, price, category) {
    const response = await fetch(`${URL_API}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            price,
            category
        })
    });

    if (!response.ok) {
        throw new Error("Error creating product");
    }

    const data = await response.json();

    console.log("Product created:");
    console.log(data);
}

async function deleteProduct(id) {
    const response = await fetch(`${URL_API}/products/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Error deleting product");
    }

    const data = await response.json();

    console.log("Product deleted:");
    console.log(data);
}

async function mainProgram() {

    const [method, route, ...data] = args;

    if (!valid_args.includes(method)) {
        console.log("Invalid command");
        return;
    }

    if (!route || !route.startsWith("products")) {
        console.log("Invalid route");
        return;
    }

    try {
        // GET products
        if (method === "GET" && route === "products") {
            await getAllProducts();
            return;
        }

        // GET products/5
        if (method === "GET" && route.startsWith("products/")) {

            const id = parseInt(route.split("/")[1]);

            if(isNaN(id)){
                throw new Error("ID must be a number");
            }

            await getOneProduct(id);
            return;
        }

        // POST products title price category
        if (method === "POST" && route === "products") {

            const [title, price, category] = data;

            if (!title || !price || !category) {
                throw new Error("Data missing");
            }

            if (!Number(price)) {
                throw new Error("Price must be a number");
            }

            await createProduct(title, price, category);

            return;
        }

        // DELETE products/5
        if (method === "DELETE" && route.startsWith("products/")) {

            const id = route.split("/")[1];
            if(!id){
                throw new Error("ID is necessary");
            }

            await deleteProduct(id);

            return;
        }

        console.log("Unrecognized command");

    } catch (error) {
        //console.log("Entra en este error")
        console.log("Error:", error.message);

    }
}

mainProgram();