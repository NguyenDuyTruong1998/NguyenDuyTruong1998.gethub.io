function drawBoardGame() {
  var boardGame = "<table>";
  for (i = 0; i < 20; i++) {
    boardGame += "<tr>";
    for (j = 0; j < 10; j++) {
      boardGame += "<td></td>";
    }
    boardGame += "</tr>";
  }
  boardGame += "</table";
  document.getElementById("js-boadrGame").innerHTML = boardGame;
};
function drawMiniBroad() { // display next board
  var miniBroad = "<table>";
  miniBroad += "<tr><td></td><td></td><td></td><td></td></tr>";
  miniBroad += "<tr><td></td><td></td><td></td><td></td></tr>";
  miniBroad += "<tr><td></td><td></td><td></td><td></td></tr>";
  miniBroad += "<tr><td></td><td></td><td></td><td></td></tr>";
  miniBroad += "</table>";
  document.getElementById("next-brick").innerHTML = miniBroad;
}
function disabledButton() {
  document.getElementById("js-button-start").disabled = true;
  document.getElementById('start').style.opacity = 0;
  document.getElementById('start').style.top = '-100px';
}
drawBoardGame();
drawMiniBroad();
var gameBrick = function() {
  this.start = false;
  this.arrayBoardGame = [];
  this.tdElement      = document.getElementsByTagName("TD");
  this.xDefault       = 1;
  this.yDefault       = 5;
  this.scores         = 0;
  this.currenBrick    = "";
  this.statusGame     = "";
  this.brickStatus    = "default";
  this.arrayNextBrick = [];
  this.nextBrick      = -1;
};

gameBrick.prototype.createArrayBoardGame = function() {
  var self = this;
  for (i = 0; i < 20; i++) {
    self.arrayBoardGame[i] = [0,0,0,0,0,0,0,0,0,0];
  }
  return self.arrayBoardGame; // FIXME
};

gameBrick.prototype.getPosition = function(i,j){
  return i * 10 + j; 
};

gameBrick.prototype.loadAll = function(){
  var self = this;
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 10; j++) {
      if (self.arrayBoardGame[i][j] === 0)
        self.tdElement[self.getPosition(i,j)].className = "";
      else
        self.tdElement[self.getPosition(i,j)].className = "icon-x";
    }
    // const total = self.arrayBoardGame[i].reduce( (accumulator, currentValue) => accumulator + currentValue);
  }
  if (self.statusGame === "")
    setTimeout(function(){game.loadAll()}, 125);
  else {
        setTimeout(function(){
      document.getElementById('start').innerHTML     = '<h1>Game Over</h1><br>Scores: ' + game.scores;
      document.getElementById('start').style.top     = '40%';
      document.getElementById('start').style.opacity = '1';
      document.getElementById('start').style.color   = 'red';
    },100);
  }
};
/**
 * FIXME
 */
gameBrick.prototype.reloadAll = function(){
  var self = this;
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 10; j++) {
      if (self.arrayBoardGame[i][j] != 2)
        self.arrayBoardGame[i][j] = 0;
    }
  }
};

/**
 * Create birck square and set value;
 */
gameBrick.prototype.brickSquare = function(valueBlock) {
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
}

gameBrick.prototype.moveBrickSquare = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if (self.arrayBoardGame[self.xDefault+1][self.yDefault] === 2 || self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2) {
      self.reloadAll();
      self.brickSquare(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickSquare(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickSquare(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick();
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftSquare = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[self.xDefault][self.yDefault-2] != 2 && self.arrayBoardGame[self.xDefault-1][self.yDefault-2] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickSquare(1);
  }
};

gameBrick.prototype.moveRightSquare = function(){
  var self = this;
  if (self.yDefault < 9 && self.arrayBoardGame[self.xDefault][self.yDefault+1] != 2 && self.arrayBoardGame[self.xDefault-1][self.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickSquare(1);
  }
};
// ------------------------------------------------------------------------------------
gameBrick.prototype.brickTank = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveBrickTank = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+1][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2) {
      self.reloadAll();
      self.brickTank(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickTank(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickTank(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick();
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftTank = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault][this.yDefault-2] != 2 && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickTank(1);
  }
};

gameBrick.prototype.moveRightTank = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2 && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickTank(1);
  }
};
// -----------------------------------------------------------------
gameBrick.prototype.tankTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveTankTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault]   === 2 || self.arrayBoardGame[self.xDefault+1][self.yDefault+1]   === 2) {
      self.reloadAll();
      self.tankTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.tankTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.tankTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick();
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftTankTypeTwo = function(){
  var self = this;
  if (self.yDefault > 0 && self.arrayBoardGame[this.xDefault][this.yDefault-1] != 2 && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2 && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.tankTypeTwo(1);
  }
};

gameBrick.prototype.moveRightTankTypeTwo = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2 && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2 && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.tankTypeTwo(1);
  }
};

