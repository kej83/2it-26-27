import express from "express";

const app = express();
const PORT = 3000;

// Main rute (route på engelsk)
app.get("/", (req, res) => {
  res.send("<h1>Velkommen!</h1><p>Dette er min andre Express-app.</p>");
});

// Ny rute: /om
app.get("/om", (req, res) => {
  res.send("<h2>Om oss</h2><p>Vi er et fett firma i Nannestad</p>");
});

// Opg: Lag ruten /kontakt
app.get("/kontakt", (req, res) => {
  res.send("<h2>Kontakt</h2><p>Finn oss på e-post jensern@nann.no</p>");
});

// Finn ut av det. TODO
app.use((req, res) => {
    res.status(404).send("<h1>404</h1><p> Siden ble ikke funnet. Mulige ruter er /om og /kontakt.</p>")
})

app.listen(PORT, () => {
    console.log("Serveren kjører på http://localhost:3000")
});