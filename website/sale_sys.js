function home() {
  document.getElementById("home-page").style.display = "inline";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";


}
function inventory() {

  document.getElementById("home-page").style.display = "none";
  document.getElementById("inventory-page").style.display = "inline";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";

}
function reports() {

  document.getElementById("home-page").style.display = "none";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "inline";
  document.getElementById("login-page").style.display = "none";

}
function logout() {
  document.getElementById("home-page").style.display = "none";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "inline";
  document.getElementById("reportsButton").style.display = "none";
  document.getElementById("inventoryButton").style.display = "none";
  document.getElementById("homeButton").style.display = "none";
  document.getElementById("logoutButton").style.display = "none";
  var xhttp = new XMLHttpRequest();
  var address = "logout";
  xhttp.open("GET", address, false);
  xhttp.send();
  var res= xhttp.responseText;
  console.log(res);
}
function checkConnection() {
  var xhttp = new XMLHttpRequest();
  var address = "checkConnection";
  xhttp.open("GET", address, false);
  xhttp.send();
  var res= xhttp.responseText;
  document.getElementById("login-page").style.display = "none";

  if (res == "true") {
    inventory();
    document.getElementById("reportsButton").style.display = "inline";
    document.getElementById("inventoryButton").style.display = "inline";
    document.getElementById("homeButton").style.display = "inline";
    document.getElementById("logoutButton").style.display = "inline";

  }
  else if(res == "false") {
    document.getElementById("homeButton").style.display = "inline";
    document.getElementById("logoutButton").style.display = "inline";

    home();
  }
  else {
    console.log(res);
    document.getElementById("login-page").style.display = "inline";

  }

}
function login() {

  var username = document.getElementById("username").value;
  var psw = document.getElementById("psw").value;
  var xhttp = new XMLHttpRequest();
  var address = "login/" + username + "/" + psw;
  xhttp.open("GET", address, false);
  xhttp.send();
  var res= xhttp.responseText;
  if (res == "true") {
    inventory();
    document.getElementById("reportsButton").style.display = "inline";
    document.getElementById("inventoryButton").style.display = "inline";
    document.getElementById("homeButton").style.display = "inline";
    document.getElementById("logoutButton").style.display = "inline";

  }
  else if(res == "false") {
    document.getElementById("homeButton").style.display = "inline";
    document.getElementById("logoutButton").style.display = "inline";

    home();
  }
  else {
    console.log(res);
  }

}

function getItems() {
  var items;
  var xhttp = new XMLHttpRequest();
  var address = "/items";
  xhttp.open("GET", address, false);
  xhttp.send();
  var res= (xhttp.responseText);
  items = JSON.parse(res);
  //console.log(JSON.stringify(table));

  //displaying table
  var str = "<table>";
  str += "<tr><b><td><b>item</b> </td><td><b> qty</b> </td></b></tr>";

  for( var x in items) {

    str += "<tr><td>" + x + "</td><td>" + items[x] + "</td></tr>";

  }
  // str += "<tr><td><input type=\"text\" id=\"itemName\"></td>"
  //         + "<td><input type=\"text\" id=\"itemAmt\"></td>"
  //         + "<td><input type=\"button\" value =\"add\" style=\"display: inline;\" onclick=\"addItem()\"></td></tr>";
  str += "</table>" ;
  document.getElementById("items").innerHTML = str;

  //  document.getElementById("items").innerHTML = JSON.stringify(items);

}


function addItem() {

  var frm = document.getElementById("form1");
  console.log(name);
  var xhttp = new XMLHttpRequest();
  var address = "addItem/" + frm.elements[0].value + "/" + frm.elements[1].value;
  xhttp.open("GET", address, false);
  xhttp.send();
  var res= xhttp.responseText;
  console.log(res);
  frm.reset();

}