// -----------------------------------------------------------------
gameBrick.prototype.tankTypeFour = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
};

gameBrick.prototype.moveTankTypeFour = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault]   === 2 || self.arrayBoardGame[self.xDefault+1][self.yDefault-1]   === 2) {
      self.reloadAll();
      self.tankTypeFour(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.tankTypeFour(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.tankTypeFour(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick();
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftTankTypeFour = function(){
  var self = this;
  if (self.yDefault > 1
      && self.arrayBoardGame[this.xDefault][this.yDefault-2]   != 2
      && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
      && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.tankTypeFour(1);
  }
};

gameBrick.prototype.moveRightTankTypeFour = function(){
  var self = this;
  if (self.yDefault < 9
    && self.arrayBoardGame[this.xDefault][this.yDefault+1]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.tankTypeFour(1);
  }
};

gameBrick.prototype.tankTypeThree = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveTankTypeThree = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+1][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault-1] === 2) {
      self.reloadAll();
      self.tankTypeThree(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.tankTypeThree(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.tankTypeThree(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick();
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftTankTypeThree = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2 && self.arrayBoardGame[this.xDefault][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.tankTypeThree(1);
  }
};

gameBrick.prototype.moveRightTankTypeThree = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault-1][this.yDefault+2] != 2 && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.tankTypeThree(1);
  }
};

gameBrick.prototype.brickZicZac = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
};

gameBrick.prototype.moveBrickZicZac = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2) {
      self.reloadAll();
      self.brickZicZac(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickZicZac(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickZicZac(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftZicZac = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault][this.yDefault-2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickZicZac(1);
  }
};

gameBrick.prototype.moveRightZicZac = function(){
  var self = this;
  if (self.yDefault < 9 && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickZicZac(1);
  }
};

gameBrick.prototype.brickZicZacTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault]     = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveBrickZicZacTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
      if ( self.arrayBoardGame[self.xDefault+1][self.yDefault] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault+1]   === 2) {
      self.reloadAll();
      self.brickZicZacTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickZicZacTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickZicZacTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftZicZacTypeTwo = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault][this.yDefault-2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickZicZacTypeTwo(1);
  }
};

gameBrick.prototype.moveRightZicZacTypeTwo = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+2] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickZicZacTypeTwo(1);
  }
};


//--------
gameBrick.prototype.brickZicZacRight = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
};

gameBrick.prototype.moveBrickZicZacRight = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2) {
      self.reloadAll();
      self.brickZicZacRight(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[0][6] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickZicZacRight(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickZicZacRight(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftZicZacRight = function(){
  var self = this;
  if (self.yDefault > 0 && self.arrayBoardGame[this.xDefault][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickZicZacRight(1);
  }
};

gameBrick.prototype.moveRightZicZacRight = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickZicZacRight(1);
  }
};

//--------
gameBrick.prototype.brickZicZacRightTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveBrickZicZacRightTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+1][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault-1]   === 2) {
      self.reloadAll();
      self.brickZicZacRightTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickZicZacRightTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickZicZacRightTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftZicZacRightTypeTwo = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickZicZacRightTypeTwo(1);
  }
};

gameBrick.prototype.moveRightZicZacRightTypeTwo = function(){
  var self = this;
  if (self.yDefault < 8 && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickZicZacRightTypeTwo(1);
  }
};

gameBrick.prototype.brickRow = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+2] = valueBlock;
};

