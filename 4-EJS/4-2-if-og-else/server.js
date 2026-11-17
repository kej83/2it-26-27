import express from "express";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("<h1>Morn, prøv /vaer/-5 eller /vaer/10 osv. </h1>");
});

// Skriv f.eks. http://localhost:3000/vaer/15
app.get("/vaer/:grader", (req, res) => {
    let temp = Number(req.params.grader);
    // grader blir variabelnavnet i ejs, temp er verdien
    res.render("vaer", {grader: temp});
})

app.listen(3000, () => {
    console.log("her http://localhost:3000");
})