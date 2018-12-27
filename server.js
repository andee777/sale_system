var express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser')

const app = express()
const port = 3000

var dataP = fs.readFileSync('users.json');
var users = JSON.parse(dataP);
var dataI = fs.readFileSync('items.json');
var items = JSON.parse(dataI);
var dataC = fs.readFileSync('connections.json');
var connections = JSON.parse(dataC);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
  require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+ add);
  })
})

app.use(express.static('website'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/checkConnection', checkConnection);
function checkConnection(req, res) {
    if(connections[req.ip]) {
      console.log("reloaded");

      res.send(users[connections[req.ip].user].admin);
    }
    else {
      console.log(connections);
      res.send("not in yet");
    }

}
app.get('/logout', logout);
function logout(req, res) {
    console.log("logging out");
    delete connections[req.ip];
    console.log(connections);
    res.send("logged out");
}
app.get('/login/:username/:password', login);
function login(req, res) {
    if(users[req.params.username]) {
      if(users[req.params.username].password === req.params.password) {
        res.send(users[req.params.username].admin);
        connections[req.ip] =
        { user : req.params.username };
        fs.writeFile('./connections.json', JSON.stringify(connections), finished);
        function finished(err) {
          console.log(connections);
        }

      }
      else {
        res.send("password incorrect");
      }
    }
    else {
      console.log("no such user!")

      res.send("no such user!")
    }


}
app.get('/addItem/:itemName/:amount', addItem);
function addItem(req, res) {

    items[req.params.itemName] = req.params.amount;
    fs.writeFile('./items.json', JSON.stringify(items), finished);
    function finished(err) {
      console.log('all set. finished writing to table.json');
    }
    res.send("added");

}
app.get('/items', getItems);
function getItems(req, res) {

    //console.log(items);
    res.send(items);

}