gameBrick.prototype.moveBrickRow = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 20) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault+2] === 2) {
      self.reloadAll();
      self.brickRow(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[0][6] != 2 && self.arrayBoardGame[0][4] != 2 && self.arrayBoardGame[0][7] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickRow(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 20) {
    self.reloadAll();
    self.brickRow(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftRow = function(){
  var self = this;
  if (self.yDefault > 1 && self.arrayBoardGame[this.xDefault][this.yDefault-2] != 2)
  {
    self.yDefault--;
    self.reloadAll();
    self.brickRow(1);
  }
};

gameBrick.prototype.moveRightRow = function(){
  var self = this;
  if (self.yDefault < 7 && self.arrayBoardGame[this.xDefault][this.yDefault+3] != 2)
  {
    self.yDefault++;
    self.reloadAll();
    self.brickRow(1);
  }
};

//----
gameBrick.prototype.brickRowTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+2][self.yDefault] = valueBlock;
};

gameBrick.prototype.moveBrickRowTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 17) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+3][self.yDefault] === 2) {
      self.reloadAll();
      self.brickRowTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[3][5] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickRowTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 17) {
    self.reloadAll();
    self.brickRowTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftRowTypeTwo = function(){
  var self = this;
  if (
    self.yDefault > 0
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault+2][this.yDefault-1] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickRowTypeTwo(1);
  }
};

gameBrick.prototype.moveRightRowTypeTwo = function(){
  var self = this;
  if (
    self.yDefault < 9
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault+2][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickRowTypeTwo(1);
  }
};
//----
gameBrick.prototype.brickLLeft = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
};

gameBrick.prototype.moveBrickLLeft = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2) {
      self.reloadAll();
      self.brickLLeft(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[1][4] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[0][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLLeft(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickLLeft(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLLeft = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault][this.yDefault-2]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLLeft(1);
  }
};

gameBrick.prototype.moveRightLLeft = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault][this.yDefault+2]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLLeft(1);
  }
};

//----
gameBrick.prototype.brickLLeftTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
};

gameBrick.prototype.moveBrickLLeftTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault+2][self.yDefault] === 2
      )
    {
      self.reloadAll();
      self.brickLLeftTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[0][6] != 2 && self.arrayBoardGame[2][5] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLLeftTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickLLeftTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLLeftTypeTwo = function(){
  var self = this;
  if (
    self.yDefault > 0
    && self.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLLeftTypeTwo(1);
  }
};

gameBrick.prototype.moveRightLLeftTypeTwo = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLLeftTypeTwo(1);
  }
};

gameBrick.prototype.brickLLeftTypeThree = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1] = valueBlock;
};

gameBrick.prototype.moveBrickLLeftTypeThree = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault][self.yDefault] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2
      )
    {
      self.reloadAll();
      self.brickLLeftTypeThree(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[0][4] != 2 && self.arrayBoardGame[0][6] != 2 && self.arrayBoardGame[1][6] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLLeftTypeThree(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickLLeftTypeThree(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLLeftTypeThree = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault][this.yDefault-2]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLLeftTypeThree(1);
  }
};

gameBrick.prototype.moveRightLLeftTypeThree = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+2] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLLeftTypeThree(1);
  }
};

gameBrick.prototype.brickLLeftTypeFour = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault-1] = valueBlock;
};

gameBrick.prototype.moveBrickLLeftTypeFour = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault] === 2
      || self.arrayBoardGame[self.xDefault+2][self.yDefault-1] === 2
      )
    {
      self.reloadAll();
      self.brickLLeftTypeFour(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[2][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLLeftTypeFour(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickLLeftTypeFour(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLLeftTypeFour = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-2] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLLeftTypeFour(1);
  }
};

gameBrick.prototype.moveRightLLeftTypeFour = function(){
  var self = this;
  if (self.yDefault < 9
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLLeftTypeFour(1);
  }
};


//FIXME
gameBrick.prototype.brickLRight = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault+1]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1] = valueBlock;
};
gameBrick.prototype.moveBrickLRight = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault]   === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault+1] === 2) {
      self.reloadAll();
      self.brickLRight(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[1][4] != 2 && self.arrayBoardGame[1][6] != 2 && self.arrayBoardGame[0][6] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLRight(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickLRight(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLRight = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault][this.yDefault-2]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLRight(1);
  }
};

gameBrick.prototype.moveRightLRight = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault][this.yDefault+2]   != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+2] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLRight(1);
  }
};
//---------
gameBrick.prototype.brickLRightTypeTwo = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault+1] = valueBlock;
};
gameBrick.prototype.moveBrickLRightTypeTwo = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault+2][self.yDefault]   === 2) {
      self.reloadAll();
      self.brickLRightTypeTwo(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[2][6] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLRightTypeTwo(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickLRightTypeTwo(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLRightTypeTwo = function(){
  var self = this;
  if (
    self.yDefault > 0
    && self.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLRightTypeTwo(1);
  }
};

gameBrick.prototype.moveRightLRightTypeTwo = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault][this.yDefault+1]   != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+2] != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLRightTypeTwo(1);
  }
};

