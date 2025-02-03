document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let message = document.getElementById("message").value.toUpperCase().replace(/\s+/g, "");
        let key = parseInt(document.getElementById("key").value); 
        let operation = document.getElementById("operation").value;
        let result = "";

        const Letters = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        if (operation === "encrypt") {
            result = encryptCaesarCiphers(message, key, Letters);
        } else {
            result = decryptCaesarCiphers(message, key, Letters);
        }

        document.getElementById("result").textContent = `Result: ${result}`;
    });

    function encryptCaesarCiphers(plaintext, key, Letters) {
        let ciphertext = "";

        for (let char of plaintext) {
            if (Letters.includes(char)) {
                let index = (Letters.indexOf(char) + key) % 26;
                ciphertext += Letters[index];
            } else {
                ciphertext += char; 
            }
        }

        return ciphertext;
    }

    function decryptCaesarCiphers(ciphertext, key, Letters) {
        let plaintext = "";

        for (let char of ciphertext) {
            if (Letters.includes(char)) {
                let index = (Letters.indexOf(char) - key + 26) % 26;
                plaintext += Letters[index];
            } else {
                plaintext += char; 
            }
        }

        return plaintext;
    }
});
