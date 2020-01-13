function caculator() {
  this.result  = 0;
  this.content = "";
  
  // function print result to .result
  this.showResult = function() {
    document.getElementById("result").innerHTML = this.result;
  };
  // function print content of Math to .content
  this.writeContent = function() {
    // document.getElementById("content").innerHTML = this.content;
    var _arrContent = this.content.split(" "),
        _print      = "";
    // add <br/> before operator + - × ÷
    for (var i = 0; i < _arrContent.length; i++) {
      if (isNaN(Number(_arrContent[i])) && _arrContent[i] != "%" )
        _print += "<br/>" + _arrContent[i] + " ";
      else
        _print += "" + _arrContent[i] + "";
    }
    document.getElementById("content").innerHTML = _print;
  };

  this.isOperator = function(str) {
    operator = str[str.length - 2];
    if (operator === "+" || operator === "-" || operator === "×" || operator === "÷")
      return true;
    return false;
  };

  /** handing. left to -> right (1)
  * Ex: ["1", "+", "7", "×", "8"] -> ["1", "+", 56];
  * if arr[i] is operator, arr[i-1] = arr[i-1] * (/) arr[i+1]; and delete arr[i], arr[i+1]
  */
  this.multiplicationVivision = function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i] === "×") {
        arr[i-1] = (Number(arr[i-1]) * Number(arr[i+1]));
        arr.splice(i,2);
        i--;
      } else if (arr[i] === "÷") {
        arr[i-1] = (Number(arr[i-1]) / Number(arr[i+1]));
        arr.splice(i,2);
        i--;
      }
    }
  }
  // handing same (1)
  this.additionSubtraction = function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i] === "+") {
        arr[i-1] = (Number(arr[i-1]) + Number(arr[i+1]));
        arr.splice(i,2);
        i--;
      } else if (arr[i] === "-") {
        arr[i-1] = (Number(arr[i-1]) - Number(arr[i+1]));
        arr.splice(i,2);
        i--;
      }
    }
  }
  
  // check if isset %, x% = x/100;
  this.percent = function(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i] === "%") {
        arr[i-1] = Number(arr[i-1])/100;
        arr.splice(i,2);
        i--;
      }
    }
  }
  
  //  (-1, +1) => true, ( x1, ÷1) => false
  this.checkInput = function(arr) {
    if (arr.length >= 3 && !this.isOperator(arr[arr.length - 2]) && arr[0] != "×" && arr[0] != "÷")
      return true;
    return false;
  }

  // main
  this.caculation = function() {
    var arrayContent = this.content.split(" ");
    
    if (this.checkInput(arrayContent)) { //FIXME
      this.percent(arrayContent);
      this.multiplicationVivision(arrayContent); // nhân chia trước, cộng trừ sau
      this.additionSubtraction(arrayContent);
      this.result = arrayContent[0];
      if (this.result != "" && this.result != Infinity)
        this.showResult();
      else
        this.showError();
    } else {
      this.showError();
    }
    
  };

  this.showError = function() {
    document.getElementById("result").innerHTML = "MATH ERROR";
  }
  
  // get input of user.
  this.checkBtn = function(str) {
    switch (str) {
      case "AC":
        this.content = '';
        this.result  = 0;
        this.showResult();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        if (this.isOperator(this.content)) {
          this.content = this.content.substr(0, this.content.length - 3);
          this.content += " " + str + " ";
        }
        else {
          this.content += " " + str + " ";
        }
        break;
      case "%":
          this.content += " " + str + " ";
        break;
      case "⌫":
        if (this.isOperator(this.content)) {
          this.content = this.content.substr(0, this.content.length - 3);
        } else {
          this.content = this.content.substr(0, this.content.length - 1);
        }
        break;
      case "=":
        this.result = 0;
        this.caculation();
        break;
      default:
        this.content += str;
        break;
    }
  }
}
