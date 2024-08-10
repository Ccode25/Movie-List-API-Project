import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.render("index.html", {content: "Waiting for content" })
})