gameBrick.prototype.brickLRightTypeThree = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]     = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault+1]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1]   = valueBlock;
  self.arrayBoardGame[self.xDefault][self.yDefault-1] = valueBlock;
};
gameBrick.prototype.moveBrickLRightTypeThree = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 19) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault][self.yDefault] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault+1] === 2
      || self.arrayBoardGame[self.xDefault+1][self.yDefault-1] === 2
      ) {
      self.reloadAll();
      self.brickLRightTypeThree(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[0][4] != 2 && self.arrayBoardGame[0][6] != 2 && self.arrayBoardGame[1][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLRightTypeThree(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 19) {
    self.reloadAll();
    self.brickLRightTypeThree(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLRightTypeThree = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault-2] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLRightTypeThree(1);
  }
};

gameBrick.prototype.moveRightLRightTypeThree = function(){
  var self = this;
  if (self.yDefault < 8
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+2]   != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault] != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLRightTypeThree(1);
  }
};
//--------------------
gameBrick.prototype.brickLRightTypeFour = function(valueBlock){
  var self = this;
  self.arrayBoardGame[self.xDefault][self.yDefault]     = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault]   = valueBlock;
  self.arrayBoardGame[self.xDefault-1][self.yDefault-1]   = valueBlock;
  self.arrayBoardGame[self.xDefault+1][self.yDefault] = valueBlock;
};
gameBrick.prototype.moveBrickLRightTypeFour = function(){
  var self = this;
  // Nếu tâm điểm không nằm ở dòng cuối xùng.
  if (self.xDefault < 18) {
    //Nếu 2 điểm tiếp theo dịch chuyển tới khác 2, tức là đã có khối khoá ở đó.
    if ( self.arrayBoardGame[self.xDefault+2][self.yDefault] === 2
      || self.arrayBoardGame[self.xDefault][self.yDefault-1] === 2
      ) {
      self.reloadAll();
      self.brickLRightTypeFour(2);
      self.checkWin();
      self.xDefault = 1;
      self.yDefault = 5;
      // nếu điểm gốc sinh ra brick chưa có block nào.
      if (self.arrayBoardGame[0][5] != 2 && self.arrayBoardGame[1][5] != 2 && self.arrayBoardGame[2][5] != 2 && self.arrayBoardGame[0][4] != 2)
        self.createBrick();
      else
        self.statusGame = "Game Over";
      //  // FIXME
    } else { // chưa có thì di chuyển xuống dưới.
      self.reloadAll();
      self.brickLRightTypeFour(1);
      self.xDefault++;
    }
    // Ngược lại, nếu tâm điểm nằm ở dòng cuối cùng.
  } else if (self.xDefault === 18) {
    self.reloadAll();
    self.brickLRightTypeFour(2);
    self.checkWin();
    self.xDefault = 1;
    self.yDefault = 5;
    self.createBrick(); // create random brick
    //  // FIXME
  }
};

gameBrick.prototype.moveLeftLRightTypeFour = function(){
  var self = this;
  if (
    self.yDefault > 1
    && self.arrayBoardGame[this.xDefault-1][this.yDefault-2] != 2
    && self.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
    )
  {
    self.yDefault--;
    self.reloadAll();
    self.brickLRightTypeFour(1);
  }
};

gameBrick.prototype.moveRightLRightTypeFour = function(){
  var self = this;
  if (self.yDefault < 9
    && self.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
    && self.arrayBoardGame[this.xDefault+1][this.yDefault+1]     != 2
    && self.arrayBoardGame[this.xDefault-1][this.yDefault+1]     != 2
    )
  {
    self.yDefault++;
    self.reloadAll();
    self.brickLRightTypeFour(1);
  }
};

