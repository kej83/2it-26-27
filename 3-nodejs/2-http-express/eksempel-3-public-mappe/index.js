import express from "express";

const app = express();
const PORT = 3000;

// Med denne vises automatisk index.html i public mappa når man går til
// localhost:3000/
app.use(express.static("public"));

// Main rute (route på engelsk)
// app.get("/", (req, res) => {
//   res.send("<h1>Velkommen!</h1><p>Dette er min andre Express-app.</p>");
// });

app.listen(PORT, () => {
    console.log("Serveren kjører på http://localhost:3000")
});