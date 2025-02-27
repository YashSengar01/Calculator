document.addEventListener("DOMContentLoaded", function () {
    const calculator = document.getElementById("buttons");
    const display = document.getElementById("display");
    let expression = "";

    // Button Layout (Matching Image)
    const buttonLayout = [
        ["C", "←", ".", "×"],
        ["7", "8", "9", "÷"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", "00", "="]
    ];

    // Generate buttons dynamically
    buttonLayout.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("d-flex", "justify-content-between");

        row.forEach(text => {
            let button = document.createElement("button");
            button.innerText = text;
            button.classList.add("btn", "btn-lg", "fw-bold", "flex-grow-1", "m-1");

            // Button Styling
            if (text === "C") button.classList.add("text-danger");
            else if (text === "=") button.classList.add("btn-primary", "text-white");
            else if (["×", "÷", "+", "-"].includes(text)) button.classList.add("text-primary");
            else button.classList.add("btn-light");

            button.onclick = () => handleButtonClick(text);
            rowDiv.appendChild(button);
        });

        calculator.appendChild(rowDiv);
    });

    function handleButtonClick(value) {
        if (value === "=") {
            try {
                let evalExpression = expression.replace("×", "*").replace("÷", "/");
                display.value = eval(evalExpression);
                expression = display.value;
            } catch {
                alert("Invalid Expression");
                expression = "";
                display.value = "";
            }
        } else if (value === "C") {
            expression = "";
            display.value = "";
        } else if (value === "←") {
            expression = expression.slice(0, -1);
            display.value = expression;
        } else {
            expression += value;
            display.value = expression;
        }
    }

    // Keyboard Support
    document.addEventListener("keydown", function (event) {
        let key = event.key;

        if (/[\d+\-*/.]/.test(key)) {
            handleButtonClick(key.replace("*", "×").replace("/", "÷"));
        } else if (key === "Enter") {
            handleButtonClick("=");
        } else if (key === "Backspace") {
            handleButtonClick("←");
        } else if (key === "Escape") {
            handleButtonClick("C");
        } else {
            event.preventDefault();
        }
    });
});
