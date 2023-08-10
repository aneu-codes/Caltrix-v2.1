function swapMatrixValues() {
  var matrix1Inputs = document.querySelectorAll("#matrix1 input");
  var matrix2Inputs = document.querySelectorAll("#matrix2 input");

  for (var i = 0; i < matrix1Inputs.length; i++) {
    var temp = matrix1Inputs[i].value;
    matrix1Inputs[i].value = matrix2Inputs[i].value;
    matrix2Inputs[i].value = temp;
  }
}

function randomMatrix() {
  var inputs = document.querySelectorAll("#matrix1 input");
  for (var i = 0; i < inputs.length; i++) {
    var randomValue = Math.random() < 0.5 ? -1 : 1;
    inputs[i].value = randomValue * Math.floor(Math.random() * 10) + 1;
  }
  var inputs = document.querySelectorAll("#matrix2 input");
  for (var i = 0; i < inputs.length; i++) {
    var randomValue = Math.random() < 0.5 ? -1 : 1;
    inputs[i].value = randomValue * Math.floor(Math.random() * 10) + 1;
  }
}

function nullMatrixB() {
  var matrix2Inputs = document.querySelectorAll("#matrix2 input");
  matrix2Inputs.forEach(function (input) {
    input.value = "0";
  });
}

function identityMatrixB() {
  var matrix2Inputs = document.querySelectorAll("#matrix2 input");
  matrix2Inputs.forEach(function (input, index) {
    if (index === 0 || index === 4 || index === matrix2Inputs.length - 1) {
      input.value = "1";
    } else {
      input.value = "0";
    }
  });
}

function clearMatrixA() {
  var matrix1Inputs = document.querySelectorAll("#matrix1 input");
  matrix1Inputs.forEach(function (input) {
    input.value = "";
  });
}

function clearMatrixB() {
  var matrix2Inputs = document.querySelectorAll("#matrix2 input");
  matrix2Inputs.forEach(function (input) {
    input.value = "";
  });
}