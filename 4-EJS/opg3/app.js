import {hoyder} from "./data.js";

import express from "express";

const app = express();
// console.log(hoyder);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {hoyder})
});

app.listen(3000, () => {
    console.log("her http://localhost:3000");
})