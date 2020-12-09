const { Router } = require('express');
const app = Router();
module.exports = app;

const { owner, correctPin } = require("../config");
const { error } = require("../modules/private");

app.get("/", (req, res) => {
  res.render("login/login", {owner});
})

app.post("/", (req, res) => {
  let {pin} = req.body;
  if (!pin) return error("No Credentials Provided", "You provided no cerdentials");

  if (pin !== correctPin) return error("Incorrect Credentials", "Your credentials provided are incorrect", res);

  res.cookie("auth", pin, {
    httpOnly: true
  });

  return res.redirect("..");
})