import express from "express";

const app = express();
const PORT = 3000;

// Med denne vises automatisk index.html i public mappa når man går til
// localhost:3000/
app.use(express.static("public"));


app.get("/", (req, res) => {
  console.log("morn");
  res.sendFile("beta.html", {root:"public"});
});

app.get("/om", (req, res) => {
  res.sendFile("om.html", {root:"public"});
});

app.listen(PORT, () => {
    console.log("Serveren kjører på http://localhost:3000")
});