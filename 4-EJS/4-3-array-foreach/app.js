import {handleliste} from "./data.js";
import express from "express";

const app = express();
// console.log(handleliste);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {handleliste})
});

app.listen(3000, () => {
    console.log("her http://localhost:3000");
})