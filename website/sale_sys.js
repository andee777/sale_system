async function checkConnection() {
  let address = window.location.href + 'checkConnection';
  let response = await fetch(address);
  let res = await response.text();
  console.log(address);
  console.log(res);
  if (res == "true") {          //admin
    dashboard();
    document.getElementsByTagName('nav')[0].style.display = "";
    document.getElementById("sidebar1-container").style.display = "inline";
  }
  else if(res == "false") {     //client
    home();
    document.getElementsByTagName('nav')[0].style.display = "";

  }
  else {                        //not logged in
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("inventory-page").style.display = "none";
    document.getElementById("reports-page").style.display = "none";
    document.getElementById("login-page").style.display = "inline";
    document.getElementById("home-page").style.display = "none";
    document.getElementsByTagName('nav')[0].style.display = "none";
    document.getElementById("sidebar1-container").style.display = "none";
  }
}

async function login() {
  var username = document.getElementById("username").value;
  var psw = document.getElementById("psw").value;
  let address = window.location.href + 'login/' + username + "/" + psw;
  let response = await fetch(address);
  let res = await response.text();
  console.log(address);
  console.log(res);
  if (res) {
    document.getElementById("login-page").style.display = "none";
    checkConnection();
  }
  else { console.log(XX); }
}

async function logout() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
  document.getElementById("home-page").style.display = "none";

  document.getElementsByTagName('nav')[0].style.display = "none";
  document.getElementById("sidebar1-container").style.display = "none";
  let address = window.location.href + 'logout';
  console.log(address);
  let response = await fetch(address);
  let res = await response.text();
  console.log(res);
}

function dashboard() {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "none"
  document.getElementById("home-page").style.display = "none";
}

function home() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("home-page").style.display = "block";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";
}

function inventory() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("inventory-page").style.display = "block";
  document.getElementById("reports-page").style.display = "none";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("home-page").style.display = "none";

}

function reports() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("inventory-page").style.display = "none";
  document.getElementById("reports-page").style.display = "block";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("home-page").style.display = "none";

}

async function getItems() {
  var items;
  let address = window.location.href + 'items';
  let response = await fetch(address);
  let res = await response.json();
  items = JSON.parse(JSON.stringify(res));
  //console.log(JSON.stringify(items));
  //displaying table
  var str = "<table class=\"table table-striped table-sm\">";
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

async function addItem() {
  var frm = document.getElementById("form1");
  console.log(name);
  let address = window.location.href + "addItem/" + frm.elements[0].value + "/" + frm.elements[1].value;
  console.log(address);
  let response = await fetch(address);
  let res = await response.text();
  console.log(res);
  frm.reset();
  getItems();
}
