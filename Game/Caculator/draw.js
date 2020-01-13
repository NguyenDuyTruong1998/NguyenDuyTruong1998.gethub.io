const ccl = document.getElementById("caculator");
const txt = document.getElementById("textarea");
var caculator;
var td;

(function drawAndSetup() {
  drawTable();
  setup();
  caculator = new caculator();
  caculator.showResult();
  writeText();

}());

// add envent click and block select
function setup() {
  td = document.getElementsByTagName("TD");
  var length = td.length;

  for (var i = 0; i < length; i++) {
    td[i].addEventListener("click",function() {
      var self = this;
      self.style.background = "lightgray";
      setTimeout(function() {
      	self.style.background = 'white';
      	document.getElementsByClassName("btn-equal")[0].style.background = "#eb8144";
      }, 125);
    });
  }
}

function writeText() {
  var length = td.length;
  for (var i = 0; i < length; i++) {
    td[i].addEventListener('click', function() {
      caculator.checkBtn(this.textContent);
      caculator.writeContent();
      //caculator.caculation();
    });
  };
}

function drawTable() {
  txtbutton  = "<div id='textarea' disabled><div id='content' disabled></div></div><div id='result'></div>";
  txtbutton += "<table id='table' class='noselect'>";
  txtbutton += "<tr><td class='btn-ac'>AC</td><td>⌫</td><td>÷</td><td>×</td></tr>";
  txtbutton += "<tr><td>7</td><td>8</td><td>9</td><td>-</td></tr>";
  txtbutton += "<tr><td>4</td><td>5</td><td>6</td><td>+</td></tr>";
  txtbutton += "<tr><td>1</td><td>2</td><td>3</td><td class='btn-equal' rowspan='2'>=</td></tr>";
  txtbutton += "<tr><td>%</td><td>0</td><td>.</td></tr>";
  txtbutton += "</table>";

  ccl.innerHTML = txtbutton;
}

// var ac = document.getElementsByClassName("btn-ac");
// console.log(ac[0].textContent);
