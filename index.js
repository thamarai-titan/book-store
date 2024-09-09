const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "thamarai";

const app = express();

const port = 3000;

app.use(express.json());

let users = [
  {
    username: "tm",
    password: "at",
  },
];

app.get("/", (req, res) => {});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Checking the user is already in the list

  const checkUser = users.find((user) => user.username === username);

  if (checkUser) {
    res.send("user already exists");
  } else {
    users.push({
      username: username,
      password: password,
    });
    res.send("new data");
  }
});
    app.post("/signin", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        const foundUser = users.find(user => user.username === username);

        if(!foundUser) {
            res.send("username is wrong");
        }
        if(foundUser.password != password){
            res.send("password is incorrect")
        }
        else{

            const token = jwt.sign({
                username: foundUser.username
            }, JWT_SECRET)

            res.header("jwt", token);

            res.send("signin successfull")
        }
    });

app.get("/details", (req, res) => {});

app.listen(port);
