const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/preguntar", async (req, res) => {

    const pregunta = req.body.pregunta;

    const respuesta = await client.responses.create({
        model: "gpt-5-mini",
        input: pregunta
    });

    res.json({
        respuesta: respuesta.output_text
    });

});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});