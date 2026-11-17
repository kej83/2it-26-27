import express from "express";

const app = express();

// Ny linje for EJS
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // da må hilsen.ejs ligge i mappa views
    res.render("hilsen", {navn: "jens"});
})

app.listen(3000, () => {
    console.log("Serveren her: http://localhost:3000");
})