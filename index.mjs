import express from "express";
import bodyParser from "body-parser";
import request from "request";
import fs from "fs";
import path from "path";

const __dirname = fs.realpathSync(".");

// Set up the express app
const app = express();

//Adicionando pacotes express
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//retorna dados requisitados
app.get("/get", async (req, res) => {
  request(GetUrl("GET", req.query.path), function(error, response, body) {
    res.json(response.body);
  });
});

//salva dados enviados
app.post("/post", (req, res) => {
  request(GetUrl("POST", req.query.path, req.body), function(
    error,
    response,
    body
  ) {
    res.json(response.body);
  });
});

const PORT = 5000;

//inicia servidor
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

//Retorna url do request
function GetUrl(method, path, data = null) {
  var options = {
    method: method,
    uri: "https://api.mundipagg.com/core/v1/" + path,
    headers: {
      Authorization:
        "Basic " + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString("base64"),
      "Content-Type": "application/json"
    },
    json: data
  };

  return options;
}
