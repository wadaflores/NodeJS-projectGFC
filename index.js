console.log("Program starting...");
import express from "express";
import productsRouter from "./src/routes/products.routes.js";
import router from "./src/routes/auth.routes.js";
import cors from "cors";
import 'dotenv/config';

const app = express();

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://example.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}); 

ESTO SE REEMPLAZA POR CORS:
*/
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === `http://localhost:${PORT}`){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Data received: ${req.method} ${req.url}`);
    next();
});

app.use("/api", productsRouter);
app.use("/auth", router)
app.get("/", (req, res) => {
    res.json({
        message: "NodeJS Project API is running 🚀",
        endpoints: [
            "Routes without auth:",
            "/api/products",
            "/api/products/PRODUCT_ID ex: init",
        ]
    });
});


app.use(function(req, res, next){
    res.status(404).send("Route not found")
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});