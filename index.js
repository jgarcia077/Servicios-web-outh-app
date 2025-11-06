console.log("Mi primera app en express.js");
require("dotenv").config();
const express = require("express");
const { corsMiddleware } = require("./shared/middleware/cors");
const { testConnection } = require ("./Config/database");
const { syncModels } = require("./shared/models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(corsMiddleware);

//Inicializar base de datos
const initializeDatabase = async () => {
    await testConnection();
    await syncModels();
};


//http://localhost:3001/ tipo get
app.get("/", (req, res) => {
  res.json({
    message: "¡Hola,express funcionando con MySQL",
    timestamp: new Date().toISOString(),
    status: "Success",
    });
});

//login
//http:localhost:3001/
//http://localhost:3001/api/v1/
//http://localhost:3001/api/v1/auth/login metodo post

app.use('/api/v1', require('./routes/auth'));

//Iniciar el servidor
const startServer =async() => {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();