
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let message = document
      .getElementById("message")
      .value.toUpperCase()
      .replace(/\s+/g, "");

    let key = document.getElementById("key").value.split("").map(Number);

    let modifiedKey = key.map(num => num - 1);

    let sortedIndexes = [...modifiedKey].map((value, index) => ({
      index,
      value
    }));

    sortedIndexes.sort((a, b) => a.value - b.value);

    let operation = document.getElementById("operation").value;
    let result = "";

    if (operation === "encrypt") {
      result = encryptTransposition(message, sortedIndexes);
    }

    document.getElementById("result").textContent = result;
  });

  function encryptTransposition(plaintext, sortedIndexes) {
    let numColumns = sortedIndexes.length;
    let numRows = Math.ceil(plaintext.length / numColumns);

    let grid = Array.from({ length: numRows }, () =>
      Array(numColumns).fill("")
    );

    let index = 0;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        if (index < plaintext.length) {
          grid[row][col] = plaintext[index];
          index++;
        }
      }
    }


    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        if (grid[row][col] === "") {
          grid[row][col] = "X";
        }
      }
    }

    console.log("Original Grid:");
    console.table(grid);


    let newGrid = Array.from({ length: numRows }, () =>
      Array(numColumns).fill("")
    );

    for (let newCol = 0; newCol < numColumns; newCol++) {
      let originalCol = sortedIndexes[newCol].index; 
      for (let row = 0; row < numRows; row++) {
        newGrid[row][newCol] = grid[row][originalCol];
      }
    }

    console.log("Reordered Grid:");
    console.table(newGrid);

    let newGridString = "";
    for (let col = 0; col < numColumns; col++) {
      for (let row = 0; row < numRows; row++) {
        newGridString += newGrid[row][col];
      }
    }

    return newGridString;
  }
});
