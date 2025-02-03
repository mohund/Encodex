document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let message = document
      .getElementById("message")
      .value.toUpperCase()
      .replace(/\s+/g, "");
    let key = document.getElementById("key").value.split("").map(Number);
    let operation = document.getElementById("operation").value;
    let result = "";

    if (operation === "encrypt") {
      result = encryptTransposition(message, key);
    }
    
    document.getElementById("result").textContent = `Result: ${result}`;
  });
  function encryptTransposition(plaintext, key) {
    let numColumns = key.length;
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

    let sortedKeyIndices = [...key]
      .map((value, index) => ({ value, index }))
      .sort((a, b) => a.value - b.value)
      .map((item) => item.index);

    let ciphertext = "";
    sortedKeyIndices.forEach((col) => {
      for (let row = 0; row < numRows; row++) {
        if (grid[row][col]) {
          ciphertext += grid[row][col];
        }
      }
    });

    return ciphertext;
  }
});
