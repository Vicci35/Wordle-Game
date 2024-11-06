
function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const rows = [ 
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["BACK", "Z", "X", "C", "V", "B", "N", "M", "ENTER"]
    ];

    rows.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");
        row.forEach(key => {
            const keyDiv = document.createElement("div");
            keyDiv.classList.add("key");
            keyDiv.textContent = key;
            keyDiv.id = `key-${key}`;
            keyDiv.addEventListener("click", () => handleKeyPress(key));
            rowDiv.appendChild(keyDiv);
        });
        keyboard.appendChild(rowDiv);
    });
}

function keyboardInput() {
    document.addEventListener("keydown", (event) => {
        const key = event.key.toUpperCase();
        if ((key >= "A" && key <= "Z") || key === "ENTER" || key === "BACKSPACE") {
            if (key === "BACKSPACE") {
                handleKeyPress("BACK");
            } else if (key === "ENTER") {
                handleKeyPress("ENTER");
            } else {
                handleKeyPress(key);
            }
        }
    });
}

function updateKeyColor(keyDiv, className) {
    if (!keyDiv.classList.contains("correct-position")) {
        keyDiv.classList.remove("wrong-position", "incorrect");
        keyDiv.classList.add(className);
        console.log(`Uppdaterar färg för ${keyDiv.id} till ${className}`); // Felsökningslogg
    }
}