//
gameBrick.prototype.moveLeft = function(){
  if (this.statusGame === "") {
  switch (currenBrick) {
    case "Square":
      this.moveLeftSquare();
      break;
    case "Tank":
      this.moveLeftTank();
      break;
    case "TankTypeTwo":
      this.moveLeftTankTypeTwo();
      break;
    case "TankTypeThree":
      this.moveLeftTankTypeThree();
      break;
    case "TankTypeFour":
      this.moveLeftTankTypeFour();
      break;
    case "ZicZac":
      this.moveLeftZicZac();
      break;
    case "ZicZacRight":
      this.moveLeftZicZacRight();
      break;
    case "ZicZacTypeTwo":
      this.moveLeftZicZacTypeTwo();
      break;
    case "ZicZacRightTypeTwo":
      this.moveLeftZicZacRightTypeTwo();
      break;
    case "Row":
      this.moveLeftRow();
      break;
    case "RowTypeTwo":
      this.moveLeftRowTypeTwo();
      break;
    case "LLeft":
      this.moveLeftLLeft();
      break;
    case "LLeftTypeTwo":
      this.moveLeftLLeftTypeTwo();
      break;
    case "LLeftTypeThree":
      this.moveLeftLLeftTypeThree();
      break;
    case "LLeftTypeFour":
      this.moveLeftLLeftTypeFour();
      break;
    case "LRight":
      this.moveLeftLRight();
      break;
    case "LRightTypeTwo":
      this.moveLeftLRightTypeTwo();
      break;
    case "LRightTypeThree":
      this.moveLeftLRightTypeThree();
      break;
    case "LRightTypeFour":
      this.moveLeftLRightTypeFour();
      break;
    }
   } 
};

gameBrick.prototype.moveRight = function(){
  if (this.statusGame === "") {
  switch (currenBrick) {
    case "Square":
      this.moveRightSquare();
    break;
    case "Tank":
      this.moveRightTank();
      break;
    case "TankTypeTwo":
      this.moveRightTankTypeTwo();
      break;
    case "TankTypeThree":
      this.moveRightTankTypeThree();
      break;
    case "TankTypeFour":
      this.moveRightTankTypeFour();
      break;
    case "ZicZac":
      this.moveRightZicZac();
      break;
    case "ZicZacRight":
      this.moveRightZicZacRight();
      break;
    case "ZicZacTypeTwo":
      this.moveRightZicZacTypeTwo();
      break;
    case "ZicZacRightTypeTwo":
      this.moveRightZicZacRightTypeTwo();
      break;
    case "Row":
      this.moveRightRow();
      break;
    case "RowTypeTwo":
      this.moveRightRowTypeTwo();
      break;
    case "LLeft":
      this.moveRightLLeft();
      break;
    case "LLeftTypeTwo":
      this.moveRightLLeftTypeTwo();
      break;
    case "LLeftTypeThree":
      this.moveRightLLeftTypeThree();
      break;
    case "LLeftTypeFour":
      this.moveRightLLeftTypeFour();
      break;
    case "LRight":
      this.moveRightLRight();
      break;
    case "LRightTypeTwo":
      this.moveRightLRightTypeTwo();
      break;
    case "LRightTypeThree":
      this.moveRightLRightTypeThree();
      break;
    case "LRightTypeFour":
      this.moveRightLRightTypeFour();
      break;
    }
   } 
};

gameBrick.prototype.moveDown = function() {
  var self = this;
  switch (currenBrick) {
    case "Square":
      self.moveBrickSquare();
      break;
    case "Tank":
      self.moveBrickTank();
      break;
    case "TankTypeTwo":
      self.moveTankTypeTwo();
      break;
    case "TankTypeThree":
      self.moveTankTypeThree();
      break;
    case "TankTypeFour":
      self.moveTankTypeFour();
      break;
    case "ZicZac":
      self.moveBrickZicZac();
      break;
    case "ZicZacRight":
      self.moveBrickZicZacRight();
      break;
    case "ZicZacTypeTwo":
      self.moveBrickZicZacTypeTwo();
      break;
    case "ZicZacRightTypeTwo":
      self.moveBrickZicZacRightTypeTwo();
      break;
    case "Row":
      self.moveBrickRow();
      break;
    case "RowTypeTwo":
      self.moveBrickRowTypeTwo();
      break;
    case "LLeft":
      self.moveBrickLLeft();
      break;
    case "LLeftTypeTwo":
      self.moveBrickLLeftTypeTwo();
      break;
    case "LLeftTypeThree":
      self.moveBrickLLeftTypeThree();
      break;
    case "LLeftTypeFour":
      self.moveBrickLLeftTypeFour();
      break;
    case "LRight":
      self.moveBrickLRight();
      break;
    case "LRightTypeTwo":
      self.moveBrickLRightTypeTwo();
      break;
    case "LRightTypeThree":
      self.moveBrickLRightTypeThree();
      break;
    case "LRightTypeFour":
      self.moveBrickLRightTypeFour();
      break;
  }
};

