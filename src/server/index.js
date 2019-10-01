//this code allows us to run NODEMON from any directory within the project
require("dotenv").config({ path: __dirname + "/../../.env" });

const lc = require("./listController");

//require express
const express = require("express");

//Grab the server Port from the .env file
const { SERVER_PORT } = process.env;

//save the value of express invoked to APP
const app = express();

//use the built in express json translator
app.use(express.json());

//endpoints (only use nouns)
app.get("/api/list", lc.fullList);
//post
app.post("/api/list", lc.addItem);
//delete
app.delete("/api/list/:index", lc.deleteItem);
//put
app.put("/api/list", lc.editItem);

//set up the server to listen
app.listen(SERVER_PORT, () => {
  console.log(`His server... it's over ${SERVER_PORT}`);
});