gameBrick.prototype.moveUp = function(){
  switch (currenBrick) {
    case "Square":
      currenBrick = "Square";
      break;
    case "Row":
      if (
        this.xDefault < 18
        && this.arrayBoardGame[this.xDefault][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
        && this.arrayBoardGame[this.xDefault+1][this.yDefault] != 2
        && this.arrayBoardGame[this.xDefault+2][this.yDefault] != 2
      ) {
        this.reloadAll();
        currenBrick = "RowTypeTwo";
        this.brickRowTypeTwo();
      }
      break;
    case "RowTypeTwo":
      if (
        this.yDefault < 8
        && this.yDefault > 0
        && this.arrayBoardGame[this.xDefault-1][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault+2] != 2
      ) {
        this.reloadAll();
        currenBrick = "Row";
        this.brickRow();
      }
      break;
    case "Tank":
      if (this.xDefault < 19 && this.arrayBoardGame[this.xDefault+1][this.yDefault] != 2) 
      {
        this.reloadAll();
        currenBrick = "TankTypeTwo";
        this.tankTypeTwo();
      }
      break;
    case "TankTypeTwo":
      if (this.yDefault > 0 && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2)
      {
        this.reloadAll();
        currenBrick = "TankTypeThree";
        this.tankTypeThree();
      }
      break;
    case "TankTypeThree":
      if (this.xDefault > 0 && this.arrayBoardGame[this.xDefault-2][this.yDefault] != 2) {
        this.reloadAll();
        currenBrick = "TankTypeFour";
        this.tankTypeFour();
      }
      break;
    case "TankTypeFour":
      if (this.yDefault < 9 && this.arrayBoardGame[this.xDefault][this.yDefault+1] != 2) {
      this.reloadAll();
      currenBrick = "Tank";
      this.brickTank();
    }
      break;
    case "ZicZac":
      if (this.yDefault < 9 &&  this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2) {
        this.reloadAll();
        currenBrick = "ZicZacTypeTwo";
        this.brickZicZacTypeTwo();
      }
      break;
    case "ZicZacTypeTwo":
      if (this.xDefault < 19 && this.arrayBoardGame[this.xDefault+1][this.yDefault] != 2) {
        this.reloadAll();
        currenBrick = "ZicZac";
        this.brickZicZac();
      }
      break;
    case "ZicZacRight":
      if (this.yDefault > 0 && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2) {
        this.reloadAll();
        currenBrick = "ZicZacRightTypeTwo";
        this.brickZicZacRightTypeTwo();
      }
      break;
    case "ZicZacRightTypeTwo":
      if (this.xDefault < 19 && this.arrayBoardGame[this.xDefault+1][this.yDefault] != 2) {
        this.reloadAll();
        currenBrick = "ZicZacRight";
        this.brickZicZacRight();
      }
      break;
    case "LLeft":
      if (this.xDefault < 19 
        && this.arrayBoardGame[this.xDefault+1][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
        ) {
        this.reloadAll();
        currenBrick = "LLeftTypeTwo";
        this.brickLLeftTypeTwo();
      }
      break;
    case "LLeftTypeTwo":
      if (this.yDefault > 0
        && this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
        && this.arrayBoardGame[this.xDefault][this.yDefault+1] != 2
        ) {
        this.reloadAll();
        currenBrick = "LLeftTypeThree";
        this.brickLLeftTypeThree();
      }
      break;
    case "LLeftTypeThree":
      if (this.xDefault > 0
        && this.arrayBoardGame[this.xDefault-1][this.yDefault] != 2
        && this.arrayBoardGame[this.xDefault+1][this.yDefault] != 2
        && this.arrayBoardGame[this.xDefault+1][this.yDefault-1] != 2
        ) {
        this.reloadAll();
        currenBrick = "LLeftTypeFour";
        this.brickLLeftTypeFour();
      }
      break;
    case "LLeftTypeFour":
      if (this.yDefault < 9
        && this.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
        && this.arrayBoardGame[this.xDefault][this.yDefault+1]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
        ) {
        this.reloadAll();
        currenBrick = "LLeft";
        this.brickLLeft();
      }
      break;
    case "LRight":
      if (this.xDefault < 19
        && this.arrayBoardGame[this.xDefault+1][this.yDefault+1] != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault+1][this.yDefault]   != 2
        ) {
        this.reloadAll();
        currenBrick = "LRightTypeTwo";
        this.brickLRightTypeTwo();
      }
      break;
    case "LRightTypeTwo":
      if (
        this.yDefault > 0
        && this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
        && this.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
        ) {
        this.reloadAll();
        currenBrick = "LRightTypeThree";
        this.brickLRightTypeThree();
      }
      break;
    case "LRightTypeThree":
      if (
        this.xDefault < 19
        && this.arrayBoardGame[this.xDefault-1][this.yDefault]   != 2
        && this.arrayBoardGame[this.xDefault-1][this.yDefault-1] != 2
        && this.arrayBoardGame[this.xDefault+1][this.yDefault]   != 2
        ) {
        this.reloadAll();
        currenBrick = "LRightTypeFour";
        this.brickLRightTypeFour();
      }
      break;
    case "LRightTypeFour":
      if (
          this.yDefault < 9
          && this.arrayBoardGame[this.xDefault][this.yDefault+1]   != 2
          && this.arrayBoardGame[this.xDefault][this.yDefault-1]   != 2
          && this.arrayBoardGame[this.xDefault-1][this.yDefault+1] != 2
        ) {
        this.reloadAll();
        currenBrick = "LRight";
        this.brickLRight();
      }
      break;




  }
};

gameBrick.prototype.moveDownAll = function(){
  var self = this;
  switch (currenBrick) {
    case "Square":
      self.moveBrickSquare();
      break;
    case "Tank":
      self.moveBrickTank();
      break;
    case "TankTypeTwo":
      self.moveTankTypeTwo();
      break;
    case "TankTypeThree":
      self.moveTankTypeThree();
      break;
    case "TankTypeFour":
      self.moveTankTypeFour();
      break;
    case "ZicZac":
      self.moveBrickZicZac();
      break;
    case "ZicZacRight":
      self.moveBrickZicZacRight();
      break;
    case "ZicZacTypeTwo":
      self.moveBrickZicZacTypeTwo();
      break;
    case "ZicZacRightTypeTwo":
      self.moveBrickZicZacRightTypeTwo();
      break;
    case "Row":
      self.moveBrickRow();
      break;
    case "RowTypeTwo":
      self.moveBrickRowTypeTwo();
      break;
    case "LLeft":
      self.moveBrickLLeft();
      break;
    case "LLeftTypeTwo":
      self.moveBrickLLeftTypeTwo();
      break;
    case "LLeftTypeThree":
      self.moveBrickLLeftTypeThree();
      break;
    case "LLeftTypeFour":
      self.moveBrickLLeftTypeFour();
      break;
    case "LRight":
      self.moveBrickLRight();
      break;
    case "LRightTypeTwo":
      self.moveBrickLRightTypeTwo();
      break;
    case "LRightTypeThree":
      self.moveBrickLRightTypeThree();
      break;
    case "LRightTypeFour":
      self.moveBrickLRightTypeFour();
      break;
  }
  setTimeout(function(){self.moveDownAll()}, 500);
};

gameBrick.prototype.createBrick = function(){
  var self = this;
  // Them hai khoi gach vao arr list
  if (self.arrayNextBrick.length < 2)
    self.arrayNextBrick.push(Math.floor(Math.random() * 19));
  self.arrayNextBrick.push(Math.floor(Math.random() * 19));
  x = self.arrayNextBrick[self.arrayNextBrick.length-2];
  self.nextBrick = self.arrayNextBrick[self.arrayNextBrick.length-1];
  self.nextBrickCR(self.nextBrick);
  switch (x) {
    case 0:
      currenBrick = "Square";
      break;
    case 1:
      currenBrick = "Tank";
      break;
    case 2:
      currenBrick = "TankTypeTwo";
      break;
    case 3:
      currenBrick = "TankTypeThree";
      break;
    case 4:
      currenBrick = "ZicZac";
      break;
    case 5:
      currenBrick = "ZicZacRight";
      break;
    case 6:
      currenBrick = "ZicZacTypeTwo";
      break;
    case 7:
      currenBrick = "ZicZacRightTypeTwo";
      break;
    case 8:
      currenBrick = "Row";
      break;
    case 9:
      currenBrick = "RowTypeTwo";
      break;
    case 10:
      currenBrick = "LLeft";
      break;
    case 11:
      currenBrick = "LLeftTypeTwo";
      break;
    case 12:
      currenBrick = "LLeftTypeThree";
      break;
    case 13:
      currenBrick = "LLeftTypeFour";
      break;
    case 14:
      currenBrick = "LRight";
      break;
    case 15:
      currenBrick = "LRightTypeTwo";
      break;
    case 16:
      currenBrick = "LRightTypeThree";
      break;
    case 17:
      currenBrick = "LRightTypeFour";
      break;
    case 18:
      currenBrick = "TankTypeFour";
      break;
  }
};
gameBrick.prototype.clearNextBrick = function() {
  for (i = 200; i < 216; i++) {
    this.tdElement[i].className = "";
  }
};
// gameBrick.prototype.createNextBrick = function(ag1, ag2, ag3, ag4){
//   self.tdElement[ag1].className = "icon-x";
//   self.tdElement[ag2].className = "icon-x";
//   self.tdElement[ag3].className = "icon-x";
//   self.tdElement[ag4].className = "icon-x";
// };
gameBrick.prototype.nextBrickCR = function(numberBrick){
  var self = this;
      self.clearNextBrick();
  switch (numberBrick) {
    case 0:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 1:
      self.tdElement[205].className = "icon-x";
      self.tdElement[208].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 2:
      self.tdElement[205].className = "icon-x";
      self.tdElement[213].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 3:
      self.tdElement[213].className = "icon-x";
      self.tdElement[208].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 4:
      self.tdElement[205].className = "icon-x";
      self.tdElement[214].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 5:
      self.tdElement[213].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 6:
      self.tdElement[207].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 7:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[208].className = "icon-x";
      break;
    case 8:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[204].className = "icon-x";
      self.tdElement[207].className = "icon-x";
      break;
    case 9:
      self.tdElement[205].className = "icon-x";
      self.tdElement[201].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 10:
      self.tdElement[205].className = "icon-x";
      self.tdElement[211].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 11:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[213].className = "icon-x";
      break;
    case 12:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[204].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 13:
      self.tdElement[213].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[214].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 14:
      self.tdElement[208].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 15:
      self.tdElement[205].className = "icon-x";
      self.tdElement[214].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[213].className = "icon-x";
      break;
    case 16:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[207].className = "icon-x";
      break;
    case 17:
      self.tdElement[205].className = "icon-x";
      self.tdElement[206].className = "icon-x";
      self.tdElement[214].className = "icon-x";
      self.tdElement[210].className = "icon-x";
      break;
    case 18:
      self.tdElement[205].className = "icon-x";
      self.tdElement[209].className = "icon-x";
      self.tdElement[208].className = "icon-x";
      self.tdElement[213].className = "icon-x";
      break;
  }
};
/**
 * xoá các ô thẳng hàng vàng tạo thêm mới.
 * @return {[type]} [description]
 */
gameBrick.prototype.checkWin = function(){
  for (i = 0; i < 20; i++) {
    check = true;
    for (j = 0; j < 10; j++) {
      if (this.arrayBoardGame[i][j] != 2)
        check = false;
    } 
    if (check) {
      this.arrayBoardGame.splice(i,1);
      this.arrayBoardGame.unshift([0,0,0,0,0,0,0,0,0,0]);
      this.scores = this.scores + 5;
      document.getElementById("scores").textContent = this.scores;
    }
  }
};

gameBrick.prototype.keyPress = function() {
  var x = event.which || event.keyCode;
  switch (x) {
    case 119:
      game.moveUp();
      break;
    case 115:          
      game.moveDown();
      break;
    case 97:
      game.moveLeft();
      break;
    case 100:
      game.moveRight();
      break;
    case 13:
    startGame();
      break;
    case 114:
      break;
  }
}

var game = new gameBrick();
game.createArrayBoardGame();
function startGame() {
  if (game.start === false) {
    game.createBrick();
    game.loadAll();
    disabledButton();
    game.start = true;
    setTimeout(() => {
      game.moveDownAll();
    }, 700);
    
    
  }
}
window.addEventListener("keydown", ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  switch (direction) {
      case "Up":
          game.moveUp();
          break;
      case "Down":
          game.moveDown();
          break;
      case "Left":
          game.moveLeft();
          break;
      case "Right":
          game.moveRight();
          break;
  }
}));
// bam bat ki nut nao de bat dau
window.onkeydown = () => {
  startGame();
};